
CREATE TABLE `tbl_kjobs_settings` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`platform_commision` FLOAT NOT NULL DEFAULT '3.3',
	`priority_based_commision` FLOAT NOT NULL DEFAULT '2',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;


ALTER TABLE `tbl_kjobs_job_master`
	ADD COLUMN `total_price` FLOAT NOT NULL AFTER `updated_at`;


ALTER TABLE `tbl_kjobs_job_master`
	CHANGE COLUMN `duration_unit` `duration_unit` ENUM('minutes','hour','day','week','moth','year') NULL DEFAULT 'hour' AFTER `duration`;

ALTER TABLE `tbl_kjobs_job_master`
	CHANGE COLUMN `status` `status` ENUM('new','completed','cancelled','deleted','open') NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci' AFTER `duration_unit`;

ALTER TABLE `tbl_kjobs_users`
	ADD COLUMN `rating` TINYINT NOT NULL DEFAULT 0 AFTER `status`;
	
	ALTER TABLE `tbl_kjobs_users`
	ADD COLUMN `first_job_created_date` TIMESTAMP NOT NULL AFTER `updated_at`;
	
	ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE current_timestamp() AFTER `rating`,
	ADD COLUMN `first_job_created_date` TIMESTAMP NULL DEFAULT NULL AFTER `updated_at`;
	
	
	ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `first_job_created_date` `first_job_created_date` TIMESTAMP NULL AFTER `updated_at`;
    ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `rating` `rating` TINYINT NOT NULL DEFAULT '0' AFTER `status`;


    ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `notification_status` `notification_status` TINYINT(1) NULL DEFAULT 1 AFTER `driver_license_url`,
	CHANGE COLUMN `rating` `rating` TINYINT(4) NOT NULL DEFAULT 0 AFTER `status`;


   ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `first_job_created_date` `first_job_created_date` TIMESTAMP NULL DEFAULT NULL AFTER `rating`;


	ALTER TABLE `tbl_kjobs_users`
	ADD COLUMN `positive_feedback_total` FLOAT NULL DEFAULT NULL AFTER `first_job_created_date`;


	ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `rating` `rating` FLOAT NOT NULL DEFAULT 0 AFTER `status`;

	ALTER TABLE `tbl_kjobs_user_otp`
	ADD COLUMN `otp_type` ENUM('email','mobile') NOT NULL AFTER `otp`;

	ALTER TABLE `tbl_kjobs_user_otp`
	CHANGE COLUMN `otp_type` `otp_type` ENUM('email','mobile') NULL COLLATE 'utf8mb4_general_ci' AFTER `otp`;

	ALTER TABLE `tbl_kjobs_users`
	ADD COLUMN `profile_status` ENUM('0','1','2','3','4','5','6') NOT NULL DEFAULT '0' AFTER `email_verify_status`;

	ALTER TABLE `tbl_kjobs_user_otp`
	CHANGE COLUMN `otp` `otp` VARCHAR(11) NULL DEFAULT NULL AFTER `user_id`;

	ALTER TABLE `tbl_kjobs_users`
	ADD COLUMN `location` POINT NULL AFTER `profile_status`;

	ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `driver_license_url` `driver_license_url_front` TEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci' AFTER `ssn`;

	ALTER TABLE `tbl_kjobs_users`
	ADD COLUMN `driver_liscense_url_back` TEXT NULL DEFAULT NULL AFTER `driver_license_url_front`;

	ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `profile_status` `profile_status` ENUM('0','1','2','3','4','5','6','7') NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci' AFTER `email_verify_status`;

	ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `driver_liscense_url_back` `driver_license_url_back` TEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci' AFTER `driver_license_url_front`;

	ALTER TABLE `chatroommessages`
	CHANGE COLUMN `chatRoomMessagesId` `chatRoomMessagesId` INT(11) NOT NULL AUTO_INCREMENT FIRST;

	ALTER TABLE `chatreport`
	CHANGE COLUMN `chatReportId` `chatReportId` INT(11) NOT NULL AUTO_INCREMENT FIRST;

	RENAME TABLE `chatdispute` TO `tbl_kjobs_job_dispute`;
	ALTER TABLE `tbl_kjobs_job_dispute`
	ADD COLUMN `jobId` INT(11) NULL DEFAULT NULL AFTER `disputeText`;

	ALTER TABLE `tbl_kjobs_job_dispute`
	CHANGE COLUMN `chatDisputeId` `jobDisputeId` INT(11) NOT NULL AUTO_INCREMENT FIRST,
	DROP PRIMARY KEY,
	ADD PRIMARY KEY (`jobDisputeId`) USING BTREE;

	ALTER TABLE `chatroom`
	CHANGE COLUMN `chatRoomId` `chatRoomId` INT(11) NOT NULL AUTO_INCREMENT FIRST;

    ALTER TABLE `tbl_kjobs_users`
	ADD COLUMN `user_address` TEXT NULL AFTER `location`;

	ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `profile_status` `profile_status` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_general_ci' AFTER `email_verify_status`;

	ALTER TABLE `tbl_kjobs_users`
	CHANGE COLUMN `ssn` `ssn` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8_general_ci' AFTER `user_type`;

	CREATE TABLE `tbl_kjobs_app_feedback` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`id_user` INT(11) NOT NULL,
	`feedback` TEXT NOT NULL,
	`app_version` VARCHAR(100) NOT NULL DEFAULT '',
	`created_at` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8mb4_general_ci'
