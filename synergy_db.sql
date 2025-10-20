--
-- PostgreSQL database dump
--

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-20 05:17:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 234 (class 1255 OID 16523)
-- Name: update_timestamp_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_timestamp_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   -- 'now()' en PostgreSQL devuelve un valor de tipo TIMESTAMPTZ, perfecto para nuestra columna.
   NEW.actualizado = now();
   RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamp_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 16564)
-- Name: catalogo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.catalogo (
    id_catalogo integer NOT NULL,
    nombre character varying(20) NOT NULL,
    costo_unitario numeric(10,2) NOT NULL,
    descripcion character varying(255),
    activo boolean DEFAULT true,
    creado timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    actualizado timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.catalogo OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16563)
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.catalogo_id_catalogo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.catalogo_id_catalogo_seq OWNER TO postgres;

--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 225
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.catalogo_id_catalogo_seq OWNED BY public.catalogo.id_catalogo;


--
-- TOC entry 233 (class 1259 OID 16639)
-- Name: cirugia_insumos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cirugia_insumos (
    id_tipo_cirugia integer NOT NULL,
    id_catalogo integer NOT NULL,
    cantidad_requerida numeric(20,0) NOT NULL
);


ALTER TABLE public.cirugia_insumos OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16611)
-- Name: cirugias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cirugias (
    id_cirugia integer NOT NULL,
    id_paciente integer NOT NULL,
    id_quirofano integer NOT NULL,
    id_tipo_cirugia integer NOT NULL,
    id_equipo integer NOT NULL,
    fecha_inicio timestamp with time zone NOT NULL,
    fecha_fin timestamp with time zone,
    descripcion character varying(255),
    expediente_ver boolean,
    motivo character varying(60),
    estado character varying(15) NOT NULL,
    creado timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    actualizado timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cirugias OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16610)
-- Name: cirugias_id_cirugia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cirugias_id_cirugia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cirugias_id_cirugia_seq OWNER TO postgres;

--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 231
-- Name: cirugias_id_cirugia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cirugias_id_cirugia_seq OWNED BY public.cirugias.id_cirugia;


--
-- TOC entry 228 (class 1259 OID 16576)
-- Name: empleados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleados (
    id_empleado integer NOT NULL,
    nombre character varying(25) NOT NULL,
    paterno character varying(25) NOT NULL,
    materno character varying(25) NOT NULL,
    correo character varying(40) NOT NULL,
    "contraseña" character varying(30) NOT NULL,
    turno character varying(15),
    telefono numeric(11,0),
    puesto character varying(15) NOT NULL,
    activo boolean,
    id_equipo integer
);


ALTER TABLE public.empleados OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16575)
-- Name: empleados_id_empleado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleados_id_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleados_id_empleado_seq OWNER TO postgres;

--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 227
-- Name: empleados_id_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleados_id_empleado_seq OWNED BY public.empleados.id_empleado;


--
-- TOC entry 220 (class 1259 OID 16539)
-- Name: equipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipos (
    id_equipo integer NOT NULL,
    nombre_equipo character varying(50) NOT NULL,
    descripcion character varying(50)
);


ALTER TABLE public.equipos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16538)
-- Name: equipos_id_equipo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipos_id_equipo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.equipos_id_equipo_seq OWNER TO postgres;

--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 219
-- Name: equipos_id_equipo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipos_id_equipo_seq OWNED BY public.equipos.id_equipo;


--
-- TOC entry 230 (class 1259 OID 16595)
-- Name: inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventario (
    id_inventario integer NOT NULL,
    id_catalogo integer NOT NULL,
    cantidad numeric(10,0) DEFAULT 0 NOT NULL,
    cantidad_minima numeric(10,0) DEFAULT 10,
    ultima_actualizacion timestamp with time zone
);


ALTER TABLE public.inventario OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16594)
-- Name: inventario_id_inventario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventario_id_inventario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventario_id_inventario_seq OWNER TO postgres;

--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 229
-- Name: inventario_id_inventario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventario_id_inventario_seq OWNED BY public.inventario.id_inventario;


--
-- TOC entry 216 (class 1259 OID 16525)
-- Name: pacientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pacientes (
    id_paciente integer NOT NULL,
    nombre character varying(20) NOT NULL,
    paterno character varying(20) NOT NULL,
    materno character varying(20),
    sexo character varying(10) NOT NULL,
    edad numeric(5,0) NOT NULL,
    telefono numeric(11,0) NOT NULL,
    contacto numeric(11,0),
    creado timestamp with time zone NOT NULL
);


