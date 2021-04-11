use cinema_booking_system;

SELECT CONCAT(first_name,' ',last_name) as Name from customers;
SELECT SUBSTRING(name,1,3) AS short_name FROM films;

SELECT SUBSTRING(name,-2,2) AS short_name FROM films;

select * from films;

select * from customers where last_name = 'Smith';

select date(start_time) from screenings;

select * from screenings where date(start_time) between '2017-10-03' and '2017-10-05';

select MontH(start_time) from screenings;

select * from screenings where year(start_time) = 2017;

select film_id,start_time from screenings where date(start_time) = '2017-10-20';

select * from screenings where date(start_time) between '2017-10-06' and '2017-10-13';

select * from screenings where Year(start_time) = 2017 and month(start_time) = 10;


