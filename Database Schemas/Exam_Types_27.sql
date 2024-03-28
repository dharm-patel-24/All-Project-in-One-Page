use db_27_2;

create table Exam_Types_27(
examId int,
examName varchar(20),
primary key(examId));

select * from Exam_Types_27;

insert into Exam_Types_27 (examId, examName)
values(1, 'Terminal'),
(2, 'Prelim'),
(3, 'Final');