const con = require('../../database');

const stepForm = (req, res) => {
  let id = req.query.id;
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

    let empPK = result.insertId;

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
  });
}

const getDataStepForm = (req, res) => {
  let id = req.params.id;
  let allData = {};
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
  con.query(sqlNine, (err, result) => {
    if (err) throw err;
  });

  res.send("Data Update!");
}

module.exports = { stepForm, state, stepFormSubmit, getDataStepForm, updateStepForm }