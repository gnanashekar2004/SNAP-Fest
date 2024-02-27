import pool from "../db/connect";

export const getAllStudents = async(req, res, next) => {
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        let queryText = 'select * from students';
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

export const getStudentByID = async(req, res, next) => {
    const id = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select * from students where students.roll='${id}'`;
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

export const registerAsVolunteer = async(req, res, next)=>{
    const { roll, eventid } = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (roll == undefined || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from event_volunteers where event_volunteers.eventid=${eventid} and event_volunteers.roll='${roll}'`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `insert into event_volunteers values(${eventid}, '${roll}')`;
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
    result = `${roll} - ${eventid}`;
    return res.status(200).json(result);
};
