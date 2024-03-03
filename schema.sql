DROP TABLE IF EXISTS students,halls, orgs, events,ext_part, part,admininfo, event_organizers, event_parts, event_volunteers, event_winners CASCADE;


-- create table colleges(
--     collegeid int,
--     name varchar(255),
--     location varchar(255),
--     primary key (collegeid)
-- );

-- create table halls(
--     hid int,
--     name varchar(255),
--     primary key (hid)
-- );

-- create table students(
--     roll varchar(10),
--     name varchar(255),
--     department varchar(255),
--     hid int,
--     password varchar(255),
--     primary key(roll),
--     foreign key (hid) references halls(hid)
-- );

-- create table participants(
--     pid int,
--     name varchar(255),
--     collegeid int,
--     hid int,
--     password varchar(255),
--     primary key(pid),
--     foreign key (collegeid) references colleges(collegeid),
--     foreign key (hid) references halls(hid)
-- );

-- create table organizers(
--     oid int,
--     name varchar(255),
--     password varchar(255),
--     primary key(oid)
-- );

-- create table adm(
--     adminid int,
--     name varchar(255),
--     password varchar(255),
--     primary key(adminid)
-- );

-- create table events(
--     eventid int,
--     ename varchar(255),
--     dateofevent date,
--     description text,
--     primary key(eventid)
-- );

-- create table event_participants(
--     eventid int,
--     pid int,
--     primary key (eventid, pid),
--     foreign key (eventid) references events(eventid),
--     foreign key (pid) references participants(pid)
-- );

-- create table event_volunteers(
--     eventid int,
--     roll varchar(10),
--     primary key (eventid, roll),
--     foreign key (eventid) references events(eventid),
--     foreign key (roll) references students(roll)
-- );

-- create table event_organizers(
--     eventid int,
--     oid int,
--     primary key (eventid, oid),
--     foreign key (eventid) references events(eventid),
--     foreign key (oid) references organizers(oid)
-- );

-- create table event_winners(
--     eventid int,
--     pid int,
--     position int,
--     primary key (eventid, pid),
--     foreign key (eventid) references events(eventid),
--     foreign key (pid) references participants(pid)
-- );

-- create table student_participants(
--     roll varchar(10),
--     pid int,
--     primary key (roll, pid),
--     foreign key (roll) references students(roll),
--     foreign key (pid) references participants(pid)
-- );

-- --colleges
-- insert into colleges values (1, 'IITKGP', 'kharagpur');

-- --halls
-- insert into halls values (1, 'LBS');
-- insert into halls values (2, 'MMM');
-- insert into halls values (3, 'LLR');
-- insert into halls values (4, 'MT');
-- insert into halls values (5, 'SNIG');
-- insert into halls values (6, 'NEHRU');
-- insert into halls values (7, 'RP');

-- -- adm
-- insert into adm values (1, 'admin1', 'password');

-- -- events
-- insert into events values (1, 'codathon', '2024-03-01', 'coding event'),
-- (2, 'edm', '2024-03-01', 'dance'),
-- (3, 'anime-quiz', '2024-03-01', 'quiz'),
-- (4, 'debate', '2024-03-01',  'debate'),
-- (5, 'techexpo', '2024-03-01',  'tech event');


-- --students
-- insert into students values ('21CS10060', 'pavan', 'CSE', 1, '21CS10060'),
-- ('21CS10040', 'nihith', 'CSE', 2, '21CS10040'),
-- ('21CS10020', 'anjaneya', 'CSE', 2, '21CS10020'),
-- ('21CS10052', 'shekar', 'CSE', 6, '21CS10052'),
-- ('21CS10050', 'mokshith', 'CSE', 7, '21CS10050'),
-- ('21CS10042', 'harshith', 'CSE', 2, '21CS10042');



-- CREATE FUNCTION insert_participants_function() RETURNS TRIGGER AS $$
-- BEGIN
--     INSERT INTO part (id, name) VALUES (NEW.id, NEW.name);
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER insert_participants
-- AFTER INSERT ON ext_part
-- FOR EACH ROW
-- EXECUTE FUNCTION insert_participants_function();


-- create table org(
-- 	id int,
-- 	name varchar(255),
-- 	email varchar(255),
-- 	password varchar(255),
-- 	primary key(id)
-- );
-- create table event_org(
-- 	eventid int,
-- 	id int,
-- 	primary key(eventid, id),
-- 	foreign key (id) references org(id) on delete cascade
-- );
-- insert into org values (2, 'or1', 'org1@g', 'or1');
-- insert into event_org values (1, 2);



