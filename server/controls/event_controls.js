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
        let queryText = `select students.id, students.name from students 
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
        let queryText = `select part.name from part
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