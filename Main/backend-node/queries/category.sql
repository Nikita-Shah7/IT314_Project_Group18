CREATE TABLE IF NOT EXISTS category(
                    category_id VARCHAR PRIMARY KEY,
                    "categoryName" VARCHAR NOT NULL UNIQUE);

select*from category;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO category (category_id, "categoryName")
VALUES
    (uuid_generate_v4(),'Soups'),
    (uuid_generate_v4(),'Starters'),
    (uuid_generate_v4(),'Smoothie'),
    (uuid_generate_v4(),'Sabz e Bahar'),
    (uuid_generate_v4(),'Pizzas & Pastas'),
    (uuid_generate_v4(),'Bread & Roti'),
    (uuid_generate_v4(),'Sizzlers'),
    (uuid_generate_v4(),'Mocktails'),
    (uuid_generate_v4(),'Dessert & Delight'),
    (uuid_generate_v4(),'Chef Special'),
    (uuid_generate_v4(),'Rice & Curry'),
    (uuid_generate_v4(),'Appetizer'),
    (uuid_generate_v4(),'Beverages')
ON CONFLICT ("categoryName") DO NOTHING;