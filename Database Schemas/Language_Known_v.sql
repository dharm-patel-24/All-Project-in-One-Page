use validation;

create table Language_Known_v(
lang_id int primary key auto_increment,
candidate_id int,
language_name varchar(35),
read_ varchar(35) DEFAULT 'No',
write_ varchar(35) DEFAULT 'No',
speak varchar(35) DEFAULT 'No',
FOREIGN KEY (candidate_id) REFERENCES Basic_Detail_v (candidate_id)
);

select * from Language_Known_v;
select * from Language_Known_v where candidate_id=129;

update Language_Known_v
set language_name = 'hindi', speak = 'No', read_ = 'No', write_ = 'No'
where lang_id = 31;