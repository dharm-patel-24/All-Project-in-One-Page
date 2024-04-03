const con = require('../../database');

const attendance_report = (req, res) => {
  let page = req.query.page;
  if (page == undefined) {
    page = 1;
  }
  const recordPP = 20;
  const offset = (page - 1) * recordPP;

  //To get total number of record
  const countrows = 'select count(*) as total from Student_Master_27';

  con.query(countrows, (err, countResult) => {
    if (err) throw err;
    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / recordPP);

    let month = Number(req.query.month) || 12;

    const sql = `select Student_Master_27.std_id, first_name, count(attendance) as Present_In_Dec, round(count(Student_Master_27.std_id) / 0.31, 2) as Percentage 
      from Student_Master_27 
      inner join Attendance_Master_27 
      on Student_Master_27.std_id = Attendance_Master_27.std_id 
      where attendance = '1' and MONTH(Attendance_Master_27.date_of_att)=${month} group by std_id order by std_id limit ${offset}, ${recordPP}`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.render('attendance_report_table', { data: result, month: month, currentPage: page, totalPages: totalPages, });
    });

  });
}

module.exports = attendance_report;