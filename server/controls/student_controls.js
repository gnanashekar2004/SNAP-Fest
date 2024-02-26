import pool from "../db/connect";

export const getAllStudents = async(req, res, next) => {
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        const queryText = 'select * from students';
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
        const queryText = `select * from students where students.roll=${id}`;
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

export const insertStudent = async(req, res, next) => {
    const {collegeid, name, location} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select * from students where students.collegeid=${collegeid}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            queryText = `insert into students values (${collegeid}, '${name}', '${location}');`;
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
