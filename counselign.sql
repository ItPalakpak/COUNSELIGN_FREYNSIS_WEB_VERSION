-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2025 at 05:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `counselign`
--
CREATE DATABASE IF NOT EXISTS `counselign` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `counselign`;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(6, 'Testing', 'Testinh Notif', '2025-11-25 16:08:24', '2025-11-25 16:08:24');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `preferred_date` date NOT NULL,
  `preferred_time` varchar(50) NOT NULL,
  `consultation_type` varchar(50) DEFAULT NULL,
  `method_type` varchar(50) NOT NULL,
  `purpose` text DEFAULT NULL,
  `counselor_preference` varchar(100) DEFAULT 'No preference',
  `description` text DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('pending','approved','rejected','completed','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `student_id`, `preferred_date`, `preferred_time`, `consultation_type`, `method_type`, `purpose`, `counselor_preference`, `description`, `reason`, `status`, `created_at`, `updated_at`) VALUES
(1, '2022311680', '2025-10-31', '10:00 AM - 11:00 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'blahblahblah', NULL, 'completed', '2025-10-29 13:07:40', '2025-11-01 07:28:34'),
(3, '2023123456', '2025-10-31', '10:00 AM - 11:00 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'blahblahblahblahblha', NULL, 'completed', '2025-10-29 13:44:09', '2025-11-01 07:28:34'),
(4, '2022123456', '2025-10-31', '1:00 PM - 2:00 PM', 'Individual Consultation', 'In-person', 'Psycho-Social Support', '0987654321', 'baskcbsudgfjhsdvb', NULL, 'completed', '2025-10-29 13:49:57', '2025-11-01 07:28:34'),
(6, '2020123456', '2025-10-31', '3:00 PM - 4:00 PM', 'Individual Consultation', 'In-person', 'Counseling', '0987654321', 'gcusgdsdbcusf', NULL, 'completed', '2025-10-29 14:02:03', '2025-11-01 07:28:34'),
(7, '2022311680', '2025-10-31', '11:00 AM - 11:30 AM', 'Individual Consultation', 'In-person', 'Initial Interview', '1234567890', 'dgfjhrwgfd vjfg', NULL, 'completed', '2025-10-29 14:12:29', '2025-11-01 07:28:34'),
(8, '2025123456', '2025-12-01', '1:00 PM - 1:30 PM', 'Individual Consultation', 'In-person', 'Psycho-Social Support', '1234567890', 'asbdjgahdsdv', NULL, 'completed', '2025-10-29 14:31:40', '2025-11-01 07:28:34'),
(9, '2025123456', '2025-12-01', '1:00 PM - 1:30 PM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'jfdsfdghsfdw', NULL, 'completed', '2025-10-29 14:51:14', '2025-11-01 07:28:34'),
(10, '2022311680', '2025-12-01', '1:30 PM - 2:00 PM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'sdhjcvsdcgsvc hcgsuyf', 'Reason from Counselor: Already booked the Follow-Up Session', 'cancelled', '2025-10-29 14:52:32', '2025-11-01 07:28:34'),
(11, '2023123456', '2025-12-01', '2:00 PM - 2:30 PM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'ifgusgcdsvf bsdjhfus', NULL, 'completed', '2025-10-29 14:59:52', '2025-11-01 07:28:34'),
(12, '2022123456', '2025-12-01', '2:30 PM - 3:00 PM', 'Individual Consultation', 'In-person', 'Initial Interview', '1234567890', 'a  fbuefg fje fbirgfrh', 'Reason from Counselor: iihb ghj', 'cancelled', '2025-10-29 15:04:50', '2025-11-01 07:28:34'),
(14, '2020123456', '2025-12-01', '3:30 PM - 4:00 PM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'ekdhsi wgruwef erjg ufy f', NULL, 'completed', '2025-10-29 15:07:59', '2025-11-01 07:28:34'),
(15, '2025123456', '2025-10-31', '10:30 AM - 11:00 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'mnx c fbsb f vcv  jfv vsv jhcvj v ccv svf cvjh vjs', 'Reason from Counselor: b v vgvvc svs vsh test lang', 'rejected', '2025-10-30 03:20:53', '2025-11-01 07:28:34'),
(16, '2025123456', '2025-10-31', '10:30 AM - 11:00 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'yigf gfsg c vfsv fvsjdf svvjsvj', 'Reason from Counselor: jhvvcvfhc', 'cancelled', '2025-10-30 03:22:14', '2025-11-01 07:28:34'),
(18, '2024123456', '2025-11-21', '10:30 AM - 11:00 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'fgsg bhsfv r', NULL, 'completed', '2025-10-30 09:00:52', '2025-11-01 07:28:34'),
(19, '2022311680', '2025-11-21', '10:00 AM - 10:30 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'hdsbfhjb ddf', 'Reason from Counselor: basta', 'rejected', '2025-10-30 09:36:45', '2025-11-01 07:28:34'),
(20, '2022311680', '2026-01-16', '10:00 AM - 10:30 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'nfsjnj befb sdf', 'Reason from Counselor: cancel lang', 'cancelled', '2025-10-30 09:39:37', '2025-11-07 12:18:21'),
(21, '2024123456', '2025-11-14', '10:30 AM - 11:00 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'djfsdbfsbvdcv', 'Reason from Counselor: gfghc v ghv', 'cancelled', '2025-10-30 11:08:54', '2025-11-01 07:28:34'),
(22, '2020123456', '2025-11-07', '10:00 AM - 10:30 AM', 'Individual Consultation', 'In-person', 'Group Counseling', '1234567890', 'fhbh bdbscdf bvhb fhdbv', 'Reason from Counselor: hg gh vgfgf', 'rejected', '2025-10-31 12:01:14', '2025-11-01 07:28:34'),
(23, '2020123456', '2025-11-14', '10:00 AM - 10:30 AM', 'Individual Consultation', 'In-person', 'Initial Interview', '1234567890', 'ggvvvyfc gc', 'Reason from Counselor: hfdhvb f', 'rejected', '2025-10-31 13:22:28', '2025-11-01 07:28:34'),
(24, '2020123456', '2025-11-14', '10:00 AM - 10:30 AM', 'Individual Consultation', 'In-person', 'Group Counseling', '1234567890', 'cv  cvdvc dc', 'Reason from Counselor: gbj nfnvj nf', 'cancelled', '2025-10-31 13:44:13', '2025-11-01 07:28:34'),
(27, '2021123456', '2025-11-07', '7:00 AM - 7:30 AM', 'Individual Consultation', 'In-person', 'Counseling', '1234509876', 'gv dbcsdc dc', NULL, 'completed', '2025-10-31 17:42:19', '2025-11-01 07:28:34'),
(28, '2024123456', '2025-11-28', '8:30 AM - 9:00 AM', 'Group Consultation', 'In-person', 'Psycho-Social Support', '1234509876', 'jhsxc sdv sdghc', 'Reason from Student: need to change schedule\n', 'cancelled', '2025-11-01 07:32:51', '2025-11-01 08:03:37'),
(32, '2022123456', '2025-11-28', '7:30 AM - 8:00 AM', 'Group Consultation', 'In-person', 'Counseling', '1234509876', 'gjxc dgcv dghdhgcv', NULL, 'completed', '2025-11-01 09:34:16', '2025-11-01 18:42:18'),
(33, '2023303640', '2025-11-28', '7:30 AM - 8:00 AM', 'Group Consultation', 'In-person', 'Counseling', '1234509876', 'd dghc gdc', NULL, 'completed', '2025-11-01 14:52:10', '2025-11-03 13:29:07'),
(36, '2023303640', '2025-11-28', '10:00 AM - 10:30 AM', 'Group Consultation', 'Online (Video)', 'Psycho-Social Support', '1234567890', 'c5fyyvyybg66g6g', NULL, 'completed', '2025-11-03 13:43:34', '2025-11-08 02:35:52'),
(42, '2022311680', '2025-11-10', '1:00 PM - 1:30 PM', 'Group Consultation', 'In-person', 'Counseling', '1234567890', 'try lang gud', NULL, 'completed', '2025-11-07 14:23:23', '2025-11-17 01:02:06'),
(44, '2023303640', '2025-11-17', '1:00 PM - 1:30 PM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'try lang ang functions', 'Reason from Counselor: try lang', 'cancelled', '2025-11-08 02:39:25', '2025-11-08 05:50:25'),
(45, '2023303640', '2025-11-24', '2:00 PM - 2:30 PM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'try lang sa counselor', 'Reason from Counselor: try lang', 'rejected', '2025-11-08 05:52:34', '2025-11-10 02:26:19'),
(46, '2023303640', '2025-11-28', '10:00 AM - 10:30 AM', 'Group Consultation', 'In-person', 'Counseling', '1234567890', 'try lang ang index', NULL, 'completed', '2025-11-11 06:59:15', '2025-11-16 23:02:00'),
(50, '2023303640', '2025-12-17', '2:00 PM - 2:30 PM', 'Individual Consultation', 'In-person', 'Counseling', '1234567890', 'try', NULL, 'approved', '2025-11-17 03:36:02', '2025-12-17 12:46:29'),
(51, '2023303610', '2025-11-27', '2:30 PM - 3:00 PM', 'Group Consultation', 'In-person', 'Counseling', '1234567890', 'try', NULL, 'completed', '2025-11-17 04:14:26', '2025-11-25 08:01:21'),
(52, '2023303630', '2025-11-27', '2:00 PM - 2:30 PM', 'Individual Consultation', 'In-person', 'Counseling', '0987654321', 'try lang po', NULL, 'pending', '2025-11-17 04:25:13', NULL),
(53, '2023303620', '2025-11-27', '2:30 PM - 3:00 PM', 'Individual Consultation', 'In-person', 'Counseling', '0987654321', 'try lang po', NULL, 'pending', '2025-11-17 04:27:56', NULL),
(54, '2024123456', '2025-11-27', '2:30 PM - 3:00 PM', 'Group Consultation', 'In-person', 'Counseling', '1234567890', 'try lang po', NULL, 'completed', '2025-11-17 04:31:20', '2025-12-17 14:11:28'),
(56, '1101101101', '2025-12-01', '9:00 AM - 9:30 AM', 'Individual Consultation', 'In-person', 'Psycho-Social Support', '1234567899', 'test', NULL, 'completed', '2025-11-27 01:28:07', '2025-11-27 01:58:47'),
(57, '2015311428', '2025-12-05', '10:00 AM - 10:30 AM', 'Individual Consultation', 'In-person', 'Psycho-Social Support', '1234567890', '', NULL, 'completed', '2025-11-27 01:47:25', '2025-12-17 14:11:32'),
(59, '1101101101', '2025-12-02', '8:30 AM - 9:00 AM', 'Group Consultation', 'Online (Video)', 'Psycho-Social Support', '1234567890', '', NULL, 'pending', '2025-11-27 02:50:13', NULL);

--
-- Triggers `appointments`
--
DELIMITER $$
CREATE TRIGGER `prevent_double_booking` BEFORE INSERT ON `appointments` FOR EACH ROW BEGIN
    DECLARE conflict_count INT DEFAULT 0;
    DECLARE individual_count INT DEFAULT 0;
    DECLARE group_count INT DEFAULT 0;
    
    IF NEW.consultation_type = 'Individual Consultation' THEN
        SELECT COUNT(*) INTO conflict_count
        FROM appointments 
        WHERE counselor_preference = NEW.counselor_preference 
        AND preferred_date = NEW.preferred_date 
        AND preferred_time = NEW.preferred_time 
        AND status IN ('pending', 'approved')
        AND counselor_preference != 'No preference'
        AND id != NEW.id;
        
        IF conflict_count > 0 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'This time slot is already booked. Individual consultations require exclusive time slots.';
        END IF;
    
    ELSEIF NEW.consultation_type = 'Group Consultation' THEN
        SELECT COUNT(*) INTO individual_count
        FROM appointments 
        WHERE counselor_preference = NEW.counselor_preference 
        AND preferred_date = NEW.preferred_date 
        AND preferred_time = NEW.preferred_time 
        AND status IN ('pending', 'approved')
        AND consultation_type = 'Individual Consultation'
        AND counselor_preference != 'No preference'
        AND id != NEW.id;
        
        IF individual_count > 0 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'This time slot is already booked for individual consultation. Group consultations cannot share time slots with individual consultations.';
        END IF;
        
        SELECT COUNT(*) INTO group_count
        FROM appointments 
        WHERE counselor_preference = NEW.counselor_preference 
        AND preferred_date = NEW.preferred_date 
        AND preferred_time = NEW.preferred_time 
        AND status IN ('pending', 'approved')
        AND consultation_type = 'Group Consultation'
        AND counselor_preference != 'No preference'
        AND id != NEW.id;
        
        IF group_count >= 5 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Group consultation slots are full for this time slot (maximum 5 participants).';
        END IF;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `prevent_double_booking_update` BEFORE UPDATE ON `appointments` FOR EACH ROW BEGIN
    DECLARE conflict_count INT DEFAULT 0;
    DECLARE individual_count INT DEFAULT 0;
    DECLARE group_count INT DEFAULT 0;
    
    IF (NEW.counselor_preference != OLD.counselor_preference 
        OR NEW.preferred_date != OLD.preferred_date 
        OR NEW.preferred_time != OLD.preferred_time
        OR NEW.consultation_type != OLD.consultation_type) THEN
        
        IF NEW.consultation_type = 'Individual Consultation' THEN
            SELECT COUNT(*) INTO conflict_count
            FROM appointments 
            WHERE counselor_preference = NEW.counselor_preference 
            AND preferred_date = NEW.preferred_date 
            AND preferred_time = NEW.preferred_time 
            AND status IN ('pending', 'approved')
            AND counselor_preference != 'No preference'
            AND id != NEW.id;
            
            IF conflict_count > 0 THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'This time slot is already booked. Individual consultations require exclusive time slots.';
            END IF;
        
        ELSEIF NEW.consultation_type = 'Group Consultation' THEN
            SELECT COUNT(*) INTO individual_count
            FROM appointments 
            WHERE counselor_preference = NEW.counselor_preference 
            AND preferred_date = NEW.preferred_date 
            AND preferred_time = NEW.preferred_time 
            AND status IN ('pending', 'approved')
            AND consultation_type = 'Individual Consultation'
            AND counselor_preference != 'No preference'
            AND id != NEW.id;
            
            IF individual_count > 0 THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'This time slot is already booked for individual consultation. Group consultations cannot share time slots with individual consultations.';
            END IF;
            
            SELECT COUNT(*) INTO group_count
            FROM appointments 
            WHERE counselor_preference = NEW.counselor_preference 
            AND preferred_date = NEW.preferred_date 
            AND preferred_time = NEW.preferred_time 
            AND status IN ('pending', 'approved')
            AND consultation_type = 'Group Consultation'
            AND counselor_preference != 'No preference'
            AND id != NEW.id;
            
            IF group_count >= 5 THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = 'Group consultation slots are full for this time slot (maximum 5 participants).';
            END IF;
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `counselors`
--

CREATE TABLE `counselors` (
  `id` int(11) NOT NULL,
  `counselor_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `civil_status` varchar(20) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `birthdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counselors`
--

INSERT INTO `counselors` (`id`, `counselor_id`, `name`, `degree`, `email`, `contact_number`, `address`, `created_at`, `updated_at`, `civil_status`, `sex`, `birthdate`) VALUES
(1, '1234567890', 'Freynsis Greys', 'Bachelor of Science in Information Technology', 'esangairemgrace@gmail.com', '09923757753', 'Sitio Migbanday, Poblacion, Claveria, Misamis Oriental', '2025-10-29 12:54:19', '2025-11-26 15:24:05', 'Single', 'Female', '2003-12-09'),
(2, '0987654321', 'Princess Grace Marie Z. Sitoy', 'BSIT', 'impactog0903@gmail.com', '09908765432', 'Migbanday, Claveria, Misamis Oriental', '2025-10-29 13:38:13', '2025-10-29 13:38:13', 'Single', 'Female', '2003-12-08'),
(5, '1234509876', 'Adelaide Belmont', 'Philippine HDIP', 'katkatluvie@gmail.com', '09786534211', 'Tingub, Mandaue City, Cebu, Philippines', '2025-10-31 09:25:49', '2025-11-26 07:44:08', 'Legally Separated', 'Female', '1997-06-18'),
(9, '1234567899', 'Sebastian Anthony Acierto', 'PH, D', 'sebastian.acierto133@gmail.com', '09091552792', 'Zone 7 Lanise', '2025-11-26 08:04:03', '2025-11-26 08:27:37', 'Married', 'Male', '2004-10-27'),
(10, '2023304900', 'Rhea Mae B. Cambarijan', 'BSIT', 'rheamaecambarijan7@gmail.com', '09205880890', 'Sta. Cruz Claveria Misamis Oriental', '2025-11-26 08:53:14', '2025-11-26 08:53:14', 'Single', 'Female', '2004-08-04'),
(11, '1111111111', 'Caroline Zap', 'LPT', 'paraisocaroline@gmail.com', '09123456789', 'Claveria  Mis Or', '2025-11-27 01:35:49', '2025-11-27 01:35:49', 'Married', 'Female', '1996-07-24');

-- --------------------------------------------------------

--
-- Table structure for table `counselor_availability`
--

CREATE TABLE `counselor_availability` (
  `id` int(11) NOT NULL,
  `counselor_id` varchar(10) NOT NULL,
  `available_days` enum('Monday','Tuesday','Wednesday','Thursday','Friday') NOT NULL,
  `time_scheduled` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counselor_availability`
--

INSERT INTO `counselor_availability` (`id`, `counselor_id`, `available_days`, `time_scheduled`, `created_at`) VALUES
(2, '1234567890', 'Friday', '10:00 AM-11:30 AM', '2025-10-29 13:05:03'),
(8, '1234567890', 'Tuesday', '7:00 AM-9:30 AM', '2025-10-30 11:10:56'),
(13, '1234567890', 'Wednesday', '7:30 AM-11:30 AM', '2025-11-17 00:57:48'),
(14, '0987654321', 'Thursday', '2:00 PM-3:00 PM', '2025-11-17 04:17:17'),
(17, '1234567890', 'Thursday', '1:00 PM-5:30 PM', '2025-11-25 13:40:28'),
(23, '1234567899', 'Monday', '9:00 AM-11:30 AM', '2025-11-26 08:05:56'),
(24, '1234567899', 'Tuesday', '9:00 AM-11:30 AM', '2025-11-26 08:05:56'),
(25, '1234567899', 'Wednesday', '9:00 AM-11:30 AM', '2025-11-26 08:05:56'),
(26, '1234567899', 'Thursday', '9:00 AM-11:30 AM', '2025-11-26 08:05:56'),
(27, '1234567899', 'Friday', '9:00 AM-11:30 AM', '2025-11-26 08:05:56'),
(28, '1111111111', 'Wednesday', '1:00 PM-4:00 PM', '2025-11-27 02:26:31'),
(29, '1111111111', 'Thursday', '1:00 PM-4:00 PM', '2025-11-27 02:26:31');

-- --------------------------------------------------------

--
-- Table structure for table `daily_quotes`
--

CREATE TABLE `daily_quotes` (
  `id` int(11) NOT NULL,
  `quote_text` text NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT 'Inspirational',
  `source` varchar(255) DEFAULT NULL,
  `submitted_by_id` varchar(50) NOT NULL,
  `submitted_by_name` varchar(255) NOT NULL,
  `submitted_by_role` enum('counselor','admin') DEFAULT 'counselor',
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `moderated_by` varchar(50) DEFAULT NULL,
  `moderated_at` timestamp NULL DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `times_displayed` int(11) DEFAULT 0,
  `last_displayed_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `daily_quotes`
--

INSERT INTO `daily_quotes` (`id`, `quote_text`, `author_name`, `category`, `source`, `submitted_by_id`, `submitted_by_name`, `submitted_by_role`, `submitted_at`, `status`, `moderated_by`, `moderated_at`, `rejection_reason`, `times_displayed`, `last_displayed_date`, `created_at`, `updated_at`) VALUES
(1, 'Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Winston Churchill', 'Motivational', NULL, 'system', 'System', 'admin', '2025-11-11 21:33:29', 'approved', '0000000001', '2025-11-12 05:33:29', NULL, 0, NULL, '2025-11-11 21:33:29', '2025-11-11 22:06:03'),
(2, 'Believe you can and you are halfway there.', 'Theodore Roosevelt', 'Inspirational', NULL, 'system', 'System', 'admin', '2025-11-11 21:33:29', 'approved', '0000000001', '2025-11-12 05:33:29', NULL, 0, NULL, '2025-11-11 21:33:29', '2025-11-11 22:06:03'),
(3, 'The only way to do great work is to love what you do.', 'Steve Jobs', 'Life', NULL, 'system', 'System', 'admin', '2025-11-11 21:33:29', 'approved', '0000000001', '2025-11-12 05:33:29', NULL, 0, NULL, '2025-11-11 21:33:29', '2025-11-11 22:06:03'),
(7, 'testing qoutes v2', 'Princess Grace Marie Sitoy', 'Courage', 'The Wandering One', '1234567890', 'shizcess', 'counselor', '2025-11-12 06:42:17', 'approved', '1', '2025-11-12 07:02:17', NULL, 0, NULL, '2025-11-12 06:42:17', '2025-11-12 07:02:17'),
(10, 'testing qoutes v5', 'Princess Grace Marie Sitoy', 'Inspirational', 'The Wandering One 2', '1234567890', 'shizcess', 'counselor', '2025-11-12 07:04:24', 'approved', '1', '2025-11-12 07:15:35', NULL, 0, NULL, '2025-11-12 07:04:24', '2025-11-12 07:15:35'),
(13, 'Our great glory is not in never failing, but in rising up every time we fail', 'Ralph Waldo Emerson', 'Inspirational', NULL, '1234567890', 'shizcess', 'counselor', '2025-11-24 09:34:24', 'approved', '1', '2025-11-27 02:18:41', NULL, 0, NULL, '2025-11-24 09:34:24', '2025-11-27 02:18:41'),
(14, '\"This is a quote, pls be inspired.\"', '- Unknown', 'Motivational', NULL, '1111111111', 'caroline', 'counselor', '2025-11-27 02:22:38', 'approved', '1', '2025-11-27 02:23:30', NULL, 0, NULL, '2025-11-27 02:22:38', '2025-11-27 02:23:30'),
(15, 'Harness your Own Way', 'Noah Osmont', 'Motivational', 'IMITA', '1234567890', 'shizcess', 'counselor', '2025-12-07 01:01:13', 'approved', '1', '2025-12-07 01:23:10', NULL, 0, NULL, '2025-12-07 01:01:13', '2025-12-07 01:23:10'),
(16, 'testing quotes editing', 'Noah Osmont', 'Perseverance', 'IMITA', '1234567890', 'shizcess', 'counselor', '2025-12-08 00:41:51', 'pending', NULL, NULL, NULL, 0, NULL, '2025-12-08 00:41:51', '2025-12-08 00:42:00');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `date`, `time`, `location`, `created_at`) VALUES
(5, 'Event test for counselor dashboard', 'Testing Announcement Dashboard', '2025-11-28', '09:10:00', 'Audi', '2025-11-16 00:10:48'),
(6, 'Event Test 3', 'Testing events carousel interaction', '2025-12-05', '09:30:00', 'Audi', '2025-11-24 13:12:13'),
(7, 'Carousel', 'Carousel Testing', '2025-11-28', '10:00:00', 'Audi', '2025-11-27 02:44:34');

-- --------------------------------------------------------

--
-- Table structure for table `follow_up_appointments`
--

CREATE TABLE `follow_up_appointments` (
  `id` int(11) NOT NULL,
  `counselor_id` varchar(10) NOT NULL,
  `student_id` varchar(100) NOT NULL,
  `parent_appointment_id` int(11) DEFAULT NULL COMMENT 'References the initial appointment or previous follow-up',
  `preferred_date` date NOT NULL,
  `preferred_time` varchar(50) NOT NULL,
  `consultation_type` varchar(50) NOT NULL,
  `follow_up_sequence` int(11) NOT NULL DEFAULT 1 COMMENT 'Track the sequence: 1st follow-up, 2nd follow-up, etc.',
  `description` text DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('pending','rejected','completed','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follow_up_appointments`
--

INSERT INTO `follow_up_appointments` (`id`, `counselor_id`, `student_id`, `parent_appointment_id`, `preferred_date`, `preferred_time`, `consultation_type`, `follow_up_sequence`, `description`, `reason`, `status`, `created_at`, `updated_at`) VALUES
(34, '1234567890', '2020123456', 14, '2025-12-19', '11:00 AM - 11:30 AM', 'Individual Counseling', 3, 'ef f ', ' fef  fef ', 'completed', '2025-10-30 12:32:21', '2025-10-30 13:24:13'),
(39, '1234567890', '2023123456', 11, '2025-12-26', '10:30 AM - 11:00 AM', 'Individual Counseling', 1, 'dgfgfsbf vds fsdj jh ', 'fsdfvv svf fvshgfv f gsdfv', 'completed', '2025-10-30 13:23:11', '2025-10-30 13:38:18'),
(40, '1234567890', '2023123456', 11, '2026-01-16', '10:30 AM - 11:00 AM', 'Individual Counseling', 2, 'dsakjbs bsdf', 'fsdfgsdfgsfb hj ', 'completed', '2025-10-30 13:39:52', '2025-10-30 13:54:53'),
(42, '1234567890', '2023123456', 11, '2026-02-20', '10:00 AM - 10:30 AM', 'Individual Counseling', 3, 'kxbvkxcvhj nv kv bgvf', 'sfugu jsbjb sdv jhsd', 'completed', '2025-10-30 13:59:26', '2025-10-30 16:27:39'),
(43, '1234567890', '2023123456', 11, '2025-11-21', '10:00 AM - 10:30 AM', 'Individual Counseling', 4, 'fd ', 'eehfsb sdgbs', 'cancelled', '2025-10-30 16:41:49', '2025-10-31 09:23:37'),
(44, '1234567890', '2020123456', 14, '2025-10-31', '10:00 AM - 10:30 AM', 'Individual Counseling', 4, 'ghf hhggngh ', 'hjghgnfg ', 'completed', '2025-10-30 17:59:59', '2025-10-31 09:24:14'),
(45, '1234567890', '2020123456', 14, '2025-11-07', '10:00 AM - 10:30 AM', 'Individual Counseling', 5, 'fdlsb dfvbdfkv ', 'bbc bvvb', 'cancelled', '2025-10-31 09:25:54', '2025-10-31 09:26:25'),
(46, '1234567890', '2020123456', 14, '2025-11-14', '10:00 AM - 10:30 AM', 'Individual Counseling', 6, 'gfd g g', 'fjd gf', 'cancelled', '2025-10-31 09:27:38', '2025-10-31 09:32:46'),
(47, '1234509876', '2021123456', 27, '2025-11-21', '8:30 AM - 9:00 AM', 'Individual Counseling', 1, 'dsfbhdb dfbefdv vd ', 'gfsv sfvsv ', 'completed', '2025-10-31 17:45:32', '2025-10-31 17:57:34'),
(48, '1234509876', '2021123456', 27, '2025-11-28', '8:00 AM - 8:30 AM', 'Individual Counseling', 2, 'fsd ', 'df sd', 'completed', '2025-10-31 17:58:00', '2025-11-01 15:58:42'),
(49, '1234509876', '2021123456', 27, '2025-11-28', '8:00 AM - 8:30 AM', 'Individual Counseling', 3, 'v svdc ', ' dc d cd', 'completed', '2025-11-01 16:03:32', '2025-11-01 17:16:11'),
(50, '1234567890', '2020123456', 14, '2025-11-14', '10:00 AM - 10:30 AM', 'Individual Counseling', 7, 'gdh hdg ', 'fef d ', 'completed', '2025-11-01 16:54:30', '2025-11-01 17:11:57'),
(52, '1234567890', '2023303640', 36, '2025-11-26', '2:00 PM - 2:30 PM', 'Personal Development', 1, 'try lang', 'taympers lang sa', 'cancelled', '2025-11-08 05:44:30', '2025-11-08 05:48:34'),
(53, '1234567890', '2023303640', 36, '2025-11-20', '2:00 PM - 2:30 PM', 'Crisis Intervention', 2, 'ededqwedqw', 'wdqwdwqdwqd', 'completed', '2025-11-09 10:59:53', '2025-11-09 23:51:16'),
(54, '1234567890', '2023303640', 36, '2025-11-27', '2:30 PM - 3:00 PM', 'Career Guidance', 3, 'testing', 'gi try ang notif', 'cancelled', '2025-11-10 00:10:14', '2025-11-10 06:08:08'),
(55, '1234567890', '2020123456', 14, '2025-11-28', '10:00 AM - 10:30 AM', 'Individual Counseling', 8, 'Testing', 'Testing...', 'completed', '2025-11-10 06:18:11', '2025-11-17 00:46:38'),
(56, '1234567890', '2023303640', 36, '2025-11-28', '10:30 AM - 11:00 AM', 'Crisis Intervention', 4, 'try lang', 'try lang', 'completed', '2025-11-24 15:16:47', '2025-11-25 05:35:03'),
(57, '1234567890', '2023123456', 11, '2025-11-28', '11:00 AM - 11:30 AM', 'Academic Counseling', 5, 'testing', 'testing', 'completed', '2025-11-25 08:05:45', '2025-11-25 08:11:14'),
(58, '1234567899', '2021113456', NULL, '2025-11-28', '9:00 AM - 9:30 AM', 'Individual Counseling', 1, 'testing', 'testing', 'pending', '2025-11-27 02:01:11', '2025-11-27 02:01:11'),
(59, '1234567890', '2023303640', 36, '2025-12-02', '7:30 AM - 8:00 AM', 'Career Guidance', 5, 'Testing shits', 'Testing ', 'completed', '2025-11-27 03:03:02', '2025-12-17 12:41:02'),
(60, '1234567890', '2023303640', 36, '2025-12-26', '10:30 AM - 11:00 AM', 'Crisis Intervention', 6, 'sample testing', 'testing', 'pending', '2025-12-17 12:41:32', '2025-12-17 12:41:32');

--
-- Triggers `follow_up_appointments`
--
DELIMITER $$
CREATE TRIGGER `maintain_followup_sequence` BEFORE INSERT ON `follow_up_appointments` FOR EACH ROW BEGIN
                IF NEW.parent_appointment_id IS NOT NULL THEN
                    SET NEW.follow_up_sequence = (
                        SELECT COALESCE(MAX(follow_up_sequence), 0) + 1 
                        FROM follow_up_appointments 
                        WHERE parent_appointment_id = NEW.parent_appointment_id
                    );
                END IF;
            END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_id` varchar(10) DEFAULT NULL,
  `receiver_id` varchar(10) DEFAULT NULL,
  `message_text` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `sender_id`, `receiver_id`, `message_text`, `is_read`, `created_at`) VALUES
(1, '2023303620', '1234567890', 'hi', 1, '2025-11-05 07:06:14'),
(2, '1234567890', '2023303620', 'hello', 1, '2025-11-05 07:08:23'),
(3, '2023303640', '1234509876', 'hi', 1, '2025-11-06 08:56:15'),
(4, '2023303640', '1234509876', 'hello', 1, '2025-11-06 09:08:25'),
(5, '1234509876', '2023303640', 'hi', 1, '2025-11-06 09:08:40'),
(6, '1234567890', '2023303620', 'hello', 0, '2025-11-06 09:12:30'),
(7, '2023303640', '1234567890', 'hi', 1, '2025-11-06 09:12:50'),
(8, '1234567890', '2023303640', 'hi', 1, '2025-11-06 09:13:17'),
(9, '1234567890', '2023303640', 'hi', 1, '2025-11-06 09:30:24'),
(10, '1234567890', '2023303640', 'hi', 1, '2025-11-06 09:30:52'),
(11, '1234567890', '2023303640', 'jelloooo', 1, '2025-11-06 09:31:32'),
(12, '1234567890', '2023303640', 'hellooooo', 1, '2025-11-06 09:31:42'),
(13, '1234567890', '2023303640', 'hshsbuhs', 1, '2025-11-06 09:32:47'),
(14, '1234567890', '2023303640', 'hhsushdbd', 1, '2025-11-06 09:32:49'),
(15, '1234567890', '2023303640', 'hdudbdhdbd', 1, '2025-11-06 09:32:51'),
(16, '1234567890', '2023303640', 'hsushsbshh', 1, '2025-11-06 09:37:01'),
(17, '1234567890', '2023303640', 'bsushwhzshus', 1, '2025-11-06 09:37:11'),
(18, '1234567890', '2023303640', 'sgeyevsysbus9whwehus', 1, '2025-11-06 09:37:16'),
(19, '1234567890', '2023303640', 'hi', 1, '2025-11-06 11:58:18'),
(20, '1234567890', '2023303640', 'hello', 1, '2025-11-06 11:58:52'),
(21, '2023303640', '1234567890', 'hi', 1, '2025-11-07 12:59:45'),
(22, '2023303640', '1234567890', 'dvfvdvsdvdsvdsvs vdvd', 1, '2025-11-07 13:10:14'),
(23, '2023303640', '1234567890', 'ascasdcsdcsadecsaed', 1, '2025-11-07 13:10:31'),
(24, '2023303640', '1234567890', 'wdad', 1, '2025-11-07 13:13:32'),
(25, '2023303640', '1234567890', 'wdqwdwqdqwd', 1, '2025-11-07 13:13:46'),
(26, '2023303640', '1234567890', 'scascasc', 1, '2025-11-07 13:20:38'),
(27, '2023303640', '1234567890', 'shsbsyswb', 1, '2025-11-08 09:54:35'),
(28, '1234567890', '2023303640', 'hrllo', 1, '2025-11-08 10:18:45'),
(29, '2023303640', '1234567890', 'wdadw', 1, '2025-11-09 11:04:15'),
(30, '1234567890', '2023303640', 'yycyyc6', 1, '2025-11-10 00:23:02'),
(31, '2023303640', '1234567890', 'saxaxsa', 1, '2025-11-10 01:53:07'),
(32, '2023303640', '1234509876', 'gyfg', 0, '2025-11-11 04:57:05'),
(33, '1234567890', '2023303620', 'hello', 0, '2025-11-16 04:45:32'),
(34, '1234567890', '2023303640', 'hello wazzup brudah', 1, '2025-11-16 09:05:09'),
(35, '2023303640', '1234567890', 'hey hey', 1, '2025-11-16 11:21:02'),
(36, '2023303640', '1234567890', 'hey', 1, '2025-11-16 11:21:13'),
(42, '1234567890', '2023303640', 'olla', 1, '2025-11-26 09:50:14'),
(43, '1234567890', '2023303640', 'como estas', 1, '2025-11-26 09:50:22'),
(44, '1234567890', '2023303640', 'senior', 1, '2025-11-26 09:50:34'),
(45, '2023303640', '1234567890', 'olla', 1, '2025-11-26 15:53:51'),
(46, '1101101101', '0987654321', 'Hi this is a test message', 0, '2025-11-27 01:25:02'),
(47, '1101101101', '1234567899', 'Hi this is a test message', 1, '2025-11-27 01:25:17'),
(48, '1101101101', '1234567899', 'charlang', 1, '2025-11-27 01:25:22'),
(49, '2021113456', '1234567899', 'Hi, good morning counselor.', 1, '2025-11-27 01:35:21'),
(50, '2015311428', '1111111111', 'hello', 1, '2025-11-27 01:42:45'),
(51, '2015311428', '1234567890', 'hi', 1, '2025-11-27 01:52:52'),
(52, '1234567890', '2015311428', 'Hello', 0, '2025-11-27 01:53:03'),
(53, '1234567899', '1101101101', 'Hello', 0, '2025-11-27 01:55:06'),
(54, '2015311428', '1234567899', 'replyi daw ko', 1, '2025-11-27 01:55:15'),
(55, '1234567899', '2015311428', 'reply ni maam', 0, '2025-11-27 01:55:44'),
(56, '1234567899', '2015311428', 'hello', 0, '2025-11-27 02:02:43'),
(57, '1111111111', '2015311428', 'hi mimiyaaaah', 0, '2025-11-27 02:20:33'),
(58, '1234567890', '2023303640', 'hloo', 1, '2025-11-27 02:32:41'),
(59, '1101101101', '1234567890', 'test', 1, '2025-11-27 02:34:31'),
(60, '1234567890', '1101101101', 'testing reply', 0, '2025-11-27 02:35:03'),
(61, '1234567890', '1101101101', 'holla', 0, '2025-11-27 02:36:24'),
(62, '2023303640', '1234567890', 'hello', 1, '2025-12-06 13:05:35'),
(63, '2023303640', '1234567890', 'hi', 1, '2025-12-06 13:05:43'),
(64, '2023303640', '1234567890', 'edwedew', 1, '2025-12-06 13:05:46'),
(65, '2023303640', '1234567899', '3rw4r34r', 0, '2025-12-06 13:06:02'),
(66, '2023303640', '1234567899', 'fregreg', 0, '2025-12-06 13:06:17'),
(67, '2023303640', '1234567899', 'regerg', 0, '2025-12-06 13:06:20'),
(68, '2023303640', '1234567899', 'greger', 0, '2025-12-06 13:06:28'),
(69, '2023303640', '1234567899', 'rfhreiohufigreg', 0, '2025-12-06 13:06:32'),
(70, '2023303640', '1234567890', 'ger', 1, '2025-12-06 13:06:41'),
(71, '1234567890', '2023303640', 'rgdgdgd', 1, '2025-12-06 13:06:57'),
(72, '1234567890', '2023303640', 'hellow', 1, '2025-12-06 13:11:49'),
(73, '1234567890', '2023303640', 'efwfdewd', 1, '2025-12-06 13:12:32'),
(74, '1234567890', '1101101101', 'daesaadsasdsad', 0, '2025-12-06 13:13:13'),
(75, '1234567890', '2023303640', 'yow yow', 1, '2025-12-06 13:52:25'),
(76, '1234567890', '2023303640', 'ohaha', 1, '2025-12-06 13:55:13'),
(77, '1234567890', '2023303640', 'hcsadhcasdcas', 1, '2025-12-06 13:55:16'),
(78, '1234567890', '2015311428', 'scacsac', 0, '2025-12-06 13:55:21'),
(79, '1234567890', '2015311428', 'scaasa', 0, '2025-12-06 13:55:26'),
(80, '2023303640', '1234567899', 'hi', 0, '2025-12-06 13:59:39'),
(81, '2023303640', '1234509876', 'hello', 0, '2025-12-06 13:59:47'),
(82, '1234567890', '2015311428', 'hi', 0, '2025-12-06 14:00:02'),
(83, '1234567890', '1101101101', 'hi', 0, '2025-12-06 14:00:16'),
(84, '1234567890', '2023303620', 'fvdfv', 0, '2025-12-06 14:00:25'),
(85, '1234567890', '2023303640', 'yow', 1, '2025-12-07 01:57:49'),
(86, '2023303640', '1234567890', 'yow', 1, '2025-12-07 01:58:23'),
(87, '2023303640', '1234567890', 'yow yow', 1, '2025-12-07 01:58:58'),
(88, '1234567890', '2023303620', 'hey', 0, '2025-12-07 22:49:08');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `related_id` int(11) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `event_date` datetime DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `related_id`, `is_read`, `event_date`, `appointment_date`, `created_at`) VALUES
(47, '0987654321', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(48, '2023123456', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(49, '2022123456', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(50, '2021123456', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(51, '2020123456', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(52, '2025123456', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(53, '2024123456', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(54, '1234509876', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(55, '2023303610', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(56, '2023303620', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(57, '2023303630', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(59, '2023305013', 'event', 'New Event: test', 'A new event has been scheduled for November 21, 2025 at 16:30:00 in SL', 1, 0, '2025-11-21 16:30:00', NULL, '2025-11-10 02:45:01'),
(62, '0987654321', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(63, '2023123456', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(64, '2022123456', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(65, '2021123456', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(66, '2020123456', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(67, '2025123456', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(68, '2024123456', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(69, '1234509876', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(70, '2023303610', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(71, '2023303620', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(72, '2023303630', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(74, '2023305013', 'announcement', 'New Announcement: Test announce', 'testing', 1, 0, NULL, NULL, '2025-11-10 02:48:50'),
(77, '0987654321', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(78, '2023123456', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(79, '2022123456', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(80, '2021123456', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(81, '2020123456', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(82, '2025123456', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(83, '2024123456', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(84, '1234509876', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(85, '2023303610', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(86, '2023303620', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(87, '2023303630', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(89, '2023305013', 'announcement', 'New Announcement: testing', 'testing', 2, 0, NULL, NULL, '2025-11-10 05:49:43'),
(92, '0987654321', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(93, '2023123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(94, '2022123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(95, '2021123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(96, '2020123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(97, '2025123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(98, '2024123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(99, '1234509876', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(100, '2023303610', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(101, '2023303620', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(102, '2023303630', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(104, '2023305013', 'event', 'New Event: Event test', 'A new event has been scheduled for November 27, 2025 at 07:00 in SL', 2, 0, '2025-11-27 07:00:00', NULL, '2025-11-10 05:50:21'),
(107, '0987654321', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(108, '2023123456', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(109, '2022123456', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(110, '2021123456', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(111, '2020123456', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(112, '2025123456', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(113, '2024123456', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(114, '1234509876', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(115, '2023303610', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(116, '2023303620', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(117, '2023303630', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(119, '2023305013', 'announcement', 'New Announcement: Testing', 'Testing', 3, 0, NULL, NULL, '2025-11-10 05:52:47'),
(122, '0987654321', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(123, '2023123456', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(124, '2022123456', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(125, '2021123456', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(126, '2020123456', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(127, '2025123456', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(128, '2024123456', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(129, '1234509876', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(130, '2023303610', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(131, '2023303620', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(132, '2023303630', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(134, '2023305013', 'announcement', 'New Announcement: Test1', 'Testing 1', 4, 0, NULL, NULL, '2025-11-10 05:55:42'),
(137, '0987654321', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(138, '2023123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(139, '2022123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(140, '2021123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(141, '2020123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(142, '2025123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(143, '2024123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(144, '1234509876', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(145, '2023303610', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(146, '2023303620', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(147, '2023303630', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(149, '2023305013', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-10 06:04:34'),
(151, '2020123456', 'follow_up_session', 'New Follow-up Session Created', 'Counselor Freynsis Greys has scheduled a new follow-up session for November 18, 2025 at 7:00 AM - 7:30 AM.', 55, 0, NULL, NULL, '2025-11-10 06:18:15'),
(155, '0987654321', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(156, '2023123456', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(157, '2022123456', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(158, '2021123456', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(159, '2020123456', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(160, '2025123456', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(161, '2024123456', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(162, '1234509876', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(163, '2023303610', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(164, '2023303620', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(165, '2023303630', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(167, '2023305013', 'event', 'New Event: Event Test 2', 'A new event has been scheduled for November 13, 2025 at 13:00 in Audi', 4, 0, '2025-11-13 13:00:00', NULL, '2025-11-13 03:53:14'),
(170, '0987654321', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(171, '2023123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(172, '2022123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(173, '2021123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(174, '2020123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(175, '2025123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(176, '2024123456', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(177, '1234509876', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(178, '2023303610', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(179, '2023303620', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(180, '2023303630', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(182, '2023305013', 'event', 'New Event: Event test', 'A new event has been scheduled for November 21, 2025 at 07:30:00 in SL', 3, 0, '2025-11-21 07:30:00', NULL, '2025-11-16 00:08:16'),
(185, '0987654321', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(186, '2023123456', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(187, '2022123456', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(188, '2021123456', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(189, '2020123456', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(190, '2025123456', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(191, '2024123456', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(192, '1234509876', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(194, '2023303620', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(195, '2023303630', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(197, '2023305013', 'event', 'New Event: Event test for counselor dashboard', 'A new event has been scheduled for November 28, 2025 at 09:10 in Audi', 5, 0, '2025-11-28 09:10:00', NULL, '2025-11-16 00:10:48'),
(199, '0987654321', 'appointment', 'New Appointment Request', 'Student Sihay, Dominic has requested a Group Consultation appointment on November 21, 2025 at 1:00 PM - 1:30 PM.', 0, 0, NULL, NULL, '2025-11-16 23:50:07'),
(202, '2020123456', 'follow_up_session', 'Follow-up Session Updated', 'Counselor Freynsis Greys has updated your follow-up session. New schedule: November 28, 2025 at 10:30 AM - 11:00 AM.', 55, 0, NULL, NULL, '2025-11-17 00:30:03'),
(203, '2020123456', 'follow_up_session', 'Follow-up Session Updated', 'Counselor Freynsis Greys has updated your follow-up session. New schedule: November 28, 2025 at 10:30 AM - 11:00 AM.', 55, 0, NULL, NULL, '2025-11-17 00:31:09'),
(204, '2020123456', 'follow_up_session', 'Follow-up Session Updated', 'Counselor Freynsis Greys has updated your follow-up session. New schedule: November 28, 2025 at 10:00 AM - 10:30 AM.', 55, 0, NULL, NULL, '2025-11-17 00:45:07'),
(210, '0987654321', 'appointment', 'New Appointment Request', 'Student Sy, Rex has requested a Individual Consultation appointment on November 27, 2025 at 2:00 PM - 2:30 PM.', 0, 0, NULL, NULL, '2025-11-17 04:25:17'),
(211, '0987654321', 'appointment', 'New Appointment Request', 'Student Exodus, Rex has requested a Individual Consultation appointment on November 27, 2025 at 2:30 PM - 3:00 PM.', 0, 0, NULL, NULL, '2025-11-17 04:27:59'),
(213, '2024123456', 'appointment', 'Appointment Approved', 'Congratulations! Your appointment on November 27, 2025 at 2:30 PM - 3:00 PM with Counselor Freynsis Greys has been approved. Please check your scheduled appointments for details.', 54, 0, NULL, NULL, '2025-11-17 13:05:35'),
(217, '0987654321', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(218, '2023123456', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(219, '2022123456', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(220, '2021123456', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(221, '2020123456', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(222, '2025123456', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(223, '2024123456', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(224, '1234509876', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(226, '2023303620', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(228, '2023305013', 'event', 'New Event: Event Test 3', 'A new event has been scheduled for December 5, 2025 at 09:30 in Audi', 6, 0, '2025-12-05 09:30:00', NULL, '2025-11-24 13:12:13'),
(233, '2023303660', 'appointment', 'Appointment Approved', 'Congratulations! Your appointment on November 28, 2025 at 10:30 AM - 11:00 AM with Counselor Freynsis Greys has been approved. Please check your scheduled appointments for details.', 55, 0, NULL, NULL, '2025-11-25 07:33:53'),
(234, '2023123456', 'follow_up_session', 'New Follow-up Session Created', 'Counselor Freynsis Greys has scheduled a new follow-up session for November 28, 2025 at 11:00 AM - 11:30 AM.', 57, 0, NULL, NULL, '2025-11-25 08:05:49'),
(237, '0987654321', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(238, '2023123456', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(239, '2022123456', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(240, '2021123456', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(241, '2020123456', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(242, '2025123456', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(243, '2024123456', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(244, '1234509876', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(245, '2023303610', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(246, '2023303620', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(248, '2023303660', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(249, '2023303670', 'announcement', 'New Announcement: Testing', 'Testing', 5, 0, NULL, NULL, '2025-11-25 08:47:08'),
(252, '1234567890', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(253, '0987654321', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(254, '2023123456', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(255, '2022123456', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(256, '2021123456', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(257, '2020123456', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(258, '2025123456', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(259, '2024123456', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(260, '1234509876', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(261, '2023303610', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(262, '2023303620', 'announcement', 'New Announcement: Testing', 'Testing notif positions', 5, 0, NULL, NULL, '2025-11-25 16:07:22'),
(266, '0987654321', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(267, '2023123456', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(268, '2022123456', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(269, '2021123456', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(270, '2020123456', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(271, '2025123456', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(272, '2024123456', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(273, '1234509876', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(275, '2023303620', 'announcement', 'New Announcement: Testing', 'Testinh Notif', 6, 0, NULL, NULL, '2025-11-25 16:08:25'),
(277, '1234567899', 'appointment', 'New Appointment Request', 'Student 1101101101 has requested a Individual Consultation appointment on December 1, 2025 at 9:00 AM - 9:30 AM.', 0, 0, NULL, NULL, '2025-11-27 01:28:07'),
(279, '1234567899', 'appointment', 'New Appointment Request', 'Student Acierto, Seb has requested a Group Consultation appointment on December 5, 2025 at 9:00 AM - 9:30 AM.', 0, 0, NULL, NULL, '2025-11-27 01:48:35'),
(281, '1101101101', 'appointment', 'Appointment Approved', 'Congratulations! Your appointment on December 1, 2025 at 9:00 AM - 9:30 AM with Counselor Sebastian Anthony Acierto has been approved. Please check your scheduled appointments for details.', 56, 0, NULL, NULL, '2025-11-27 01:54:16'),
(283, '2021113456', 'appointment', 'Appointment Approved', 'Congratulations! Your appointment on December 8, 2025 at 9:00 AM - 9:30 AM with Counselor Sebastian Anthony Acierto has been approved. Please check your scheduled appointments for details.', 58, 0, NULL, NULL, '2025-11-27 02:00:34'),
(284, '2021113456', 'follow_up_session', 'New Follow-up Session Created', 'Counselor Sebastian Anthony Acierto has scheduled a new follow-up session for November 28, 2025 at 9:00 AM - 9:30 AM.', 58, 0, NULL, NULL, '2025-11-27 02:01:15'),
(285, '2022311680', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(286, '1234567890', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(287, '0987654321', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(288, '2023123456', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(289, '2022123456', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(290, '2021123456', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(291, '2020123456', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(292, '2025123456', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(293, '2024123456', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(294, '1234509876', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(295, '2023303610', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(296, '2023303620', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(298, '1234567899', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(299, '2023304900', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(300, '1012345678', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(301, '1012345670', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(302, '1101101101', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(303, '2022132344', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(304, '2021113456', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(305, '1111111111', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(306, '2015311428', 'event', 'New Event: Carousel', 'A new event has been scheduled for November 28, 2025 at 10:00 in Audi', 7, 0, '2025-11-28 10:00:00', NULL, '2025-11-27 02:44:34'),
(314, '2023303640', 'follow_up_session', 'New Follow-up Session Created', 'Counselor Freynsis Greys has scheduled a new follow-up session for December 26, 2025 at 10:30 AM - 11:00 AM.', 60, 1, NULL, NULL, '2025-12-17 12:41:36');

-- --------------------------------------------------------

--
-- Table structure for table `notification_reads`
--

CREATE TABLE `notification_reads` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `notification_type` enum('event','announcement') NOT NULL,
  `related_id` int(11) NOT NULL,
  `read_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification_reads`
--

INSERT INTO `notification_reads` (`id`, `user_id`, `notification_type`, `related_id`, `read_at`) VALUES
(22, '1234567890', 'announcement', 1, '2025-11-10 02:47:23'),
(23, '1234567890', 'event', 1, '2025-11-10 02:47:23'),
(24, '1234567890', 'event', 2, '2025-11-10 05:51:16'),
(25, '1234567890', 'announcement', 2, '2025-11-10 05:51:16'),
(26, '2023303640', 'event', 2, '2025-11-10 05:52:12'),
(27, '2023303640', 'announcement', 2, '2025-11-10 05:52:12'),
(28, '2023303640', 'event', 1, '2025-11-10 05:52:12'),
(29, '2023303640', 'announcement', 1, '2025-11-10 05:52:12'),
(30, '2023303640', 'announcement', 3, '2025-11-10 05:53:09'),
(31, '2023303640', 'announcement', 4, '2025-11-10 06:03:45'),
(32, '2023303640', 'event', 3, '2025-11-10 06:05:51'),
(33, '1234567890', 'event', 3, '2025-11-10 06:07:51'),
(34, '2023303640', 'event', 4, '2025-11-13 03:56:33'),
(35, '1234567890', 'event', 5, '2025-11-16 04:46:10'),
(36, '2023303640', 'event', 5, '2025-11-17 07:35:32'),
(37, '2023303640', 'event', 6, '2025-11-24 13:15:27'),
(38, '1234567890', 'event', 6, '2025-11-24 13:45:11'),
(39, '2023303660', 'event', 6, '2025-11-25 07:18:48'),
(40, '2023303660', 'event', 5, '2025-11-25 07:18:54'),
(41, '2023303640', 'announcement', 5, '2025-11-25 12:06:01'),
(42, '1234567890', 'announcement', 5, '2025-11-25 14:54:27'),
(43, '1234567890', 'announcement', 6, '2025-11-25 16:09:27'),
(44, '2023303640', 'announcement', 6, '2025-11-25 16:09:40'),
(45, '2022311680', 'announcement', 6, '2025-11-25 16:42:38'),
(46, '2022311680', 'event', 5, '2025-11-25 16:42:41'),
(47, '2022311680', 'event', 6, '2025-11-25 16:42:41'),
(48, '2023303610', 'event', 6, '2025-11-25 19:13:40'),
(49, '2023303610', 'announcement', 6, '2025-11-25 19:13:41'),
(50, '2023303610', 'event', 5, '2025-11-25 19:13:43'),
(51, '1101101101', 'event', 5, '2025-11-27 01:22:47'),
(52, '1101101101', 'event', 6, '2025-11-27 01:22:47'),
(53, '1101101101', 'announcement', 6, '2025-11-27 01:22:47'),
(54, '2021113456', 'announcement', 6, '2025-11-27 01:38:10'),
(55, '2021113456', 'event', 6, '2025-11-27 01:38:15'),
(56, '2015311428', 'announcement', 6, '2025-11-27 01:42:15'),
(57, '2015311428', 'event', 6, '2025-11-27 01:42:16'),
(58, '2015311428', 'event', 5, '2025-11-27 01:42:17'),
(59, '1111111111', 'announcement', 6, '2025-11-27 02:19:17'),
(60, '1111111111', 'event', 6, '2025-11-27 02:19:22');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `reset_code` varchar(10) NOT NULL,
  `reset_expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `resource_type` enum('file','link') NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `file_type` varchar(100) DEFAULT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `external_url` varchar(1000) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `uploaded_by` varchar(10) NOT NULL,
  `visibility` enum('all','students','counselors') DEFAULT 'all',
  `is_active` tinyint(1) DEFAULT 1,
  `view_count` int(11) DEFAULT 0,
  `download_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `title`, `description`, `resource_type`, `file_name`, `file_path`, `file_type`, `file_size`, `external_url`, `category`, `tags`, `uploaded_by`, `visibility`, `is_active`, `view_count`, `download_count`, `created_at`, `updated_at`) VALUES
(5, 'Network Chuck', 'Test Link 1', 'link', NULL, NULL, NULL, NULL, 'https://www.youtube.com/watch?v=v477fvbj3rk', 'Sample', 'career planning', '0000000001', 'students', 1, 0, 0, '2025-11-12 16:13:26', '2025-11-18 06:35:23'),
(6, 'Sample Video', 'Testing Video File upload', 'file', '2025-09-25 20-26-14.mkv', 'uploads/resources/1763161924_e907bf53b9ce2063.mkv', 'video/x-matroska', 11215703, NULL, 'Testing', 'career planning', '0000000001', 'all', 1, 0, 3, '2025-11-14 23:12:04', '2025-12-07 23:47:42'),
(7, 'Sample PPT', 'Testing Sample PPT', 'file', 'Group7_Customer_Discovery_week2.pptx', 'uploads/resources/1763162811_0753cc35ebf41bce.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 34721195, NULL, 'Sample', 'career planning', '0000000001', 'all', 1, 0, 6, '2025-11-14 23:26:51', '2025-12-07 23:09:05'),
(9, 'Sample PDF', 'Testing Sample PDF', 'file', 'CCNA-200-301-1.pdf', 'uploads/resources/1763162913_91484fdcfc80881c.pdf', 'application/pdf', 20163916, NULL, 'Test', 'career planning', '0000000001', 'students', 1, 0, 4, '2025-11-14 23:28:33', '2025-11-27 01:23:35'),
(10, 'Sample Ext Link', 'Testing the Link resources', 'link', NULL, NULL, NULL, NULL, 'https://www.quora.com/Can-you-give-me-some-knowledge-about-anything-that-you-know', 'Knowledge', 'questions,', '0000000001', 'all', 1, 0, 0, '2025-11-26 09:31:53', '2025-11-26 09:31:53');

-- --------------------------------------------------------

--
-- Table structure for table `student_academic_info`
--

CREATE TABLE `student_academic_info` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `course` varchar(50) NOT NULL,
  `year_level` varchar(10) NOT NULL,
  `major_or_strand` varchar(50) NOT NULL,
  `academic_status` varchar(50) NOT NULL,
  `school_last_attended` varchar(255) DEFAULT NULL,
  `location_of_school` varchar(255) DEFAULT NULL,
  `previous_course_grade` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_academic_info`
--

INSERT INTO `student_academic_info` (`id`, `student_id`, `course`, `year_level`, `major_or_strand`, `academic_status`, `school_last_attended`, `location_of_school`, `previous_course_grade`, `created_at`, `updated_at`) VALUES
(1, '2022311680', 'BSIT', 'II', '', 'Continuing/Old', 'N/A', 'N/A', 'N/A', '2025-10-29 03:17:08', '2025-11-25 17:08:03'),
(2, '2021123456', 'BSIT', 'I', '0', 'New Student', NULL, NULL, NULL, '2025-10-29 06:37:59', '2025-10-29 06:37:59'),
(3, '2020123456', 'BSIT', 'I', '0', 'Continuing/Old', NULL, NULL, NULL, '2025-10-29 19:27:55', '2025-10-29 19:27:55'),
(4, '2023123456', 'BSHM', 'III', '0', 'Continuing/Old', NULL, NULL, NULL, '2025-10-31 19:58:36', '2025-10-31 19:58:36'),
(5, '2022123456', 'BSIT', 'I', '0', 'Continuing/Old', NULL, NULL, NULL, '2025-10-31 20:05:00', '2025-10-31 20:05:00'),
(6, '2025123456', 'BSSW', 'I', '0', 'Continuing/Old', NULL, NULL, NULL, '2025-10-31 20:22:47', '2025-10-31 20:22:47'),
(7, '2024123456', 'BSIT', 'III', '0', 'Continuing/Old', NULL, NULL, NULL, '2025-10-31 20:26:31', '2025-10-31 20:26:31'),
(8, '2023303610', 'BSIT', 'III', '', 'Continuing/Old', 'N/A', 'N/A', 'N/A', '2025-11-01 01:45:59', '2025-11-26 03:59:56'),
(9, '2023303620', 'BSIT', 'I', '0', 'Continuing/Old', NULL, NULL, NULL, '2025-11-01 01:47:20', '2025-11-01 01:47:20'),
(10, '2023303630', 'BSEnE', 'III', '0', 'Continuing/Old', 'ABCCA', 'ABCCA', 'HUMSS', '2025-11-01 01:49:01', '2025-11-06 07:16:28'),
(11, '2023303640', 'BSA', 'III', 'Dairy Science', 'Continuing/Old', 'ABCAA', 'ABCAA', 'HUMSS', '2025-11-01 01:51:02', '2025-12-07 05:22:11'),
(13, '2021113456', 'BSIT', 'III', '', 'Continuing/Old', 'N/A', 'N/A', 'N/A', '2025-11-27 01:42:07', '2025-11-27 01:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `student_address_info`
--

CREATE TABLE `student_address_info` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `permanent_zone` varchar(50) DEFAULT NULL,
  `permanent_barangay` varchar(100) DEFAULT NULL,
  `permanent_city` varchar(100) DEFAULT NULL,
  `permanent_province` varchar(100) DEFAULT NULL,
  `present_zone` varchar(50) DEFAULT NULL,
  `present_barangay` varchar(100) DEFAULT NULL,
  `present_city` varchar(100) DEFAULT NULL,
  `present_province` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_address_info`
--

INSERT INTO `student_address_info` (`id`, `student_id`, `permanent_zone`, `permanent_barangay`, `permanent_city`, `permanent_province`, `present_zone`, `present_barangay`, `present_city`, `present_province`, `created_at`, `updated_at`) VALUES
(1, '2022311680', 'Sitio Migbanday', 'Poblacion', 'Claveria', 'Misamis Oriental', 'Sitio Migbanday', 'Poblacion', 'Claveria', 'Misamis Oriental', '2025-10-29 03:17:08', '2025-11-25 17:08:03'),
(2, '2021123456', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-10-29 06:37:59', '2025-10-29 06:37:59'),
(3, '2020123456', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-10-29 19:27:55', '2025-10-29 19:27:55'),
(4, '2023123456', '1', 'Hairlastic', 'Bench', 'Fix', '3', 'Poblacion', 'Claveria', 'Misamis Oriental', '2025-10-31 19:58:36', '2025-10-31 19:58:36'),
(5, '2022123456', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-10-31 20:05:00', '2025-10-31 20:05:00'),
(6, '2025123456', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-10-31 20:22:47', '2025-10-31 20:22:47'),
(7, '2024123456', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-10-31 20:26:31', '2025-10-31 20:26:31'),
(8, '2023303610', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-11-01 01:45:59', '2025-11-26 03:59:56'),
(9, '2023303620', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-11-01 01:47:20', '2025-11-01 01:47:20'),
(10, '2023303630', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-11-01 01:49:01', '2025-11-06 07:16:28'),
(11, '2023303640', 'Zone 3', 'Cabs', 'Clavs', 'Mis Or', 'Zone 3', 'Cabs', 'Clavs', 'Mis Or', '2025-11-01 01:51:02', '2025-12-07 05:22:11'),
(13, '2021113456', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', '2025-11-27 01:42:07', '2025-11-27 01:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `student_awards`
--

CREATE TABLE `student_awards` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `award_name` varchar(255) NOT NULL,
  `school_organization` varchar(255) NOT NULL,
  `year_received` varchar(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_awards`
--

INSERT INTO `student_awards` (`id`, `student_id`, `award_name`, `school_organization`, `year_received`, `created_at`, `updated_at`) VALUES
(40, '2023303640', 'DL', 'try', '2024', '2025-12-07 05:22:11', '2025-12-07 05:22:11'),
(41, '2023303640', 'Leadership Award', 'USG', '2023', '2025-12-07 05:22:11', '2025-12-07 05:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `student_family_info`
--

CREATE TABLE `student_family_info` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `father_occupation` varchar(100) DEFAULT NULL,
  `father_educational_attainment` varchar(100) DEFAULT NULL,
  `father_age` int(3) DEFAULT NULL,
  `father_contact_number` varchar(20) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `mother_occupation` varchar(100) DEFAULT NULL,
  `mother_educational_attainment` varchar(100) DEFAULT NULL,
  `mother_age` int(3) DEFAULT NULL,
  `mother_contact_number` varchar(20) DEFAULT NULL,
  `parents_permanent_address` text DEFAULT NULL,
  `parents_contact_number` varchar(20) DEFAULT NULL,
  `spouse` varchar(255) DEFAULT NULL,
  `spouse_occupation` varchar(100) DEFAULT NULL,
  `spouse_educational_attainment` varchar(100) DEFAULT NULL,
  `guardian_name` varchar(255) DEFAULT NULL,
  `guardian_age` int(3) DEFAULT NULL,
  `guardian_occupation` varchar(100) DEFAULT NULL,
  `guardian_contact_number` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `student_family_info`
--

INSERT INTO `student_family_info` (`id`, `student_id`, `father_name`, `father_occupation`, `father_educational_attainment`, `father_age`, `father_contact_number`, `mother_name`, `mother_occupation`, `mother_educational_attainment`, `mother_age`, `mother_contact_number`, `parents_permanent_address`, `parents_contact_number`, `spouse`, `spouse_occupation`, `spouse_educational_attainment`, `guardian_name`, `guardian_age`, `guardian_occupation`, `guardian_contact_number`, `created_at`, `updated_at`) VALUES
(1, '2022311680', 'Fidelino S. Sitoy', 'None', 'N/A', NULL, NULL, 'Melchora Z. Sitoy', 'Barangay Health Worker', 'N/A', NULL, NULL, 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', NULL, 'N/A', '09876543212', '2025-10-29 03:17:08', '2025-11-25 17:08:03'),
(2, '2023123456', 'Tecno ', '70W', NULL, NULL, NULL, 'Fantech', 'Suyen Corporation', NULL, NULL, NULL, NULL, NULL, 'N/A', NULL, NULL, NULL, NULL, NULL, '09878787877', '2025-10-31 19:58:36', '2025-10-31 19:58:36'),
(3, '2023303630', 'N/A', 'Company Worker', 'N/A', NULL, NULL, 'N/A', 'N/A', 'N/A', NULL, NULL, 'try lang', NULL, 'N/A', 'N/A', 'N/A', 'N/A', NULL, 'N/A', NULL, '2025-11-06 05:41:16', '2025-11-06 15:16:28'),
(9, '2023303640', 'Ricky', 'Company Worker', 'College Graduate', 42, '09788777665', 'Leila', 'Housewife', 'College Graduate', 42, '09888777876', 'Zone 3, Cabs, Clavs, Mis. Or.', '09888999878', 'N/A', 'N/A', 'N/A', 'Ricky P. Sihay', 42, 'Company Worker', '09888777656', '2025-11-06 07:07:45', '2025-11-21 05:56:19'),
(11, '2023303610', 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', NULL, 'N/A', NULL, '2025-11-26 03:59:56', '2025-11-26 03:59:56'),
(12, '2021113456', 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', 'N/A', 'N/A', NULL, NULL, 'N/A', NULL, 'N/A', 'N/A', 'N/A', 'N/A', NULL, 'N/A', NULL, '2025-11-27 01:42:07', '2025-11-27 01:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `student_gcs_activities`
--

CREATE TABLE `student_gcs_activities` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `activity_type` enum('adjustment','building_self_confidence','developing_communication_skills','study_habits','time_management','tutorial_with_peers','other') NOT NULL,
  `other_specify` varchar(255) DEFAULT NULL,
  `tutorial_subjects` text DEFAULT NULL COMMENT 'For tutorial_with_peers type',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_gcs_activities`
--

INSERT INTO `student_gcs_activities` (`id`, `student_id`, `activity_type`, `other_specify`, `tutorial_subjects`, `created_at`) VALUES
(50, '2023303640', 'adjustment', NULL, NULL, '2025-12-07 05:22:11'),
(51, '2023303640', 'building_self_confidence', NULL, NULL, '2025-12-07 05:22:11'),
(52, '2023303640', 'developing_communication_skills', NULL, NULL, '2025-12-07 05:22:11'),
(53, '2023303640', 'study_habits', NULL, NULL, '2025-12-07 05:22:11'),
(54, '2023303640', 'time_management', NULL, NULL, '2025-12-07 05:22:11'),
(55, '2023303640', 'tutorial_with_peers', NULL, '', '2025-12-07 05:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `student_other_info`
--

CREATE TABLE `student_other_info` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `course_choice_reason` text DEFAULT NULL,
  `family_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array of: harmonious, conflict, separated_parents, parents_working_abroad, other' CHECK (json_valid(`family_description`)),
  `family_description_other` varchar(255) DEFAULT NULL,
  `living_condition` enum('good_environment','not_good_environment') DEFAULT NULL,
  `physical_health_condition` enum('No','Yes') DEFAULT 'No',
  `physical_health_condition_specify` text DEFAULT NULL,
  `psych_treatment` enum('No','Yes') DEFAULT 'No',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_other_info`
--

INSERT INTO `student_other_info` (`id`, `student_id`, `course_choice_reason`, `family_description`, `family_description_other`, `living_condition`, `physical_health_condition`, `physical_health_condition_specify`, `psych_treatment`, `created_at`, `updated_at`) VALUES
(1, '2023303640', 'try lang', '[\"harmonious\"]', NULL, 'good_environment', 'Yes', 'guba ang utok', 'Yes', '2025-11-05 19:37:02', '2025-12-07 05:22:11'),
(2, '2023303630', 'nag IT kay bored sa life', '[\"harmonious\"]', NULL, NULL, 'No', 'N/A', 'No', '2025-11-06 04:26:59', '2025-11-06 07:16:28'),
(4, '2022311680', NULL, '[]', NULL, NULL, 'No', 'N/A', 'No', '2025-11-25 17:08:03', '2025-11-25 17:08:03'),
(5, '2023303610', NULL, '[]', NULL, NULL, 'No', NULL, 'No', '2025-11-26 03:59:56', '2025-11-26 03:59:56'),
(6, '2021113456', NULL, '[]', NULL, NULL, 'No', 'N/A', 'No', '2025-11-27 01:42:07', '2025-11-27 01:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `student_personal_info`
--

CREATE TABLE `student_personal_info` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `place_of_birth` varchar(255) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `civil_status` enum('Single','Married','Widowed','Legally Separated','Annulled') DEFAULT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `fb_account_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_personal_info`
--

INSERT INTO `student_personal_info` (`id`, `student_id`, `last_name`, `first_name`, `middle_name`, `date_of_birth`, `place_of_birth`, `age`, `sex`, `civil_status`, `religion`, `contact_number`, `fb_account_name`, `created_at`, `updated_at`) VALUES
(1, '2022311680', 'Sitoy', 'Princess Grace Marie', 'Zalameda', '2003-12-09', 'N/A', 21, 'Female', 'Single', 'N/A', '09923757753', 'Freynsis Greys', '2025-10-29 03:17:08', '2025-11-25 17:08:03'),
(2, '2021123456', 'churva', 'Churba', 'Curba', '2007-06-12', NULL, 18, 'Male', 'Single', NULL, '09890988732', 'Churba Ka Teh', '2025-10-29 06:37:59', '2025-10-29 06:37:59'),
(3, '2020123456', 'Osmont', 'Henry', 'Belmont', '2003-10-14', NULL, 22, 'Male', 'Single', NULL, '09899765212', 'Karma', '2025-10-29 19:27:55', '2025-11-26 07:47:56'),
(4, '2023123456', 'Bajao', 'Christian', 'Sandog', '2005-10-12', NULL, 20, 'Male', 'Single', NULL, '09787878787', 'Lenovo Tab M10 HD', '2025-10-31 19:58:36', '2025-11-26 07:47:56'),
(5, '2022123456', 'Borres ', 'Emeliza', 'Akut', '2008-06-10', NULL, 17, 'Female', 'Single', NULL, '09345656560', 'N/A', '2025-10-31 20:05:00', '2025-11-26 07:47:56'),
(6, '2025123456', 'Pechares', 'Joselita', 'G', '2006-02-06', NULL, 19, 'Female', 'Single', NULL, '09076565654', 'N/A', '2025-10-31 20:22:47', '2025-11-26 07:47:56'),
(7, '2024123456', 'Osmont', 'Noah', 'P', '2005-08-24', NULL, 20, 'Male', 'Single', NULL, '09123456675', 'N/A', '2025-10-31 20:26:31', '2025-11-26 07:47:56'),
(8, '2023303610', 'Techno', 'Rex', 'Bro', NULL, 'N/A', NULL, 'Male', 'Single', 'N/A', '', 'N/A', '2025-11-01 01:45:59', '2025-11-26 03:59:56'),
(9, '2023303620', 'Exodus', 'Rex', 'N/A', NULL, NULL, NULL, 'Male', 'Single', NULL, '', 'N/A', '2025-11-01 01:47:20', '2025-11-01 01:47:20'),
(10, '2023303630', 'Sy', 'Rex', 'N/A', NULL, 'try lang naman diri', NULL, 'Male', 'Single', 'Roman Catholic', '', 'N/A', '2025-11-01 01:49:01', '2025-11-06 07:16:28'),
(11, '2023303640', 'Sihay', 'Dominic', 'Beronilla', '2005-03-13', 'San Luis, Gingoog City', 20, 'Male', 'Widowed', 'Roman Catholic', '09619355143', 'Rex D Beronilla', '2025-11-01 01:51:02', '2025-12-07 05:22:11'),
(13, '2021113456', 'Acierto', 'Seb', 'Demo', NULL, 'N/A', 20, 'Female', 'Single', 'N/A', '', 'N/A', '2025-11-27 01:42:07', '2025-11-27 01:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `student_residence_info`
--

CREATE TABLE `student_residence_info` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `residence_type` enum('at home','boarding house','USTP-Claveria Dormitory','relatives','friends','other') DEFAULT NULL,
  `residence_other_specify` varchar(255) DEFAULT NULL,
  `has_consent` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_residence_info`
--

INSERT INTO `student_residence_info` (`id`, `student_id`, `residence_type`, `residence_other_specify`, `has_consent`, `created_at`, `updated_at`) VALUES
(1, '2022311680', 'at home', 'N/A', 1, '2025-10-29 03:17:08', '2025-11-25 17:08:03'),
(2, '2021123456', 'USTP-Claveria Dormitory', 'N/A', 1, '2025-10-29 06:37:59', '2025-10-29 06:37:59'),
(3, '2020123456', 'relatives', 'N/A', 1, '2025-10-29 19:27:55', '2025-10-29 19:27:55'),
(4, '2023123456', 'boarding house', 'N/A', 1, '2025-10-31 19:58:36', '2025-10-31 19:58:36'),
(5, '2022123456', 'USTP-Claveria Dormitory', 'N/A', 1, '2025-10-31 20:05:00', '2025-10-31 20:05:00'),
(6, '2025123456', 'boarding house', 'N/A', 1, '2025-10-31 20:22:47', '2025-10-31 20:22:47'),
(7, '2024123456', 'relatives', 'N/A', 1, '2025-10-31 20:26:31', '2025-10-31 20:26:31'),
(8, '2023303610', 'at home', 'N/A', 1, '2025-11-01 01:45:59', '2025-11-26 03:59:56'),
(9, '2023303620', 'at home', 'N/A', 1, '2025-11-01 01:47:20', '2025-11-01 01:47:20'),
(10, '2023303630', 'at home', 'N/A', 1, '2025-11-01 01:49:01', '2025-11-06 07:16:28'),
(11, '2023303640', 'at home', 'N/A', 1, '2025-11-01 01:51:02', '2025-12-07 05:22:11'),
(13, '2021113456', 'at home', 'N/A', 1, '2025-11-27 01:42:07', '2025-11-27 01:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `student_services_availed`
--

CREATE TABLE `student_services_availed` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `service_type` enum('counseling','insurance','special_lanes','safe_learning','equal_access','other') NOT NULL,
  `other_specify` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_services_availed`
--

INSERT INTO `student_services_availed` (`id`, `student_id`, `service_type`, `other_specify`, `created_at`) VALUES
(4, '2021123456', 'counseling', NULL, '2025-10-29 14:37:59'),
(5, '2021123456', 'safe_learning', NULL, '2025-10-29 14:37:59'),
(6, '2021123456', 'equal_access', NULL, '2025-10-29 14:37:59'),
(7, '2020123456', 'counseling', NULL, '2025-10-30 03:27:55'),
(8, '2020123456', 'special_lanes', NULL, '2025-10-30 03:27:55'),
(9, '2020123456', 'safe_learning', NULL, '2025-10-30 03:27:55'),
(10, '2020123456', 'equal_access', NULL, '2025-10-30 03:27:55'),
(11, '2023123456', 'counseling', NULL, '2025-11-01 03:58:36'),
(12, '2023123456', 'special_lanes', NULL, '2025-11-01 03:58:36'),
(13, '2023123456', 'safe_learning', NULL, '2025-11-01 03:58:36'),
(14, '2023123456', 'equal_access', NULL, '2025-11-01 03:58:36'),
(15, '2022123456', 'counseling', NULL, '2025-11-01 04:05:00'),
(16, '2022123456', 'safe_learning', NULL, '2025-11-01 04:05:00'),
(17, '2022123456', 'equal_access', NULL, '2025-11-01 04:05:00'),
(18, '2025123456', 'counseling', NULL, '2025-11-01 04:22:47'),
(19, '2025123456', 'safe_learning', NULL, '2025-11-01 04:22:47'),
(20, '2025123456', 'equal_access', NULL, '2025-11-01 04:22:47'),
(21, '2024123456', 'counseling', NULL, '2025-11-01 04:26:31'),
(22, '2024123456', 'safe_learning', NULL, '2025-11-01 04:26:31'),
(23, '2024123456', 'equal_access', NULL, '2025-11-01 04:26:31'),
(59, '2022311680', 'counseling', NULL, '2025-11-25 17:08:03'),
(60, '2022311680', 'safe_learning', NULL, '2025-11-25 17:08:03'),
(61, '2022311680', 'equal_access', NULL, '2025-11-25 17:08:03'),
(64, '2023303640', 'insurance', NULL, '2025-12-07 05:22:11'),
(65, '2023303640', 'equal_access', NULL, '2025-12-07 05:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `student_services_needed`
--

CREATE TABLE `student_services_needed` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `service_type` enum('counseling','insurance','special_lanes','safe_learning','equal_access','other') NOT NULL,
  `other_specify` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_services_needed`
--

INSERT INTO `student_services_needed` (`id`, `student_id`, `service_type`, `other_specify`, `created_at`) VALUES
(5, '2021123456', 'counseling', NULL, '2025-10-29 14:37:59'),
(6, '2021123456', 'insurance', NULL, '2025-10-29 14:37:59'),
(7, '2021123456', 'special_lanes', NULL, '2025-10-29 14:37:59'),
(8, '2021123456', 'safe_learning', NULL, '2025-10-29 14:37:59'),
(9, '2021123456', 'equal_access', NULL, '2025-10-29 14:37:59'),
(10, '2020123456', 'counseling', NULL, '2025-10-30 03:27:55'),
(11, '2020123456', 'insurance', NULL, '2025-10-30 03:27:55'),
(12, '2020123456', 'special_lanes', NULL, '2025-10-30 03:27:55'),
(13, '2020123456', 'safe_learning', NULL, '2025-10-30 03:27:55'),
(14, '2020123456', 'equal_access', NULL, '2025-10-30 03:27:55'),
(15, '2023123456', 'counseling', NULL, '2025-11-01 03:58:36'),
(16, '2023123456', 'insurance', NULL, '2025-11-01 03:58:36'),
(17, '2023123456', 'safe_learning', NULL, '2025-11-01 03:58:36'),
(18, '2023123456', 'equal_access', NULL, '2025-11-01 03:58:36'),
(19, '2025123456', 'counseling', NULL, '2025-11-01 04:22:47'),
(20, '2025123456', 'insurance', NULL, '2025-11-01 04:22:47'),
(21, '2025123456', 'safe_learning', NULL, '2025-11-01 04:22:47'),
(22, '2025123456', 'equal_access', NULL, '2025-11-01 04:22:47'),
(23, '2024123456', 'insurance', NULL, '2025-11-01 04:26:31'),
(24, '2024123456', 'safe_learning', NULL, '2025-11-01 04:26:31'),
(25, '2024123456', 'equal_access', NULL, '2025-11-01 04:26:31'),
(61, '2022311680', 'counseling', NULL, '2025-11-25 17:08:03'),
(62, '2022311680', 'insurance', NULL, '2025-11-25 17:08:03'),
(63, '2022311680', 'safe_learning', NULL, '2025-11-25 17:08:03'),
(64, '2022311680', 'equal_access', NULL, '2025-11-25 17:08:03'),
(67, '2023303640', 'insurance', NULL, '2025-12-07 05:22:11'),
(68, '2023303640', 'special_lanes', NULL, '2025-12-07 05:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `student_special_circumstances`
--

CREATE TABLE `student_special_circumstances` (
  `id` int(11) NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `is_solo_parent` enum('Yes','No') DEFAULT NULL,
  `is_indigenous` enum('Yes','No') DEFAULT NULL,
  `is_breastfeeding` enum('Yes','No','N/A') DEFAULT NULL,
  `is_pwd` enum('Yes','No','Other') DEFAULT NULL,
  `pwd_disability_type` varchar(255) DEFAULT NULL,
  `pwd_proof_file` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_special_circumstances`
--

INSERT INTO `student_special_circumstances` (`id`, `student_id`, `is_solo_parent`, `is_indigenous`, `is_breastfeeding`, `is_pwd`, `pwd_disability_type`, `pwd_proof_file`, `created_at`, `updated_at`) VALUES
(1, '2022311680', 'No', 'Yes', 'No', 'No', 'N/A', 'N/A', '2025-10-29 03:17:08', '2025-11-25 17:08:03'),
(2, '2021123456', 'No', 'No', 'N/A', 'No', 'N/A', 'N/A', '2025-10-29 06:37:59', '2025-10-29 06:37:59'),
(3, '2020123456', 'No', 'No', 'N/A', 'Yes', 'Deaf', 'N/A', '2025-10-29 19:27:55', '2025-10-29 19:27:55'),
(4, '2023123456', 'No', 'No', 'N/A', 'No', 'N/A', 'N/A', '2025-10-31 19:58:36', '2025-10-31 19:58:36'),
(5, '2022123456', 'No', 'Yes', 'No', 'No', 'N/A', 'N/A', '2025-10-31 20:05:00', '2025-10-31 20:05:00'),
(6, '2025123456', 'No', 'No', 'No', 'No', 'N/A', 'N/A', '2025-10-31 20:22:47', '2025-10-31 20:22:47'),
(7, '2024123456', 'No', 'No', 'N/A', 'No', 'N/A', 'N/A', '2025-10-31 20:26:31', '2025-10-31 20:26:31'),
(8, '2023303610', 'No', 'No', 'N/A', 'No', 'N/A', 'N/A', '2025-11-01 01:45:59', '2025-11-26 03:59:56'),
(9, '2023303620', 'No', 'No', 'N/A', 'No', 'N/A', 'N/A', '2025-11-01 01:47:20', '2025-11-01 01:47:20'),
(10, '2023303630', 'No', 'No', 'N/A', 'No', 'N/A', 'N/A', '2025-11-01 01:49:01', '2025-11-06 07:16:28'),
(11, '2023303640', 'Yes', 'Yes', 'Yes', 'Yes', 'olala', 'Photos/pwd_proofs/pwd_proof_2023303640_1762439429.jpg', '2025-11-01 01:51:02', '2025-12-07 05:22:11'),
(13, '2021113456', 'No', 'No', 'N/A', 'No', 'N/A', 'N/A', '2025-11-27 01:42:07', '2025-11-27 01:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `verification_token` varchar(6) DEFAULT NULL,
  `reset_expires_at` datetime DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `role` enum('student','admin','counselor') NOT NULL DEFAULT 'student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_picture` varchar(255) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `logout_time` timestamp NULL DEFAULT NULL,
  `last_activity` timestamp NULL DEFAULT NULL,
  `last_active_at` timestamp NULL DEFAULT NULL,
  `last_inactive_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `username`, `email`, `password`, `verification_token`, `reset_expires_at`, `is_verified`, `role`, `created_at`, `profile_picture`, `last_login`, `logout_time`, `last_activity`, `last_active_at`, `last_inactive_at`) VALUES
(1, '0000000001', 'Admin', 'counselign2025@gmail.com', '$2y$10$z4XF85GGsS42R8s/M4IvWer8v5QZXDx8M.jPWp8AdPmueq87A//Z6', NULL, NULL, 1, 'admin', '2025-10-29 11:01:58', 'Photos/profile_pictures/admin_1_1765087685.jpg', '2025-12-16 14:32:46', '2025-12-16 14:53:11', '2025-12-16 14:53:11', '2025-12-16 14:53:11', '2025-12-16 14:53:11'),
(2, '2022311680', 'FreynsisGreys', 'sitoyprincessgrace09@gmail.com', '$2y$10$isXMDU7/42b3W8zjmZBFOO3DLwXRCxeWIEZOA3EIY5m7qD63Gy0m6', NULL, NULL, 1, 'student', '2025-10-29 11:12:19', 'Photos/profile_pictures/student_2022311680_1764150786.jpg', '2025-12-17 06:23:41', '2025-12-07 01:45:15', '2025-12-17 06:23:41', '2025-12-17 06:23:41', '2025-12-07 01:45:15'),
(3, '1234567890', 'shizcess', 'esangairemgrace@gmail.com', '$2y$10$RX.SgQdb3o6BlBW1Y0AnF.4CYgLOGyTUdsNV28Tu8/TW4jvn7wWWG', NULL, NULL, 1, 'counselor', '2025-10-29 11:52:55', 'Photos/profile_pictures/counselor_1234567890_1765086927.jpg', '2025-12-17 14:11:06', '2025-12-17 14:19:31', '2025-12-17 14:19:31', '2025-12-17 14:19:31', '2025-12-17 14:19:31'),
(4, '0987654321', 'freynsis', 'impactog0903@gmail.com', '$2y$10$jfqc573Mf.HVGA1GpprlQei4GOFcv5jTxy5QU/JmwKprtHIMp90EW', NULL, NULL, 1, 'counselor', '2025-10-29 13:35:23', 'Photos/profile_pictures/counselor_0987654321_1761745010.jpg', '2025-11-17 04:16:49', '2025-11-17 04:17:21', '2025-11-17 04:17:21', '2025-11-17 04:17:21', '2025-11-17 04:17:21'),
(5, '2023123456', 'printit', 'unique.corn254@gmail.com', '$2y$10$BZ/xh83xueyjsw1ZFvoMcOsUwektV.3yYTmaG199eocRfKkhcLdxi', NULL, NULL, 1, 'student', '2025-10-29 13:41:44', 'Photos/profile_pictures/student_2023123456_1761969611.png', '2025-11-01 03:52:46', '2025-11-01 04:02:16', '2025-11-25 08:11:17', '2025-11-25 08:11:17', '2025-11-01 04:02:16'),
(6, '2022123456', 'Sharlang', 'katkat.luvie@gmail.com', '$2y$10$DjtsxYwpuJTAo6o0ASggZ.5tK10UEC4/IlxeywrbVB0EVz/5AqOeK', NULL, NULL, 1, 'student', '2025-10-29 13:48:27', 'http://localhost/Counselign/public/Photos/profile.png', '2025-11-01 18:40:39', '2025-11-01 17:10:45', '2025-11-01 18:43:04', '2025-11-01 18:43:04', '2025-11-01 17:10:45'),
(7, '2021123456', 'Churba', 'pa12a.cursor@gmail.com', '$2y$10$V.pqqlHXTT2vMOgV7AVYYewb7ItCY1F6ptmauhGu6vBKM/TgiblR2', NULL, NULL, 1, 'student', '2025-10-29 13:56:36', 'http://localhost/Counselign/public/Photos/profile.png', '2025-11-03 11:05:51', '2025-10-29 15:06:49', '2025-11-03 11:51:08', '2025-11-03 11:51:08', '2025-10-29 15:06:49'),
(8, '2020123456', 'Karma', 'xtracursor@gmail.com', '$2y$10$KN76abjRM8ZkmtnFZNoqC.m7gL3J67KKGtBGR4Zk3qugYp6ysqOky', NULL, NULL, 1, 'student', '2025-10-29 14:00:00', 'http://localhost/Counselign/public/Photos/profile.png', '2025-11-01 14:37:44', '2025-11-01 09:35:51', '2025-11-17 00:46:42', '2025-11-17 00:46:42', '2025-11-01 09:35:51'),
(9, '2025123456', 'Chuyy', 'osmont.infinity@gmail.com', '$2y$10$/rfM3eTO1WrCF89PzDuAGOu0wa0WLXz9bY2O2gNgo.exOIPGgm7N.', NULL, NULL, 1, 'student', '2025-10-29 14:20:34', 'http://localhost/Counselign/public/Photos/profile.png', '2025-11-01 08:25:37', '2025-11-01 09:35:57', '2025-11-01 09:35:57', '2025-11-01 09:35:57', '2025-11-01 09:35:57'),
(10, '2024123456', 'Sheeesh', 'noah.tyranny@gmail.com', '$2y$10$m5ePXOmAC5bDQI3TXJcnpOXzy1Ua8JmAiHbwwe3ep2OMgYra6XnAe', NULL, NULL, 1, 'student', '2025-10-29 15:20:14', 'http://localhost/Counselign/public/Photos/profile.png', '2025-11-17 04:28:43', '2025-11-17 04:32:15', '2025-11-17 04:32:15', '2025-11-17 04:32:15', '2025-11-17 04:32:15'),
(13, '1234509876', 'Shixcess', 'katkatluvie@gmail.com', '$2y$10$Nu1kSjAZdmqHw0O5Xm6QvOllPvHBglqSkL7GrekeJvcou1h0Z.6Pa', NULL, NULL, 1, 'counselor', '2025-10-31 17:23:01', 'Photos/profile_pictures/counselor_1234509876_1761931662.jpg', '2025-11-06 08:50:02', '2025-11-06 09:10:00', '2025-11-06 09:10:00', '2025-11-06 09:10:00', '2025-11-06 09:10:00'),
(15, '2023303610', 'techy_rex', 'technorex13@gmail.com', '$2y$10$oyavlh5BHb6Ywm1Wv8Ibg.ap0kM9H0gjmgrnuF/X6n7glgVPS41kS', NULL, NULL, 1, 'student', '2025-11-01 09:44:45', 'Photos/profile_pictures/student_2023303610_1764130117.jpg', '2025-11-27 00:59:44', '2025-11-26 15:09:17', '2025-11-27 01:00:35', '2025-11-27 01:00:35', '2025-11-26 15:09:17'),
(16, '2023303620', 'exo_rex', 'exodusrex13@gmail.com', '$2y$10$04pWVjvcvfCeeIJXoiDmdOa40Px383T2mSfqtxtQGPkPSlKv4UIa.', NULL, NULL, 1, 'student', '2025-11-01 09:46:39', 'Photos/profile_pictures/student_2023303620_1762326447.jpg', '2025-11-17 04:25:43', '2025-11-17 04:28:10', '2025-11-17 04:28:10', '2025-11-17 04:28:10', '2025-11-17 04:28:10'),
(18, '2023303640', 'rexd', 'rexsihays@gmail.com', '$2y$10$u/t6RWBd63TOezdDnYEuWeR6KlKmy6SMgnl.BdYLch9zIDBa4h8jq', NULL, NULL, 1, 'student', '2025-11-01 09:49:57', 'Photos/profile_pictures/student_2023303640_1765087409.jpg', '2025-12-17 14:08:48', '2025-12-17 14:10:52', '2025-12-17 14:10:52', '2025-12-17 14:10:52', '2025-12-17 14:10:52'),
(26, '1234567899', 'Seb', 'sebastian.acierto133@gmail.com', '$2y$10$OBcIulpY0nP6C3BKcayzI.1mFJgPbWrBnhEw.MST.9ZBop0XpJrUO', NULL, NULL, 1, 'counselor', '2025-11-26 08:03:34', 'Photos/profile_pictures/counselor_1234567899_1764150543.jpg', '2025-11-27 01:57:23', '2025-11-27 02:09:10', '2025-11-27 03:20:14', '2025-11-27 03:20:14', '2025-11-27 02:09:10'),
(27, '2023304900', 'Rhea Mae', 'rheamaecambarijan7@gmail.com', '$2y$10$srd3CgUBn8xlQmVP78Zb0OdTezeScSkFiqfzjxILoYB9KdaKMJSEe', NULL, NULL, 0, 'counselor', '2025-11-26 08:51:29', 'http://172.16.83.246/Counselign/public/Photos/profile.png', NULL, NULL, NULL, NULL, NULL),
(28, '1012345678', 'lulen', 'lulen@gmail.com', '$2y$10$p135mQQ3yW8TI2gl7zIbYun2QcIUCsvtRkVzMEr4yXN/tllND49wu', NULL, NULL, 0, 'counselor', '2025-11-27 01:16:49', 'http://172.16.83.246/Counselign/public/Photos/profile.png', NULL, NULL, NULL, NULL, NULL),
(29, '1012345670', 'lulenxxx', 'lulenzap@gmail.com', '$2y$10$MnvZl21QQ/rhEnUiMqkXZOsyo2cQrNf0TmPcKceyWqdcnsYJ2E8VC', 'EHPKZK', NULL, 0, 'student', '2025-11-27 01:19:05', 'http://172.16.83.246/Counselign/public/Photos/profile.png', NULL, NULL, NULL, NULL, NULL),
(30, '1101101101', 'lulenzap', 'lulenparadise@gmail.com', '$2y$10$EEiPmmL.QA/WhmJEyqO3ze8WOQPOT616vD.pjQkRJN7TTN3YeulVS', NULL, NULL, 1, 'student', '2025-11-27 01:20:25', 'Photos/profile_pictures/student_1101101101_1764207071.png', '2025-11-27 02:31:49', '2025-11-27 01:39:08', '2025-11-27 03:08:46', '2025-11-27 03:08:46', '2025-11-27 01:39:08'),
(31, '2022132344', 'shiz', 'ftv.acierto123@gmail.com', '$2y$10$ent/.kNLcu4IsdnCIdEhbuLAOIT3BULuMXaUPAYVy7ZjvOm6MmHwi', '2U5NRZ', NULL, 0, 'student', '2025-11-27 01:24:17', 'http://localhost/Counselign/public/Photos/profile.png', NULL, NULL, NULL, NULL, NULL),
(32, '2021113456', 'syreshi', 'borresemeliza1@gmail.com', '$2y$10$zCf8Rr5xnLNNRUKmwj4SdO08ayZ.fqoqrGiFt0g9hO/1K8fOooZPW', NULL, NULL, 1, 'student', '2025-11-27 01:26:07', 'Photos/profile_pictures/student_2021113456_1764207805.jpg', '2025-11-27 02:42:31', '2025-11-27 03:00:36', '2025-11-27 03:00:36', '2025-11-27 03:00:36', '2025-11-27 03:00:36'),
(33, '1111111111', 'caroline', 'paraisocaroline@gmail.com', '$2y$10$DvndxLu5QGUGfdXtdwqtTOsQU38FvAjxf7eMgvcocOOfS2D0Mdlhm', NULL, NULL, 1, 'counselor', '2025-11-27 01:33:49', 'Photos/profile_pictures/counselor_1111111111_1764210652.jpg', '2025-11-27 02:19:05', '2025-11-27 02:31:01', '2025-11-27 02:31:01', '2025-11-27 02:31:01', '2025-11-27 02:31:01'),
(34, '2015311428', 'mimi', 'chrizylmaemaglangit@gmail.com', '$2y$10$LOnPDOpW4tVrNTzc7ygcOO92KC6jO.4bRAkaaqnZDXbSE87qx0RMa', NULL, NULL, 1, 'student', '2025-11-27 01:41:31', 'Photos/profile_pictures/student_2015311428_1764208736.png', '2025-11-27 01:42:01', '2025-11-27 02:18:32', '2025-11-27 02:18:32', '2025-11-27 02:18:32', '2025-11-27 02:18:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_ibfk_1` (`student_id`) USING BTREE,
  ADD KEY `idx_appointment_counselor_date_status` (`counselor_preference`,`preferred_date`,`status`),
  ADD KEY `idx_appointment_student_status` (`student_id`,`status`);

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `timestamp` (`timestamp`);

--
-- Indexes for table `counselors`
--
ALTER TABLE `counselors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `counselor_ibfk_1` (`counselor_id`);

--
-- Indexes for table `counselor_availability`
--
ALTER TABLE `counselor_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `counselor_id` (`counselor_id`),
  ADD KEY `idx_counselor_availability_day` (`counselor_id`,`available_days`);

--
-- Indexes for table `daily_quotes`
--
ALTER TABLE `daily_quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_submitted_by` (`submitted_by_id`),
  ADD KEY `idx_last_displayed` (`last_displayed_date`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follow_up_appointments`
--
ALTER TABLE `follow_up_appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_counselor` (`counselor_id`),
  ADD KEY `idx_student` (`student_id`),
  ADD KEY `idx_parent_appointment` (`parent_appointment_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_followup_parent_sequence` (`parent_appointment_id`,`follow_up_sequence`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `messages_ibfk_1` (`sender_id`),
  ADD KEY `messages_ibfk_2` (`receiver_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_is_read` (`is_read`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `notification_reads`
--
ALTER TABLE `notification_reads`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_user_notification` (`user_id`,`notification_type`,`related_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_notification_type` (`notification_type`),
  ADD KEY `idx_related_id` (`related_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_reset_code` (`reset_code`),
  ADD KEY `password_resets_fk2` (`user_id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_by` (`uploaded_by`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_resource_type` (`resource_type`),
  ADD KEY `idx_visibility` (`visibility`),
  ADD KEY `idx_is_active` (`is_active`);

--
-- Indexes for table `student_academic_info`
--
ALTER TABLE `student_academic_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD KEY `idx_academic_course` (`course`,`year_level`);

--
-- Indexes for table `student_address_info`
--
ALTER TABLE `student_address_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `student_awards`
--
ALTER TABLE `student_awards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_student_awards` (`student_id`),
  ADD KEY `idx_awards_student_year` (`student_id`,`year_received`);

--
-- Indexes for table `student_family_info`
--
ALTER TABLE `student_family_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `student_gcs_activities`
--
ALTER TABLE `student_gcs_activities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_student_activity_type` (`student_id`,`activity_type`),
  ADD KEY `idx_student_activities` (`student_id`,`activity_type`),
  ADD KEY `idx_gcs_activities_student` (`student_id`);

--
-- Indexes for table `student_other_info`
--
ALTER TABLE `student_other_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD KEY `idx_student_other_info` (`student_id`);

--
-- Indexes for table `student_personal_info`
--
ALTER TABLE `student_personal_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `student_residence_info`
--
ALTER TABLE `student_residence_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `student_services_availed`
--
ALTER TABLE `student_services_availed`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_student_service_type` (`student_id`,`service_type`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `idx_user_services_availed` (`student_id`,`service_type`);

--
-- Indexes for table `student_services_needed`
--
ALTER TABLE `student_services_needed`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_student_service_needed_type` (`student_id`,`service_type`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `idx_user_services_needed` (`student_id`,`service_type`);

--
-- Indexes for table `student_special_circumstances`
--
ALTER TABLE `student_special_circumstances`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD KEY `idx_pwd_status` (`is_pwd`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `counselors`
--
ALTER TABLE `counselors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `counselor_availability`
--
ALTER TABLE `counselor_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `daily_quotes`
--
ALTER TABLE `daily_quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `follow_up_appointments`
--
ALTER TABLE `follow_up_appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=315;

--
-- AUTO_INCREMENT for table `notification_reads`
--
ALTER TABLE `notification_reads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `student_academic_info`
--
ALTER TABLE `student_academic_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `student_address_info`
--
ALTER TABLE `student_address_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `student_awards`
--
ALTER TABLE `student_awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `student_family_info`
--
ALTER TABLE `student_family_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_gcs_activities`
--
ALTER TABLE `student_gcs_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `student_other_info`
--
ALTER TABLE `student_other_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_personal_info`
--
ALTER TABLE `student_personal_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `student_residence_info`
--
ALTER TABLE `student_residence_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `student_services_availed`
--
ALTER TABLE `student_services_availed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `student_services_needed`
--
ALTER TABLE `student_services_needed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `student_special_circumstances`
--
ALTER TABLE `student_special_circumstances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_fk2` FOREIGN KEY (`counselor_preference`) REFERENCES `counselors` (`counselor_id`),
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `counselors`
--
ALTER TABLE `counselors`
  ADD CONSTRAINT `counselor_ibfk_1` FOREIGN KEY (`counselor_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `counselor_availability`
--
ALTER TABLE `counselor_availability`
  ADD CONSTRAINT `counselor_availability_ibfk_1` FOREIGN KEY (`counselor_id`) REFERENCES `counselors` (`counselor_id`) ON DELETE CASCADE;

--
-- Constraints for table `follow_up_appointments`
--
ALTER TABLE `follow_up_appointments`
  ADD CONSTRAINT `fk_parent_appointment` FOREIGN KEY (`parent_appointment_id`) REFERENCES `appointments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follow_up_appointments_ibfk_1` FOREIGN KEY (`counselor_id`) REFERENCES `counselors` (`counselor_id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `password_resets_fk2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_academic_info`
--
ALTER TABLE `student_academic_info`
  ADD CONSTRAINT `student_academic_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_address_info`
--
ALTER TABLE `student_address_info`
  ADD CONSTRAINT `student_address_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_awards`
--
ALTER TABLE `student_awards`
  ADD CONSTRAINT `student_awards_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_family_info`
--
ALTER TABLE `student_family_info`
  ADD CONSTRAINT `student_family_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_gcs_activities`
--
ALTER TABLE `student_gcs_activities`
  ADD CONSTRAINT `student_gcs_activities_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_other_info`
--
ALTER TABLE `student_other_info`
  ADD CONSTRAINT `student_other_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_personal_info`
--
ALTER TABLE `student_personal_info`
  ADD CONSTRAINT `student_personal_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_residence_info`
--
ALTER TABLE `student_residence_info`
  ADD CONSTRAINT `student_residence_info_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_services_availed`
--
ALTER TABLE `student_services_availed`
  ADD CONSTRAINT `student_services_availed_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_services_needed`
--
ALTER TABLE `student_services_needed`
  ADD CONSTRAINT `student_services_needed_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `student_special_circumstances`
--
ALTER TABLE `student_special_circumstances`
  ADD CONSTRAINT `student_special_circumstances_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
