CREATE TABLE IF NOT EXISTS "User"(
                    user_email VARCHAR PRIMARY KEY, 
                    user_name VARCHAR NOT NULL);

INSERT INTO "User" (user_email, user_name)
VALUES
    ('nik@nik.com', 'nik')
ON CONFLICT (user_email) DO NOTHING;