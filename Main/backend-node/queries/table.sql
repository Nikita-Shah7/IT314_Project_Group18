CREATE TABLE IF NOT EXISTS "table"(
                    table_id INT PRIMARY KEY,
                    capacity INT NOT NULL,
                    availability_status VARCHAR NOT NULL);

select*from "table";

INSERT INTO "table" (table_id, capacity, availability_status)
VALUES
    (1, 4, 'Occupied'),
    (2, 4, 'Available'),
    (3, 8, 'Occupied'),
    (4, 8, 'Occupied'),
    (5, 8, 'Available'),
    (6, 4, 'Available'),
    (7, 4, 'Available'),
    (8, 8, 'Occupied'),
    (9, 8, 'Available'),
    (10, 4, 'Available'),
    (11, 4, 'Occupied'),
    (12, 4, 'Occupied'),
    (13, 12, 'Occupied'),
    (14, 12, 'Available'),
    (15, 8, 'Occupied'),
    (16, 8, 'Occupied'),
    (17, 4, 'Available'),
    (18, 4, 'Available'),
    (19, 4, 'Occupied'),
    (20, 4, 'Available'),
    (21, 8, 'Available'),
    (22, 10, 'Occupied'),
    (23, 8, 'Available'),
    (24, 8, 'Occupied'),
    (25, 10, 'Occupied'),
    (26, 4, 'Available'),
    (27, 4, 'Available'),
    (28, 4, 'Occupied'),
    (29, 8, 'Occupied'),
    (30, 4, 'Available')
ON CONFLICT (table_id) DO NOTHING;