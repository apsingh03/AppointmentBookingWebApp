-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2024 at 08:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointmentdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `time` varchar(255) NOT NULL,
  `slots` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `time`, `slots`, `createdAt`, `updatedAt`) VALUES
(28, '1:00 PM', 2, '2024-02-26 17:34:18', '2024-02-26 17:34:18'),
(29, '2:00 PM', 4, '2024-02-26 17:34:23', '2024-02-26 17:34:23'),
(30, '3:00 PM', 6, '2024-02-26 17:34:30', '2024-02-26 17:34:30'),
(31, '4:00 PM', 8, '2024-02-26 17:34:37', '2024-02-26 17:34:37'),
(32, '5:00 PM', 10, '2024-02-26 17:34:43', '2024-02-26 17:34:43'),
(33, '6:00 PM', 12, '2024-02-26 17:34:49', '2024-02-26 17:34:49'),
(34, '7:00 PM', 14, '2024-02-26 17:34:54', '2024-02-26 17:34:54'),
(35, '8:00 PM', 16, '2024-02-26 17:35:00', '2024-02-26 17:35:00'),
(36, '9:00 PM', 18, '2024-02-26 17:35:05', '2024-02-26 17:35:05'),
(37, '10:00 PM', 20, '2024-02-26 17:35:11', '2024-02-26 17:35:11'),
(38, '11:00 PM', 22, '2024-02-26 17:35:23', '2024-02-26 17:35:23'),
(39, '1:00 AM', 10, '2024-02-26 17:35:40', '2024-02-26 17:35:40'),
(40, '2:00 AM', 12, '2024-02-26 17:35:48', '2024-02-26 17:35:48'),
(41, '3:00 AM', 14, '2024-02-26 17:35:56', '2024-02-26 17:35:56'),
(42, '4:00 AM', 16, '2024-02-26 17:36:05', '2024-02-26 17:36:05'),
(43, '5:00 AM', 18, '2024-02-26 17:36:12', '2024-02-26 17:36:12'),
(44, '6:00 AM', 20, '2024-02-26 17:36:18', '2024-02-26 17:36:18'),
(45, '7:00 AM', 22, '2024-02-26 17:36:55', '2024-02-26 17:36:55'),
(46, '8:00 AM', 24, '2024-02-26 17:37:04', '2024-02-26 17:37:04'),
(47, '9:00 AM', 26, '2024-02-26 17:37:10', '2024-02-26 17:37:10'),
(48, '10:00 AM', 10, '2024-02-26 17:37:16', '2024-02-26 17:37:16'),
(49, '11:00 AM', 30, '2024-02-26 17:37:26', '2024-02-26 17:37:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
