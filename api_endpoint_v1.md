# API Endpoint for version 1.0.0

## Client

### GET /api/client

Get all clients with all of ther informations.  
**Example Response**:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 35,
    "email": "john.doe@example.com",
    "phone_nb": 123456789,
    "address": "123 Main Street"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "age": 29,
    "email": "jane.smith@example.com",
    "phone_nb": 987654321,
    "address": "456 Elm Street"
  }
]
```

---

### GET /api/client/id?id={id}

Get a client by its id with all of ther informations.  
**Example Request**:  
`GET /api/client/id?id=1`

**Example Response**:

```json
{
  "id": 1,
  "name": "John Doe",
  "age": 35,
  "email": "john.doe@example.com",
  "phone_nb": 123456789,
  "address": "123 Main Street"
}
```

---

### POST /api/client

Create a new client.  
**Required Fields**:

- `name` (string)
- `age` (integer)
- `email` (string)
- `phone_nb` (integer)
- `address` (string)

**Example Request**:

```json
{
  "name": "Alice Brown",
  "age": 42,
  "email": "alice.brown@example.com",
  "phone_nb": 654321987,
  "address": "789 Pine Street"
}
```

**Example Response**:

```json
{
  "message": "Client created successfully",
  "client_id": 3
}
```

---

## Category

### GET /api/category

Get all categories with all ther informations.  
**Example Response**:

```json
[
  {
    "id": 1,
    "name": "Electronics"
  },
  {
    "id": 2,
    "name": "Books"
  }
]
```

---

### POST /api/category

Create a new category.  
**Required Fields**:

- `name` (string)

**Example Request**:

```json
{
  "name": "Toys"
}
```

**Example Response**:

```json
{
  "message": "Category created successfully",
  "category_id": 3
}
```

---

## Supplier

### GET /api/supplier/:id

Get a supplier by its id with all ther informations.  
**Example Request**:  
`GET /api/supplier/1`

**Example Response**:

```json
{
  "id": 1,
  "name": "Tech Corp",
  "email": "support@techcorp.com",
  "phone_nb": 123456789,
  "address": "101 Tech Street"
}
```

---

## Product

### POST /api/product

Create a new product.  
**Required Fields**:

- `name` (string)
- `price` (float)
- `category_id` (integer)
- `supplier_id` (integer)

**Example Request**:

```json
{
  "name": "Smartphone",
  "price": 699.99,
  "category_id": 1,
  "supplier_id": 1
}
```

**Example Response**:

```json
{
  "message": "Product created successfully",
  "product_id": 1
}
```

---

## Command

### GET /api/command/id?id={id}

Get a command by its id with all ther informations.  
**Example Request**:  
`GET /api/command/id?id=1`

**Example Response**:

```json
{
  "id": 1,
  "client_id": 1,
  "total_price": 199.99,
  "product_nb": 3,
  "expedition_date": "2025-01-10",
  "delivery_date": "2025-01-15",
  "products": [
    {
      "product_id": 1,
      "name": "Smartphone",
      "price": 699.99,
      "quantity": 1
    },
    {
      "product_id": 2,
      "name": "Laptop",
      "price": 1299.99,
      "quantity": 1
    }
  ]
}

And for all of the endpoint, there is PUT and DELETE methods to update and delete the data.

For the PUT method, the request body is the same as the POST method.

For the DELETE method, the request params is the same as the GET method.
```