ALTER TABLE public.pacientes OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16524)
-- Name: pacientes_id_paciente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pacientes_id_paciente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pacientes_id_paciente_seq OWNER TO postgres;

--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 215
-- Name: pacientes_id_paciente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pacientes_id_paciente_seq OWNED BY public.pacientes.id_paciente;


--
-- TOC entry 222 (class 1259 OID 16546)
-- Name: puestos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puestos (
    id_puesto integer NOT NULL,
    puesto character varying(15) NOT NULL
);


ALTER TABLE public.puestos OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16545)
-- Name: puestos_id_puesto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.puestos_id_puesto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.puestos_id_puesto_seq OWNER TO postgres;

--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 221
-- Name: puestos_id_puesto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.puestos_id_puesto_seq OWNED BY public.puestos.id_puesto;


--
-- TOC entry 218 (class 1259 OID 16532)
-- Name: quirofanos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quirofanos (
    id_quirofano integer NOT NULL,
    nombre character varying(25)
);


ALTER TABLE public.quirofanos OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16531)
-- Name: quirofanos_id_quirofano_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quirofanos_id_quirofano_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quirofanos_id_quirofano_seq OWNER TO postgres;

--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 217
-- Name: quirofanos_id_quirofano_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quirofanos_id_quirofano_seq OWNED BY public.quirofanos.id_quirofano;


--
-- TOC entry 224 (class 1259 OID 16555)
-- Name: tipo_cirugia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_cirugia (
    id_tipo_cirugia integer NOT NULL,
    nombre character varying(15) NOT NULL,
    horas numeric(10,0) NOT NULL,
    descripcion character varying(255)
);


ALTER TABLE public.tipo_cirugia OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16554)
-- Name: tipo_cirugia_id_tipo_cirugia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_cirugia_id_tipo_cirugia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_cirugia_id_tipo_cirugia_seq OWNER TO postgres;

--
-- TOC entry 3524 (class 0 OID 0)
-- Dependencies: 223
-- Name: tipo_cirugia_id_tipo_cirugia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_cirugia_id_tipo_cirugia_seq OWNED BY public.tipo_cirugia.id_tipo_cirugia;


--
-- TOC entry 3297 (class 2604 OID 16567)
-- Name: catalogo id_catalogo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.catalogo ALTER COLUMN id_catalogo SET DEFAULT nextval('public.catalogo_id_catalogo_seq'::regclass);


--
-- TOC entry 3305 (class 2604 OID 16614)
-- Name: cirugias id_cirugia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugias ALTER COLUMN id_cirugia SET DEFAULT nextval('public.cirugias_id_cirugia_seq'::regclass);


--
-- TOC entry 3301 (class 2604 OID 16579)
-- Name: empleados id_empleado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleados_id_empleado_seq'::regclass);


--
-- TOC entry 3294 (class 2604 OID 16542)
-- Name: equipos id_equipo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos ALTER COLUMN id_equipo SET DEFAULT nextval('public.equipos_id_equipo_seq'::regclass);


--
-- TOC entry 3302 (class 2604 OID 16598)
-- Name: inventario id_inventario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario ALTER COLUMN id_inventario SET DEFAULT nextval('public.inventario_id_inventario_seq'::regclass);


--
-- TOC entry 3292 (class 2604 OID 16528)
-- Name: pacientes id_paciente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacientes ALTER COLUMN id_paciente SET DEFAULT nextval('public.pacientes_id_paciente_seq'::regclass);


--
-- TOC entry 3295 (class 2604 OID 16549)
-- Name: puestos id_puesto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puestos ALTER COLUMN id_puesto SET DEFAULT nextval('public.puestos_id_puesto_seq'::regclass);


--
-- TOC entry 3293 (class 2604 OID 16535)
-- Name: quirofanos id_quirofano; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quirofanos ALTER COLUMN id_quirofano SET DEFAULT nextval('public.quirofanos_id_quirofano_seq'::regclass);


--
-- TOC entry 3296 (class 2604 OID 16558)
-- Name: tipo_cirugia id_tipo_cirugia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_cirugia ALTER COLUMN id_tipo_cirugia SET DEFAULT nextval('public.tipo_cirugia_id_tipo_cirugia_seq'::regclass);


