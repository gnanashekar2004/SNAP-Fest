import pool from "../db/connect";

export const getAllAdmins = async(req, res, next) => {
    const client = await pool.connect();
    let result;
    try {
        await client.query('BEGIN');
        let queryText = 'select * from admininfo';
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
        let queryText = `select * from admininfo where admininfo.id=${id}`;
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
    const {id} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (id == undefined ){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `delete from orgs where orgs.id=${id}`;
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

export const deleteExtParticipant = async(req, res, next)=>{
    const {id} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (id == undefined ){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `delete from ext_part where ext_part.id=${id}`;
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

export const deleteStudent = async(req, res, next)=>{
    const {id} = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (id == undefined ){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `delete from students where students.id=${id}`;
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

export const loginAdmin = async(req, res, next)=>{
    const {email, password } = req.body;
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');
        if (email == undefined || password==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        let queryText = `select * from admininfo where admininfo.email='${email}'`;
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



export const declareWinnersByAdmin = async(req, res, next)=>{
    const { pid, eventid, position } = req.body;
    const client = await pool.connect();
    let result;
    try{
        if (pid == undefined || position==undefined || eventid==undefined){
            return res.status(400).json({message:"undefined data given"});
        }
        await client.query('BEGIN');

        let queryText = `select * from event_parts where event_parts.eventid=${eventid} and event_parts.pid=${pid}`;
        result = await client.query(queryText);
        if (result.rows.length == 0){
            return res.status(404).json({message:"participant not found for that event"});
        }
        queryText = `select * from event_winners where event_winners.eventid=${eventid} and event_winners.pid=${pid}`;
        result = await client.query(queryText);
        if (result.rows.length != 0){
            // already exists
            return res.status(500).json({message:"Already exists"});
        }
        else {
            // ok
            queryText = `select * from event_winners where event_winners.eventid=${eventid} and event_winners.position=${position}`;
            result = await client.query(queryText);
            if (result.rows.length != 0){
                // already exists
                return res.status(500).json({message:"Already exists"});
            }
            else {
                queryText = `insert into event_winners(eventid, pid, position) values(${eventid}, ${pid}, ${position})`;
                result = await client.query(queryText);
            }
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
    result = `${pid} - ${eventid} - ${position}`;
    return res.status(200).json(result);
};


// export const deleteStudentFromParticipant = async(req, res, next)=>{
//     const {roll} = req.body;
//     const client = await pool.connect();
//     let result;
//     try{
//         await client.query('BEGIN');
//         if (roll == undefined ){
//             return res.status(400).json({message:"undefined data given"});
//         }
//         let queryText = `select student_participants.pid from student_participants where student_participants.roll='${roll}'`;
//         result = await client.query(queryText);
//         let pid=0;
//         if (result.rows.length == 0){
//             return res.status(404).json({message:"no student with given roll is a participant"});
//         }
//         pid = result.rows[0].pid;

//         queryText = `delete from event_participants where event_participants.pid=${pid}`;
//         result = await client.query(queryText);
//         queryText = `delete from event_winners where event_winners.pid=${pid}`;
//         result = await client.query(queryText);
//         queryText = `delete from student_participants where student_participants.roll='${roll}'`;
//         result = await client.query(queryText);
//         queryText = `delete from participants where participants.pid=${pid}`;
//         result = await client.query(queryText);

//         await client.query('COMMIT');
//     }catch(e){
//         await client.query('ROLLBACK');
//         console.log(e);
//     }
//     finally{
//         client.release();
//     }
//     if(!result){
//         return res.status(310).json({message:"err occured"});
//     }
//     result.rows = [{message:"success"}];
//     return res.status(200).json(result.rows);
// };


// export const deleteStudentFromVolunteer = async(req, res, next)=>{
//     const {roll} = req.body;
//     const client = await pool.connect();
//     let result;
//     try{
//         await client.query('BEGIN');
//         if (roll == undefined ){
//             return res.status(400).json({message:"undefined data given"});
//         }
//         let queryText = `delete from event_volunteers where event_volunteers.roll='${roll}'`;
//         result = await client.query(queryText);
        
//         await client.query('COMMIT');
//     }catch(e){
//         await client.query('ROLLBACK');
//         console.log(e);
//     }
//     finally{
//         client.release();
//     }
//     if(!result){
//         return res.status(310).json({message:"err occured"});
//     }
//     result.rows = [{message:"success"}];
//     return res.status(200).json(result.rows);
// };