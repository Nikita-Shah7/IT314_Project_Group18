CREATE TABLE IF NOT EXISTS "Admin"(
                    admin_id VARCHAR PRIMARY KEY, 
                    admin_name VARCHAR NOT NULL UNIQUE, 
                    "password" VARCHAR NOT NULL);

INSERT INTO "Admin" (admin_id, admin_name, "password")
VALUES
    (1, '***', '***')
ON CONFLICT (admin_name) DO NOTHING;