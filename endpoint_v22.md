# API Endpoint for version 2.0.0

# Category

## POST /category

- **Description** : Permet de créer une nouvelle catégorie dans la base de donnée.
- **Méthode** : POST
- **Corps attendu** (JSON) :
  ```json
  {
    "name": "nom de la categorie"
  }
  ```
- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nom de la categorie"
  }
  ```

---

## GET /category

- **Description** : Récupére la liste de toutes les catégories.
- **Méthode** : GET
- **Exemple de retour** :
  ```json
  [
    { "id": 1, "name": "nom de la categorie 1" },
    { "id": 2, "name": "nom de la categorie 2" }
  ]
  ```

---

## GET /category/:id

- **Description** : Récupére une categorie par son ID.
- **Méthode** : GET
- **Paramètre URL** :
  - `id` : Identifiant unique de la catégorie.
- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nom de la categorie"
  }
  ```

---

## PUT /category/:id

- **Description** : Modifie une catégorie existante avec des nouvelles données.
- **Méthode** : PUT
- **Paramètre URL** :
  - `id` : Identifiant unique de la catégorie.
- **Corps attendu** (JSON) :
  ```json
  {
    "name": "nouveau nom de la categorie"
  }
  ```
- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nouveau nom de la categorie"
  }
  ```

---

## DELETE /category/:id

- **Description** : Supprime une catégorie en fonction de son ID.
- **Méthode** : DELETE
- **Paramètre URL** :
  - `id` : Identifiant unique de la catégorie.
- **Exemple de retour** : Pas de contenu (204).

--

## GET /category/search

- **Description** : Recherche des catégories en fonction d’un terme donné.
- **Méthode** : GET
- **Paramètre Query** :
  - `q` : Terme de recherche.
- **Exemple de retour** :
  ```json
  [
    { "id": 1, "name": "categorie correspondant" },
    { "id": 3, "name": "autre resultat" }
  ]
  ```

---

# Product

## POST /client

- **Description** : Ajoute un noveau client dans la base de donnée.
- **Méthode** : POST
- **Corps attendu** (JSON) :
  ```json
  {
    "name": "nom du client",
    "age": 30,
    "email": "client@example.com",
    "phone_nb": "0123456789",
    "address": "adresse du client"
  }
  ```
- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nom du client",
    "age": 30,
    "email": "client@example.com",
    "phone_nb": "0123456789",
    "address": "adresse du client"
  }
  ```

---

## GET /client

- **Description** : Retourne la liste de touts les clients.
- **Méthode** : GET
- **Exemple de retour** :
  ```json
  [
    {
      "id": 1,
      "name": "nom du client",
      "age": 30,
      "email": "client1@example.com",
      "phone_nb": "0123456789",
      "address": "adresse client 1"
    },
    {
      "id": 2,
      "name": "autre client",
      "age": 25,
      "email": "client2@example.com",
      "phone_nb": "0987654321",
      "address": "adresse client 2"
    }
  ]
  ```

---

## GET /client/:id

- **Description** : Recupére les infos d’un client par son ID.
- **Méthode** : GET
- **Paramètre URL** :
  - `id` : L’identifiant unique du client.
- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nom du client",
    "age": 30,
    "email": "client@example.com",
    "phone_nb": "0123456789",
    "address": "adresse client"
  }
  ```

---

## PUT /client/:id

- **Description** : Met à jour les infos d’un client existant.
- **Méthode** : PUT
- **Paramètre URL** :
  - `id` : L’identifiant unique du client.
- **Corps attendu** (JSON) :
  ```json
  {
    "name": "nouveau nom",
    "age": 35,
    "email": "nouveau@example.com",
    "phone_nb": "9876543210",
    "address": "nouvelle adresse"
  }
  ```
- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nouveau nom",
    "age": 35,
    "email": "nouveau@example.com",
    "phone_nb": "9876543210",
    "address": "nouvelle adresse"
  }
  ```

---

## DELETE /client/:id

- **Description** : Supprime un client de la base de données.
- **Méthode** : DELETE
- **Paramètre URL** :
  - `id` : L’identifiant unique du client.
- **Exemple de retour** : Pas de contenu (204).

---

## GET /client/:id/commands

- **Description** : Liste les commandes associées à un client donné.
- **Méthode** : GET
- **Paramètre URL** :
  - `id` : L’identifiant unique du client.
