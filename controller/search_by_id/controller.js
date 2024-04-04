const con = require('../../database');

const searchById = (req, res) => {
  res.render('search_id_OR_table', { display: "no" });
}

const getSearchedDataById = (req, res) => {
  let query = req.body.str;

  const sql = `select * from Student_Master_26 where std_id in (${query})`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.render('search_id_OR_table', { data: result, display: "show" });
  });
}

const searchByIdShowMore = (req, res) => {
  res.render('search_id_OR_showMore', { display: "no" });
}

const searchbyANDOR = (req, res) => {
  let last_name = req.body.last_name;
  let city = req.body.city;
  let stream = req.body.stream;
  let age = req.body.age;
  let gender = req.body.gender;
  let operation = req.body.operation;

  const sql = `select * from Student_Master_26 where last_name like '${last_name}%' ${operation} city like '${city}%' ${operation} stream like '${stream}%' ${operation} age like '${age}%' ${operation} gender like '${gender}%'`;
  con.query(sql, [city, stream, age, gender], (err, result) => {
    if (err) throw err;
    res.render('search_id_OR_showMore', { data: result, display: "show" });
  });
}

module.exports = { searchById, getSearchedDataById, searchByIdShowMore, searchbyANDOR }