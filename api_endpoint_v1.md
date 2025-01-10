# API Endpoint for version 1.0.0

## Client

### GET /api/client

Get all clients with all of their information
--test ok--

### GET /api/client/:id

Get a client by its id with all of its information
--test ok--

### POST /api/client

Create a new client
Required fields:
name VARCHAR(255),
age int,
email varchar(255),
phone_nb int,
address varchar(255)
--test ok--

### PUT /api/client/:id

Edit a client by its id
--test ok--

### DELETE /api/client/:id

Delete a client by its id
--test ok--

## Category

### GET /api/category

Get all categories with all of their information
--test ok--

### GET /api/category/:id

Get a category by its id with all of its information
--test ok--

### POST /api/category

Create a new category
required fields:
name VARCHAR(255),
--test ok--

### PUT /api/category/:id

Edit a category by its id
--test ok--

### DELETE /api/category/:id

Delete a category by its id
--test ok--

## Supplier

### GET /api/supplier

Get all suppliers with all of their information
--test ok--

### GET /api/supplier/:id

Get a supplier by its id with all of its information
--test ok--

### POST /api/supplier

Create a new supplier
required fields:
name VARCHAR(255),
email varchar(255),
phone_nb int,
address varchar(255)
--test ok--

### PUT /api/supplier/:id

Edit a supplier by its id
--test ok--

### DELETE /api/supplier/:id

Delete a supplier by its id
--test ok--

## Product

### GET /api/product

Get all products with all of their information
--test ok--

### GET /api/product/:id

Get a product by its id with all of its information
--test ok--

### POST /api/product

Create a new product
required fields:
name VARCHAR(255),
price float,
category_id int
supplier_id int
--test ok--

### PUT /api/product/:id

Edit a product by its id
--test ok--

### DELETE /api/product/:id

Delete a product by its id
--test ok--

## Command
