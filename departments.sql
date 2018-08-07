DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE departments(
  department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45),
  over_head_costs FLOAT(10),
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Beauty and Health", 799);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 127);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Child Products", 439);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 876);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics and Accessories", 925);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Food and Grocery", 715);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home and Kitchen", 983);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Office Products", 831);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Pet Items", 115);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Sports and Outdoors", 328);