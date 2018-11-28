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
-- Table structure for table `newstbl`
--

DROP TABLE IF EXISTS `newstbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `newstbl` (
  `NID` bigint(15) unsigned NOT NULL AUTO_INCREMENT,
  `UID` bigint(15) unsigned NOT NULL,
  `NewsTitle` varchar(50) NOT NULL,
  `NewsDescription` varchar(255) NOT NULL,
  `NewsText` varchar(2000) NOT NULL COMMENT 'Actual news text',
  `NewsURL` varchar(255) DEFAULT NULL,
  `NewsImageReference` varchar(255) DEFAULT NULL COMMENT 'If this is NULL, must use ImageColor',
  `NewsImageColor` varchar(16) DEFAULT 'FFFFFF' COMMENT 'Stored hex value',
  `NewsAcceptedIndicator` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`NID`),
  KEY `FK_UID_idx` (`UID`),
  CONSTRAINT `FK_News_UID` FOREIGN KEY (`UID`) REFERENCES `usertbl` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newstbl`
--

LOCK TABLES `newstbl` WRITE;
/*!40000 ALTER TABLE `newstbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `newstbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-27 15:57:49
