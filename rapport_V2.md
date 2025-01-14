Rapport V2

Cette version est une amélioration/correctif de la première version. Elle contient des informations supplémentaires sur les données et les résultats obtenus.

Voici les améliorations/correctifs apportés à la première version:

- Ajout de verifications sur les données d'entrée
- Ajout de la documentation sur les données des endpoints
- Ajout des endpoints demandés après la V1
- Ajout de procédures stockées pour les requêtes

Voici les corrections apportées à la première version:

- Correction de la documentation des endpoints
- Correction des faiblesses de la première version
- Correction des fails SQL Injection

La base de données contien des tables qui sont reliées pour gérer les clients, leurs commandes, des produits et des fournisseurs.

Les différentes relations sont les suivantes:

client est lié a command. Chaque commande appartient a un client, et un client peut faire plusieurs commandes.

command est aussi lié a product_cmd, qui sert pour connecter les produits d'une commande spécifique avec leur quantité.

product est relié avec category. Chaque produit a une catégorie, mais une catégorie peut avoir plusieurs produits.

supplier est lié a supplier_product, qui connecte les fournisseurs avec les produits qu’ils fournissent. Chaque fournisseur peut avoir plusieurs produits, et chaque produit peut venir de plusieurs fournisseurs.

Il y a aussi des déclencheurs (trigger, disponible a la fin du script de création) pour calculer automatiquement le prix total d'une commande dès qu'on ajoute un nouveau produit a cette commande.

Vous pouvez trouvr la liste des endpoints dans api_endpont_V2.md.

Pour aller plus loin avec une possible V3 :