--
-- TOC entry 3503 (class 0 OID 16564)
-- Dependencies: 226
-- Data for Name: catalogo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.catalogo (id_catalogo, nombre, costo_unitario, descripcion, activo, creado, actualizado) FROM stdin;
1	Bisturí desechable	150.00	Hoja de bisturí estéril de un solo uso	t	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
2	Guantes de látex	25.50	Par de guantes quirúrgicos estériles	t	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
3	Gasas estériles	50.00	Paquete con 10 gasas de 10x10 cm	t	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
4	Sutura absorbible	350.75	Hilo de sutura que se disuelve en el cuerpo	t	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
5	Solución salina	80.00	Botella de 1000 ml de solución salina IV	t	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
6	Anestesia local	550.00	Frasco de Lidocaína al 2%	t	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
7	Jeringa 10ml	15.00	Jeringa desechable de 10 mililitros	t	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
\.


--
-- TOC entry 3510 (class 0 OID 16639)
-- Dependencies: 233
-- Data for Name: cirugia_insumos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cirugia_insumos (id_tipo_cirugia, id_catalogo, cantidad_requerida) FROM stdin;
1	1	2
1	2	10
1	3	3
1	4	2
4	1	3
4	2	12
4	3	5
4	4	4
4	6	1
3	1	1
3	2	8
3	5	2
3	6	2
\.


--
-- TOC entry 3509 (class 0 OID 16611)
-- Dependencies: 232
-- Data for Name: cirugias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cirugias (id_cirugia, id_paciente, id_quirofano, id_tipo_cirugia, id_equipo, fecha_inicio, fecha_fin, descripcion, expediente_ver, motivo, estado, creado, actualizado) FROM stdin;
1	1	1	1	4	2025-10-22 09:00:00-06	2025-10-22 11:00:00-06	Apendicectomía laparoscópica	\N	Apendicitis aguda	Programada	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
2	2	3	4	1	2025-10-23 10:00:00-06	\N	Cesárea de emergencia	\N	Sufrimiento fetal	En Progreso	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
3	3	4	3	5	2025-10-24 12:00:00-06	\N	Reemplazo de ligamento cruzado	\N	Lesión deportiva	Programada	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
4	4	2	2	4	2025-10-20 14:00:00-06	2025-10-20 17:30:00-06	Colecistectomía por cálculos biliares	\N	Dolor abdominal crónico	Finalizada	2025-10-20 01:56:12.047036-06	2025-10-20 01:56:12.047036-06
5	3	2	1	1	2025-10-20 00:00:00-06	\N	hjkhkjhk	\N	ejemplo	programada	2025-10-20 04:51:10.82792-06	2025-10-20 04:51:10.82792-06
\.


--
-- TOC entry 3505 (class 0 OID 16576)
-- Dependencies: 228
-- Data for Name: empleados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleados (id_empleado, nombre, paterno, materno, correo, "contraseña", turno, telefono, puesto, activo, id_equipo) FROM stdin;
1	Juan	Pérez	García	jperez@hospital.com	adminpass123	Matutino	\N	Admin	t	3
5	David	Levet	Ramírez	admin@hospital.com	1234567890	Matutino	\N	Admin	t	\N
2	María	González	López	doctor@hospital.com	1234567890	Vespertino	\N	Doctor	t	4
3	Pedro	Martínez	Sánchez	anestesiologo@hospital.com	1234567890	Matutino	\N	Anestesiólogo	t	2
4	Laura	Hernández	Ramírez	enfermera@hospital.com	1234567890	Nocturno	\N	Enfermero/a	t	1
\.


--
-- TOC entry 3497 (class 0 OID 16539)
-- Dependencies: 220
-- Data for Name: equipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipos (id_equipo, nombre_equipo, descripcion) FROM stdin;
1	Equipo A	Equipo de soporte respiratorio
2	Equipo B	Administración de gases anestésicos
3	Equipo C	Monitoreo de signos vitales
4	Equipo D	Equipo para cortes de precisión
5	Equipo F	Para coagulación y corte de tejidos
\.


--
-- TOC entry 3507 (class 0 OID 16595)
-- Dependencies: 230
-- Data for Name: inventario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventario (id_inventario, id_catalogo, cantidad, cantidad_minima, ultima_actualizacion) FROM stdin;
1	1	200	50	2025-10-20 01:30:00-06
2	2	1000	200	2025-10-20 01:30:00-06
3	3	500	100	2025-10-20 01:30:00-06
4	4	150	40	2025-10-20 01:30:00-06
5	5	300	80	2025-10-20 01:30:00-06
6	6	100	30	2025-10-20 01:30:00-06
\.


