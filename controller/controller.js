const con=require('../database');

const jwt = require('jsonwebtoken');

var randomize = require('randomatic');
var md5 = require('md5');

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

const delimiterSearch = (req, res) => {
    var query = req.body.str;
    res.render('delimiter_search', { display: "no", query: query});
}

const delimiterSearchResult = (req, res) => {
    var query = req.body.str;
    separate = query.replace(/(?=[$-/:-?{-~!"^_`\[\]])/gi, ",");
    var splitString = separate.split(',');
    
    var val;
    var fname = [];
    var lname = [];
    var email = [];
    var mobile = [];
    var age = [];
    var city = [];

    for (var i = 1; i < splitString.length; i++) {
        if (splitString[i].startsWith('_')) {
            val = splitString[i].replace('_', '');
            fname.push(val);
        }
        if (splitString[i].startsWith('^')) {
            val = splitString[i].replace('^', '');
            lname.push(val);
        }
        if (splitString[i].startsWith('$')) {
            val = splitString[i].replace('$', '');
            email.push(val);
        }
        if (splitString[i].startsWith('{')) {
            val = splitString[i].replace('{', '');
            mobile.push(val);
        }
        if (splitString[i].startsWith('}')) {
            val = splitString[i].replace('}', '');
            age.push(val);
        }
        if (splitString[i].startsWith(':')) {
            val = splitString[i].replace(':', '');
            city.push(val);
        }
    }

    let sql = `select * from Student_Master_27 where (`
    if (fname.length >= 1) {
        for (var i = 0; i < fname.length; i++) {
            sql += `first_name like '%${fname[i]}%' or `
        }
        
        sql = sql.slice(0, sql.length - 3) + ') and (';
    }

    if (lname.length >= 1) {
        for (var i = 0; i < lname.length; i++) {
            sql += `last_name like '%${lname[i]}%' or `
        }
        sql = sql.slice(0, sql.length - 3) + ') and (';
    }

    if (email.length >= 1) {
        for (var i = 0; i < email.length; i++) {
            sql += `email like '%${email[i]}%' or `
        }
        sql = sql.slice(0, sql.length - 3) + ') and (';
    }

    if (mobile.length >= 1) {
        for (var i = 0; i < mobile.length; i++) {
            sql += `number like '%${mobile[i]}%' or `
        }
        sql = sql.slice(0, sql.length - 3) + ') and (';
    }

    if (age.length >= 1) {
        for (var i = 0; i < age.length; i++) {
            sql += `age like '%${age[i]}%' or `
        }
        sql = sql.slice(0, sql.length - 3) + ') and (';
    }

    if (city.length >= 1) {
        for (var i = 0; i < city.length; i++) {
            sql += `city like '%${city[i]}%' or `
        }
        sql = sql.slice(0, sql.length - 3) + ') and (';
    }

    sql = sql.slice(0, sql.length - 6);
    console.log(sql);
    con.query(sql, (err, result) => {
        res.render('delimiter_search', { data: result, display: "show", query: query });
    });
}

const formValidation = (req, res) => {
    res.render('form_validation');
}

const formValidationUpdate = (req, res) => {
    var allData = {};
    const sql = `select * from Basic_Detail_v where candidate_id = ${req.params.id}`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        allData.Basic_Detail_v = result;
    });

    con.query(`select * from Education_Details_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Education_Details_v = result;
        }
    });

    con.query(`select * from Work_Experience_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Work_Experience_v = result;
        }
    });

    con.query(`select * from Language_Known_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Language_Known_v = result;
        }
    });

    con.query(`select * from Referance_Contact_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Referance_Contact_v = result;
        }
    });

    con.query(`select * from preferance_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.preferance_v = result;
        }
    });

    con.query(`select * from Technologies_You_Know_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Technologies_You_Know_v = result;
        }
        res.render('form_vali_update', { item: allData });
    });
}

