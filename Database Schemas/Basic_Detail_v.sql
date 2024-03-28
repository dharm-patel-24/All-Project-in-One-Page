create database validation;

use validation;

create table Basic_Detail_v
(
candidate_id int auto_increment primary key,
firstname varchar(15),
lastname varchar(15),
designation varchar(35),
email varchar(30),
phone int,
addressOne varchar(20),
addressTwo varchar(20),
city varchar(15),
gender varchar(20),
state varchar (15),
status varchar(15) constraint check_relation check (status = 'single'or status = 'married'),
DOB varchar(20),
pin int
);

select * from Basic_Detail_v;