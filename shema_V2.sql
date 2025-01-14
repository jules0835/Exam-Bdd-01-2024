drop database if exists paperplane;
create database paperplane;

use paperplane;


create table client (
    id int primary key auto_increment,
    name varchar(255) not null,
    age int not null,
    email varchar(255) not null unique, -- Ajout d'une contrainte permettant de ne pas avoir de doublon pour les mails
    phone_nb bigint not null unique, -- Ajout d'une contrainte permettant de ne pas avoir de doublon pour les téléphones
    address varchar(255) not null,
	constraint check (email LIKE '%_@__%.__%')  -- Ajout d'une contrainte permettant de vérifier si le mail est valide.
);

create table command (
    id int primary key auto_increment,
	client_id int not null,
    total_price decimal(10,2),
    command_date timestamp not null default CURRENT_TIMESTAMP, -- Ajout de l'heure de commande automatiquement.
    expedition_date timestamp,
    delivery_date timestamp,
    constraint foreign key (client_id) references client(id)
);

create table category (
    id int primary key auto_increment,
	name varchar(255) not null unique
);

create table supplier (
    id int primary key auto_increment,
	name varchar(255) not null,
    address varchar(255) not null,
    email varchar(255) not null unique,  -- Ajout d'une contrainte permettant de ne pas avoir de doublon pour les mails.
    phone_nb bigint not null unique,  -- Ajout d'une contrainte permettant de ne pas avoir de doublon pour les téléphones
	constraint check (email LIKE '%_@__%.__%')  -- Ajout d'une contrainte permettant de vérifier si le mail est valide.
);

create table product (
    id int primary key auto_increment,
	name varchar(255) not null unique,
    description varchar(255),  -- Ajout d'un champ de description qui peut etre null.
    price decimal(10,2) not null,
    quantity int DEFAULT 0,
    category_id int not null,
    constraint foreign key (category_id) references category(id)
);

create table product_cmd (
    id int primary key auto_increment,
	product_id int not null,
    command_id int not null,
	quantity int not null,
	constraint foreign key (product_id) references product(id),
    constraint foreign key (command_id) references command(id),
	constraint unique (command_id, product_id)	-- Ajout de la contraint pour rendre une association unique.
);

create table supplier_product(
	id int primary key auto_increment,
    supplier_id int not null,
    product_id int not null,
    constraint foreign key (supplier_id) references supplier(id),
    constraint foreign key (product_id) references product(id),
	constraint unique (supplier_id, product_id) -- Ajout de la contraint pour rendre une association unique.
);

DELIMITER |

CREATE TRIGGER calculate_total_price_after_insert
AFTER INSERT ON product_cmd
FOR EACH ROW
BEGIN
    DECLARE total DECIMAL(10, 2);

    -- Calculer le total de la commande en ajoutant le prix du produit multiplié par la quantité
    SELECT SUM(p.price * pc.quantity)
    INTO total
    FROM product p
    JOIN product_cmd pc ON p.id = pc.product_id
    WHERE pc.command_id = NEW.command_id;

    UPDATE command
    SET total_price = total
    WHERE id = NEW.command_id;
END |

DELIMITER ;