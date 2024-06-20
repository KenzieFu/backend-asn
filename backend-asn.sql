-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2024 at 02:07 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend-asn`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `role` enum('OWNER','ADMIN','MEMBER') NOT NULL DEFAULT 'MEMBER',
  `accessToken` varchar(500) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `userRecap` varchar(80) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `username`, `name`, `email`, `password`, `phone`, `role`, `accessToken`, `avatar`, `userRecap`, `createdAt`, `updatedAt`) VALUES
(1, 'machmul pratama_948', 'Kenzie', 'kenziefubrianto@gmail.com', '$2a$12$j46dXn9ftpOtRmE4W8QJP.c54qla7w/eQHItSXDHEmLvh1M9tp.Ba', '6285171172279', 'MEMBER', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMSIsInVzZXJuYW1lIjoibWF', 'profile/nJ1tGUj1ukO1ZBTTDuawO.jpeg', NULL, '2024-06-08 14:57:49.564000', '2024-06-14 11:57:47.369000'),
(2, 'kenzie_849', 'Kenzie', 'kenz@gmail.com', '$2a$12$nOUxFgnoPsCysTg4UWN.t.EqIPZ.7cebJ4IJAePewkEYb/gZNkrZa', '6285171172279', 'MEMBER', NULL, NULL, NULL, '2024-06-14 12:12:09.769000', '2024-06-14 12:12:09.769000');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` bigint(20) NOT NULL,
  `category_alias` varchar(20) NOT NULL,
  `category_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_alias`, `category_name`) VALUES
(1, 'TIU', 'Tes Intelegensi Umum'),
(2, 'TWK', 'Test Wawasan Kebangsaan'),
(3, 'TKP', 'Tes Karakteristik Pribadi');

-- --------------------------------------------------------

--
-- Table structure for table `clearedcourse`
--

CREATE TABLE `clearedcourse` (
  `clearedCourse_id` bigint(20) NOT NULL,
  `course_id` bigint(20) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clearedcourse`
--

INSERT INTO `clearedcourse` (`clearedCourse_id`, `course_id`, `account_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2024-06-08 17:10:12.493000', '2024-06-08 17:10:12.493000'),
(2, 4, 1, '2024-06-08 17:10:15.523000', '2024-06-08 17:10:15.523000');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `course_image` varchar(200) DEFAULT NULL,
  `course_queue` int(11) DEFAULT NULL,
  `course_name` varchar(60) NOT NULL,
  `course_description` text DEFAULT NULL,
  `course_file` varchar(200) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `category_id`, `course_image`, `course_queue`, `course_name`, `course_description`, `course_file`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'course/nasionalisme/course_image-2024-05-16T05-32-11.752Z.png', 1, 'Nasionalisme', '', 'course/nasionalisme/course_file-2024-05-16T09:16:49.516Z.txt', '2024-05-16 05:32:11.808000', '2024-05-16 09:16:49.518000'),
(4, 1, 'course/belanegara/course_image-2024-05-17T02-53-39.264Z.jpeg', 2, 'Bela Negara', 'Memberikan penjelasan lebih mendalam mengenai pentingnya bela negara dalam keberlangsungan suatu negara', NULL, '2024-05-17 02:53:39.306000', '2024-05-17 02:53:39.306000');

-- --------------------------------------------------------

--
-- Table structure for table `historylat`
--