--
-- TOC entry 3493 (class 0 OID 16525)
-- Dependencies: 216
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pacientes (id_paciente, nombre, paterno, materno, sexo, edad, telefono, contacto, creado) FROM stdin;
1	Carlos	Sánchez	García	Masculino	45	9611234567	9617654321	2025-10-15 08:00:00-06
2	Ana	López	Martínez	Femenino	34	9612345678	9618765432	2025-10-16 11:30:00-06
3	Jorge	Ramírez	Hernández	Masculino	62	9613456789	9619876543	2025-10-17 14:00:00-06
4	Sofía	Gómez	Cruz	Femenino	28	9614567890	9610987654	2025-10-18 09:45:00-06
5	Luis	Fernández	Pérez	Masculino	51	9615678901	9611098765	2025-10-19 18:20:00-06
\.


--
-- TOC entry 3499 (class 0 OID 16546)
-- Dependencies: 222
-- Data for Name: puestos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.puestos (id_puesto, puesto) FROM stdin;
1	Doctor
2	Anestesiólogo
3	Admin
4	Enfermero/a
\.


--
-- TOC entry 3495 (class 0 OID 16532)
-- Dependencies: 218
-- Data for Name: quirofanos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quirofanos (id_quirofano, nombre) FROM stdin;
1	Quirófano 1
2	Quirófano 2
3	Quirófano de Cardiología
4	Quirófano de Ortopedia
5	Sala de Cirugía Menor
\.


--
-- TOC entry 3501 (class 0 OID 16555)
-- Dependencies: 224
-- Data for Name: tipo_cirugia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_cirugia (id_tipo_cirugia, nombre, horas, descripcion) FROM stdin;
1	Apendicectomía	2	Extracción del apéndice
2	Colecistectomía	3	Extracción de la vesícula biliar
3	Artroscopia	4	Cirugía de rodilla mínimamente invasiva
4	Cesárea	2	Nacimiento por intervención quirúrgica
5	Bypass Gástrico	5	Cirugía para pérdida de peso
\.


--
-- TOC entry 3525 (class 0 OID 0)
-- Dependencies: 225
-- Name: catalogo_id_catalogo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.catalogo_id_catalogo_seq', 7, true);


--
-- TOC entry 3526 (class 0 OID 0)
-- Dependencies: 231
-- Name: cirugias_id_cirugia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cirugias_id_cirugia_seq', 5, true);


--
-- TOC entry 3527 (class 0 OID 0)
-- Dependencies: 227
-- Name: empleados_id_empleado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleados_id_empleado_seq', 5, true);


--
-- TOC entry 3528 (class 0 OID 0)
-- Dependencies: 219
-- Name: equipos_id_equipo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipos_id_equipo_seq', 5, true);


--
-- TOC entry 3529 (class 0 OID 0)
-- Dependencies: 229
-- Name: inventario_id_inventario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventario_id_inventario_seq', 6, true);


--
-- TOC entry 3530 (class 0 OID 0)
-- Dependencies: 215
-- Name: pacientes_id_paciente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pacientes_id_paciente_seq', 5, true);


--
-- TOC entry 3531 (class 0 OID 0)
-- Dependencies: 221
-- Name: puestos_id_puesto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.puestos_id_puesto_seq', 4, true);


--
-- TOC entry 3532 (class 0 OID 0)
-- Dependencies: 217
-- Name: quirofanos_id_quirofano_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quirofanos_id_quirofano_seq', 5, true);


--
-- TOC entry 3533 (class 0 OID 0)
-- Dependencies: 223
-- Name: tipo_cirugia_id_tipo_cirugia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_cirugia_id_tipo_cirugia_seq', 5, true);


--
-- TOC entry 3323 (class 2606 OID 16574)
-- Name: catalogo catalogo_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.catalogo
    ADD CONSTRAINT catalogo_nombre_key UNIQUE (nombre);


--
-- TOC entry 3325 (class 2606 OID 16572)
-- Name: catalogo catalogo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.catalogo
    ADD CONSTRAINT catalogo_pkey PRIMARY KEY (id_catalogo);


--
-- TOC entry 3337 (class 2606 OID 16643)
-- Name: cirugia_insumos cirugia_insumos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugia_insumos
    ADD CONSTRAINT cirugia_insumos_pkey PRIMARY KEY (id_tipo_cirugia, id_catalogo);


--
-- TOC entry 3335 (class 2606 OID 16618)
-- Name: cirugias cirugias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugias
    ADD CONSTRAINT cirugias_pkey PRIMARY KEY (id_cirugia);


--
-- TOC entry 3327 (class 2606 OID 16583)
-- Name: empleados empleados_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_correo_key UNIQUE (correo);


--
-- TOC entry 3329 (class 2606 OID 16581)
-- Name: empleados empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id_empleado);


--
-- TOC entry 3313 (class 2606 OID 16544)
-- Name: equipos equipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_pkey PRIMARY KEY (id_equipo);


