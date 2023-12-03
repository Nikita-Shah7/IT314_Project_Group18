CREATE TABLE IF NOT EXISTS "rsataurantMenu"(
                    menu_id VARCHAR PRIMARY KEY, 
                    "categoryName" VARCHAR NOT NULL REFERENCES category("categoryName") 
                        ON DELETE CASCADE
                        ON UPDATE CASCADE, 
                    menu_name VARCHAR NOT NULL UNIQUE, 
                    description TEXT, 
                    price INT NOT NULL,
                    profit INT NOT NULL, 
                    img TEXT);
                    
SELECT*FROM "restaurantMenu";

INSERT INTO "restaurantMenu" ("menu_id", "categoryName", "menu_name", "description", "price", "profit", "img")
VALUES
(uuid_generate_v4(), 'Chef Special', 'Quinoa Salad', 'Nutrient-packed quinoa with mixed greens, cherry tomatoes, and feta cheese', 390, 200,'https://images.app.goo.gl/UGJ5mi8GP6DSDb5YA')
ON CONFLICT(menu_name) DO NOTHING;