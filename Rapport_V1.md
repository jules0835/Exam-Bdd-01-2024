Audit de la V1

Ce document est un audit de la V1 de l'application de gestion de stock. Il a pour but de vérifier la conformité de l'application par rapport aux besoins du client et de proposer des améliorations.

1. Les failles de sécurité

1.1 Injection SQL

L'application utilise des requêtes SQL construites à partir de chaînes de caractères. Cela rend l'application vulnérable aux attaques par injection SQL. Un attaquant pourrait modifier les requêtes SQL pour accéder à des données sensibles ou les supprimer.

Nous allons tenté d'injecter du code SQL pour récupérer des données que l'endpoint ne devrait pas nous donner de cette façon.

[VOIR PHOTO JOITNE DANS LE REPO] - injection.png

Dans cette requête, nous allons essayer de récupérer les données du premier produit de la table products aulieu de récupérer les données du produit avec l'id 3.
Cela montre qu'il est possible de récupérer des données sensibles de la base de données. Cette attaque précise est une attaque de type "SQL Injection".
Cette vultnérabilité est très dangereuse car elle permet à un attaquant de récupérer des données sensibles de la base de données.
Si nous avion ajouté une option de connexion à l'application, l'attaquant aurait pu utilis cette faille se connecter en tant qu'admin.

1.2 Manque de validation des champs

L'application ne vérifie pas les données entrées par l'utilisateur. Cela peut entraîner des erreurs ou des comportements inattendus. Par exemple, l'utilisateur peut entrer des quantités négatives ou des champs vides.
Il est important de valider les données entrées par l'utilisateur pour garantir la cohérence des données et éviter les erreurs.

Dans la v2 de l'application, nous devons mettre en place une validation des données entrées par l'utilisateur. Nous devons vérifier que les données sont conformes aux attentes et qu'elles respectent les contraintes métier.

2. Les améliorations possibles

2.1 Requêtes paramétrées ou procédures stockées

Pour éviter les attaques par injection SQL, nous devons utiliser des requêtes paramétrées ou des procédures stockées. Cela permet de séparer les données des requêtes SQL et d'éviter les attaques par injection SQL.
Nous allons normalement utiliser des procédures stockées pour les requêtes.
Les procédures stockées sont des blocs de code SQL qui sont stockés dans la base de données et peuvent être appelés par l'application. Cela permet de centraliser la logique métier et de garantir la sécurité des données.

2.2 Vérifications métier

Il est important de mettre en place des vérifications métier pour garantir la cohérence des données. Par exemple, nous devons vérifier que la quantité commandée est inférieure ou égale au stock disponible.
Cela sera fais directement dans les procédures stockées et dans des fonctions de l'application.

En conclusion, l'audit de la V1 de l'application de gestion de stock a révélé des failles de sécurité et des améliorations possibles. Il est important de mettre en place des mesures de sécurité pour protéger les données et des vérifications métier pour garantir la cohérence des données. Ces améliorations permettront d'améliorer la qualité de l'application et de garantir la satisfaction de nos employé.
