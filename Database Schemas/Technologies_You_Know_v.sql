use validation;

create table Technologies_You_Know_v(
tyk_id int primary key auto_increment,
candidate_id int,
tech_name varchar(50),
tech_ability varchar(50),
FOREIGN KEY (candidate_id) REFERENCES Basic_Detail_v(candidate_id)
);

select * from Technologies_You_Know_v;