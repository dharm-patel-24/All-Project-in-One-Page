create database registration_form;
use registration_form;

select * from registration_table;

select count(email) as email from registration_table where email = 'dharm1@gmail.com';
select count(createpass) as createpass from registration_table where email = 'dharm1@gmail.com';

create table registration_table (
id int auto_increment primary key,
firstname varchar(50),
lastname varchar(50),
email varchar(50),
phone varchar(50),
gender varchar(50),
dob varchar(50),
status varchar(50),
createpass varchar(50),
confirmpass varchar(50),
token varchar(150),
createdtime timestamp(6) not null default current_timestamp(6) on update current_timestamp(6)
);

-- create table registration_table (
-- id int auto_increment primary key,
-- firstname varchar(50),
-- lastname varchar(50),
-- email varchar(50),
-- phone varchar(50),
-- gender varchar(50),
-- dob varchar(50),
-- status varchar(50),
-- createdtime timestamp(6) not null default current_timestamp(6) on update current_timestamp(6)
-- );
select createdtime from registration_table where email = 'dharm27@gmail.com';

DELETE FROM registration_table WHERE id BETWEEN 18 AND 21;

select email from registration_table;