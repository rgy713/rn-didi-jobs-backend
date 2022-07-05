-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.18-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for didijobs
DROP DATABASE IF EXISTS `didijobs`;
CREATE DATABASE IF NOT EXISTS `didijobs` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `didijobs`;

-- Dumping structure for table didijobs.tbl_kjobs_chat_group
DROP TABLE IF EXISTS `tbl_kjobs_chat_group`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_chat_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_chat_group: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_chat_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_chat_group` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_faq_master
DROP TABLE IF EXISTS `tbl_kjobs_faq_master`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_faq_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('1','0') NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_faq_master: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_faq_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_faq_master` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_job_application
DROP TABLE IF EXISTS `tbl_kjobs_job_application`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_job_application` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `applicant_id` int(11) DEFAULT NULL,
  `status` enum('new','accepted','rejected','revoked','deleted','cancelled') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_job_application: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_job_application` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_job_application` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_job_master
DROP TABLE IF EXISTS `tbl_kjobs_job_master`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_job_master` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `poster_id` int(11) DEFAULT NULL,
  `location` point DEFAULT NULL,
  `price` float DEFAULT NULL,
  `platform_commision` float DEFAULT NULL,
  `priority_posting` float DEFAULT NULL,
  `tools_required` tinyint(4) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `duration_unit` int(11) DEFAULT NULL,
  `status` enum('new','completed','cancelled','deleted','in-process') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_job_master: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_job_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_job_master` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_job_report
DROP TABLE IF EXISTS `tbl_kjobs_job_report`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_job_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feedback` text DEFAULT NULL,
  `reported_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `title` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_job_report: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_job_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_job_report` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_job_skills
DROP TABLE IF EXISTS `tbl_kjobs_job_skills`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_job_skills` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `skill_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_job_skills: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_job_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_job_skills` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_notification
DROP TABLE IF EXISTS `tbl_kjobs_notification`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `read_status` enum('read','new','deleted') NOT NULL DEFAULT 'new',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_notification: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_notification` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_skill_master
DROP TABLE IF EXISTS `tbl_kjobs_skill_master`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_skill_master` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `short_desc` varchar(255) DEFAULT NULL,
  `status` enum('1','0') DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Dumping data for table didijobs.tbl_kjobs_skill_master: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_skill_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_skill_master` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_users
DROP TABLE IF EXISTS `tbl_kjobs_users`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firebase_uid` varchar(255) DEFAULT NULL,
  `email_verify_status` enum('0','1') DEFAULT '0',
  `phone` varchar(11) DEFAULT NULL,
  `user_image` text DEFAULT NULL,
  `user_type` smallint(4) DEFAULT NULL,
  `ssn` varchar(100) DEFAULT '',
  `driver_license_url` text DEFAULT NULL,
  `notification_status` tinyint(1) DEFAULT 1,
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Dumping data for table didijobs.tbl_kjobs_users: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_users` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_user_bank_accounts
DROP TABLE IF EXISTS `tbl_kjobs_user_bank_accounts`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_user_bank_accounts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `account_holder_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `security_code` varchar(11) DEFAULT NULL,
  `status` enum('1','0') DEFAULT NULL,
  `default` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table didijobs.tbl_kjobs_user_bank_accounts: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_user_bank_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_user_bank_accounts` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_user_device
DROP TABLE IF EXISTS `tbl_kjobs_user_device`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_user_device` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) DEFAULT NULL,
  `fcm_token` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Dumping data for table didijobs.tbl_kjobs_user_device: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_user_device` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_user_device` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_user_otp
DROP TABLE IF EXISTS `tbl_kjobs_user_otp`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_user_otp` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `total_otp_count` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_user_otp: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_user_otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_user_otp` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_user_review
DROP TABLE IF EXISTS `tbl_kjobs_user_review`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_user_review` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `reviewer_id` int(11) NOT NULL,
  `ratings` float NOT NULL,
  `feedback` text DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table didijobs.tbl_kjobs_user_review: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_user_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_user_review` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_user_skill
DROP TABLE IF EXISTS `tbl_kjobs_user_skill`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_user_skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skill_id` (`skill_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Dumping data for table didijobs.tbl_kjobs_user_skill: ~0 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_user_skill` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_kjobs_user_skill` ENABLE KEYS */;

-- Dumping structure for table didijobs.tbl_kjobs_user_type_master
DROP TABLE IF EXISTS `tbl_kjobs_user_type_master`;
CREATE TABLE IF NOT EXISTS `tbl_kjobs_user_type_master` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type_title` varchar(255) DEFAULT NULL,
  `short_desc` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table didijobs.tbl_kjobs_user_type_master: ~2 rows (approximately)
/*!40000 ALTER TABLE `tbl_kjobs_user_type_master` DISABLE KEYS */;
INSERT INTO `tbl_kjobs_user_type_master` (`id`, `type_title`, `short_desc`, `created_at`, `updated_at`) VALUES
	(1, 'Service Provider', 'Service Provider', '2022-01-17 20:54:18', '2022-01-17 20:54:26'),
	(2, 'Job Poster', 'Job Poster', '2022-01-17 20:54:18', '2022-01-17 20:54:58');
/*!40000 ALTER TABLE `tbl_kjobs_user_type_master` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
DROP TABLE IF EXISTS `chatdispute`;
CREATE TABLE IF NOT EXISTS `chatdispute` (
  `chatDisputeId` int(11) NOT NULL,
  `disputeText` text,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `chatRoomId` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `chatreport`;
CREATE TABLE IF NOT EXISTS `chatreport` (
  `chatReportId` int(11) NOT NULL,
  `reportText` text,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `chatRoomMessagesId` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `chatroom`;
CREATE TABLE IF NOT EXISTS `chatroom` (
  `chatRoomId` int(11) NOT NULL,
  `pinnedChat` tinyint(1) NOT NULL DEFAULT '0',
  `deletedChat` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `receiverIdUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `chatroommessages`;
CREATE TABLE IF NOT EXISTS `chatroommessages` (
  `chatRoomMessagesId` int(11) NOT NULL,
  `messageText` text NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `parentid` int(11) DEFAULT NULL,
  `chatRoomId` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `chatdispute`
  ADD PRIMARY KEY (`chatDisputeId`),
  ADD KEY `chatRoomId` (`chatRoomId`),
  ADD KEY `idUser` (`idUser`);

  ALTER TABLE `chatreport`
  ADD PRIMARY KEY (`chatReportId`),
  ADD KEY `chatRoomMessagesId` (`chatRoomMessagesId`),
  ADD KEY `idUser` (`idUser`);


  ALTER TABLE `chatroom`
  ADD PRIMARY KEY (`chatRoomId`),
  ADD UNIQUE KEY `ChatRoom_idUser_receiverIdUser_unique` (`idUser`,`receiverIdUser`),
  ADD KEY `receiverIdUser` (`receiverIdUser`);

  ALTER TABLE `chatroommessages`
  ADD PRIMARY KEY (`chatRoomMessagesId`),
  ADD KEY `parentid` (`parentid`),
  ADD KEY `chatRoomId` (`chatRoomId`),
  ADD KEY `idUser` (`idUser`);


ALTER TABLE `chatdispute`
  MODIFY `chatDisputeId` int(11) NOT NULL AUTO_INCREMENT


