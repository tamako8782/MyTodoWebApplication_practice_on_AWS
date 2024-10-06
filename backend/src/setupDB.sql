create table if not exists task ( 
task_id integer unsigned auto_increment primary key, 
title varchar(100) not null,
contents text not null,
task_state text not null,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


insert into task (title, contents,task_state, created_at) values 

    ('firstTask', 'This is my first task@mysql',"InComplete", now());

insert into task (title, contents,task_state, created_at) values 

    ('SecondTask', 'This is my second task',"Finished", now());

insert into task (title, contents,task_state, created_at) values 

    ('ThirdTask', 'This is my third task',"NotDoTask", now());