const formValidationUpdateData = (req, res) => {
    let sql = `update Basic_Detail_v 
	Set firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', designation = '${req.body.designation}', email = '${req.body.email}', phone = ${req.body.phone}, addressOne = '${req.body.addressOne}', addressTwo = '${req.body.addressTwo}', city = '${req.body.city}', gender = '${req.body.gender}', state = '${req.body.state}', status = '${req.body.status}', DOB = '${req.body.dob}', pin = ${req.body.pin}
	where candidate_id = ${req.params.id}`;
    con.query(sql, (err, result) => {
        if (err) throw err;
    });

    con.query(`DELETE FROM Education_Details_v WHERE candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
    });
    for (let i = 0; i < req.body.courseName.length; i++) {
        con.query(`insert into Education_Details_v (candidate_id, course_name, passing_year, percentage) values(${req.params.id}, '${req.body.courseName[i]}', ${req.body.passingYear[i]}, ${req.body.percentage[i]})`, (err, result) => {
            if (err) throw err;
        });
    }
    for (let i = 0; i < req.body.fCompanyName.length; i++) {
        let sqlOne = `update Work_Experience_v 
	    Set company_name = '${req.body.fCompanyName[i]}', designation = '${req.body.fDesignation[i]}', start_from = '${req.body.fFrom[i]}', to_end = '${req.body.fTo[i]}'
	    where work_ex_id = ${req.body.fhidden[i]}`;
        
        con.query(sqlOne, (err, result) => {
            if (err) throw err;
        });
    }

    let sqlTwo = `update Language_Known_v
    set language_name = '${req.body.hin}', read_ = '${req.body.red || 'No'}', write_ = '${req.body.wri || 'No'}', speak = '${req.body.sp || 'No'}'
    where lang_id = ${req.body.hindihide}`;
    con.query(sqlTwo, (err, result) => {
        if (err) throw err;
    });

    let sqlThree = `update Language_Known_v
    set language_name = '${req.body.eng}', read_ = '${req.body.red1 || 'No'}', write_ = '${req.body.wri1 || 'No'}', speak = '${req.body.sp1 || 'No'}'
    where lang_id = ${req.body.enghide}`;
    con.query(sqlThree, (err, result) => {
        if (err) throw err;
    });

    let sqlFour = `update Language_Known_v
    set language_name = '${req.body.guj}', read_ = '${req.body.red2 || 'No'}', write_ = '${req.body.wri2 || 'No'}', speak = '${req.body.sp2 || 'No'}'
    where lang_id = ${req.body.gujhide}`;
    con.query(sqlFour, (err, result) => {
        if (err) throw err;
    });

    for (let i = 0; i < req.body.refName.length; i++) {
        let sqlOne = `update Referance_Contact_v 
	    Set ref_name = '${req.body.refName[i]}', phone = ${req.body.refNumber[i]}, relation = '${req.body.refRelation[i]}'
	    where ref_id = ${req.body.refhide[i]}`;
        
        con.query(sqlOne, (err, result) => {
            if (err) throw err;
        });
    }

    let sqlFive = `update preferance_v 
	    Set prefered_location = '${req.body.location}', notice_period_in_months = ${req.body.noticePeriod}, expected_ctc = ${req.body.expectedCTC}, current_ctc = ${req.body.currentCTC}, department = '${req.body.depart}'
	    where candidate_id = ${req.params.id}`;
        con.query(sqlFive, (err, result) => {
            if (err) throw err;
        });

    let sqlSix = `update Technologies_You_Know_v 
	    Set tech_name = '${req.body.php}', tech_ability = '${req.body.tech}'
	    where tyk_id = ${req.body.phphide}`;
        con.query(sqlSix, (err, result) => {
            if (err) throw err;
        });

    let sqlSeven = `update Technologies_You_Know_v 
	    Set tech_name = '${req.body.mysql}', tech_ability = '${req.body.tech}'
	    where tyk_id = ${req.body.mysqlhide}`;
        con.query(sqlSeven, (err, result) => {
            if (err) throw err;
        });

    let sqlEight = `update Technologies_You_Know_v 
	    Set tech_name = '${req.body.lara}', tech_ability = '${req.body.tech}'
	    where tyk_id = ${req.body.larahide}`;
        con.query(sqlEight, (err, result) => {
            if (err) throw err;
        });

        let sqlNine = `update Technologies_You_Know_v 
	    Set tech_name = '${req.body.ora}', tech_ability = '${req.body.tech}'
	    where tyk_id = ${req.body.orahide}`;
        con.query(sqlNine, (err, result) => {
            if (err) throw err;
        });

    res.send("Data Received!");
}

const formValidationInsert = (req, res) => {
    let sql = `insert into Basic_Detail_v (firstname, lastname, designation, email, phone, addressOne, addressTwo, city, gender, state, status, DOB, pin) values ('${req.body.firstname}', '${req.body.lastname}', '${req.body.designation}', '${req.body.email}', ${req.body.phone}, '${req.body.addressOne}', '${req.body.addressTwo}', '${req.body.city}', '${req.body.gender}', '${req.body.state}', '${req.body.status}', '${req.body.dob}', ${req.body.pin})`;
    con.query(sql, (err, result) => {
        if (err) throw err;

        var empPK = result.insertId;

        for (let i = 0; i < req.body.courseName.length; i++) {
            con.query(`insert into Education_Details_v (candidate_id, course_name, passing_year, percentage) values(${empPK}, '${req.body.courseName[i]}', ${req.body.passingYear[i]}, ${req.body.percentage[i]})`, (err, result) => {
                if (err) throw err;
            });
        }

        for (let i = 0; i < req.body.fCompanyName.length; i++) {
            if (!(req.body.fCompanyName[i]) == "") {
                con.query(`insert into Work_Experience_v (candidate_id, company_name, designation, start_from, to_end) values(${empPK}, '${req.body.fCompanyName[i]}', '${req.body.fDesignation[i]}', '${req.body.fFrom[i]}', '${req.body.fTo[i]}')`, (err, result) => {
                    if (err) throw err;
                });
            }
        }

        if (!(req.body.hin) == "") {
            con.query(`insert into Language_Known_v (candidate_id, language_name, speak, read_, write_) values(${empPK}, '${req.body.hin}', '${req.body.red || 'No'}', '${req.body.wri || 'No'}', '${req.body.sp || 'No'}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.eng) == "") {
            con.query(`insert into Language_Known_v (candidate_id, language_name, speak, read_, write_) values(${empPK}, '${req.body.eng}', '${req.body.red1 || 'No'}', '${req.body.wri1 || 'No'}', '${req.body.sp1 || 'No'}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.guj) == "") {
            con.query(`insert into Language_Known_v (candidate_id, language_name, speak, read_, write_) values(${empPK}, '${req.body.guj}', '${req.body.red2 || 'No'}', '${req.body.wri2 || 'No'}', '${req.body.sp2 || 'No'}')`, (err, result) => {
                if (err) throw err;
            });
        }

        for (let i = 0; i < req.body.refName.length; i++) {
            if (!(req.body.refNumber[i]) == "") {
                con.query(`insert into Referance_Contact_v (candidate_id, ref_name, phone, relation) values(${empPK}, '${req.body.refName[i]}', ${req.body.refNumber[i]}, '${req.body.refRelation[i]}')`, (err, result) => {
                    if (err) throw err;
                });
            }
        }

        con.query(`insert into preferance_v (candidate_id, prefered_location, notice_period_in_months, expected_ctc, current_ctc, department) values(${empPK}, '${req.body.location}', ${req.body.noticePeriod}, ${req.body.expectedCTC}, ${req.body.currentCTC}, '${req.body.depart}')`, (err, result) => {
            if (err) throw err;
        });

        if (!(req.body.php) == "") {
            con.query(`insert into Technologies_You_Know_v (candidate_id, tech_name, tech_ability) values(${empPK}, '${req.body.php}', '${req.body.tech}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.mysql) == "") {
            con.query(`insert into Technologies_You_Know_v (candidate_id, tech_name, tech_ability) values(${empPK}, '${req.body.mysql}', '${req.body.tech1}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.lara) == "") {
            con.query(`insert into Technologies_You_Know_v (candidate_id, tech_name, tech_ability) values(${empPK}, '${req.body.lara}', '${req.body.tech2}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.ora) == "") {
            con.query(`insert into Technologies_You_Know_v (candidate_id, tech_name, tech_ability) values(${empPK}, '${req.body.ora}', '${req.body.tech3}')`, (err, result) => {
                if (err) throw err;
            });
        }

        res.send('Data Received!');
    });
}

const fetchPosts = (req, res) => {
    res.render('fetch_posts');
}

const fetchShowMore = (req, res) => {
    const id = req.params.id;
    res.render('fetch_showMore', {id:id});
}

const stepForm = (req, res) => {
    var id = req.query.id;
    res.render('stepForm', { item: '', display: "none", id: id });
}

const state = (req, res) => {
    if (req.query.state_id == undefined) {
        con.query("select * from states", (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.send(result);
            }
        });
    } else {
        con.query(`select * from cities where state_id = ${req.query.state_id}`, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.send(result);
            }
        });
    }
}

