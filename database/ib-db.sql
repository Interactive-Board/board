/*
Name: Interactive Board Database
Version 1.0
+ Initialized database
*********************************************************************
*/

CREATE DATABASE /*!32312 IF NOT EXISTS*/`board` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `board`;

/*Table structure for table `customers` */

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert  into `user`(`userNumber`,`userLastName`,`userFirstName`,`phone`,`city`,`state`,`country`) values 

DROP TABLE IF EXISTS