- **Exemple de retour** :
  ```json
  [
    {
      "command_id": 101,
      "date": "2023-01-01",
      "products": [
        {
          "product_id": 1,
          "product_name": "produit A",
          "product_price": 10,
          "product_quantity": 2
        },
        {
          "product_id": 2,
          "product_name": "produit B",
          "product_price": 20,
          "product_quantity": 1
        }
      ]
    }
  ]
  ```

---

## GET /search/client

- **Description** : Recherche des clients en fonction d’un terme.
- **Méthode** : GET
- **Paramètre Query** :
  - `q` : Terme de recherche.
- **Exemple de retour** :
  ```json
  [
    {
      "id": 1,
      "name": "nom du client",
      "email": "client@example.com"
    },
    {
      "id": 3,
      "name": "autre nom",
      "email": "autre@example.com"
    }
  ]
  ```

---

# Supplier

## POST /supplier

- **Description** : Ajoute un nouveau fournisseur dans la base de donnée.
- **Méthode** : POST
- **Corps attendu** (JSON) :

  ```json
  {
    "name": "nom du fournisseur",
    "address": "adresse du fournisseur",
    "email": "fournisseur@example.com",
    "phone_nb": "0123456789"
  }
  ```

- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nom du fournisseur",
    "address": "adresse du fournisseur",
    "email": "fournisseur@example.com",
    "phone_nb": "0123456789"
  }
  ```

---

## GET /supplier

- **Description** : Retourne la liste de touts les fournisseurs.
- **Méthode** : GET
- **Exemple de retour** :
  ```json
  [
    {
      "id": 1,
      "name": "fournisseur 1",
      "address": "adresse fournisseur 1",
      "email": "fournisseur1@example.com",
      "phone_nb": "0123456789"
    },
    {
      "id": 2,
      "name": "fournisseur 2",
      "address": "adresse fournisseur 2",
      "email": "fournisseur2@example.com",
      "phone_nb": "0987654321"
    }
  ]
  ```

---

## GET /supplier/:id

- **Description** : Recupére les infos d’un fournisseur par son ID.
- **Méthode** : GET
- **Paramètre URL** :
  - `id` : L’identifiant unique du fournisseur.
- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nom du fournisseur",
    "address": "adresse fournisseur",
    "email": "fournisseur@example.com",
    "phone_nb": "0123456789"
  }
  ```

---

## PUT /supplier/:id

- **Description** : Met à jour les infos d’un fournisseur existant.
- **Méthode** : PUT
- **Paramètre URL** :
  - `id` : L’identifiant unique du fournisseur.
- **Corps attendu** (JSON) :
  ```json
  {
    "name": "nouveau nom",
    "address": "nouvelle adresse",
    "email": "nouveau@example.com",
    "phone_nb": "9876543210"
  }
  ```
- **Exemple de retour** :
  ```json
  {
    "id": 1,
    "name": "nouveau nom",
    "address": "nouvelle adresse",
    "email": "nouveau@example.com",
    "phone_nb": "9876543210"
  }
  ```

---

## DELETE /supplier/:id

- **Description** : Supprime un fournisseur de la base de données.
- **Méthode** : DELETE
- **Paramètre URL** :
  - `id` : L’identifiant unique du fournisseur.
- **Exemple de retour** : Pas de contenu (204).

---

## GET /supplier/:id/products

- **Description** : Liste les produits associés à un fournisseur donné.
- **Méthode** : GET
- **Paramètre URL** :
  - `id` : L’identifiant unique du fournisseur.
- **Exemple de retour** :
  ```json
  [
    {
      "product_id": 1,
      "product_name": "Produit A",
      "product_price": 10.5,
      "product_quantity": 50
    },
    {
      "product_id": 2,
      "product_name": "Produit B",
      "product_price": 20,
      "product_quantity": 30
    }
  ]
  ```

---

## GET /search/supplier

- **Description** : Recherche des fournisseurs en fonction d’un terme.
- **Méthode** : GET
- **Paramètre Query** :
  - `q` : Terme de recherche.
- **Exemple de retour** :
  ```json
  [
    {
      "id": 1,
      "name": "fournisseur recherché",
      "address": "adresse fournisseur",
      "email": "fournisseur@example.com"
    }
  ]
  ```
  Here's an **API documentation** draft based on the given product management endpoints:

````markdown
# API Documentation for Product Management

