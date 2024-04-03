const con = require('../../database');

const delimiterSearch = (req, res) => {
  var query = req.body.str;
  res.render('delimiter_search', { display: "no", query: query });
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
  con.query(sql, (err, result) => {
    res.render('delimiter_search', { data: result, display: "show", query: query });
  });
}

module.exports = { delimiterSearch, delimiterSearchResult }