--
-- TOC entry 3331 (class 2606 OID 16604)
-- Name: inventario inventario_id_catalogo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_id_catalogo_key UNIQUE (id_catalogo);


--
-- TOC entry 3333 (class 2606 OID 16602)
-- Name: inventario inventario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (id_inventario);


--
-- TOC entry 3309 (class 2606 OID 16530)
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id_paciente);


--
-- TOC entry 3315 (class 2606 OID 16551)
-- Name: puestos puestos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puestos
    ADD CONSTRAINT puestos_pkey PRIMARY KEY (id_puesto);


--
-- TOC entry 3317 (class 2606 OID 16553)
-- Name: puestos puestos_puesto_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puestos
    ADD CONSTRAINT puestos_puesto_key UNIQUE (puesto);


--
-- TOC entry 3311 (class 2606 OID 16537)
-- Name: quirofanos quirofanos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quirofanos
    ADD CONSTRAINT quirofanos_pkey PRIMARY KEY (id_quirofano);


--
-- TOC entry 3319 (class 2606 OID 16562)
-- Name: tipo_cirugia tipo_cirugia_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_cirugia
    ADD CONSTRAINT tipo_cirugia_nombre_key UNIQUE (nombre);


--
-- TOC entry 3321 (class 2606 OID 16560)
-- Name: tipo_cirugia tipo_cirugia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_cirugia
    ADD CONSTRAINT tipo_cirugia_pkey PRIMARY KEY (id_tipo_cirugia);


--
-- TOC entry 3347 (class 2620 OID 16654)
-- Name: catalogo update_catalogo_timestamp; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_catalogo_timestamp BEFORE UPDATE ON public.catalogo FOR EACH ROW EXECUTE FUNCTION public.update_timestamp_column();


--
-- TOC entry 3348 (class 2620 OID 16655)
-- Name: cirugias update_cirugias_timestamp; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_cirugias_timestamp BEFORE UPDATE ON public.cirugias FOR EACH ROW EXECUTE FUNCTION public.update_timestamp_column();


--
-- TOC entry 3345 (class 2606 OID 16649)
-- Name: cirugia_insumos cirugia_insumos_id_catalogo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugia_insumos
    ADD CONSTRAINT cirugia_insumos_id_catalogo_fkey FOREIGN KEY (id_catalogo) REFERENCES public.catalogo(id_catalogo);


--
-- TOC entry 3346 (class 2606 OID 16644)
-- Name: cirugia_insumos cirugia_insumos_id_tipo_cirugia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugia_insumos
    ADD CONSTRAINT cirugia_insumos_id_tipo_cirugia_fkey FOREIGN KEY (id_tipo_cirugia) REFERENCES public.tipo_cirugia(id_tipo_cirugia);


--
-- TOC entry 3341 (class 2606 OID 16634)
-- Name: cirugias cirugias_id_equipo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugias
    ADD CONSTRAINT cirugias_id_equipo_fkey FOREIGN KEY (id_equipo) REFERENCES public.equipos(id_equipo);


--
-- TOC entry 3342 (class 2606 OID 16619)
-- Name: cirugias cirugias_id_paciente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugias
    ADD CONSTRAINT cirugias_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.pacientes(id_paciente);


--
-- TOC entry 3343 (class 2606 OID 16624)
-- Name: cirugias cirugias_id_quirofano_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugias
    ADD CONSTRAINT cirugias_id_quirofano_fkey FOREIGN KEY (id_quirofano) REFERENCES public.quirofanos(id_quirofano);


--
-- TOC entry 3344 (class 2606 OID 16629)
-- Name: cirugias cirugias_id_tipo_cirugia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cirugias
    ADD CONSTRAINT cirugias_id_tipo_cirugia_fkey FOREIGN KEY (id_tipo_cirugia) REFERENCES public.tipo_cirugia(id_tipo_cirugia);


--
-- TOC entry 3338 (class 2606 OID 16589)
-- Name: empleados empleados_id_equipo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_id_equipo_fkey FOREIGN KEY (id_equipo) REFERENCES public.equipos(id_equipo);


--
-- TOC entry 3339 (class 2606 OID 16584)
-- Name: empleados empleados_puesto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_puesto_fkey FOREIGN KEY (puesto) REFERENCES public.puestos(puesto);


--
-- TOC entry 3340 (class 2606 OID 16605)
-- Name: inventario inventario_id_catalogo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_id_catalogo_fkey FOREIGN KEY (id_catalogo) REFERENCES public.catalogo(id_catalogo);


-- Completed on 2025-10-20 05:17:26

--
-- PostgreSQL database dump complete
--