-- create table event_participants(
--     eventid int,
--     id int,
--     primary key (eventid, id),
--     foreign key (id) references part(id) on delete cascade
-- );
-- create table event_winners(
--     eventid int,
--     id int,
--     position int,
--     primary key (eventid, id),
--     foreign key (id) references part(id) on delete cascade
-- );

-- create table accomodation(
-- 	id int,
-- 	hall varchar(255),
-- 	food varchar(255)
-- );



--New schema


create table halls(
	name varchar(255),
	primary key(name)
);

create table students(
	id int,
	roll varchar(255),
	name varchar(255),
	email varchar(255),
	password varchar(255),
	hall varchar(255),
	primary key (id)
);
create table orgs(
	id int,
	name varchar(255),
	email varchar(255),
	password varchar(255),
	primary key (id),
	approved int default 0
);
create table ext_part(
	id int,
	name varchar(255),
	email varchar(255),
	password varchar(255),
	college varchar(255),
	primary key(id)
);
create table accomodation(
	id int,
	hall varchar(255),
	food varchar(255),
	primary key(id),
	foreign key (id) references ext_part(id) on delete cascade
);
create table part(
	id int,
	name varchar(255),
	primary key (id)
);
create table events(
	id int,
	name varchar(255),
	dateofevent date,
	location varchar(255),
	description text,
	primary key (id)
);
create table event_volunteers(
	eventid int,
	studentid int,
	primary key(eventid, studentid),
	foreign key(eventid) references events(id) on delete cascade,
	foreign key(studentid) references students(id) on delete cascade
);
create table event_orgs(
	eventid int,
	orgid int,
	primary key(eventid, orgid),
	foreign key(eventid) references events(id) on delete cascade,
	foreign key(orgid) references orgs(id) on delete cascade
);
create table event_winners(
	eventid int,
	pid int,
	position int,
	primary key(eventid, pid),
	foreign key(eventid) references events(id) on delete cascade,
	foreign key(pid) references part(id) on delete cascade
);
create table event_parts(
	eventid int,
	pid int,
	primary key(eventid, pid),
	foreign key(eventid) references events(id) on delete cascade,
	foreign key(pid) references part(id) on delete cascade
);

create table admininfo(
    id int,
    name varchar(255),
	email varchar(255),
    password varchar(255),
    primary key(id)
);


-- triggers
-- insertion into ext_part should make a insertion into part table
CREATE FUNCTION insert_participants_function() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO part (id, name) VALUES (NEW.id, NEW.name);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_participants_from_ext_part
AFTER INSERT ON ext_part
FOR EACH ROW
EXECUTE FUNCTION insert_participants_function();

-- insertion into students should make a insertion into part table
CREATE TRIGGER insert_participants_from_students
AFTER INSERT ON students
FOR EACH ROW
EXECUTE FUNCTION insert_participants_function();

-- deleting the ext_part should delete the corresponding row from part table
CREATE FUNCTION delete_participants_function() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM part WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_participants_of_ext_part
AFTER DELETE ON ext_part
FOR EACH ROW
EXECUTE FUNCTION delete_participants_function();

-- deleting the students should delete the corresponding row from part table
CREATE TRIGGER delete_participants_of_students
AFTER DELETE ON students
FOR EACH ROW
EXECUTE FUNCTION delete_participants_function();



-- inserting data 
-- halls
insert into halls values ('LBS'),
('MMM'),
('RP'),
('NEHRU'),
('LLR');

insert into students values (1, '21CS10060','pavan', 'pavan@gmail.com', 'pavan', 'LBS'),
(2, '21CS10020','anjaneya', 'anji@gmail.com', 'anjaneya', 'MMM'),
(3, '21CS10052','shekar', 'shekar@gmail.com', 'shekar', 'NEHRU'),
(4, '21CS10040','nihith', 'nihith@gmail.com', 'nihith', 'MMM'),
(5, '21CS10050','mokshith', 'moki@gmail.com', 'moki', 'RP');

insert into events values (1, 'codathon', '2024-03-01','CIC', 'coding event'),
(2, 'edm', '2024-03-01','MG grounds', 'dance'),
(3, 'anime-quiz', '2024-03-01','vikramshila', 'quiz'),
(4, 'debate', '2024-03-01', 'nalanda', 'debate'),
(5, 'techexpo', '2024-03-01', 'arena', 'tech event');

insert into admininfo values (1, 'admin', 'admin@gmail.com', 'admin');