## POST /product

- **Description**: Add a new product to the database.
- **Method**: POST
- **Request Body** (JSON):
  ```json
  {
    "name": "Product name",
    "price": 100.0,
    "category_id": 1,
    "supplier_id": 2,
    "quantity": 50,
    "description": "Short description of the product"
  }
  ```
````

- **Response Example**:
  ```json
  {
    "id": 1,
    "name": "Product name",
    "price": 100.0,
    "category_id": 1,
    "supplier_id": 2,
    "quantity": 50,
    "description": "Short description of the product"
  }
  ```

---

# Product

## GET /product

- **Description**: Retrieve a list of all products.
- **Method**: GET
- **Response Example**:
  ```json
  [
    {
      "id": 1,
      "name": "Product A",
      "price": 100.0,
      "category_id": 1,
      "quantity": 50,
      "description": "Description of Product A"
    },
    {
      "id": 2,
      "name": "Product B",
      "price": 200.0,
      "category_id": 2,
      "quantity": 30,
      "description": "Description of Product B"
    }
  ]
  ```

---

## GET /product/:id

- **Description**: Retrieve details of a product by its ID.
- **Method**: GET
- **URL Parameters**:
  - `id`: Unique ID of the product.
- **Response Example**:
  ```json
  {
    "id": 1,
    "name": "Product A",
    "price": 100.0,
    "category_id": 1,
    "quantity": 50,
    "description": "Description of Product A"
  }
  ```

---

## PUT /product/:id

- **Description**: Update the details of an existing product.
- **Method**: PUT
- **URL Parameters**:
  - `id`: Unique ID of the product.
- **Request Body** (JSON):
  ```json
  {
    "name": "Updated Product Name",
    "price": 120.0,
    "category_id": 1,
    "supplier_id": 3,
    "quantity": 40,
    "description": "Updated description of the product"
  }
  ```
- **Response Example**:
  ```json
  {
    "id": 1,
    "name": "Updated Product Name",
    "price": 120.0,
    "category_id": 1,
    "quantity": 40,
    "description": "Updated description of the product"
  }
  ```

---

## DELETE /product/:id

- **Description**: Delete a product by its ID.
- **Method**: DELETE
- **URL Parameters**:
  - `id`: Unique ID of the product.
- **Response**: No content (204).

---

## GET /product/:id/command

- **Description**: Retrieve commands related to a product.
- **Method**: GET
- **URL Parameters**:
  - `id`: Unique ID of the product.
- **Response Example**:
  ```json
  [
    {
      "command_id": 1,
      "customer_id": 5,
      "quantity": 10,
      "command_date": "2023-12-01"
    },
    {
      "command_id": 2,
      "customer_id": 3,
      "quantity": 5,
      "command_date": "2023-12-05"
    }
  ]
  ```

---

## GET /search/product

- **Description**: Search for products by name or category.
- **Method**: GET
- **Query Parameters**:
  - `q`: Search query.
- **Response Example**:
  ```json
  [
    {
      "id": 1,
      "name": "Product A",
      "category_id": 1,
      "price": 100.0,
      "quantity": 50,
      "description": "Description of Product A"
    }
  ]
  ```

---

## GET /stock/notification

- **Description**: Retrieve products with stock below a specified threshold.
- **Method**: GET
- **Query Parameters**:
  - `seuil`: Stock threshold value.
- **Response Example**:
  ```json
  [
    {
      "id": 2,
      "name": "Product B",
      "category_id": 2,
      "price": 200.0,
      "quantity": 5,
      "description": "Description of Product B"
    }
  ]
  ```

---

# Command

## POST /command

Créer une nouvelle commande.

- **Description** :
  Crée une nouvelle commande pour un client spécifique avec une liste de produits.

- **Requête** :

  - **Méthode** : `POST`
  - **Corps de la requête (JSON)** :
    ```json
    {
      "client_id": 1,
      "products": [
        {
          "product_id": 101,
          "quantity": 2
        },
        {
          "product_id": 102,
          "quantity": 5
        }
      ]
    }
    ```
  - **Paramètres** : Aucun

