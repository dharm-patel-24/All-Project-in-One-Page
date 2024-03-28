use validation;

create table Work_Experience_v(
work_ex_id int primary key auto_increment,
candidate_id int,
company_name varchar(50),
designation varchar(50),
start_from varchar(20),
to_end varchar(20),
FOREIGN KEY (candidate_id) REFERENCES Basic_Detail_v(candidate_id)
);

select * from Work_Experience_v;