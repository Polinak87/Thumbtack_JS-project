USE `thumbtack`;

CREATE TABLE category (
id INT(11) NOT NULL AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,
PRIMARY KEY (id))
ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO category (name) values('dresses');
INSERT INTO category (name) values('skirts');
INSERT INTO category (name) values('blouses');
INSERT INTO category (name) values('trousers');
INSERT INTO category (name) values('jeans');
INSERT INTO category (name) values('shorts');
INSERT INTO category (name) values('hoodys');
INSERT INTO category (name) values('sweatshirts');
INSERT INTO category (name) values('blazers');
INSERT INTO category (name) values('vests');
INSERT INTO category (name) values('suits');
INSERT INTO category (name) values('T-shirt');