const stepFormSubmit = (req, res) => {
    let sql = `insert into Basic_Detail_v (firstname, lastname, designation, email, phone, addressOne, addressTwo, city, gender, state, status, DOB, pin) values ('${req.body.firstname}', '${req.body.lastname}', '${req.body.designation}', '${req.body.email}', ${req.body.phone}, '${req.body.addressOne}', '${req.body.addressTwo}', '${req.body.city}', '${req.body.gender}', '${req.body.state}', '${req.body.status}', '${req.body.dob}', ${req.body.pin})`;
    con.query(sql, (err, result) => {
        if (err) throw err;

        var empPK = result.insertId;

        for (let i = 0; i < req.body.courseName.length; i++) {
            con.query(`insert into Education_Details_v (candidate_id, course_name, passing_year, percentage) values(${empPK}, '${req.body.courseName[i]}', ${req.body.passingYear[i]}, ${req.body.percentage[i]})`, (err, result) => {
                if (err) throw err;
            });
        }

        for (let i = 0; i < req.body.fCompanyName.length; i++) {
            if (!(req.body.fCompanyName[i]) == "") {
                con.query(`insert into Work_Experience_v (candidate_id, company_name, designation, start_from, to_end) values(${empPK}, '${req.body.fCompanyName[i]}', '${req.body.fDesignation[i]}', '${req.body.fFrom[i]}', '${req.body.fTo[i]}')`, (err, result) => {
                    if (err) throw err;
                });
            }
        }

        if (!(req.body.hin) == "") {
            con.query(`insert into Language_Known_v (candidate_id, language_name, speak, read_, write_) values(${empPK}, '${req.body.hin}', '${req.body.red || 'No'}', '${req.body.wri || 'No'}', '${req.body.sp || 'No'}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.eng) == "") {
            con.query(`insert into Language_Known_v (candidate_id, language_name, speak, read_, write_) values(${empPK}, '${req.body.eng}', '${req.body.red1 || 'No'}', '${req.body.wri1 || 'No'}', '${req.body.sp1 || 'No'}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.guj) == "") {
            con.query(`insert into Language_Known_v (candidate_id, language_name, speak, read_, write_) values(${empPK}, '${req.body.guj}', '${req.body.red2 || 'No'}', '${req.body.wri2 || 'No'}', '${req.body.sp2 || 'No'}')`, (err, result) => {
                if (err) throw err;
            });
        }

        for (let i = 0; i < req.body.refName.length; i++) {
            if (!(req.body.refNumber[i]) == "") {
                con.query(`insert into Referance_Contact_v (candidate_id, ref_name, phone, relation) values(${empPK}, '${req.body.refName[i]}', ${req.body.refNumber[i]}, '${req.body.refRelation[i]}')`, (err, result) => {
                    if (err) throw err;
                });
            }
        }

        con.query(`insert into preferance_v (candidate_id, prefered_location, notice_period_in_months, expected_ctc, current_ctc, department) values(${empPK}, '${req.body.location}', ${req.body.noticePeriod}, ${req.body.expectedCTC}, ${req.body.currentCTC}, '${req.body.depart}')`, (err, result) => {
            if (err) throw err;
        });

        if (!(req.body.php) == "") {
            con.query(`insert into Technologies_You_Know_v (candidate_id, tech_name, tech_ability) values(${empPK}, '${req.body.php}', '${req.body.tech}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.mysql) == "") {
            con.query(`insert into Technologies_You_Know_v (candidate_id, tech_name, tech_ability) values(${empPK}, '${req.body.mysql}', '${req.body.tech1}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.lara) == "") {
            con.query(`insert into Technologies_You_Know_v (candidate_id, tech_name, tech_ability) values(${empPK}, '${req.body.lara}', '${req.body.tech2}')`, (err, result) => {
                if (err) throw err;
            });
        }

        if (!(req.body.ora) == "") {
            con.query(`insert into Technologies_You_Know_v (candidate_id, tech_name, tech_ability) values(${empPK}, '${req.body.ora}', '${req.body.tech3}')`, (err, result) => {
                if (err) throw err;
            });
        }

        res.send('Data Inserted!');
        // res.redirect('/');
    });
}

const getDataStepForm = (req, res) => {
    var id = req.params.id;
    var allData = {};
    const sql = `select * from Basic_Detail_v where candidate_id = ${req.params.id}`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        allData.Basic_Detail_v = result;
    });

    con.query(`select * from Education_Details_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Education_Details_v = result;
        }
    });

    con.query(`select * from Work_Experience_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Work_Experience_v = result;
        }
    });

    con.query(`select * from Language_Known_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Language_Known_v = result;
        }
    });

    con.query(`select * from Referance_Contact_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Referance_Contact_v = result;
        }
    });

    con.query(`select * from preferance_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.preferance_v = result;
        }
    });

    con.query(`select * from Technologies_You_Know_v where candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            // allData.push(result[i]);
            allData.Technologies_You_Know_v = result;
        }
        res.render('stepForm', { item: allData, display: "show", id: id });
    });
}

