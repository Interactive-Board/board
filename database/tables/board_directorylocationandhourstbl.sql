-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: board
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `directorylocationandhourstbl`
--

DROP TABLE IF EXISTS `directorylocationandhourstbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `directorylocationandhourstbl` (
  `DLocAndHoursID` bigint(15) unsigned NOT NULL AUTO_INCREMENT,
  `DID` bigint(20) unsigned NOT NULL,
  `DLocCourseName` varchar(50) DEFAULT NULL,
  `DLocOfficeLocation` varchar(50) DEFAULT NULL,
  `DLocOfficeHours` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`DLocAndHoursID`),
  KEY `fk_DID_idx` (`DID`),
  CONSTRAINT `fk_DID` FOREIGN KEY (`DID`) REFERENCES `directorytbl` (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Subtable to the Directory Table to hold multiple course information, multiple office locations, and multiple office hours';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directorylocationandhourstbl`
--

LOCK TABLES `directorylocationandhourstbl` WRITE;
/*!40000 ALTER TABLE `directorylocationandhourstbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `directorylocationandhourstbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-27 15:57:48