CREATE TABLE `historylat` (
  `historyLat_id` bigint(20) NOT NULL,
  `account_id` bigint(20) NOT NULL,
  `latsol_id` bigint(20) NOT NULL,
  `total_score` int(11) DEFAULT 0,
  `total_mudah` int(11) DEFAULT 0,
  `total_sedang` int(11) DEFAULT 0,
  `total_susah` int(11) DEFAULT 0,
  `total_benar` int(11) DEFAULT 0,
  `total_salah` int(11) DEFAULT 0,
  `total_kosong` int(11) DEFAULT 0,
  `total_pengerjaan` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `latsols`
--

CREATE TABLE `latsols` (
  `latsol_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `lat_desc` text DEFAULT NULL,
  `jumlah_soal` int(11) NOT NULL DEFAULT 10,
  `waktu` int(11) NOT NULL DEFAULT 720,
  `lat_thumb` varchar(255) NOT NULL,
  `lat_file` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notifikasis`
--

CREATE TABLE `notifikasis` (
  `notifikasi_id` bigint(20) NOT NULL,
  `account_id` bigint(20) NOT NULL,
  `notifikasi_title` varchar(60) NOT NULL DEFAULT 'Unknown',
  `isClicked` tinyint(1) NOT NULL DEFAULT 0,
  `notifikasi_msg` varchar(255) NOT NULL DEFAULT 'Unknown',
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifikasis`
--

INSERT INTO `notifikasis` (`notifikasi_id`, `account_id`, `notifikasi_title`, `isClicked`, `notifikasi_msg`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Transaksi sedang berlangsung', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" sedang diproses', '2024-06-08 15:52:24.609000', '2024-06-08 18:14:56.802000'),
(2, 1, 'Transaksi sedang berlangsung', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" sedang diproses', '2024-06-08 15:52:24.609000', '2024-06-08 15:52:24.609000'),
(3, 1, 'Transaksi Sukses', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" Sukses', '2024-06-08 17:49:26.075000', '2024-06-08 17:52:41.367000'),
(4, 1, 'Transaksi Sukses', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" Sukses', '2024-06-08 18:20:26.369000', '2024-06-08 18:28:28.837000'),
(5, 1, 'Transaksi Sukses', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" Sukses', '2024-06-07 18:20:26.369000', '2024-06-08 18:28:39.752000'),
(6, 1, 'Transaksi Sukses', 0, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" Sukses', '2024-06-04 18:20:26.369000', '2024-06-08 17:52:41.367000'),
(7, 1, 'Transaksi Sukses', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" Sukses', '2024-06-08 18:28:26.369000', '2024-06-08 18:28:33.943000'),
(8, 1, 'Transaksi Sukses', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" Sukses', '2024-06-08 18:31:31.547000', '2024-06-08 18:38:51.834000'),
(9, 1, 'Transaksi sedang berlangsung', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" sedang diproses', '2024-06-08 18:32:07.748000', '2024-06-08 18:38:45.765000'),
(10, 1, 'Transaksi Gagal', 1, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" Gagal', '2024-06-08 18:37:20.185000', '2024-06-08 18:37:34.070000'),
(11, 1, 'Transaksi Gagal', 0, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" Gagal', '2024-06-08 18:48:31.778000', '2024-06-08 18:48:31.778000'),
(12, 1, 'Transaksi sedang berlangsung', 0, 'Transaksi anda untuk \"1 Paket Tryout CPNS 2024\" sedang diproses', '2024-06-09 21:31:06.555000', '2024-06-09 21:31:06.555000');

-- --------------------------------------------------------

--
-- Table structure for table `skd_analysis`
--

CREATE TABLE `skd_analysis` (
  `skdAnalysis_id` bigint(20) NOT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `subCategory_id` bigint(20) DEFAULT NULL,
  `subCategory_score` int(11) DEFAULT NULL,
  `tryout_id` bigint(20) NOT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `subCategory_id` bigint(20) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `subCategory_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`subCategory_id`, `category_id`, `subCategory_name`) VALUES
(1, 1, 'Analogi'),
(2, 1, 'Silogisme'),
(3, 1, 'Analitis'),
(4, 1, 'Berhitung'),
(5, 1, 'Deret Angka'),
(6, 1, 'Perbandingan Kuantitatif'),
(7, 1, 'Soal Cerita'),
(8, 1, 'Ketidaksamaan'),
(9, 1, 'Serial'),
(10, 2, 'Nasionalisme'),
(11, 2, 'Integritas'),
(12, 2, 'Bela Negara'),
(13, 2, 'Pilar Negara'),
(14, 2, 'Bahasa Indonesia'),
(15, 3, 'Pelayanan Publik'),
(16, 3, 'Jejaringan Kerja'),
(17, 3, 'Sosial Budaya'),
(18, 3, 'TIK'),
(19, 3, 'Profesionalisme'),
(20, 3, 'Anti Radikalisme');

-- --------------------------------------------------------

--
-- Table structure for table `tryout`
--

CREATE TABLE `tryout` (
  `tryout_id` bigint(20) NOT NULL,
  `tryout_title` varchar(80) NOT NULL,
  `tryout_file` varchar(200) NOT NULL,
  `tryout_duration` int(11) NOT NULL,
  `tryout_total` int(11) NOT NULL,
  `tryout_status` enum('DISABLE','ACTIVE') DEFAULT 'ACTIVE',
  `tryout_type` enum('FREE','PAY') DEFAULT 'FREE',
  `tryout_price` float DEFAULT NULL,
  `tryout_closed` datetime DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tryout`
--

INSERT INTO `tryout` (`tryout_id`, `tryout_title`, `tryout_file`, `tryout_duration`, `tryout_total`, `tryout_status`, `tryout_type`, `tryout_price`, `tryout_closed`, `createdAt`, `updatedAt`) VALUES
(1, 'Tryout 1 CPNS 2024', 'tryout/tryout1cpns2024/quiz2.json', 12600, 110, 'ACTIVE', 'PAY', 10000, '2024-05-31 05:28:07', '2024-05-17 05:28:07.899000', '2024-05-17 05:28:07.899000'),
(4, 'Tryout 2 CPNS 2024', 'tryout/tryout1cpns2024/quiz2.json', 12600, 110, 'ACTIVE', 'PAY', 20000, '2024-05-31 05:28:07', '2024-05-17 05:28:07.899000', '2024-05-17 05:28:07.899000'),
(5, 'Tryout 3 CPNS 2024', 'tryout/tryout1cpns2024/quiz2.json', 12600, 110, 'ACTIVE', 'PAY', 20000, '2024-05-31 05:28:07', '2024-05-17 05:28:07.899000', '2024-05-17 05:28:07.899000');

-- --------------------------------------------------------

--
-- Table structure for table `tryoutbundle_tryout`
--

CREATE TABLE `tryoutbundle_tryout` (
  `ttb_id` bigint(20) NOT NULL,
  `tryout_id` varchar(80) NOT NULL,
  `tryoutBundle_id` varchar(200) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tryoutbundle_tryout`
--

INSERT INTO `tryoutbundle_tryout` (`ttb_id`, `tryout_id`, `tryoutBundle_id`, `createdAt`, `updatedAt`) VALUES
(1, '1', '5', '2024-05-29 10:23:03.835000', '2024-05-29 10:23:03.835000'),
(3, '2,3', '7', '2024-05-29 10:23:03.835000', '2024-05-29 10:23:03.835000');

-- --------------------------------------------------------

--
-- Table structure for table `tryoutscore`
--

CREATE TABLE `tryoutscore` (
  `tryoutScore_id` bigint(20) NOT NULL,
  `tryout_id` bigint(20) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `tryout_passed` enum('Passed','Failed') DEFAULT NULL,
  `twk_score` int(11) DEFAULT NULL,
  `tiu_score` int(11) DEFAULT NULL,
  `tkp_score` int(11) DEFAULT NULL,
  `twk_wrong` int(11) DEFAULT NULL,
  `tiu_wrong` int(11) DEFAULT NULL,
  `tryout_score` float DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tryouttoken`
--

CREATE TABLE `tryouttoken` (
  `tryoutToken_id` bigint(20) NOT NULL,
  `tryoutToken_code` varchar(200) DEFAULT NULL,
  `tryoutToken_status` enum('REDEEMED','UNUSED') DEFAULT 'UNUSED',
  `tryoutToken_listTryout` varchar(50) NOT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tryout_bundle`
--

CREATE TABLE `tryout_bundle` (
  `tryoutBundle_id` bigint(20) NOT NULL,
  `tryoutBundle_name` varchar(255) NOT NULL,
  `price` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `descList` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tryout_bundle`
--

INSERT INTO `tryout_bundle` (`tryoutBundle_id`, `tryoutBundle_name`, `price`, `description`, `descList`, `createdAt`, `updatedAt`) VALUES
(5, '1 Paket Tryout CPNS 2024', 20000, '1 Paket Tryout CPNS 2024 akan menemanimu meraih mimpi menjadi ASN tahun ini', '1x TRYOUT CPNS 2024,Pembahasan Soal Tryout,Perangkingan Nasional,Analisis Tryout Menggunakan AI,Materi Pembelajaran', '2024-05-29 10:23:03.711000', '2024-05-29 10:23:03.711000'),
(7, 'Paket 3 Tryout CPNS Premium', 35000, 'Paket ini adalah kesayangan kita semua dan juga kesayangan kamu', '2x TRYOUT CPNS 2024,Pembahasan Soal Tryout,Perangkingan Nasional,Analisis Tryout Menggunakan AI,Materi Pembelajaran', '2024-06-09 21:27:44.000000', '2024-06-09 21:27:44.000000');

-- --------------------------------------------------------

--
-- Table structure for table `usertransaction`
--

CREATE TABLE `usertransaction` (
  `transactionRecord_id` bigint(20) NOT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `transaction_title` varchar(255) NOT NULL,
  `jumlah_to` bigint(20) NOT NULL,
  `listTryout` varchar(255) NOT NULL,
  `bukti_transaksi` varchar(255) NOT NULL,
  `transaction_status` enum('SUKSES','SEDANG DIPROSES','GAGAL') DEFAULT NULL,
  `transaction_price` float DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usertransaction`
--

INSERT INTO `usertransaction` (`transactionRecord_id`, `account_id`, `transaction_title`, `jumlah_to`, `listTryout`, `bukti_transaksi`, `transaction_status`, `transaction_price`, `createdAt`, `updatedAt`) VALUES
(10, 1, '1 Paket Tryout CPNS 2024', 1, '1', 'transaction/eCpg8zIfmEriNUwqDkg0c.jpg', 'SEDANG DIPROSES', 10000, '2024-06-09 21:31:06.465000', '2024-06-09 21:31:06.465000');

-- --------------------------------------------------------

--
-- Table structure for table `usertryout`
--

CREATE TABLE `usertryout` (
  `userTryout_id` bigint(20) NOT NULL,
  `account_id` bigint(20) DEFAULT NULL,
  `tryout_id` bigint(20) DEFAULT NULL,
  `userTryout_status` enum('PAID','PENDING') DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usertryout`
--

INSERT INTO `usertryout` (`userTryout_id`, `account_id`, `tryout_id`, `userTryout_status`, `createdAt`, `updatedAt`) VALUES
(10, 1, 1, 'PENDING', '2024-06-09 21:31:06.516000', '2024-06-09 21:31:06.516000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `account_username_unique` (`username`),
  ADD UNIQUE KEY `account_email_unique` (`email`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_category_alias_unique` (`category_alias`),
  ADD UNIQUE KEY `category_category_name_unique` (`category_name`);

--
-- Indexes for table `clearedcourse`
--
ALTER TABLE `clearedcourse`
  ADD PRIMARY KEY (`clearedCourse_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_course_name_unique` (`course_name`);

--
-- Indexes for table `historylat`
--
ALTER TABLE `historylat`
  ADD PRIMARY KEY (`historyLat_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `latsol_id` (`latsol_id`);

--
-- Indexes for table `latsols`
--
ALTER TABLE `latsols`
  ADD PRIMARY KEY (`latsol_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `notifikasis`
--
ALTER TABLE `notifikasis`
  ADD PRIMARY KEY (`notifikasi_id`);

--
-- Indexes for table `skd_analysis`
--
ALTER TABLE `skd_analysis`
  ADD PRIMARY KEY (`skdAnalysis_id`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`subCategory_id`),
  ADD UNIQUE KEY `subcategory_sub_category_name_unique` (`subCategory_name`);

--
-- Indexes for table `tryout`
--
ALTER TABLE `tryout`
  ADD PRIMARY KEY (`tryout_id`),
  ADD UNIQUE KEY `tryout_tryout_title_unique` (`tryout_title`);

--
-- Indexes for table `tryoutbundle_tryout`
--
ALTER TABLE `tryoutbundle_tryout`
  ADD PRIMARY KEY (`ttb_id`);

--
-- Indexes for table `tryoutscore`
--
ALTER TABLE `tryoutscore`
  ADD PRIMARY KEY (`tryoutScore_id`),
  ADD KEY `tryout_id` (`tryout_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `tryouttoken`
--
ALTER TABLE `tryouttoken`
  ADD PRIMARY KEY (`tryoutToken_id`),
  ADD UNIQUE KEY `tryouttoken_tryout_token_code_unique` (`tryoutToken_code`);

--
-- Indexes for table `tryout_bundle`
--
ALTER TABLE `tryout_bundle`
  ADD PRIMARY KEY (`tryoutBundle_id`);

--
-- Indexes for table `usertransaction`
--
ALTER TABLE `usertransaction`
  ADD PRIMARY KEY (`transactionRecord_id`);

--
-- Indexes for table `usertryout`
--
ALTER TABLE `usertryout`
  ADD PRIMARY KEY (`userTryout_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `clearedcourse`
--
ALTER TABLE `clearedcourse`
  MODIFY `clearedCourse_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `historylat`
--
ALTER TABLE `historylat`
  MODIFY `historyLat_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `latsols`
--
ALTER TABLE `latsols`
  MODIFY `latsol_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifikasis`
--
ALTER TABLE `notifikasis`
  MODIFY `notifikasi_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `skd_analysis`
--
ALTER TABLE `skd_analysis`
  MODIFY `skdAnalysis_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `subCategory_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tryout`
--
ALTER TABLE `tryout`
  MODIFY `tryout_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tryoutbundle_tryout`
--
ALTER TABLE `tryoutbundle_tryout`
  MODIFY `ttb_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tryoutscore`
--
ALTER TABLE `tryoutscore`
  MODIFY `tryoutScore_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tryouttoken`
--
ALTER TABLE `tryouttoken`
  MODIFY `tryoutToken_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tryout_bundle`
--
ALTER TABLE `tryout_bundle`
  MODIFY `tryoutBundle_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `usertransaction`
--
ALTER TABLE `usertransaction`
  MODIFY `transactionRecord_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usertryout`
--
ALTER TABLE `usertryout`
  MODIFY `userTryout_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historylat`
--
ALTER TABLE `historylat`
  ADD CONSTRAINT `historylat_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historylat_ibfk_2` FOREIGN KEY (`latsol_id`) REFERENCES `latsols` (`latsol_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `latsols`
--
ALTER TABLE `latsols`
  ADD CONSTRAINT `latsols_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tryoutscore`
--
ALTER TABLE `tryoutscore`
  ADD CONSTRAINT `tryoutscore_ibfk_1` FOREIGN KEY (`tryout_id`) REFERENCES `tryout` (`tryout_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tryoutscore_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
