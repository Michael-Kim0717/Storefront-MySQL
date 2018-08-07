DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45),
  department_name VARCHAR(45),
  price FLOAT(10),
  stock_quantity INTEGER(10),
  product_sales FLOAT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Markers", "Office Products", 6.00, 24, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Short Sleeve Blouse", "Clothing", 12.99, 15, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Picnic Blanket", "Sports and Outdoors", 10.00, 22, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Chromecast", "Electronics and Accessories", 39.99, 47, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Disinfectant Spray", "Home and Kitchen", 7.29, 5, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sanitizing Wipes", "Home and Kitchen", 11.50, 18, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Phone Chargers (3 Pack)", "Electronics and Accessories", 8.99, 32, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Shoes", "Clothing", 19.99, 25, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Salt Lamp", "Home and Kitchen", 9.99, 9, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Acrylic Paints", "Office Products", 9.99, 12, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sunglasses", "Clothing", 13.85, 25, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Echo Dot", "Electronics and Accessories", 29.99, 8, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Hand Sanitizer (4 Pack)", "Home and Kitchen", 20.88, 12, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Sanitizing Wipes", "Home and Kitchen", 11.50, 27, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Cell Phone Stand", "Electronics and Accessories", 6.99, 14, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Cast Iron Pan", "Home and Kitchen", 11.50, 7, 0);