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

Pour la V2 :
Corriger les injections SQL
Ajouter des tests de données lors de l'envoie de données
Modifié les information renvoyer en cas de chose qui n'existe pas
Ajouter un controle du stock et plus de logique métier (calcul de prix, de stock, etc...)
Ajouter un système de clé api pour les requêtes
A rajouter :

1. Lister les commandes par année
   Ex. GET /commandes?start=2023-01-01&end=2023-12-31
2. Rechercher les commandes d’un client
   Ex. GET /clients/:id/commandes (existe déjà dans la v1 pour nous. Amélioration ??)
3. Lister les commandes qui contiennent un article précis
   Ex. GET /produits/:id/commandes
4. Recherche multi-critères (client, date, statut, produit...) (ajouter un endpoint spécial pour la recherch qui tapera dans toutes les tables)
5. Statistiques simples (produits les plus vendus, total des ventes sur une période...)
6. Gestion fine du stock (décrémentation automatique, blocage si insuffisant...)
7. Notifications de stock faible (ex. GET /produits/stock-faible?seuil=10).

Procédures suplémentaire :
Récupération des commandes par date
nom : getCommandsByDate
params : start, end

Recupération des commandes qui contiennent un article précis
nom : getCommandsByProduct
params : product_id

Recherche multi-critères
nom : search
param: un string de recherche
Pour les tables : client, category, supplier, product, command, faire une
procédure qui permet la recherche dans les lignes avec like %param% et retourne les résultats

Statistiques produits les plus vendus
nom : getStatsProductsSold
params : start, end
Retourne les produits les plus vendus sur une période

Statistiques total des ventes sur une période
nom : getStatsTotalSales
params : start, end
Retourne le total des ventes sur une période par produit

Statistiques total des ventes par produit
nom : getStatsTotalSalesByProduct
params : start, end
Retourne le total des ventes sur une période par produit

Gestion fine du stock
nom : updateStock
params : product_id, quantity, type(inc, dec)
Permet de mettre à jour le stock d'un produit

Notifications de stock faible
nom : getLowStock
params : seuil
Retourne les produits qui ont un stock inférieur au seuil
