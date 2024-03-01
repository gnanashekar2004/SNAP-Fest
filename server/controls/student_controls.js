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
        let queryText = `select * from students where students.id='${id}'`;
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
    const { studentid, eventid } = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (studentid == undefined || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from students where students.id=${studentid}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            return res.status(404).json({message:"student not found"});
        }
        queryText = `select * from event_volunteers where event_volunteers.eventid=${eventid} and event_volunteers.studentid=${studentid}`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `insert into event_volunteers(eventid, studentid) values(${eventid}, ${studentid})`;
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
    result = `${studentid} - ${eventid}`;
    return res.status(200).json(result);
};

export const DeregisterAsVolunteer = async(req, res, next)=>{
    const { studentid, eventid } = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (studentid == undefined || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from event_volunteers where event_volunteers.studentid=${studentid}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            return res.status(404).json({message:"student not found"});
        }
        queryText = `delete from event_volunteers where event_volunteers.studentid=${studentid} and event_volunteers.eventid=${eventid}`;
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
        return res.status(310).json({message:"invalid data"});
    }
    result = `${studentid} - ${eventid}`;
    return res.status(200).json(result);
};

export const loginStudent = async(req, res, next)=>{
    const {email, password } = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (email == undefined || password==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from students where students.email='${email}'`;
        result = await client.query(queryText);
        
        if (result.rows.length == 0){
            // email doesn't exist
            return res.status(350).json({message:"email doesn't exist"});
        }
        if (result.rows[0].password != password){
            // password incorrect
            return res.status(351).json({message:"wrong password"});
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
        return res.status(310).json({message:"err occured"});
    }
    return res.status(200).json(result.rows);
};
/*
export const deleted_registerForEvent = async(req, res, next)=>{
    const { roll, name, hid, password, eventid } = req.body;
    const client = await pool.connect();
    let result;
    let pid = 0;
    let collegeid = 1;
    try{
        if (roll == undefined || eventid==undefined || hid == undefined || name==undefined || password==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');
        let queryText = `select * from student_participants where student_participants.roll='${roll}'`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            queryText = `select pid from participants order by participants.pid desc limit 1`;
            result = await client.query(queryText);
            if (result.rows.length == 0){
                pid = 101 + result.rows.length;
            }
            else {
                pid = result.rows[0].pid +1;
            }
            queryText = `select * from participants where participants.pid=${pid}`;
            result = await client.query(queryText);
            if (result.rows.length == 0){
                queryText = `insert into participants values (${pid}, '${name}', ${collegeid}, ${hid}, '${password}')`;
                result = await client.query(queryText);
            }
            
            queryText = `insert into student_participants values('${roll}', ${pid})`;
            result = await client.query(queryText);
        }
        else {
            pid = result.rows[0].pid;
        }
        
        queryText = `select * from event_participants where event_participants.eventid=${eventid} and event_participants.pid=${pid}`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `insert into event_participants values(${eventid}, ${pid})`;
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
    result = `${roll} - ${pid} - ${name} - ${collegeid} - ${hid} - ${password} - ${eventid}`;
    return res.status(200).json(result);
};

*/