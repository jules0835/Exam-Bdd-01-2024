Projet base de données B3

Ce projet consiste à créer une base de données pour un systeme de commande. La base de données contient des tables qui sont reliées pour gérer les clients, leurs commandes, des produits et des fournisseurs.

Pour lancer le projet sql :

1. Créer une base de données nommée dans votre serveur MySQL via le script disponible dans le fichier `shema_V1.sql`.
2. Exécuter le script `row_samples_V1.sql` pour insérer des données dans la base de données.

Pour lancer l'api :

1. Se rendre dans le dossier `app`.
2. Installer les dépendances avec `npm install`.
3. Remplir le fichier `.env` avec les informations de connexion à la base de données et le port.
4. Lancer l'api avec `npm start`.
5. Vous pouvez maintenant utiliser les endpoints de l'api.

Vous pouvez trouvr la liste des endpoints dans `api_endpoint_V1.md`.
