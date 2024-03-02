import pool from "../db/connect";

export const registerForEvent = async(req, res, next)=>{
    const { pid, eventid} = req.body;
    let result;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        if (pid==undefined  || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from part where part.id=${pid}`;
        result = await client.query(queryText);

        if (result.rows.length == 0){
            // no such participant
            return res.status(404).json({message:"participant not found"});
        }
        else {
            queryText = `select * from events where events.id=${eventid}`;
            result = await client.query(queryText);
            if (result.rows.length == 0){
                // no such event
                return res.status(404).json({message:"event not found"});
            }
            else {
                queryText = `insert into event_parts(eventid, pid) values (${eventid}, ${pid})`;
                result = await client.query(queryText);
            }
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
        result = `${pid}-${eventid}`;
        return res.status(200).json(result);
    }
};

export const DeregisterForEvent = async(req, res, next)=>{
    const { pid, eventid} = req.body;
    let result;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        if (pid==undefined  || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from event_parts where event_parts.pid=${pid} and event_parts.eventid=${eventid}`;
        result = await client.query(queryText);

        if (result.rows.length == 0){
            // no such participant
            return res.status(404).json({message:"participant not found"});
        }
        else {
            queryText = `delete from event_parts where event_parts.eventid=${eventid} and event_parts.pid=${pid}`;
            result = await client.query(queryText);

            queryText = `delete from event_winners where event_winners.eventid=${eventid} and event_winners.pid=${pid}`;
            result = await client.query(queryText);
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
        result = `${pid}-${eventid}`;
        return res.status(200).json(result);
    }
};


export const getAllParts = async(req, res, next)=>{
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

export const getEventsParticipated = async(req, res, next)=>{
    const client = await pool.connect();
    const id = req.params.id;
    let result;
    try {
        await client.query('BEGIN');
        let queryText = `select * from part where part.id=${id}`;
        result = await client.query(queryText);

        if (result.rows.length == 0){
            // no such participant
            return res.status(404).json({message:"participant not found"});
        }
        queryText = `select * from events 
        join event_parts on events.id=event_parts.eventid
        join part on event_parts.pid=part.id
        where part.id=${id}`;
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