DROP TABLE IF EXISTS students, colleges,halls, participants, events,organizers, adm, eventorganizers, eventparticipants, eventvolunteers, eventwinners,student_participants CASCADE;


create table colleges(
    collegeid int,
    name varchar(255),
    location varchar(255),
    primary key (collegeid)
);

create table halls(
    hid int,
    name varchar(255),
    primary key (hid)
);

create table students(
    roll varchar(10),
    name varchar(255),
    department varchar(255),
    hid int,
    password varchar(255),
    primary key(roll),
    foreign key (hid) references halls(hid)
);

create table participants(
    pid int,
    name varchar(255),
    collegeid int,
    hid int,
    password varchar(255),
    primary key(pid),
    foreign key (collegeid) references colleges(collegeid),
    foreign key (hid) references halls(hid)
);

create table organizers(
    oid int,
    name varchar(255),
    password varchar(255),
    primary key(oid)
);

create table adm(
    adminid int,
    name varchar(255),
    password varchar(255),
    primary key(adminid)
);

create table events(
    eventid int,
    ename varchar(255),
    dateofevent date,
    description text,
    primary key(eventid)
);

create table event_participants(
    eventid int,
    pid int,
    foreign key (eventid) references events(eventid),
    foreign key (pid) references participants(pid)
);

create table event_volunteers(
    eventid int,
    roll varchar(10),
    foreign key (eventid) references events(eventid),
    foreign key (roll) references students(roll)
);

create table event_organizers(
    eventid int,
    oid int,
    foreign key (eventid) references events(eventid),
    foreign key (oid) references organizers(oid)
);

create table event_winners(
    eventid int,
    pid int,
    position int,
    foreign key (eventid) references events(eventid),
    foreign key (pid) references participants(pid)
);

create table student_participants(
    roll varchar(10),
    pid int,
    foreign key (roll) references students(roll),
    foreign key (pid) references participants(pid)
);

--colleges
insert into colleges values (1, 'IITKGP', 'kharagpur');

--halls
insert into halls values (1, 'LBS');
insert into halls values (2, 'MMM');
insert into halls values (3, 'LLR');
insert into halls values (4, 'MT');
insert into halls values (5, 'SNIG');

-- adm
insert into adm values (1, 'admin1', 'password');

-- events
insert into events values (1, 'codathon', '2024-03-01', 'coding event'),
(2, 'edm', '2024-03-01', 'dance'),
(3, 'anime-quiz', '2024-03-01', 'quiz'),
(4, 'debate', '2024-03-01',  'debate'),
(5, 'techexpo', '2024-03-01',  'tech event');
