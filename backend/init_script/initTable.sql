CREATE TABLE IF NOT EXISTS "user" (
    user_id SERIAL NOT NULL,
    user_joining_date DATE NOT NULL,
    PRIMARY KEY (user_id)
);

INSERT INTO "user" (user_id, user_joining_date)
VALUES (1, '2024-02-01'), (2, CURRENT_DATE), (3, '2024-02-10');

CREATE TABLE IF NOT EXISTS "expense_type" (
    expense_id SERIAL NOT NULL,
    expense_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (expense_id)
);

INSERT INTO "expense_type" (expense_id, expense_name)
VALUES (1, 'coffee'), (2, 'food'), (3, 'alcohol');

CREATE TABLE IF NOT EXISTS "expenses" (
    user_id INT NOT NULL,
    expense_id INT NOT NULL,
    expense_date DATE NOT NULL,
    expense_amount INT NOT NULL,
    PRIMARY KEY (user_id, expense_id, expense_date),
    FOREIGN KEY (user_id) REFERENCES "user"(user_id),
    FOREIGN KEY (expense_id) REFERENCES "expense_type"(expense_id)
);

INSERT INTO "expenses" (user_id, expense_id, expense_date, expense_amount)
VALUES 
(1, 1, '2024-02-12', 10), 
(1, 2, '2024-02-12', 50), 

(1, 1, '2024-02-11', 10), 
(1, 2, '2024-02-11', 20), 

(1, 1, '2024-02-10', 5), 

(1, 1, '2024-02-09', 10), 
(1, 2, '2024-02-09', 100), 

(1, 2, '2024-02-07', 50), 

(1, 2, '2024-02-05', 100), 

(1, 2, '2024-02-04', 30), 

(1, 1, '2024-02-03', 10), 
(1, 2, '2024-02-03', 70),

(3, 2, '2024-02-10', 100) 
;




