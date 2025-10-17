-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: synergy_db
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cirujia_insumos`
--

DROP TABLE IF EXISTS `cirujia_insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cirujia_insumos` (
  `id_tipo_cirujia` decimal(10,0) NOT NULL,
  `id_inventario` decimal(10,0) NOT NULL,
  `cantidad_requerida` decimal(20,0) NOT NULL,
  KEY `id_inventario_fk` (`id_inventario`),
  KEY `id_tipo_cirujia_fk` (`id_tipo_cirujia`),
  CONSTRAINT `id_inventario_fk` FOREIGN KEY (`id_inventario`) REFERENCES `inventario` (`id_inventario`),
  CONSTRAINT `id_tipo_cirujia_fk` FOREIGN KEY (`id_tipo_cirujia`) REFERENCES `tipo_cirujia` (`id_tipo_cirujia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cirujia_insumos`
--

LOCK TABLES `cirujia_insumos` WRITE;
/*!40000 ALTER TABLE `cirujia_insumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cirujia_insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cirujias`
--

DROP TABLE IF EXISTS `cirujias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cirujias` (
  `id_cirujia` decimal(10,0) NOT NULL,
  `id_paciente` decimal(10,0) NOT NULL,
  `id_quirofano` decimal(10,0) NOT NULL,
  `id_tipo_cirujia` decimal(10,0) NOT NULL,
  `fecha_inicio` timestamp NOT NULL,
  `fecha_fin` timestamp NULL DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `expediente_ver` tinyint(1) DEFAULT NULL,
  `motivo` varchar(60) DEFAULT NULL,
  `creado` timestamp NULL DEFAULT NULL,
  `actualizado` timestamp NULL DEFAULT NULL,
  `estado` varchar(10) NOT NULL,
  `id_equipo` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_cirujia`),
  KEY `id_equipo_fk` (`id_equipo`),
  KEY `id_paciente_fk` (`id_paciente`),
  KEY `id_quirofano_fk` (`id_quirofano`),
  CONSTRAINT `id_equipo_fk` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`),
  CONSTRAINT `id_paciente_fk` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  CONSTRAINT `id_quirofano_fk` FOREIGN KEY (`id_quirofano`) REFERENCES `quirofanos` (`id_quirofano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cirujias`
--

LOCK TABLES `cirujias` WRITE;
/*!40000 ALTER TABLE `cirujias` DISABLE KEYS */;
/*!40000 ALTER TABLE `cirujias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  `paterno` varchar(25) NOT NULL,
  `materno` varchar(25) NOT NULL,
  `correo` varchar(40) NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  `turno` varchar(15) NOT NULL,
  `telefono` decimal(11,0) DEFAULT NULL,
  `puesto` varchar(15) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `id_equipo` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id_empleado`),
  KEY `puesto_fk` (`puesto`),
  CONSTRAINT `puesto_fk` FOREIGN KEY (`puesto`) REFERENCES `puestos` (`puesto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (3,'Elmar','Donaldo','Perez','elmarmaster@unach.mx','1234567890','Matutino',1234567890,'doctor',1,1);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos` (
  `id_equipo` decimal(10,0) NOT NULL,
  `nombre_equipo` varchar(20) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
INSERT INTO `equipos` VALUES (1,'equipo A','Equipo quirúrgico A'),(2,'equipo B','Equipo quirúrgico B');
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id_inventario` decimal(10,0) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `cantidad` decimal(20,0) NOT NULL,
  PRIMARY KEY (`id_inventario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id_paciente` decimal(10,0) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `paterno` varchar(20) NOT NULL,
  `materno` varchar(20) DEFAULT NULL,
  `sexo` varchar(8) NOT NULL,
  `edad` decimal(5,0) NOT NULL,
  `telefono` decimal(11,0) NOT NULL,
  `contacto` decimal(11,0) DEFAULT NULL,
  `creado` timestamp NOT NULL,
  PRIMARY KEY (`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puestos`
--

DROP TABLE IF EXISTS `puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puestos` (
  `id_puesto` decimal(10,0) NOT NULL,
  `puesto` varchar(15) NOT NULL,
  PRIMARY KEY (`id_puesto`),
  UNIQUE KEY `unique_puesto` (`puesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestos`
--

LOCK TABLES `puestos` WRITE;
/*!40000 ALTER TABLE `puestos` DISABLE KEYS */;
INSERT INTO `puestos` VALUES (3,'admin'),(1,'doctor'),(2,'enfermero');
/*!40000 ALTER TABLE `puestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quirofanos`
--

DROP TABLE IF EXISTS `quirofanos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quirofanos` (
  `id_quirofano` decimal(10,0) NOT NULL,
  `nombre` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_quirofano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quirofanos`
--

LOCK TABLES `quirofanos` WRITE;
/*!40000 ALTER TABLE `quirofanos` DISABLE KEYS */;
/*!40000 ALTER TABLE `quirofanos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_cirujia`
--

DROP TABLE IF EXISTS `tipo_cirujia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_cirujia` (
  `id_tipo_cirujia` decimal(10,0) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `horas` decimal(10,0) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_cirujia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_cirujia`
--

LOCK TABLES `tipo_cirujia` WRITE;
/*!40000 ALTER TABLE `tipo_cirujia` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_cirujia` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-15 17:55:54
