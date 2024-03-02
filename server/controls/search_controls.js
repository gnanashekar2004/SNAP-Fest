import pool from "../db/connect";

export const getEventByName = async(req, res, next) => {
    const name = req.params.name;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (name == undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from events where events.name='${name}'`;
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
