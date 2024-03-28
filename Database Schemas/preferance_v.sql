use validation;

create table preferance_v(
pref_id int primary key auto_increment,
candidate_id int,
prefered_location varchar(50),
notice_period_in_months int, 
expected_ctc int,
current_ctc int,
department varchar(50),
FOREIGN KEY (candidate_id) REFERENCES Basic_Detail_v(candidate_id)
);

select * from preferance_v;
update preferance_v 
            Set prefered_location = 'ontario', notice_period_in_months = 3, expected_ctc = 600000, current_ctc = 500000, department = 'development'
            where candidate_id = 11