use cinema_booking_system;
select * from films;
select * from screenings;
select name, length_min from films where length_min > (select avg(length_min) from films);

select MAX(id), MIN(id) from 
( select film_id, COUNT(id) as id from screenings 
group by film_id
) A;

select name, (Select count(s.film_id) from screenings s where s.film_id = f.id) from films f;