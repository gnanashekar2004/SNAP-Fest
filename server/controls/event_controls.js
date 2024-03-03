import pool from "../db/connect";

export const getAllEvents = async(req, res, next) => {
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        let queryText = 'select * from events';
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

export const getEventByID = async(req, res, next) => {
    const id = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select * from events where events.id=${id}`;
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

export const getEventVolunteers = async(req, res, next) => {
    const eventid = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select students.id, students.name, students.email from students 
        join event_volunteers on students.id=event_volunteers.studentid
        where event_volunteers.eventid=${eventid}`;
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

export const getEventWinners = async(req, res, next) => {
    const eventid = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select part.name, event_winners.pid, event_winners.position from part
        join event_winners on part.id=event_winners.pid
        where event_winners.eventid=${eventid}`;
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

export const getEventParticipants = async(req, res, next) => {
    const id = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select part.id, part.name from part
        join event_parts on part.id=event_parts.pid
        where event_parts.eventid=${id}`;
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

export const addEvent = async(req, res, next)=>{
    const {id, name, dateofevent, location, description } = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (id == undefined || name == undefined || dateofevent == undefined|| location==undefined || description==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from events where events.id=${id}`;
        result = await client.query(queryText);

        if (result.rows.length != 0){
            // already eventid exists
            return res.status(500).json({message:"eventid exists already"});
        }
        else {
            queryText = `insert into events values (${id}, '${name}', '${dateofevent}', '${location}', '${description}')`;
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
        return res.status(310).json({message:"Invalid data"});
    }
    result = req.body;
    return res.status(200).json(result);
};

export const deleteEvent = async(req, res, next)=>{
    const {id} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (id == undefined ){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `delete from events where events.id=${id}`;
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
    result = `success`;
    return res.status(200).json(result);
};