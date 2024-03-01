import pool from "../db/connect";
import { getRandomId } from "./random_id_generator";
export const getAllOrganizers = async(req, res, next)=>{
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        let queryText = 'select * from orgs';
        result = await client.query(queryText);
        
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.log(e);
    } finally {
        client.release();
    }
    if (!result){
        return res.status(404).json({message:"db error occured"});
    }
    else {
        return res.status(200).json(result.rows);
    }
};

export const getOrganizerByID = async(req, res, next) => {
    const id = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select * from orgs where orgs.id=${id}`;
        result = await client.query(queryText);
        
        await client.query('COMMIT');
    }catch(e){
        await client.query('ROLLBACK');
        console.log(e);
    }
    finally{
        client.release();
    }
    if(!result){
        return res.status(310).json({message:"Invalid data"});
    }
    return res.status(200).json(result.rows);
};

export const createOrganizer = async(req, res, next)=>{
    const {name, email, password} = req.body;
    const client = await pool.connect();
    let result;
    let id;
    try{
        if (name == undefined || email==undefined || password==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from orgs where orgs.email='${email}'`;
        result = await client.query(queryText); 

        if (result.rows.length != 0){
            // means oid already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `select id from orgs`;
            result = await client.query(queryText);
            id = getRandomId(1, 10000, result.rows);

            queryText = `insert into orgs(id, name, email, password) values (${id}, '${name}', '${email}', '${password}')`;
            result = await client.query(queryText);
        }   

        await client.query('COMMIT');
    }catch(e){
        await client.query('ROLLBACK');
        console.log(e);
    }
    finally{
        client.release();
    }
    if(!result){
        return res.status(310).json({message:"invalid data"});
    }
    result = `${id}-${name}-${email}-${password}`;
    return res.status(200).json(result);
};


export const organizeEvent = async(req, res, next)=>{
    const { orgid, eventid } = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (orgid == undefined || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from orgs where orgs.id=${orgid}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            return res.status(404).json({message:"organizer not found"});
        }
        queryText = `select * from event_orgs where event_orgs.eventid=${eventid} and event_orgs.orgid=${orgid}`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `insert into event_orgs(eventid, orgid) values(${eventid}, ${orgid})`;
            result = await client.query(queryText);
        }

        await client.query('COMMIT');
    }catch(e){
        await client.query('ROLLBACK');
        console.log(e);
    }
    finally{
        client.release();
    }
    if(!result){
        return res.status(310).json({message:"invalid data"});
    }
    result = `${orgid} - ${eventid}`;
    return res.status(200).json(result);
}

export const declareWinners = async(req, res, next)=>{
    const { pid, eventid, position, orgid } = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (pid == undefined || position==undefined || eventid==undefined || orgid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from event_orgs where event_orgs.eventid=${eventid} and orgid=${orgid}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            return res.status(400).json({message:"organizer is not organizing the event"});
        }

        queryText = `select * from event_parts where event_parts.eventid=${eventid} and event_parts.pid=${pid}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            return res.status(404).json({message:"participant not found for that event"});
        }
        queryText = `select * from event_winners where event_winners.eventid=${eventid} and event_winners.pid=${pid}`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `select * from event_winners where event_winners.eventid=${eventid} and event_winners.position=${position}`;
            result = await client.query(queryText);
            if (result.rows.length != 0){
                // already exists
                return res.status(500).json({message:"Already exists"});
            }
            else {
                queryText = `insert into event_winners(eventid, pid, position) values(${eventid}, ${pid}, ${position})`;
                result = await client.query(queryText);
            }
        }

        await client.query('COMMIT');
    }catch(e){
        await client.query('ROLLBACK');
        console.log(e);
    }
    finally{
        client.release();
    }
    if(!result){
        return res.status(310).json({message:"invalid data"});
    }
    result = `${pid} - ${eventid} - ${position}`;
    return res.status(200).json(result);
};

export const loginOrg = async(req, res, next)=>{
    const {email, password } = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (email == undefined || password==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from orgs where orgs.email='${email}'`;
        result = await client.query(queryText);
        
        if (result.rows.length == 0){
            // email doesn't exist
            return res.status(350).json({message:"email doesn't exist"});
        }
        if (result.rows[0].password != password){
            // password incorrect
            return res.status(351).json({message:"wrong password"});
        }

        await client.query('COMMIT');
    }catch(e){
        await client.query('ROLLBACK');
        console.log(e);
    }
    finally{
        client.release();
    }
    if(!result){
        return res.status(310).json({message:"err occured"});
    }
    return res.status(200).json(result.rows);
};


export const getEventsOrganized = async(req, res, next)=>{
    const client = await pool.connect();
    const id = req.params.id;
    let result;
    try {
        await client.query('BEGIN');
        let queryText = `select * from orgs where orgs.id=${id}`;
        result = await client.query(queryText);

        if (result.rows.length == 0){
            // no such organizer
            return res.status(404).json({message:"organizer not found"});
        }
        queryText = `select events.id, events.name, events.location, events.description, events.dateofevent from events 
        join event_orgs on events.id=event_orgs.eventid
        join orgs on event_orgs.orgid=orgs.id
        where orgs.id=${id}`;
        result = await client.query(queryText);
        
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        console.log(e);
    } finally {
        client.release();
    }
    if (!result){
        return res.status(404).json({message:"db error occured"});
    }
    else {
        return res.status(200).json(result.rows);
    }
};