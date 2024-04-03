const con = require('../../database');

const rglr_search = (req, res) => {
  res.render('rglr_search_table', { display: "no" });
}

const get_data_rglr_search = (req, res) => {
  var query;
  var queryss;
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

  con.query(queryss, (err, countResult) => {

    if (err) {
      res.end("<h3><center>Wrong Query</center></h3>");
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

module.exports = { rglr_search, get_data_rglr_search }