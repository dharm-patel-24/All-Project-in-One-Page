use db_27_2;

create table Subject_Master_27(
sub_id int,
subName varchar(15),
PRIMARY KEY (sub_id)
);

select * from Subject_Master_27;

insert into Subject_Master_27(sub_id, subName)
values(1, 'PPS'),
(2, 'BEE'),
(3, 'EGD'),
(4, 'Maths-1'),
(5, 'BME'),
(6, 'Physics');