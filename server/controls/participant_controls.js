import pool from "../db/connect";

export const getAllParticipants = async(req, res, next)=>{
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        const queryText = 'select * from participants';
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
        const queryText = `select * from participants where participants.pid=${id}`;
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
    const {name, college, location, password} = req.body;
    const client = await pool.connect();
    let result;
    try{
        let collegeid, pid, hid;
        if (name == undefined || college == undefined || location == undefined || password==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from colleges where colleges.name='${college}'`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            // have to create a college with that name
            queryText = `select * from colleges`;
            result = await client.query(queryText);
            collegeid = result.rows.length +1;

            queryText = `insert into colleges values (${collegeid}, '${college}', '${location}')`;
            result = await client.query(queryText);
        }
        else {
            // that college entry is there
            collegeid = result.rows[0].collegeid;
            if (collegeid == 1){
                // iitkgp student trying to login as external participant
                await client.query('ROLLBACK');
                return res.status(400).json({message:"Student at IITKGP, you can login directly from students tab"});
            }
        }
        queryText = `select * from halls`;
        result = await client.query(queryText);
        hid = Math.floor((Math.random() * (result.rows.length)) + 1);

        queryText = `select pid from participants order by participants.pid desc limit 1`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            pid = 101 + result.rows.length;
        }
        else {
            pid = result.rows[0].pid +1;
        }
        

        queryText = `insert into participants values (${pid}, '${name}', ${collegeid}, ${hid}, '${password}')`;
        result = await client.query(queryText);

        result = `${pid} - ${name} - ${collegeid} - ${hid} - ${password}`;
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

