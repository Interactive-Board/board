/*
Name: Interactive Board Database
Version 1.0
+ Initialized database
*********************************************************************
*/

CREATE DATABASE /*!32312 IF NOT EXISTS*/`board` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `board`;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
	`userNumber` int(11) NOT NULL,
	`userLastName` varchar(50) NOT NULL,
	`userFirstName` varchar(50) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`city` varchar(50) NOT NULL,
	`state` varchar(50) DEFAULT NULL,
	`country` varchar(50) NOT NULL,
	PRIMARY KEY (`userNumber`),
	CONSTRAINT `user_ibfk_1`  REFERENCES `user` (`userNumber`)
	)
ENGINE=InnoDB DEFAULT CHARSET=utf-8;

insert  into `user`(`userNumber`,`userLastName`,`userFirstName`,`phone`,`city`,`state`,`country`) values 


/* Table structure for table publication*/
DROP TABLE IF EXISTS `publication`;

CREATE TABLE `publication`(
	`pubilicationNumber` int(11) NOT NULL,
	`title` varchar(50) NOT NULL,
	`author1` varchar(50) NOT NULL,
	`author2` varchar(50) NOT NULL,
	`abstract` varchar(50) NOT NULL,
	`imageReference` varchar(50) NOT NULL,
	`url` varchar(50) NOT NULL,
	PRIMARY KEY (`publicationNumber`),
	CONSTRAINT `publication_ibfk_` REFERENCES `user` (`userNumber`)
	)
ENGINE=InnoDB DEFAULT CHARSET=utf-8;

insert into `publication`(`publicationNumber`,`title`,`author1`,`author2`,`abstract`imageReference`,`url`)
values


	