;

ALTER TABLE `tbl_kjobs_job_master`
	CHANGE COLUMN `duration` `duration` FLOAT NULL DEFAULT NULL AFTER `description`;

	ALTER TABLE `tbl_kjobs_job_master`
	CHANGE COLUMN `duration` `duration` FLOAT NULL DEFAULT NULL AFTER `description`;

	
ALTER TABLE `tbl_kjobs_job_master`
	ADD COLUMN `images` JSON NULL DEFAULT NULL AFTER `price`;
	ALTER TABLE `tbl_kjobs_job_master`
	CHANGE COLUMN `images` `images` TEXT NULL COLLATE 'utf8mb4_bin' AFTER `price`;

ALTER TABLE `tbl_kjobs_job_master`
	ADD COLUMN `job_address` VARCHAR(255) NULL DEFAULT NULL AFTER `description`;

	ALTER TABLE `tbl_kjobs_job_report`
	ADD COLUMN `job_id` INT(11) NOT NULL AFTER `id`;

	CREATE TABLE `tbl_kjobs_card_details` (
	`card_id` VARCHAR(255) NOT NULL,
	`card_number` VARCHAR(255) NOT NULL,
	`expiry_month` VARCHAR(2) NOT NULL,
	`expiry_year` VARCHAR(2) NOT NULL,
	`status` ENUM('active','deleted','inactive') NOT NULL DEFAULT 'active',
	`default` TINYINT(1) NULL DEFAULT 0,
	`created_at` TIMESTAMP NULL DEFAULT NULL,
	`updated_at` TIMESTAMP NULL DEFAULT NULL
)
COLLATE='utf8mb4_general_ci'
;

ALTER TABLE `tbl_kjobs_card_details`
	ADD COLUMN `user_id` INT(11) NOT NULL AFTER `card_id`;

	ALTER TABLE `tbl_kjobs_card_details`
	ADD COLUMN `card_type` VARCHAR(100) NOT NULL AFTER `updated_at`;

	ALTER TABLE `tbl_kjobs_card_details`
	ADD COLUMN `card_holder_name` VARCHAR(255) NOT NULL AFTER `card_type`;

	ALTER TABLE `tbl_kjobs_card_details`
	CHANGE COLUMN `default` `is_default` TINYINT(1) NULL DEFAULT '0' AFTER `status`;

	ALTER TABLE `tbl_kjobs_job_master`
	CHANGE COLUMN `status` `status` ENUM('new','completed','cancelled','deleted','open','payment-pending','in-progress') NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci' AFTER `duration_unit`;


ALTER TABLE `tbl_kjobs_job_report`
	ADD COLUMN `reported_to` INT(11) NOT NULL AFTER `feedback`;


ALTER TABLE `tbl_kjobs_job_master`
	ADD COLUMN `payment_method` INT(11) NULL DEFAULT NULL AFTER `poster_id`;

ALTER TABLE `tbl_kjobs_job_master`
	CHANGE COLUMN `payment_method` `payment_method` VARCHAR(255) NULL DEFAULT NULL AFTER `poster_id`;


ALTER TABLE `tbl_kjobs_job_master`
	ADD COLUMN `current_location` ENUM('1','0') NULL AFTER `job_address`;


CREATE TABLE `tbl_kjobs_app_feedback` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`id_user` INT(11) NOT NULL,
	`app_version` VARCHAR(100) NULL,
	`feedback` TEXT NOT NULL,
	`created_at` DATETIME NOT NULL DEFAULT 0
)
COLLATE='utf8mb4_general_ci'
;


ALTER TABLE `tbl_kjobs_job_master`
	ADD COLUMN `disputed` TINYINT NULL DEFAULT '0' AFTER `duration_unit`;


	ALTER TABLE `tbl_kjobs_job_master`
	ADD COLUMN `dispute_text` VARCHAR(255) NULL DEFAULT NULL AFTER `disputed`;

ALTER TABLE `tbl_kjobs_job_master`
	CHANGE COLUMN `dispute_text` `dispute_code` TINYINT(4) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci' AFTER `disputed`;

ALTER TABLE `tbl_kjobs_faq_master`
	CHANGE COLUMN `answer` `answer` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci' AFTER `question`;

ALTER TABLE `tbl_kjobs_faq_master`
	CHANGE COLUMN `question` `question` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci' AFTER `id`;
