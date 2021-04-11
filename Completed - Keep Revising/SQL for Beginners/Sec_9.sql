Select * from sys.sys_config;

create database cinema_booking_system;
use cinema_booking_system;
create table films (
id INT primary key AUTO_INCREMENT,
name varchar(45) NOT NULL UNIQUE,
length_min INT NOT NULL
);

CREATE TABLE customers (

	id INT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(45),
	last_name VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL UNIQUE
);

CREATE TABLE rooms (

	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(45) NOT NULL,
	no_seats INT NOT NULL
);

Create Table screenings (
id INT primary key AUTO_INCREMENT,
film_id int not null, 
room_id int not null,
start_time datetime NOT NULL,
Foreign key (film_id) references films(id),
Foreign key (room_id) references rooms(id)
);

Create table seats (
id int primary key auto_increment,
rowsvalue CHAR (1) not null,
number INT NOT NULL,
room_id INT NOT NULL,
foreign key (room_id) references rooms(id)
);

Create Table bookings (
id int primary key auto_increment,
screening_id int not null,
customer_id int not null,
Foreign key (screening_id) references screenings(id),
Foreign key (customer_id) references customers(id)
);
show tables;
CREATE TABLE reserved_seat (

	id INT PRIMARY KEY AUTO_INCREMENT,
	booking_id INT NOT NULL,
	seat_id INT NOT NULL,
	FOREIGN KEY (booking_id) REFERENCES bookings(id),
	FOREIGN KEY (seat_id) REFERENCES seats(id)
);

select * from reserved_seat;