const updateStepForm = (req, res) => {
    let sql = `update Basic_Detail_v 
	Set firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', designation = '${req.body.designation}', email = '${req.body.email}', phone = ${req.body.phone}, addressOne = '${req.body.addressOne}', addressTwo = '${req.body.addressTwo}', city = '${req.body.city}', gender = '${req.body.gender}', state = '${req.body.state}', status = '${req.body.status}', DOB = '${req.body.dob}', pin = ${req.body.pin}
	where candidate_id = ${req.params.id}`;
    con.query(sql, (err, result) => {
        if (err) throw err;
    });


    con.query(`DELETE FROM Education_Details_v WHERE candidate_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
    });
    for (let i = 0; i < req.body.courseName.length; i++) {
        con.query(`insert into Education_Details_v (candidate_id, course_name, passing_year, percentage) values(${req.params.id}, '${req.body.courseName[i]}', ${req.body.passingYear[i]}, ${req.body.percentage[i]})`, (err, result) => {
            if (err) throw err;
        });
    }
    for (let i = 0; i < req.body.fCompanyName.length; i++) {
        let sqlOne = `update Work_Experience_v 
	    Set company_name = '${req.body.fCompanyName[i]}', designation = '${req.body.fDesignation[i]}', start_from = '${req.body.fFrom[i]}', to_end = '${req.body.fTo[i]}' where work_ex_id = ${req.body.fhidden[i]}`;

        con.query(sqlOne, (err, result) => {
            if (err) throw err;
        });
    }

    let sqlTwo = `update Language_Known_v
    set language_name = '${req.body.hin}', read_ = '${req.body.red || 'No'}', write_ = '${req.body.wri || 'No'}', speak = '${req.body.sp || 'No'}'
    where lang_id = ${req.body.hindihide}`;
    con.query(sqlTwo, (err, result) => {
        if (err) throw err;
    });

    let sqlThree = `update Language_Known_v
    set language_name = '${req.body.eng}', read_ = '${req.body.red1 || 'No'}', write_ = '${req.body.wri1 || 'No'}', speak = '${req.body.sp1 || 'No'}'
    where lang_id = ${req.body.enghide}`;
    con.query(sqlThree, (err, result) => {
        if (err) throw err;
    });

    let sqlFour = `update Language_Known_v
    set language_name = '${req.body.guj}', read_ = '${req.body.red2 || 'No'}', write_ = '${req.body.wri2 || 'No'}', speak = '${req.body.sp2 || 'No'}'
    where lang_id = ${req.body.gujhide}`;
    con.query(sqlFour, (err, result) => {
        if (err) throw err;
    });

    for (let i = 0; i < req.body.refName.length; i++) {
        let sqlOne = `update Referance_Contact_v 
	    Set ref_name = '${req.body.refName[i]}', phone = ${req.body.refNumber[i]}, relation = '${req.body.refRelation[i]}'
	    where ref_id = ${req.body.refhide[i]}`;

        con.query(sqlOne, (err, result) => {
            if (err) throw err;
        });
    }

    let sqlFive = `update preferance_v 
	    Set prefered_location = '${req.body.location}', notice_period_in_months = ${req.body.noticePeriod}, expected_ctc = ${req.body.expectedCTC}, current_ctc = ${req.body.currentCTC}, department = '${req.body.depart}'
	    where candidate_id = ${req.params.id}`;
    con.query(sqlFive, (err, result) => {
        if (err) throw err;
    });

    let sqlSix = `update Technologies_You_Know_v 
	    Set tech_name = '${req.body.php}', tech_ability = '${req.body.tech}'
	    where tyk_id = ${req.body.phphide}`;
    con.query(sqlSix, (err, result) => {
        if (err) throw err;
    });

    let sqlSeven = `update Technologies_You_Know_v 
	    Set tech_name = '${req.body.mysql}', tech_ability = '${req.body.tech}'
	    where tyk_id = ${req.body.mysqlhide}`;
    con.query(sqlSeven, (err, result) => {
        if (err) throw err;
    });

    let sqlEight = `update Technologies_You_Know_v 
	    Set tech_name = '${req.body.lara}', tech_ability = '${req.body.tech}'
	    where tyk_id = ${req.body.larahide}`;
    con.query(sqlEight, (err, result) => {
        if (err) throw err;
    });

    let sqlNine = `update Technologies_You_Know_v 
	    Set tech_name = '${req.body.ora}', tech_ability = '${req.body.tech}'
	    where tyk_id = ${req.body.orahide}`;
    console.log(sqlNine);
    con.query(sqlNine, (err, result) => {
        if (err) throw err;
    });

    res.send("Data Update!");
}

const timeConverter = (req, res) => {
    res.render('timeConverter');
}

const registrationForm = (req, res) => {
    res.render('registrationForm');
}

const registrationFormSubmit = (req, res) => {
    return new Promise((resolve, reject) => {

        let mail = `select count(email) as email from registration_table where email = '${req.body.email}'`;
        con.query(mail, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            if (result[0].email == 1) {
                res.send('You are already Registered!');
                // console.log('You are already !');
            }
            else {
                let sql = `insert into registration_table (firstname, lastname, email, phone, gender, dob, status) values('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${req.body.phone}', '${req.body.gender}', '${req.body.dob}', 'Inactive')`;
                // let result = await con.query(sql);

                con.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    // resolve(result);
                    return resolve(result);
                });

            }
            return resolve(result);
            // console.log('abab',result[0].email);
            // resolve(result);

        });
    });
}

const activated = (req, res) => {
    return new Promise((resolve, reject) => {
        var dateDifference;

        let select = `select createdtime from registration_table where email = '${req.query.email}'`;
        con.query(select, (err, result) => {
            if (err) {
                throw err
            }
            generatedTime = result[0].createdtime;
            dateDifference = new Date - new Date(generatedTime);
            // console.log('Generated Time', generatedTime);
            // console.log('Current Time', dateDifference);
            if (dateDifference < 10000) {
                res.render('password');
            } else {
                res.render('expire');
            }
            return resolve(result);
        });

        let upd = `update registration_table set createdtime = current_timestamp(6) where email = '${req.query.email}'`;
        con.query(upd, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });

        // var user_timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    });
}

const passwordSubmit = (req, res) => {
    return new Promise((resolve, reject) => {
        let password = req.body.createpass;
        // console.log(password);
        let salt = randomize('Aa0!', 4);
        // console.log("Salt: ",salt);
        let combo = password + salt;
        // console.log('Combo', combo);
        let token = md5(combo);
        // console.log('Token',token);

        let sql = `update registration_table 
        set status = 'active', createpass = '${req.body.createpass}', confirmpass = '${req.body.confirmpass}',  token = '${token}'
        where email='${req.query.email}'`;
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            // resolve(result);
            return resolve(result);

        });
    });
}

const login = (req, res) => {
    res.render('login');
}

const homePagePost = (req, res) => {
    return new Promise((resolve, reject) => {
        let mail = `select count(email) as email from registration_table where email = '${req.body.email}'`;
        con.query(mail, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            // console.log("check for email: ", result[0].email);
            if (result[0].email == 1) {
                let pass = `select id, createpass from registration_table where email = '${req.body.email}';`;
                con.query(pass, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    // console.log("check for pass: ", result[0]);
                    // console.log(result[0].createpass == req.body.pass);
                    // console.log('get from browser', req.body.pass);

                    // console.log('shivam', (result[0].createpass == req.body.pass) == true);

                    if ((result[0].createpass == req.body.pass) == true) {
                        console.log(":sdoivbisdvvsdivvds");
                        jwt.sign({ id: result[0].id }, 'secretKey', { expiresIn: '300s' }, (err, token) => {

                            res.cookie('token', token).send('Cookie-Parser');
                            // res.send({ flag: true, token: token });
                        });
                    }
                    else {
                        res.send({ flag: false, msg: 'Your Email and Password do not match!' });
                    }
                });
            }
            else {
                res.send({ flag: false, msg: 'Your Email and Password do not match! last' });
            }
            return resolve(result);
        });
    });
}

const homePageGet = (req, res) => {
    jwt.verify(req.cookies.token, 'secretKey', (err, authData) => {
        if(err) {
            res.send({result: "Invalid token"});
        } else {
            console.log(authData);
            if(authData.id !== 0) {
                res.render('allInOne');
            }
            else {
                res.send("Invalid token");
            }
        }
    });
}

const forgot = (req, res) => {
    res.render('forgot');
}

const email = (req, res) => {
    return new Promise((resolve, reject) => {

        let upd = `update registration_table set createdtime = current_timestamp(6) where email = '${req.query.email}'`;
        con.query(upd, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            res.render('password');
            return resolve(result);
        });
        // var user_timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    });
}

const expire = (req, res) => {
    res.render('expire');
}

const regenerated = (req, res) => {
    return new Promise((resolve, reject) => {
        var dateDifference;

        let upd = `update registration_table set createdtime = current_timestamp(6) where email = '${req.query.email}'`;
        con.query(upd, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(result);
        });

        let select = `select createdtime from registration_table where email = '${req.query.email}'`;
        con.query(select, (err, result) => {
            if (err) {
                throw err
            }
            generatedTime = result[0].createdtime;
            dateDifference = new Date - new Date(generatedTime);
            // console.log('Generated Time', generatedTime);
            // console.log('Current Time', dateDifference);
            if (dateDifference < 10000) {
                res.render('password');
            } else {
                res.render('expire');
            }
            return resolve(result);
        });
        // var user_timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    });
}

const authentication = (req, res, next) => {
    var token = req.cookies.token;

    if(typeof token === 'undefined') {
        res.redirect('/login');
    } else {
        jwt.verify(req.cookies.token, 'secretKey', (err, authData) => {
            if(err) {
                // res.send({result: "Invalid token"});
                res.redirect('/login');
            } else {
                console.log(authData);
                if(authData.id !== 0) {
                    // res.render('allInOne');
                    next();
                }
                else {
                    res.redirect('/login');
                }
            }
        }); 
    }
}

const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
}

module.exports = {homePage, dynamicTable, kukuCube, ticTacToe, allEvents, pagination, attendance_report, result_table, one_std_result, rglr_search, get_data_rglr_search, filter, searchById, getSearchedDataById, searchByIdShowMore, searchbyANDOR, delimiterSearch, delimiterSearchResult, formValidation, formValidationUpdate, formValidationUpdateData, formValidationInsert, fetchPosts, fetchShowMore, stepForm, state, stepFormSubmit, getDataStepForm, updateStepForm, timeConverter, registrationForm, registrationFormSubmit, activated, passwordSubmit, login, homePagePost, homePageGet, forgot, email, expire, regenerated, authentication, logout}