- **Réponse** :
  - **Statut HTTP** : `201 Created`
  - **Body (JSON)** :
    ```json
    [
      {
        "id": 1,
        "client_id": 1,
        "total_price": 150.0,
        "expedition_date": "2023-12-01",
        "delivery_date": "2023-12-05",
        "products": [
          {
            "product_id": 101,
            "product_name": "Product A",
            "product_price": 50.0,
            "product_quantity": 2
          },
          {
            "product_id": 102,
            "product_name": "Product B",
            "product_price": 10.0,
            "product_quantity": 5
          }
        ]
      }
    ]
    ```

---

## GET /command

Lister toutes les commandes.

- **Description** :
  Récupère toutes les commandes disponibles avec leurs produits associés.

- **Requête** :

  - **Méthode** : `GET`
  - **Paramètres** : Aucun

- **Réponse** :
  - **Statut HTTP** : `200 OK`
  - **Body (JSON)** :
    ```json
    [
      {
        "id": 1,
        "client_id": 1,
        "total_price": 150.0,
        "expedition_date": "2023-12-01",
        "delivery_date": "2023-12-05",
        "products": [
          {
            "product_id": 101,
            "product_name": "Product A",
            "product_price": 50.0,
            "product_quantity": 2
          },
          {
            "product_id": 102,
            "product_name": "Product B",
            "product_price": 10.0,
            "product_quantity": 5
          }
        ]
      }
    ]
    ```

---

## GET /command/:id

Récupérer une commande spécifique.

- **Description** :
  Retourne les détails d’une commande spécifique identifiée par son ID.

- **Requête** :

  - **Méthode** : `GET`
  - **Paramètres d’URL** : `id` (ID de la commande)

- **Réponse** :
  - **Statut HTTP** : `200 OK`
  - **Body (JSON)** :
    ```json
    {
      "id": 1,
      "client_id": 1,
      "total_price": 150.0,
      "expedition_date": "2023-12-01",
      "delivery_date": "2023-12-05",
      "products": [
        {
          "product_id": 101,
          "product_name": "Product A",
          "product_price": 50.0,
          "product_quantity": 2
        }
      ]
    }
    ```

---

## PUT /command/:id

Mettre à jour une commande.

- **Description** :
  Met à jour les informations d'une commande existante et ses produits.

- **Requête** :

  - **Méthode** : `PUT`
  - **Paramètres d’URL** : `id` (ID de la commande)
  - **Corps de la requête (JSON)** :
    ```json
    {
      "client_id": 1,
      "total_price": 200.0,
      "command_date": "2023-12-01",
      "expedition_date": "2023-12-03",
      "delivery_date": "2023-12-07",
      "products": [
        {
          "product_id": 101,
          "quantity": 3
        },
        {
          "product_id": 102,
          "quantity": 6
        }
      ]
    }
    ```

- **Réponse** :
  - **Statut HTTP** : `200 OK`
  - **Body (JSON)** : Même format que la réponse de création.

---

## DELETE /command/:id

Supprimer une commande.

- **Description** :
  Supprime une commande existante de la base de données.

- **Requête** :

  - **Méthode** : `DELETE`
  - **Paramètres d’URL** : `id` (ID de la commande)

- **Réponse** :
  - **Statut HTTP** : `204 No Content`
  - **Body** : Aucun

---

## GET /filter/getbydates/command

Filtrer les commandes par dates.

- **Description** :
  Récupère les commandes placées entre deux dates.

- **Requête** :

  - **Méthode** : `GET`
  - **Paramètres de requête** :
    - `start` (date de début, format : `YYYY-MM-DD`)
    - `end` (date de fin, format : `YYYY-MM-DD`)

- **Réponse** :
  - **Statut HTTP** : `200 OK`
  - **Body (JSON)** : Format identique à la réponse de la liste des commandes.

---

## GET /stats/command

Obtenir des statistiques sur les commandes.

- **Description** :
  Retourne des statistiques globales sur les commandes, les produits vendus et les ventes totales.

- **Requête** :

  - **Méthode** : `GET`
  - **Paramètres** : Aucun

- **Réponse** :
  - **Statut HTTP** : `200 OK`
  - **Body (JSON)** :
    ```json
    {
      "productsSold": 500,
      "totalSales": 15000.0,
      "totalSalesByProduct": [
        {
          "product_id": 101,
          "product_name": "Product A",
          "total_sales": 5000.0,
          "quantity_sold": 100
        },
        {
          "product_id": 102,
          "product_name": "Product B",
          "total_sales": 10000.0,
          "quantity_sold": 400
        }
      ]
    }
    ```

---
