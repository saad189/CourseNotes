use cinema_booking_system;
select * from customers;
select count(*) from customers;
select COUNT(first_name) from customers where last_name = 'Smith';
select * from rooms;
select SUM(no_seats) from rooms;

select MAX(length_min) from films;
select MIN(length_min) from films;

select AVG(length_min) from films where length_min > 120;
select SUM(length_min)/COUNT(length_min) from films;
select * from films;
select * from bookings;
select * from screenings;
show tables;
select Count(*) from bookings where customer_id = 10;
select Count(*) from screenings s
join films f on s.film_id = f.id
where f.name = 'Blade Runner 2049';
select count(distinct(customer_id)) from bookings;

select customer_id,screening_id, Count(id) from bookings 
group by  screening_id,customer_id;

SELECT f.name, s.start_time, c.first_name, c.last_name, COUNT(b.id) FROM films f
JOIN screenings s ON f.id = s.film_id
JOIN bookings b ON s.id = b.screening_id
JOIN customers c ON b.customer_id = c.id
GROUP BY f.name, s.start_time, c.first_name, c.last_name
ORDER BY s.start_time;

select customer_id, screening_id, count(id) from bookings
group by customer_id, screening_id 
having customer_id = 10;
show tables;
select * from reserved_seat;
select * from bookings;
select * from screenings;
select b.customer_id, count(r.id) from reserved_seat r
join bookings b On r.booking_id = b.id
group by b.customer_id;

select * from films;
select f.name, f.length_min, count(s.film_id) from films f
join screenings s on s.film_id = f.id
group by f.name,f.length_min
having f.length_min > 120;


