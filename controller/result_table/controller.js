const con = require('../../database');

const result_table = (req, res) => {
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
      if (err) throw err;
      res.render('result_table', { data: result, currentPage: page, totalPages: totalPages });
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
    if (err) throw err;
    res.render('one_std_result_table', { data: result, name: name, id: id });
  });
}

module.exports = { result_table, one_std_result }