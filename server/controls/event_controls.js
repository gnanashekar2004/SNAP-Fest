import pool from "../db/connect";

export const getAllEvents = async(req, res, next) => {
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        const queryText = 'select * from events';
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
        const queryText = `select * from events where events.eventid=${id}`;
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
        return res.status(310).json({message:"Invalid college id"});
    }
    return res.status(200).json(result.rows);
};