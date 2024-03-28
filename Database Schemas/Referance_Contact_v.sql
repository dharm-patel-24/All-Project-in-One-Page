use validation;

create table Referance_Contact_v(
ref_id int primary key auto_increment,
candidate_id int,
ref_name varchar(35),
phone int,
relation varchar(30),
FOREIGN KEY (candidate_id) REFERENCES Basic_Detail_v(candidate_id)
);

select * from Referance_Contact_v;