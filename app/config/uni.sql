-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 15 2020 г., 04:58
-- Версия сервера: 8.0.19
-- Версия PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `uni`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`127.0.0.1` PROCEDURE `add_session` (IN `movie_id` INT, IN `cinema_id` INT, IN `date` DATETIME, IN `price` DOUBLE, OUT `status` SMALLINT)  begin
    if not (exists(select id from movies where movie_id=id) and exists(SELECT id from cinemas where id=cinema_id)) then
    set status = 1;
    else
    insert into sessions(`date`,`movie_id`,`cinema_id`,`price`) values(date,movie_id,cinema_id,price);
    set status = 0;
    end if;
    end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `cinemas`
--

CREATE TABLE `cinemas` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `cinemas`
--

INSERT INTO `cinemas` (`id`, `name`, `address`) VALUES
(1, 'wa', 'pupkina'),
(8, 'wa', 'pupkina1');

--
-- Триггеры `cinemas`
--
DELIMITER $$
CREATE TRIGGER `on_cinema_add` BEFORE INSERT ON `cinemas` FOR EACH ROW begin
if length(new.name) < 1 then
	signal sqlstate '45000' set message_text =
    'name cannot be empty';
end if;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `movies`
--

CREATE TABLE `movies` (
  `id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `release_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `movies`
--

INSERT INTO `movies` (`id`, `title`, `release_date`) VALUES
(2, '12', '2001-10-10'),
(3, 'da', '1901-10-01'),
(4, 'fir2stsho', '2001-10-11'),
(5, 'wa1', '1901-10-01'),
(6, 'wa1', '1901-10-01'),
(7, 'some title', '2004-01-02');

--
-- Триггеры `movies`
--
DELIMITER $$
CREATE TRIGGER `on_movie_add` BEFORE INSERT ON `movies` FOR EACH ROW begin
if LENGTH(new.title) < 1 then
	signal sqlstate '45000' set message_text = 			'length of title cannot be zero';
end if;
if (year(new.release_date) < 1900 || 					year(new.release_date) > 2019) then
    signal sqlstate '45000' set message_text = 			'incorrect year';
end if;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `id` int NOT NULL,
  `date` datetime NOT NULL,
  `movie_id` int NOT NULL,
  `cinema_id` int NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`id`, `date`, `movie_id`, `cinema_id`, `price`) VALUES
(6, '1901-10-01 00:00:00', 2, 1, 5),
(7, '1901-10-01 00:00:00', 2, 1, 31.21),
(8, '1901-10-01 00:00:00', 2, 1, 31.21);

--
-- Триггеры `sessions`
--
DELIMITER $$
CREATE TRIGGER `on_session_add` BEFORE INSERT ON `sessions` FOR EACH ROW begin
if length(new.date) < 1 then
	signal sqlstate '45000' set message_text =
    'date cannot be empty';
end if;
if new.price < 0 then
	signal sqlstate '45000' set message_text =
    'incorrect price';
end if;
end
$$
DELIMITER ;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `address_indx` (`address`);

--
-- Индексы таблицы `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cinema_id_fk` (`cinema_id`),
  ADD KEY `movie_id_fk` (`movie_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `cinema_id_fk` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `movie_id_fk` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
