
CREATE TYPE capacity_type AS ENUM ('Single', 'Double', 'Luxury');
CREATE TYPE view_type AS ENUM ('Sea', 'Mountain');
CREATE TYPE payment_status_type AS ENUM ('Processing', 'Pending payment', 'Paid');

CREATE TABLE Chain (
    name VARCHAR(255) NOT NULL,
    num_of_hotel INT,
    PRIMARY KEY (name)
);

CREATE TABLE Hotel (
	hotel_ID INT,
    name VARCHAR(255) NOT NULL,
    address_street_number INT,
    address_street_name VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    zip CHAR(6),
    contact_email VARCHAR(255),
    contact_phone_num CHAR(10),
    rating INT,
    chain_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (hotel_ID, chain_name),
    FOREIGN KEY (chain_name) REFERENCES Chain(name)
);

CREATE TABLE Employee (
    employeeID SERIAL PRIMARY KEY,
    SIN INT UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address_street_number INT,
    address_street_name VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    zip CHAR(6),
    role VARCHAR(255),
    works_for_hotel_ID INT,
    works_for_chain_name VARCHAR(255),

    FOREIGN KEY (works_for_hotel_ID, works_for_chain_name) REFERENCES Hotel(hotel_ID, chain_name)
);

CREATE TABLE Customer (
    Customer_id INT PRIMARY KEY,
    type VARCHAR(255),
    full_name VARCHAR(255),
    first_name VARCHAR(255),
    middle_name VARCHAR(255),
    last_name VARCHAR(255),
    address_street_number INT,
    address_street_name VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    ZIP INT,
    registration_date DATE
);


CREATE TABLE HotelRoom (
    room_number INT PRIMARY KEY,
    price DECIMAL(10, 2),
    AC BOOLEAN,
    TV BOOLEAN,
    fridge BOOLEAN,
    capacity capacity_type,
    view view_type,
    extendable BOOLEAN,
    problems_details VARCHAR(255),
    hotel_ID INT,
    chain_name VARCHAR(255),
    FOREIGN KEY (hotel_ID, chain_name) REFERENCES hotel(hotel_ID, chain_name)
);


CREATE TABLE Booking (
    booking_number INT PRIMARY KEY,
    Customer_id INT,
    room_number INT,
    booking_date DATE,
    checkin_date DATE,
    checkout_date DATE,
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id),
    FOREIGN KEY (room_number) REFERENCES HotelRoom(room_number)
);


CREATE TABLE Renting (
    renting_id INT PRIMARY KEY,
    Customer_id INT,
    room_number INT,
    renting_date DATE,
    payment_status payment_status_type,
    employee_id INT,
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id),
    FOREIGN KEY (room_number) REFERENCES HotelRoom(room_number),
    FOREIGN KEY (employee_id) REFERENCES Employee(EmployeeID)
);


CREATE TABLE Archives (
    archive_id INT PRIMARY KEY,
    booking_number INT,
    renting_id INT,
    FOREIGN KEY (booking_number) REFERENCES Booking(booking_number),
    FOREIGN KEY (renting_id) REFERENCES Renting(renting_id)
);

CREATE TABLE Office (
    office_id INT PRIMARY KEY,
    chain_name VARCHAR(255),
    street_number VARCHAR(255),
    street_name VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    zip CHAR(6),
    contact_email VARCHAR(255),
    phone_number CHAR(10),
    FOREIGN KEY (chain_name) REFERENCES Chain(name)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

ALTER TABLE customer
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_customer_user FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE employee
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_employee_user FOREIGN KEY (user_id) REFERENCES users(user_id);

-- Auto incrementing primary keys for Renting
CREATE SEQUENCE renting_renting_id_seq;
ALTER TABLE renting ALTER COLUMN renting_id SET DEFAULT nextval('renting_renting_id_seq');

-- Auto incrementing primary keys for customer_customer_id
CREATE SEQUENCE customer_customer_id_seq;

ALTER TABLE public.customer
ALTER COLUMN customer_id SET DEFAULT nextval('customer_customer_id_seq');

ALTER SEQUENCE customer_customer_id_seq OWNED BY public.customer.customer_id;

-- Auto incrementing primary keys for booking_booking_number

CREATE SEQUENCE booking_number_seq;

ALTER TABLE public.booking
ALTER COLUMN booking_number SET DEFAULT nextval('booking_number_seq');