/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.7.11 : Database - test
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`test` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `test`;

/*Table structure for table `automobil` */

DROP TABLE IF EXISTS `automobil`;

CREATE TABLE `automobil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marka_id` int(11) DEFAULT NULL,
  `model` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `godina_proizvodnje` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `godina_modela` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `kilometraza` int(11) DEFAULT NULL,
  `motor` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `snaga_motora` int(11) DEFAULT NULL,
  `radni_obujam` int(11) DEFAULT NULL,
  `mjenjac` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `broj_stupnjeva` int(11) DEFAULT NULL,
  `potrosnja_goriva` varchar(256) DEFAULT NULL,
  `stanje_vozila` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `lokacija_vozila` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `vlasnik` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `garaziran` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `broj_vrata` int(11) DEFAULT NULL,
  `broj_sjedala` int(11) DEFAULT NULL,
  `boja` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  `vrsta_pogona` varchar(256) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vozilo_ibfk_1` (`marka_id`),
  CONSTRAINT `automobil_ibfk_1` FOREIGN KEY (`marka_id`) REFERENCES `marka` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `automobil` */

insert  into `automobil`(`id`,`marka_id`,`model`,`godina_proizvodnje`,`godina_modela`,`kilometraza`,`motor`,`snaga_motora`,`radni_obujam`,`mjenjac`,`broj_stupnjeva`,`potrosnja_goriva`,`stanje_vozila`,`lokacija_vozila`,`vlasnik`,`garaziran`,`broj_vrata`,`broj_sjedala`,`boja`,`vrsta_pogona`) values 
(1,7,'320d','2018','2018',140000,'Dizel',150,112423,'Automatski',6,'5.4','rabljeno','Zagreb, Hrvatska','prvi','Da',4,5,'bijela','stražnji'),
(3,5,'A6','2015','2015',350000,'Benzin',125,2411544,'Rucni',6,'6.7','rabljeno','Njemacka','drugi','Ne',4,5,'crna','prednji');

/*Table structure for table `automobil_dodatna_oprema` */

DROP TABLE IF EXISTS `automobil_dodatna_oprema`;

CREATE TABLE `automobil_dodatna_oprema` (
  `id_automobil` int(11) NOT NULL,
  `id_dodatna_oprema` int(11) NOT NULL,
  PRIMARY KEY (`id_automobil`,`id_dodatna_oprema`),
  KEY `id_dodatna_oprema` (`id_dodatna_oprema`),
  CONSTRAINT `automobil_dodatna_oprema_ibfk_1` FOREIGN KEY (`id_automobil`) REFERENCES `automobil` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `automobil_dodatna_oprema_ibfk_2` FOREIGN KEY (`id_dodatna_oprema`) REFERENCES `dodatna_oprema` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `automobil_dodatna_oprema` */

insert  into `automobil_dodatna_oprema`(`id_automobil`,`id_dodatna_oprema`) values 
(1,1);

/*Table structure for table `automobil_slika` */

DROP TABLE IF EXISTS `automobil_slika`;

CREATE TABLE `automobil_slika` (
  `id_automobil` int(11) NOT NULL,
  `id_slika` int(11) NOT NULL,
  PRIMARY KEY (`id_automobil`,`id_slika`),
  KEY `id_slika` (`id_slika`),
  CONSTRAINT `automobil_slika_ibfk_1` FOREIGN KEY (`id_automobil`) REFERENCES `automobil` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `automobil_slika_ibfk_2` FOREIGN KEY (`id_slika`) REFERENCES `slika` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `automobil_slika` */

/*Table structure for table `car` */

DROP TABLE IF EXISTS `car`;

CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manufacturer` varchar(256) DEFAULT NULL,
  `model` varchar(256) DEFAULT NULL,
  `year` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `car` */

insert  into `car`(`id`,`manufacturer`,`model`,`year`) values 
(1,'bmw','m5','2018'),
(2,'audi','a7','2015');

/*Table structure for table `dodatna_oprema` */

DROP TABLE IF EXISTS `dodatna_oprema`;

CREATE TABLE `dodatna_oprema` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `dodatna_oprema` */

insert  into `dodatna_oprema`(`id`,`name`) values 
(1,'klima');

/*Table structure for table `marka` */

DROP TABLE IF EXISTS `marka`;

CREATE TABLE `marka` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

/*Data for the table `marka` */

insert  into `marka`(`id`,`name`) values 
(1,'Acura'),
(2,'Alfa Romeo'),
(3,'Aro'),
(4,'Aston Martin'),
(5,'Audi'),
(6,'Bentley'),
(7,'BMW'),
(8,'Cadillac'),
(9,'Chevrolet'),
(10,'Chrysler'),
(11,'Citroën'),
(12,'Dacia'),
(13,'Daewoo'),
(14,'Daihatsu'),
(15,'Dodge'),
(16,'Dongfeng'),
(17,'Electa'),
(18,'Ferrari'),
(19,'Fiat'),
(20,'Fisker'),
(21,'Ford'),
(22,'GMC'),
(23,'Great Wall Motor'),
(24,'Honda'),
(25,'Hummer'),
(26,'Hyundai'),
(27,'Infiniti'),
(28,'Isuzu'),
(29,'Jaguar'),
(30,'Jeep'),
(31,'Kia'),
(32,'Lada'),
(33,'Lamborghini'),
(34,'Lancia'),
(35,'Land Rover'),
(36,'Lexus'),
(37,'Lincoln'),
(38,'Lotus'),
(39,'Mahindra'),
(40,'Maserati'),
(41,'Maybach'),
(42,'Mazda'),
(43,'Mercedes-Benz'),
(44,'MG'),
(45,'MINI'),
(46,'Mitsubishi'),
(47,'Nissan'),
(48,'NSU'),
(49,'Opel'),
(50,'Peugeot'),
(51,'Pontiac'),
(52,'Porsche'),
(53,'Puch'),
(54,'Proton'),
(55,'Renault'),
(56,'Rolls-Royce'),
(57,'Rover'),
(58,'Saab'),
(59,'Seat'),
(60,'Santana'),
(61,'Smart'),
(62,'Ssang Yong'),
(63,'Subaru'),
(64,'Suzuki'),
(65,'Škoda'),
(66,'Tata'),
(67,'Tesla'),
(68,'Toyota'),
(69,'Trabant'),
(70,'USA'),
(71,'UAZ'),
(72,'Volvo'),
(73,'VW'),
(74,'Wartburg'),
(75,'Yugo'),
(76,'Zastava'),
(77,'Zhidou');

/*Table structure for table `slika` */

DROP TABLE IF EXISTS `slika`;

CREATE TABLE `slika` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `slika` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `lastname` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `username` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(2048) COLLATE utf8_bin DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user` */

insert  into `user`(`id`,`firstname`,`lastname`,`email`,`username`,`password`,`created`,`modified`) values 
(5,'admin','admin','admin','admin','$2y$10$udMLzaLlaTWDCIn7rNYd9.WK90J4N3KQD8jo0Y.Imd6PpyL5F8MP6','2019-05-27 08:27:53','2019-05-27 08:27:53');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
