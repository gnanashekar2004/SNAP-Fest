import pool from "../db/connect";

export const getAllAdmins = async(req, res, next) => {
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        let queryText = 'select * from adm';
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

export const getAdminByID = async(req, res, next) => {
    const id = req.params.id;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        let queryText = `select * from adm where adm.adminid=${id}`;
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
        return res.status(310).json({message:"Invalid admin id"});
    }
    return res.status(200).json(result.rows);
};


export const deleteOrganizer = async(req, res, next)=>{
    const {oid} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (oid == undefined ){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `delete from event_organizers where event_organizers.oid=${oid}`;
        result = await client.query(queryText);
        
        queryText = `delete from organizers where organizers.oid=${oid}`;
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
        return res.status(310).json({message:"err occured"});
    }
    result.rows = [{message:"success"}];
    return res.status(200).json(result.rows);
};

export const deleteParticipant = async(req, res, next)=>{
    const {pid} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (pid == undefined ){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `delete from event_participants where event_participants.pid=${pid}`;
        result = await client.query(queryText);
        queryText = `delete from event_winners where event_winners.pid=${pid}`;
        result = await client.query(queryText);
        queryText = `delete from participants where participants.pid=${pid}`;
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
        return res.status(310).json({message:"err occured"});
    }
    result.rows = [{message:"success"}];
    return res.status(200).json(result.rows);
};

export const deleteStudentFromParticipant = async(req, res, next)=>{
    const {roll} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (roll == undefined ){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select student_participants.pid from student_participants where student_participants.roll='${roll}'`;
        result = await client.query(queryText);
        let pid=0;
        if (result.rows.length == 0){
            return res.status(404).json({message:"no student with given roll is a participant"});
        }
        pid = result.rows[0].pid;

        queryText = `delete from event_participants where event_participants.pid=${pid}`;
        result = await client.query(queryText);
        queryText = `delete from event_winners where event_winners.pid=${pid}`;
        result = await client.query(queryText);
        queryText = `delete from student_participants where student_participants.roll='${roll}'`;
        result = await client.query(queryText);
        queryText = `delete from participants where participants.pid=${pid}`;
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
        return res.status(310).json({message:"err occured"});
    }
    result.rows = [{message:"success"}];
    return res.status(200).json(result.rows);
};


export const deleteStudentFromVolunteer = async(req, res, next)=>{
    const {roll} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (roll == undefined ){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `delete from event_volunteers where event_volunteers.roll='${roll}'`;
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
        return res.status(310).json({message:"err occured"});
    }
    result.rows = [{message:"success"}];
    return res.status(200).json(result.rows);
};