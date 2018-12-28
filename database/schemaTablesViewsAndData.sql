-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: board
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

--
-- Table structure for table `directorytbl`
--

DROP TABLE IF EXISTS `directorytbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `directorytbl` (
  `DID` bigint(15) unsigned NOT NULL AUTO_INCREMENT,
  `FacultyFirstName` varchar(50) NOT NULL,
  `FacultyLastName` varchar(50) NOT NULL,
  `FacultyOccupation` varchar(255) NOT NULL,
  `FacultyEmail` varchar(50) NOT NULL,
  `FacultyHeadshotImageReference` varchar(255) NOT NULL,
  PRIMARY KEY (`DID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directorytbl`
--

LOCK TABLES `directorytbl` WRITE;
/*!40000 ALTER TABLE `directorytbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `directorytbl` ENABLE KEYS */;
UNLOCK TABLES;

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
  `NewsSubHeading` varchar(30) NOT NULL,
  `NewsDescription` varchar(255) NOT NULL,
  `NewsText` varchar(2000) NOT NULL COMMENT 'Actual news text',
  `NewsURL` varchar(255) DEFAULT NULL,
  `NewsImageReference` varchar(255) DEFAULT NULL COMMENT 'If this is NULL, must use ImageColor',
  `NewsImageColor` varchar(16) DEFAULT 'FFFFFF' COMMENT 'Stored hex value',
  `NewsAcceptedIndicator` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`NID`),
  KEY `FK_UID_idx` (`UID`),
  CONSTRAINT `FK_News_UID` FOREIGN KEY (`UID`) REFERENCES `usertbl` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newstbl`
--

LOCK TABLES `newstbl` WRITE;
/*!40000 ALTER TABLE `newstbl` DISABLE KEYS */;
INSERT INTO `newstbl` VALUES (1,1,'ACM Meeting','08-20-18','There\'s a meeting..... (displayed on Slide page, limit of 255 chars, to be increased)','This would be the full description of the news (limit 2000 characters)','www.google.com','imgur.com','#FFFFFF',1),(2,2,'Fake Title','Fake Subheading','This is a bad description, should not display','Unaccepted','www.google.com/images','imgur.com','#000000',0);
/*!40000 ALTER TABLE `newstbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicationstbl`
--

DROP TABLE IF EXISTS `publicationstbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `publicationstbl` (
  `PubID` bigint(15) unsigned NOT NULL AUTO_INCREMENT,
  `UID` bigint(15) unsigned NOT NULL,
  `PubTitle` varchar(50) NOT NULL,
  `PubAuthors` varchar(255) NOT NULL COMMENT 'Comma delimited, or direct insert from form field that the user specifies (ideally, we have some sort of parsing for this ourselves)',
  `PubImageReference` varchar(255) NOT NULL COMMENT 'Never null. If when we upload the PDF or send link to PDF it''s null, we''ll insert a default image reference',
  `PubURL` varchar(255) NOT NULL,
  `PubAcceptedIndicator` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`PubID`),
  KEY `fk_UID_idx` (`UID`),
  CONSTRAINT `fk_UID` FOREIGN KEY (`UID`) REFERENCES `usertbl` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicationstbl`
--

LOCK TABLES `publicationstbl` WRITE;
/*!40000 ALTER TABLE `publicationstbl` DISABLE KEYS */;
INSERT INTO `publicationstbl` VALUES (1,1,'My Publication','Joshua Nishiguchi','somedefaultimage.jpg','http://www.google.com',0),(2,2,'My Other Pulication','Joshua Nishiguchi','somedefaultimage.jpg','http://www.google.com',1);
/*!40000 ALTER TABLE `publicationstbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentsuccesstbl`
--

DROP TABLE IF EXISTS `studentsuccesstbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `studentsuccesstbl` (
  `SSID` bigint(15) unsigned NOT NULL AUTO_INCREMENT,
  `SSTitle` varchar(50) NOT NULL,
  `SSStudentsInvolved` varchar(255) NOT NULL COMMENT 'Idea for now is it''s just names | Future, we can substitute with a new column for a comma delimited list of UIDs so we can have all information of all users involved (but this also only works under the assumption that the students involved have connected accounts)',
  `SSProjectDescription` varchar(50) NOT NULL,
  `SSProjectImageReference` varchar(255) NOT NULL,
  PRIMARY KEY (`SSID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentsuccesstbl`
--

LOCK TABLES `studentsuccesstbl` WRITE;
/*!40000 ALTER TABLE `studentsuccesstbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentsuccesstbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpermissionmastertbl`
--

DROP TABLE IF EXISTS `userpermissionmastertbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userpermissionmastertbl` (
  `UPID` int(11) NOT NULL COMMENT 'User permission ID',
  `UserPermissionTitle` varchar(50) NOT NULL,
  PRIMARY KEY (`UPID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Table that holds the names and permission level definitions for users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpermissionmastertbl`
--

LOCK TABLES `userpermissionmastertbl` WRITE;
/*!40000 ALTER TABLE `userpermissionmastertbl` DISABLE KEYS */;
INSERT INTO `userpermissionmastertbl` VALUES (0,'Student'),(1,'Admin');
/*!40000 ALTER TABLE `userpermissionmastertbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertbl`
--

DROP TABLE IF EXISTS `usertbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usertbl` (
  `UID` bigint(15) unsigned NOT NULL AUTO_INCREMENT,
  `UserFirstName` varchar(255) NOT NULL,
  `UserLastName` varchar(255) NOT NULL,
  `UserPermissionLevelID` int(11) NOT NULL,
  `UserPhone` varchar(50) DEFAULT NULL,
  `UserCity` varchar(50) DEFAULT NULL,
  `UserState` varchar(50) DEFAULT NULL,
  `UserCountry` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertbl`
--

LOCK TABLES `usertbl` WRITE;
/*!40000 ALTER TABLE `usertbl` DISABLE KEYS */;
INSERT INTO `usertbl` VALUES (1,'Joshua','Nishiguchi',0,'808-555-5555','Honolulu','HI','United States'),(2,'Christian','Trigonis',0,'808-555-1234','Honolulu','HI','UnitedStates'),(3,'Scott','Robertson',1,'808-555-9876','Honolulu','HI','United States');
/*!40000 ALTER TABLE `usertbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_news`
--

DROP TABLE IF EXISTS `view_news`;
/*!50001 DROP VIEW IF EXISTS `view_news`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `view_news` AS SELECT 
 1 AS `NewsTitle`,
 1 AS `NewsDescription`,
 1 AS `NewsText`,
 1 AS `NewsURL`,
 1 AS `NewsImageReference`,
 1 AS `NewsImageColor`,
 1 AS `NewsAcceptedIndicator`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_news`
--

/*!50001 DROP VIEW IF EXISTS `view_news`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_news` AS select `newstbl`.`NewsTitle` AS `NewsTitle`,`newstbl`.`NewsDescription` AS `NewsDescription`,`newstbl`.`NewsText` AS `NewsText`,`newstbl`.`NewsURL` AS `NewsURL`,`newstbl`.`NewsImageReference` AS `NewsImageReference`,`newstbl`.`NewsImageColor` AS `NewsImageColor`,`newstbl`.`NewsAcceptedIndicator` AS `NewsAcceptedIndicator` from `newstbl` where (`newstbl`.`NewsAcceptedIndicator` = 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-28  3:19:05
