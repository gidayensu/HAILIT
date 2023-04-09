create table users (
	user_id int primary key,
	username varchar(50) not null, 
	email varchar(100) unique not null, 
	job_title varchar(100) default 'Motor Rider'
		check (job_title in ('Admin', 'Manager', 'Car Driver', 'Motor Rider'))
);


select * from users

alter table users alter column user_id type varchar(255)

create table customer (
	customer_id varchar(255) primary key, 
	first_name varchar(100) not null, 
	last_name varchar (100) not null, 
	email varchar (100) default 'no email' unique,
	phone_number varchar(20)
);

create table vehicle (
	vehicle_id varchar(255) primary key,
	vehicle_type varchar(100), 
	vehicle_model varchar(100),
	plate_number varchar(50)
);

create table motorRider(
	rider_id varchar(255) primary key, 
	rider_first_name varchar(100) not null,
	rider_last_name varchar(100) not null,
	rider_phone_number varchar (20) not null, 
	user_id varchar(255),
	foreign key (user_id) references users(user_id)
);

select * from motorRider

