import pool from "../db/connect";

export const getAllOrganizers = async(req, res, next)=>{
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        let queryText = 'select * from organizers';
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
        let queryText = `select * from organizers where organizers.oid=${id}`;
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
    const {oid, name, password} = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (name == undefined || password==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from organizers`;
        result = await client.query(queryText); 

        if (result.rows.length != 0){
            // means oid already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `insert into organizers values (${oid}, '${name}', '${password}')`;
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
    result = `${oid} - ${name} - ${password}`;
    return res.status(200).json(result);
};


export const organizeEvent = async(req, res, next)=>{
    const { oid, eventid } = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (oid == undefined || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from event_organizers where event_organizers.eventid=${eventid} and event_organizers.oid=${oid}`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `insert into event_organizers values(${eventid}, ${oid})`;
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
    result = `${oid} - ${eventid}`;
    return res.status(200).json(result);
}