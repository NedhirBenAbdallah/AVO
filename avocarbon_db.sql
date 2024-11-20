--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-20 10:30:08

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 24718)
-- Name: CauseArret; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CauseArret" (
    id_causearret integer NOT NULL,
    date_cause date,
    causearret character varying(255),
    service character varying(255),
    minutearret integer,
    ligne_id integer
);


ALTER TABLE public."CauseArret" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24717)
-- Name: CauseArret_id_causearret_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CauseArret_id_causearret_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CauseArret_id_causearret_seq" OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 223
-- Name: CauseArret_id_causearret_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CauseArret_id_causearret_seq" OWNED BY public."CauseArret".id_causearret;


--
-- TOC entry 217 (class 1259 OID 24600)
-- Name: QteParJour; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."QteParJour" (
    jour "char" NOT NULL,
    quantite integer NOT NULL,
    heure_paye integer NOT NULL,
    date date NOT NULL
);


ALTER TABLE public."QteParJour" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24614)
-- Name: ligne; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ligne (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    h1000 character varying(255),
    cadence character varying(255)
);


ALTER TABLE public.ligne OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24613)
-- Name: ligne_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ligne_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ligne_id_seq OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 220
-- Name: ligne_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ligne_id_seq OWNED BY public.ligne.id;


--
-- TOC entry 226 (class 1259 OID 24734)
-- Name: track; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.track (
    id integer NOT NULL,
    date_start date NOT NULL,
    week_number integer NOT NULL,
    day_name character varying(255) NOT NULL,
    ligne_id integer NOT NULL,
    qt integer NOT NULL,
    h_paye integer NOT NULL,
    capacity integer NOT NULL
);


ALTER TABLE public.track OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24660)
-- Name: track_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.track_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.track_id_seq OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24733)
-- Name: track_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.track_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.track_id_seq1 OWNER TO postgres;

--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 225
-- Name: track_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.track_id_seq1 OWNED BY public.track.id;


--
-- TOC entry 219 (class 1259 OID 24605)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24604)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 4717 (class 2604 OID 24721)
-- Name: CauseArret id_causearret; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CauseArret" ALTER COLUMN id_causearret SET DEFAULT nextval('public."CauseArret_id_causearret_seq"'::regclass);


--
-- TOC entry 4716 (class 2604 OID 24617)
-- Name: ligne id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ligne ALTER COLUMN id SET DEFAULT nextval('public.ligne_id_seq'::regclass);


--
-- TOC entry 4718 (class 2604 OID 24737)
-- Name: track id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.track ALTER COLUMN id SET DEFAULT nextval('public.track_id_seq1'::regclass);


--
-- TOC entry 4715 (class 2604 OID 24608)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4883 (class 0 OID 24718)
-- Dependencies: 224
-- Data for Name: CauseArret; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CauseArret" (id_causearret, date_cause, causearret, service, minutearret, ligne_id) FROM stdin;
20	2024-11-10	test	Maintenance	10	21
21	2024-11-10	explosion	Production	10	21
22	2024-11-11	test	Qualité	15	24
\.


--
-- TOC entry 4876 (class 0 OID 24600)
-- Dependencies: 217
-- Data for Name: QteParJour; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."QteParJour" (jour, quantite, heure_paye, date) FROM stdin;
\.


--
-- TOC entry 4880 (class 0 OID 24614)
-- Dependencies: 221
-- Data for Name: ligne; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ligne (id, title, h1000, cadence) FROM stdin;
21	BUA	27	5000
22	MNG2	27	900
24	MNG1	25	1000
11	FP	27	5000
\.


--
-- TOC entry 4885 (class 0 OID 24734)
-- Dependencies: 226
-- Data for Name: track; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.track (id, date_start, week_number, day_name, ligne_id, qt, h_paye, capacity) FROM stdin;
19	2024-11-11	46	Monday	11	3	81	1500
20	2024-11-11	46	Monday	24	4000	100	1
21	2024-11-10	45	Sunday	24	4000	100	4000
22	2024-11-12	46	Tuesday	24	4000	90	1000
23	2024-10-14	42	Monday	11	5000	100	1000
24	2025-02-05	6	Wednesday	11	5000	100	100
25	2024-11-28	49	Thursday	11	5000	100	100
26	2024-01-17	3	Wednesday	22	5000	100	20
27	2024-02-23	9	Friday	24	5000	100	20
28	2024-03-14	12	Thursday	24	5000	100	20
29	2024-04-14	15	Sunday	24	5000	100	20
30	2024-05-14	20	Tuesday	22	5000	100	20
31	2024-06-14	25	Friday	21	5000	100	20
32	2024-07-14	28	Sunday	22	5000	100	20
33	2024-08-14	33	Wednesday	22	5000	100	20
34	2024-11-11	46	Monday	11	5000	100	40000
35	2024-01-15	3	Monday	11	2000	100	5000
36	2024-11-22	48	Friday	11	500	100	5000
37	2024-03-14	12	Thursday	22	10	50	5000
38	2024-11-23	48	Saturday	21	10	10	5000
39	2024-03-14	12	Thursday	22	50000	200	500
40	2024-11-07	46	Thursday	24	1	10	50000
41	2024-03-14	12	Thursday	22	10	100	50000
42	2024-11-25	48	Monday	24	1000	100	5000
\.


--
-- TOC entry 4878 (class 0 OID 24605)
-- Dependencies: 219
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, password, role) FROM stdin;
1	admin_user	hashed_password_1	admin
2	regular_user	hashed_password_2	user
3	manager_user	hashed_password_3	manager
4	nadhir	123	admin
5	12345	12345	user
7	123457	12345	user
\.


--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 223
-- Name: CauseArret_id_causearret_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CauseArret_id_causearret_seq"', 22, true);


--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 220
-- Name: ligne_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ligne_id_seq', 24, true);


--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 222
-- Name: track_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.track_id_seq', 30, true);


--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 225
-- Name: track_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.track_id_seq1', 47, true);


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 7, true);


--
-- TOC entry 4726 (class 2606 OID 24725)
-- Name: CauseArret CauseArret_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CauseArret"
    ADD CONSTRAINT "CauseArret_pkey" PRIMARY KEY (id_causearret);


--
-- TOC entry 4724 (class 2606 OID 24619)
-- Name: ligne ligne_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ligne
    ADD CONSTRAINT ligne_pkey PRIMARY KEY (id);


--
-- TOC entry 4728 (class 2606 OID 24739)
-- Name: track track_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_pkey PRIMARY KEY (id);


--
-- TOC entry 4720 (class 2606 OID 24610)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 4722 (class 2606 OID 24612)
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- TOC entry 4729 (class 2606 OID 24726)
-- Name: CauseArret fk_ligne; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CauseArret"
    ADD CONSTRAINT fk_ligne FOREIGN KEY (ligne_id) REFERENCES public.ligne(id) ON DELETE CASCADE;


--
-- TOC entry 4730 (class 2606 OID 24740)
-- Name: track track_ligne_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.track
    ADD CONSTRAINT track_ligne_id_fkey FOREIGN KEY (ligne_id) REFERENCES public.ligne(id);


-- Completed on 2024-11-20 10:30:10

--
-- PostgreSQL database dump complete
--

