use validation;

create table Education_Details_v(
edu_id int primary key auto_increment,
candidate_id int,
course_name varchar(50),
passing_year int,
percentage float,
FOREIGN KEY (candidate_id) REFERENCES Basic_Detail_v (candidate_id)
);

select * from Education_Details_v;

select * from Education_Details_v where candidate_id = 11;

update Education_Details_v 
        set course_name = 'MSC', passing_year = 2024, percentage = 85.33
        where edu_id = 1;

DELETE FROM Education_Details_v WHERE candidate_id = 1;

insert into Education_Details_v (candidate_id, course_name, passing_year, percentage)
values(2, 'SSC', 2018, 85.33);
insert into Education_Details_v (candidate_id, course_name, passing_year, percentage)
values(2, 'SSC', 2020, 84.33);
insert into Education_Details_v (candidate_id, course_name, passing_year, percentage)
values(2, 'SSC', 2024, 80.33);
insert into Education_Details_v (candidate_id, course_name, passing_year, percentage)
values(2, 'SSC', 2026, 95.33);