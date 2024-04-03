const con = require('../../database');

const pagination = (req, res) => {
  let orderBy = req.query.orderBy || 'std_id'
  let page = req.query.page;
  if (page == undefined) {
    page = 1;
  }
  const recordPP = 200;
  const offset = (page - 1) * recordPP;

  //To get total number of record
  const countrows = 'select count(*) as total from Student_Master_26';

  try {
    con.query(countrows, (err, countResult) => {
      if (err) throw err;
      const totalRecords = countResult[0].total;
      const totalPages = Math.ceil(totalRecords / recordPP);

      //To get the records for the current page
      const sql = `select * from Student_Master_26 order by ${orderBy} limit ${offset}, ${recordPP}`;
      con.query(sql, (err, result) => {
        if (err) throw err;
        res.render('pagination_table', { data: result, currentPage: page, totalPages: totalPages, orderBy: orderBy });
      });
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = pagination;