BEGIN; /* start a transaction */

DROP TABLE IF EXISTS "user", category, expense, token;

DROP DOMAIN IF EXISTS email;
/* create a specific type in order to check that the data is a valid email */
CREATE DOMAIN email AS text 
    CHECK (VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

CREATE TABLE IF NOT EXISTS "user" (
    id  int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email email NOT NULL UNIQUE,
    password text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS category (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz DEFAULT NULL,
    user_id int NOT NULL REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS expense (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description text NOT NULL,
    price real NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz DEFAULT NULL,
    category_id int NOT NULL REFERENCES category (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS token (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    user_id int NOT NULL UNIQUE REFERENCES "user" (id) ON DELETE CASCADE, 
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz DEFAULT NULL
);

INSERT INTO "user" (email, password)
VALUES
    ('john@doe.fr', 12340),
    ('email@gmail.fr', 6454),
    ('jehn@doe.fr', 4568),
    ('juhn@doe.fr', 4654);

INSERT INTO category (name, user_id)
VALUES 
    ('vêtements', 1),
    ('nourriture', 4),
    ('sport', 3),
    ('livres', 2),
    ('jeux', 2),
    ('vacances', 1);

INSERT INTO expense (description, price, category_id)
VALUES
	('achats vêtements celio', 15, 1),
	('achats vêtements devred', 45.29, 1),
	('courses carrefour', 98.26, 2),
	('fruits grand frais', 10.8, 2),
	('running decathlon', 30, 3),
	('livres furet', 15, 4),
	('7Wonders jeu de société', 30, 5),
	('hôtel paris', 500, 5),
	('restaurants', 50.56, 6);

/* allow budget_master user to perform queries on the database */
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO budget_master;

ALTER TABLE "user" RENAME CONSTRAINT "user_email_key" TO "user_email_unique";
ALTER TABLE "token" RENAME CONSTRAINT "token_user_id_key" TO "token_user_id_unique";

COMMIT; /* end the transaction */