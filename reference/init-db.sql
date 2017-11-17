-- this file is a referenece for what is needed to create a table in a db and insert a few values into it.

CREATE TABLE shopping_list (
  id SERIAL UNIQUE PRIMARY KEY,
  item VARCHAR(40),
  cost REAL
);

INSERT INTO shopping_list(item, cost)
VALUES ('1lb Apples', 1.99);
INSERT INTO shopping_list(item, cost)
VALUES ('Yogurt', .98);
