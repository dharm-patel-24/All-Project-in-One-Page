const con=require('../database');

const homePage = (req, res) => {
    res.render('allInOne');
}

const dynamicTable = (req, res) => {
    res.render('dynamicTable');
}

const kukuCube = (req, res) => {
    res.render('kukuCube');
}

const ticTacToe = (req, res) => {
    res.render('ticTacToe');
}

const allEvents = (req, res) => {
    res.render('allEvents');
}

const pagination=async (req, res) => {
    let orderBy = req.query.orderBy || 'std_id'
    let page = req.query.page;
    if(page == undefined) {
        page=1;
    }
    const recordPP = 200;
    const offset = (page - 1) * recordPP;

    //To get total number of record
    const countrows = 'select count(*) as total from Student_Master_26';

    try {
        await con.query(countrows, (err, countResult) => {
            if(err) throw err;
            const totalRecords = countResult[0].total;
            const totalPages = Math.ceil(totalRecords/recordPP);
    
            //To get the records for the current page
            const sql = `select * from Student_Master_26 order by ${orderBy} limit ${offset}, ${recordPP}`;
            con.query(sql, (err, result) => {
                if(err) throw err;
                res.render('pagination_table', {data: result, currentPage: page, totalPages:totalPages, orderBy:orderBy});
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const attendance_report = (req, res) => {
    let page = req.query.page;
    if(page == undefined) {
        page=1;
    }
    const recordPP = 20;
    const offset = (page - 1) * recordPP;

    //To get total number of record
    const countrows = 'select count(*) as total from Student_Master_27';
    
    con.query(countrows, (err, countResult) => {
        if(err) throw err;
        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords/recordPP);

        let month = Number(req.query.month) || 12;
        console.log(month);

        const sql = 
        `select Student_Master_27.std_id, first_name, count(attendance) as Present_In_Dec, round(count(Student_Master_27.std_id) / 0.31, 2) as Percentage 
        from Student_Master_27 
        inner join Attendance_Master_27 
        on Student_Master_27.std_id = Attendance_Master_27.std_id 
        where attendance = '1' and MONTH(Attendance_Master_27.date_of_att)=${month} group by std_id order by std_id limit ${offset}, ${recordPP}`;
        con.query(sql, (err, result) => {
            if(err) throw err;
            res.render('attendance_report_table', {data: result, month:month, currentPage: page, totalPages:totalPages, });
        });

    });
}

const result_table = (req, res) => {
    let page = req.query.page;
    if(page == undefined) {
        page=1;
    }
    const recordPP = 20;
    const offset = (page - 1) * recordPP;

    //To get total number of record
    const countrows = 'select count(*) as total from Student_Master_27';

    con.query(countrows, (err, countResult) => {
        if(err) throw err;
        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords/recordPP);

        const sql = 
        `select Student_Master_27.std_id, concat(first_name, ' ', last_name) name,  
        sum(case when examId=1 then Exam_Master_27.practical_obtain_marks end) practical_marks_of_terminal, 
        sum( case when examId=1 then Exam_Master_27.theory_obtain_marks end) theory_marks_of_terminal,
        sum(case when examId=2 then Exam_Master_27.practical_obtain_marks end) practical_marks_of_prelim, 
        sum(case when examId=2 then Exam_Master_27.theory_obtain_marks end) theory_marks_of_prelim, 
        sum( case when examId=3 then Exam_Master_27.practical_obtain_marks end) practical_marks_of_final,
        sum( case when examId=3 then Exam_Master_27.theory_obtain_marks end) theory_marks_of_final,
        sum( case when examId=1 or examId=2 or examId=3 then Exam_Master_27.practical_obtain_marks end) practical_total_marks,
        sum( case when examId=1 or examId=2 or examId=3 then Exam_Master_27.theory_obtain_marks end) theory_total_marks
        from Student_Master_27
        inner join Exam_Master_27 on Student_Master_27.std_id = Exam_Master_27.std_id
        group by std_id order by std_id limit ${offset}, ${recordPP}`;

        con.query(sql, (err, result) => {
            if(err) throw err;
            res.render('result_table', {data: result,  currentPage: page, totalPages:totalPages});
        });
    });
}

const one_std_result = (req, res) => {
    let id = req.query.id;
        const sql = 
        `select concat(first_name, ' ', last_name) name, subName, 
        sum(case when Exam_Master_27.examId=1 then Exam_Master_27.practical_obtain_marks end) as terminal_practical_marks,
        sum(case when Exam_Master_27.examId=1 then Exam_Master_27.theory_obtain_marks end) as terminal_theory_marks,
        sum(case when Exam_Master_27.examId=2 then Exam_Master_27.practical_obtain_marks end) as prelim_practical_marks,
        sum(case when Exam_Master_27.examId=2 then Exam_Master_27.theory_obtain_marks end) as prelim_theory_marks,
        sum(case when Exam_Master_27.examId=3 then Exam_Master_27.practical_obtain_marks end) as final_practical_marks,
        sum(case when Exam_Master_27.examId=3 then Exam_Master_27.theory_obtain_marks end) as final_theory_marks,
        sum(practical_obtain_marks + theory_obtain_marks) as total_marks
        from Subject_Master_27
        inner join Exam_Master_27 on Subject_Master_27.sub_id = Exam_Master_27.sub_id 
        inner join Student_Master_27 on  Student_Master_27.std_id = Exam_Master_27.std_id
        where Exam_Master_27.std_id=${id} 
        group by Subject_Master_27.sub_id`;
        
        con.query(sql, (err, result) => {
            const name = result[0].name;
            if(err) throw err;
            res.render('one_std_result_table', {data: result,name:name, id:id});
        });
}

const rglr_search = (req, res) => {
    res.render('rglr_search_table', { display: "no" });
}

const get_data_rglr_search = (req, res) => {
    var query;
    var queryss;
    console.log("query: ", req.body.str);
    if (req.body.str) {
        query = req.body.str;
        queryss = req.body.str;
    } else {
        query = req.query.querys;
        queryss = req.query.querys;
    }

    var page;
    if (req.query.page) {
        page = req.query.page;
    } else {
        page = 1;
    }
    //To get total number of record
    // const countrows = 'select count(*) as total from Student_Master_27';

    con.query(queryss, (err, countResult) => {
        
        // if (err) throw err;
        if (err) {
            res.end("<h3><center>Wrong Query</center></h3>");
            // console.log("Wrong");
        }
        const recordPP = 17;
        const totalRecords = countResult.length;
        totalPages = Math.ceil(totalRecords / recordPP);
        const offset = (page - 1) * recordPP;
        query = query + ` limit ${offset}, ${recordPP}`;
        col = [];
        con.query(query, (err, row, fields) => {
            if (err) throw err;
            for (i in fields) {
                col.push(fields[i].name);
            }
            
            res.render('rglr_search_table', { row: row, col: col, currentPage: page, totalPages: totalPages, recordPP: recordPP, querys: queryss, display: "show" });
        });
    });
}

const filter = (req, res) => {
    let orderBy = req.query.orderBy || 'std_id';
    let order = req.query.order || 'asc';
    let page = req.query.page;
    if(page == undefined) {
        page=1;
    }
    const recordPP = 20;
    const offset = (page - 1) * recordPP;

    //To get total number of record
    const countrows = 'select count(*) as total from Student_Master_27';
    
    con.query(countrows, (err, countResult) => {
        if(err) throw err;
        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords/recordPP);

        let month = Number(req.query.month) || 12;
        const sql = 
        `select Student_Master_27.std_id, first_name, count(attendance) as Present_In_Dec, round(count(Student_Master_27.std_id) / 0.31, 2) as Percentage 
        from Student_Master_27 
        inner join Attendance_Master_27 
        on Student_Master_27.std_id = Attendance_Master_27.std_id 
        where attendance = '1' and MONTH(Attendance_Master_27.date_of_att)=${month} group by std_id order by ${orderBy} ${order} limit ${offset}, ${recordPP}`;
        con.query(sql, (err, result) => {
            if(err) throw err;
            res.render('filter_table', {data: result, month:month, currentPage: page, totalPages:totalPages, orderBy:orderBy, order:order});
        });
    });
}

const searchById = (req, res) => {
    res.render('search_id_OR_table', { display: "no" });
}

const getSearchedDataById = (req, res) => {
    var query = req.body.str;

    const sql = `select * from Student_Master_26 where std_id in (${query})`;
        con.query(sql, (err, result) => {
            if(err) throw err;
            res.render('search_id_OR_table', {data: result, display: "show"});
        });
}

const searchByIdShowMore = (req, res) => {    
    res.render('search_id_OR_showMore', {display: "no"});    
}

const searchbyANDOR = (req, res) => { 
    var last_name = req.body.last_name;
    var city = req.body.city;
    var stream = req.body.stream;
    var age = req.body.age;
    var gender = req.body.gender;
    var operation = req.body.operation;

        const sql = `select * from Student_Master_26 where last_name like '${last_name}%' ${operation} city like '${city}%' ${operation} stream like '${stream}%' ${operation} age like '${age}%' ${operation} gender like '${gender}%'`;
        con.query(sql, [ city, stream, age, gender], (err, result) => {
            if(err) throw err;
            res.render('search_id_OR_showMore', {data: result, display: "show"});
        });
}



module.exports = {homePage, dynamicTable, kukuCube, ticTacToe, allEvents, pagination, attendance_report, result_table, one_std_result, rglr_search, get_data_rglr_search, filter, searchById, getSearchedDataById, searchByIdShowMore, searchbyANDOR}