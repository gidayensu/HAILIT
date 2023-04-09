select * from cardriver;
select * from customer;
select * from users;
select * from carorders;
select * from motorrider;
select * from vehicle;
select * from motororders;

delete from customer where customer_id = 'undefined'
insert into motororders values ('3bc926a6-bb58-4e20-9fc6-9ae44e6a7dbe', '8eb863ce-84d8-4c4b-a02b-caeb52393837', '004c4568-ed8a-4326-bb18-538f51b68a7d', 'Kwadaso', 'Asuofia', 'delivered', 45.50)
insert into motorrider values ('004c4568-ed8a-4326-bb18-538f51b68a7d', 'Abena', 'Gyamfi', '9228e07e-e438-492c-9a60-b3994f268f4b', '3f196091-0593-428d-94d5-5f1502e98be1')
insert into carorders (car_order_id, customer_id, driver_id, car_pickup_location, car_destination, car_order_status, car_order_cost)
	values ('edb0e61d-f747-44fb-8d32-ee218c7ba583', 'f2917bd3-8925-4bf0-87eb-f596573735d6', '2291652a-902c-4d6e-ab9f-c53a784daaf7', 'Tafo', 'Bantama', 'in progress', 54.0)
insert into vehicle (vehicle_id, vehicle_name, vehicle_model, plate_number) values ('9228e07e-e438-492c-9a60-b3994f268f4b', 'Motor', 'Flat Body', 'M-1256-C')
insert into cardriver (driver_id, user_id, vehicle_id) values ('2291652a-902c-4d6e-ab9f-c53a784daaf7', 'a4babaf6-8360-41b0-9dba-8b91257d6165', '47e644b3-40bd-46f7-a77c-2bf1c46af907')


