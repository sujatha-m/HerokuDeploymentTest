### Schema
DROP DATABASE IF EXISTS cats_db;
CREATE DATABASE cats_db;
USE cats_db;

CREATE TABLE `cats`
(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`sleepy` BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
