CREATE TABLE IF NOT EXISTS feedback(
                    feedback_id VARCHAR PRIMARY KEY, 
                    starate1 INT, 
                    starate2 INT, 
                    comments TEXT, 
                    date_time TIMESTAMP NOT NULL);
                    
INSERT INTO feedback ("feedback_id", "starate1", "starate2", "comments", "date_time") 
VALUES
(uuid_generate_v4(), 5, 1, 'I have the best dining experience with this place. Full five starts for the food.', '2023-12-25 12:50:30.126589'),
(uuid_generate_v4(), NULL,NULL,NULL, '2023-11-09 11:50:35.497'),
(uuid_generate_v4(), 4, 3, 'Amazing experience, great ambience and quality service. Food was awesome. So beautiful , so elegant, just serving like a wow.', '2023-11-09 11:54:32.581'),
(uuid_generate_v4(), 5, 1, 'I have the best dining experience with this place. Full five starts for the food.', '2023-12-25 12:50:30.126589'),
(uuid_generate_v4(), 5, 3, 'Italian food was not so good, however i liked indian authentic food.', '2023-12-25 12:50:30.126589'),
(uuid_generate_v4(), 3, 4, 'The food was great.Ambiance was awesome. However, staff was very rude and service can be improved.', '2023-12-25 12:50:30.126589'),
(uuid_generate_v4(), 4, 3, 'Costly food, good quality anyways.', '2023-12-25 12:50:30.126589'),
(uuid_generate_v4(), 2, 2, 'very expensive food, food not worth that much..', '2023-12-25 12:50:30.126589'),
(uuid_generate_v4(), 4, 5, 'Food was too good but service could have been better.', '"2023-12-25 12:50:30.126589'),
(uuid_generate_v4(), 0, 0, '', '2023-11-26 13:44:49.77')
ON CONFLICT ("feedback_id") DO NOTHING;

select*from feedback;