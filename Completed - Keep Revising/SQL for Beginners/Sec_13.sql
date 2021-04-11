select * from films where length_min > 120;
select * from screenings;
select name from films where id = (select film_id from (
select film_id,max(Counter) from (
select film_id,count(film_id) as Counter from screenings 
group by film_id) A ) B) ;



select f.name, count(s.film_id)  as showings from screenings s
join films f ON f.id = s.film_id
group by film_id
order by showings desc
LIMIT 10;

select * from bookings;
select * from screenings;

select count(b.screening_id) as booking from bookings b
join screenings s on s.id = b.screening_id
join films f on f.id = s.film_id
where f.name = 'Jigsaw';

select * from customers;

select c.*, count(b.customer_id) as Booking_Count from customers c 
join bookings b on b.customer_id = c.id
group by c.first_name,c.last_name
order by Booking_Count desc
limit 5;


select * from films;
select * from rooms;
select * from screenings;

select f.name, count(s.room_id) as CountOf from films f
join screenings s on s.film_id = f.id
join rooms r on r.id = s.room_id
where r.name = 'Chaplin'
group by f.name
order by CountOf desc
limit 1;


select * from bookings;
select * from customers;

select count(DISTINCT b.customer_id) as Unique_Customers from bookings b;

select c.first_name, c.last_name, count(Distinct b.customer_id) from customers c
join bookings b on b.customer_id = c.id
group by c.first_name, c.last_name;