
CREATE TABLE `chatdispute` (
  `chatDisputeId` int(11) NOT NULL,
  `disputeText` text,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `chatRoomId` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



-- --------------------------------------------------------

--
-- Table structure for table `chatreport`
--

CREATE TABLE `chatreport` (
  `chatReportId` int(11) NOT NULL,
  `reportText` text,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `chatRoomMessagesId` int(11) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `chatroom`
--

CREATE TABLE `chatroom` (
  `chatRoomId` int(11) NOT NULL,
  `pinnedChat` tinyint(1) NOT NULL DEFAULT '0',
  `deletedChat` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `receiverIdUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chatroom`
--


-- --------------------------------------------------------

--
-- Table structure for table `chatroommessages`
--

CREATE TABLE `chatroommessages` (
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


-- --------------------------------------------------------

--
-- Table structure for table `tbl_kjobs_users`
--

CREATE TABLE `tbl_kjobs_users` (
  `idUser` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(256) DEFAULT '1',
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `user_image` text,
  `user_type` smallint(6) NOT NULL DEFAULT '1',
  `ssn` varchar(100) NOT NULL DEFAULT '1',
  `driver_license_url` text NOT NULL,
  `notification_status` smallint(6) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `tbl_kjobs_user_bank_accounts`
--

CREATE TABLE `tbl_kjobs_user_bank_accounts` (
  `id` int(11) NOT NULL COMMENT 'Primary Key',
  `user_id` int(11) DEFAULT NULL,
  `account_holder_name` varchar(256) DEFAULT NULL,
  `account_number` varchar(256) DEFAULT '1',
  `bank_name` varchar(256) DEFAULT '1',
  `security_code` text,
  `status` enum('1','0') NOT NULL DEFAULT '1',
  `deault` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kjobs_user_skill`
--

CREATE TABLE `tbl_kjobs_user_skill` (
  `id` int(11) UNSIGNED NOT NULL,
  `skill_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kjobs_user_type_master`
--

CREATE TABLE `tbl_kjobs_user_type_master` (
  `id` int(11) UNSIGNED NOT NULL,
  `type_title` varchar(255) DEFAULT NULL,
  `short_desc` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `tb_kjobs_skill_master`
--

CREATE TABLE `tb_kjobs_skill_master` (
  `id` int(11) UNSIGNED NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `short_desc` varchar(255) DEFAULT NULL,
  `status` enum('1','0') DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chatdispute`
--
ALTER TABLE `chatdispute`
  ADD PRIMARY KEY (`chatDisputeId`),
  ADD KEY `chatRoomId` (`chatRoomId`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `chatreport`
--
ALTER TABLE `chatreport`
  ADD PRIMARY KEY (`chatReportId`),
  ADD KEY `chatRoomMessagesId` (`chatRoomMessagesId`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `chatroom`
--
ALTER TABLE `chatroom`
  ADD PRIMARY KEY (`chatRoomId`),
  ADD UNIQUE KEY `ChatRoom_idUser_receiverIdUser_unique` (`idUser`,`receiverIdUser`),
  ADD KEY `receiverIdUser` (`receiverIdUser`);

--
-- Indexes for table `chatroommessages`
--
ALTER TABLE `chatroommessages`
  ADD PRIMARY KEY (`chatRoomMessagesId`),
  ADD KEY `parentid` (`parentid`),
  ADD KEY `chatRoomId` (`chatRoomId`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `tbl_kjobs_users`
--
ALTER TABLE `tbl_kjobs_users`
  ADD PRIMARY KEY (`idUser`);

--
-- Indexes for table `tbl_kjobs_user_bank_accounts`
--
ALTER TABLE `tbl_kjobs_user_bank_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_kjobs_user_skill`
--
ALTER TABLE `tbl_kjobs_user_skill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_kjobs_user_type_master`
--
ALTER TABLE `tbl_kjobs_user_type_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_kjobs_skill_master`
--
ALTER TABLE `tb_kjobs_skill_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chatdispute`
--
ALTER TABLE `chatdispute`
  MODIFY `chatDisputeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chatreport`
--
ALTER TABLE `chatreport`
  MODIFY `chatReportId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chatroom`
--
ALTER TABLE `chatroom`
  MODIFY `chatRoomId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `chatroommessages`
--
ALTER TABLE `chatroommessages`
  MODIFY `chatRoomMessagesId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_kjobs_users`
--
ALTER TABLE `tbl_kjobs_users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_kjobs_user_bank_accounts`
--
ALTER TABLE `tbl_kjobs_user_bank_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key';

--
-- AUTO_INCREMENT for table `tbl_kjobs_user_skill`
--
ALTER TABLE `tbl_kjobs_user_skill`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_kjobs_user_type_master`
--
ALTER TABLE `tbl_kjobs_user_type_master`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_kjobs_skill_master`
--
ALTER TABLE `tb_kjobs_skill_master`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chatdispute`
--
ALTER TABLE `chatdispute`
  ADD CONSTRAINT `chatdispute_ibfk_1` FOREIGN KEY (`chatRoomId`) REFERENCES `chatroom` (`chatRoomId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chatdispute_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `tbl_kjobs_users` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `chatreport`
--
ALTER TABLE `chatreport`
  ADD CONSTRAINT `chatreport_ibfk_1` FOREIGN KEY (`chatRoomMessagesId`) REFERENCES `chatroommessages` (`chatRoomMessagesId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chatreport_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `tbl_kjobs_users` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `chatroom`
--
ALTER TABLE `chatroom`
  ADD CONSTRAINT `chatroom_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `tbl_kjobs_users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chatroom_ibfk_2` FOREIGN KEY (`receiverIdUser`) REFERENCES `tbl_kjobs_users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chatroommessages`
--
ALTER TABLE `chatroommessages`
  ADD CONSTRAINT `chatroommessages_ibfk_1` FOREIGN KEY (`parentid`) REFERENCES `chatroommessages` (`chatRoomMessagesId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chatroommessages_ibfk_2` FOREIGN KEY (`chatRoomId`) REFERENCES `chatroom` (`chatRoomId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chatroommessages_ibfk_3` FOREIGN KEY (`idUser`) REFERENCES `tbl_kjobs_users` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_kjobs_user_bank_accounts`
--
ALTER TABLE `tbl_kjobs_user_bank_accounts`
  ADD CONSTRAINT `tbl_kjobs_user_bank_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_kjobs_users` (`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
INSERT INTO `chatdispute` (`chatDisputeId`, `disputeText`, `deleted`, `createdAt`, `updatedAt`, `chatRoomId`, `idUser`) VALUES
(1, 'Testing', 0, '2022-01-25 18:31:38', '2022-01-25 18:31:38', 5, 1),
(2, 'Testing Dispute', 0, '2022-01-25 19:54:01', '2022-01-25 19:54:01', 6, 1);




INSERT INTO `chatroom` (`chatRoomId`, `pinnedChat`, `deletedChat`, `createdAt`, `updatedAt`, `idUser`, `receiverIdUser`) VALUES
(5, 0, 0, '2022-01-24 17:01:44', '2022-01-25 19:52:21', 1, 3),
(6, 0, 0, '2022-01-24 17:02:38', '2022-01-25 19:52:38', 1, 4),
(8, 0, 0, '2022-01-24 17:05:45', '2022-01-25 19:52:38', 1, 2);



--
-- Dumping data for table `chatroommessages`
--

INSERT INTO `chatroommessages` (`chatRoomMessagesId`, `messageText`, `isRead`, `deleted`, `createdAt`, `updatedAt`, `parentid`, `chatRoomId`, `idUser`) VALUES
(1, 'Editing Dispute', 0, 1, '2022-01-26 09:55:43', '2022-01-26 11:55:00', NULL, 6, 1),
(2, 'Testing Dispute', 0, 0, '2022-01-26 11:18:11', '2022-01-26 11:18:11', 1, 6, 1);



--
-- Dumping data for table `tbl_kjobs_users`
--

INSERT INTO `tbl_kjobs_users` (`idUser`, `first_name`, `last_name`, `email`, `status`, `user_image`, `user_type`, `ssn`, `driver_license_url`, `notification_status`, `created_at`) VALUES
(1, NULL, NULL, '1', '1', '1', 1, '1', 'htts', 1, '2022-01-21 17:40:20'),
(2, NULL, NULL, '1', '1', '1', 1, '1', 'htts', 1, '2022-01-21 17:40:26'),
(3, NULL, NULL, '1', '1', '1', 1, '1', 'htts', 1, '2022-01-21 17:40:30'),
(4, NULL, NULL, '1', '1', '1', 1, '1', 'htts', 1, '2022-01-21 17:58:37');



--
-- Dumping data for table `tbl_kjobs_user_type_master`
--

INSERT INTO `tbl_kjobs_user_type_master` (`id`, `type_title`, `short_desc`, `created_at`, `updated_at`) VALUES
(2, 'Service Provider', 'Service Provider', '2022-01-17 15:54:18', '2022-01-17 15:54:26'),
(3, 'Job Poster', 'Job Poster', '2022-01-17 15:54:18', '2022-01-17 15:54:26');
