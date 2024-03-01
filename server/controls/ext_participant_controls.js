import pool from "../db/connect";
import { getRandomId } from "./random_id_generator";


export const getAllParticipants = async(req, res, next)=>{
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        let queryText = 'select * from part';
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

export const getParticipantByID = async(req, res, next) => {
    const id = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select * from part where part.id=${id}`;
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

export const createParticipant = async(req, res, next)=>{
    const {name, email, password, college} = req.body;
    const client = await pool.connect();
    let result;
    let id;
    try{
        if (name == undefined || email==undefined || password==undefined || college==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from ext_part where ext_part.email='${email}'`;
        result = await client.query(queryText); 

        if (result.rows.length != 0){
            // means email already exists
            return res.status(500).json({message:"email Already exists"});
        }
        else {
            // 
            queryText = `select * from students where students.email='${email}'`;
            result = await client.query(queryText); 

            if (result.rows.length != 0){
                // means email already exists
                return res.status(500).json({message:"email Already exists"});
            }
            else {
                queryText = `select part.id from part`;
                result = await client.query(queryText);
                id = getRandomId(1, 10000, result.rows);

                queryText = `insert into ext_part(id, name, email, password, college) values (${id}, '${name}', '${email}', '${password}', '${college}')`;
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
    result = `${id}-${name}-${email}-${password}`;
    return res.status(200).json(result);
};

export const registerAsParticipant = async(req, res, next)=>{
    const { pid, eventid } = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (pid == undefined || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from event_participants where event_participants.eventid=${eventid} and event_participants.pid=${pid}`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `insert into event_participants values(${eventid}, ${pid})`;
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
    result = `${pid} - ${eventid}`;
    return res.status(200).json(result);
};

export const getAcc = async(req, res, next)=>{
    const id = req.params.id;
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        if (id==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from accomodation where accomodation.id = ${id}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            // no accom
            return res.status(300).json({message:"No accomodation given"});
        }
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

export const setAcc = async(req, res, next)=>{
    const {id, hall, food} = req.body;
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        if (id==undefined || hall==undefined || food==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from accomodation where accomodation.id = ${id}`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // remove old accom
            queryText = `delete from accomodation where accomodation.id = ${id}`;
            result = await client.query(queryText);
        }
        queryText = `insert into accomodation values (${id}, '${hall}', '${food}')`;
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
        result = `${id}-${hall}-${food}`;
        return res.status(200).json(result);
    }
};

export const loginExtPart = async(req, res, next)=>{
    const {email, password } = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (email == undefined || password==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from ext_part where ext_part.email='${email}'`;
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