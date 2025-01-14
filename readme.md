Projet base de données B3

Ce projet consiste à créer une base de données pour un systeme de commande. La base de données contient des tables qui sont reliées pour gérer les clients, leurs commandes, des produits et des fournisseurs.

Pour lancer le projet sql :

1. Créer une base de données nommée dans votre serveur MySQL via le script disponible dans le fichier `shema_V2.sql`.
2. Exécuter le script `row_sample_V2.sql` pour insérer des données dans la base de données.
3. Exécuter le script `procedures_V2.sql` pour créer les procédures stockées.

Pour lancer l'api :

1. Se rendre dans le dossier `app`.
2. Installer les dépendances avec `npm install`.
3. Remplir le fichier `.env` avec les informations de connexion à la base de données et le port.
4. Lancer l'api avec `npm start`.
5. Vous pouvez maintenant utiliser les endpoints de l'api.

Vous pouvez trouvr la liste des endpoints dans `api_endpont_V2.md`.

1. Utiliser un ORM (Sequelize, TypeORM...) pour automatiser la gestion des tables et des
   requêtes.

Je passerais a une base PostgreSQL pour la V3, et j'utiliserais TypeORM pour gérer les tables et les requêtes, on evitera ainsi les erreurs de syntaxe SQL, les failles de sécurité et la creation de requetes/procédures SQL manuellement.

2. Mettre en place de la sécurité (authentification via sessions/cookies ou JWT),

Pour une securite simple je mettrais en place une authentification via JWT, pour une securite plus avancée je mettrais en place une authentification via des providers comme Google, Facebook, etc.

3. Gérer des rôles de façon plus fine (admin, user...)

Je mettrais en place des roles pour les utilisateurs, avec des roles admin et user, et je mettrais en place des permissions pour chaque role via le systeme de connexion cree juste au dessus.

4. Préparer un frontend (React, Vue, etc.) – mais ce n’est pas obligatoire à ce stade.

J'utiliserais NextJs pour le frontend et l'api, pour avoir un rendu rapide et une gestion des routes plus simple.
NextJs permetrai d'eviter d'avoir 2 serveurs distincts pour l'api et le frontend, et permettrais de faire du server side rendering pour ameliorer le SEO.
