import pool from "../db/connect";

export const getAllColleges = async(req, res, next) => {
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        const queryText = 'select * from colleges';
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

export const getCollegeByID = async(req, res, next) => {
    const id = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        const queryText = `select * from colleges where colleges.collegeid=${id}`;
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

export const insertCollege = async(req, res, next) => {
    const {collegeid, name, location} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select * from colleges where colleges.collegeid=${collegeid}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            queryText = `insert into colleges values (${collegeid}, '${name}', '${location}');`;
            result = await client.query(queryText);
        }
        else {
            return res.status(320).json({message:"Already exists"});
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
    return res.status(200).json(result);
};
