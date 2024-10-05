--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8 (Debian 15.8-1.pgdg120+1)
-- Dumped by pg_dump version 15.8 (Debian 15.8-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: email; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.email AS character varying(255)
	CONSTRAINT email_check CHECK (((VALUE)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'::text));


ALTER DOMAIN public.email OWNER TO postgres;

--
-- Name: gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender AS ENUM (
    'F',
    'M',
    'O'
);


ALTER TYPE public.gender OWNER TO postgres;

--
-- Name: rol; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.rol AS ENUM (
    'ADMIN',
    'EMPLOYEE',
    'MANAGER',
    'CASHIER'
);


ALTER TYPE public.rol OWNER TO postgres;

--
-- Name: type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.type AS ENUM (
    'NIEVE_TAPADA',
    'POR_BOLAS',
    'BEBIDA'
);


ALTER TYPE public.type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: branch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branch (
    id_branch integer NOT NULL,
    name character varying(255) NOT NULL,
    date_start timestamp without time zone NOT NULL,
    active boolean DEFAULT true,
    id_contact integer,
    id_direction integer,
    hour_start integer,
    hour_end integer
);


ALTER TABLE public.branch OWNER TO postgres;

--
-- Name: branch_id_branch_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.branch_id_branch_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.branch_id_branch_seq OWNER TO postgres;

--
-- Name: branch_id_branch_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.branch_id_branch_seq OWNED BY public.branch.id_branch;


--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    id_contact integer NOT NULL,
    tel character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    instagram character varying(255),
    facebook character varying(255)
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- Name: contact_id_contact_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_id_contact_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_id_contact_seq OWNER TO postgres;

--
-- Name: contact_id_contact_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_id_contact_seq OWNED BY public.contact.id_contact;


--
-- Name: direction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.direction (
    id_direction integer NOT NULL,
    zone character varying(255) NOT NULL,
    street character varying(255) NOT NULL
);


ALTER TABLE public.direction OWNER TO postgres;

--
-- Name: direction_id_direction_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.direction_id_direction_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.direction_id_direction_seq OWNER TO postgres;

--
-- Name: direction_id_direction_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.direction_id_direction_seq OWNED BY public.direction.id_direction;


--
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    id_employee integer NOT NULL,
    no_employee character varying(255),
    gender character(1) NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    second_surname character varying(255) NOT NULL,
    date_start timestamp without time zone DEFAULT now(),
    tel character varying(255) NOT NULL,
    date_end timestamp without time zone,
    id_storage integer,
    id_branch integer
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- Name: employee_id_employee_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_id_employee_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_id_employee_seq OWNER TO postgres;

--
-- Name: employee_id_employee_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_id_employee_seq OWNED BY public.employee.id_employee;


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id_order integer NOT NULL,
    status boolean,
    date timestamp without time zone DEFAULT now(),
    id_branch integer
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_details (
    id_order integer NOT NULL,
    id_employee integer NOT NULL,
    id_product integer NOT NULL,
    quantity integer
);


ALTER TABLE public.order_details OWNER TO postgres;

--
-- Name: order_id_order_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_order_seq OWNER TO postgres;

--
-- Name: order_id_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_order_seq OWNED BY public."order".id_order;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id_product integer NOT NULL,
    price double precision NOT NULL,
    product character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    active boolean DEFAULT true,
    flavor character varying(255) NOT NULL,
    presentacion character varying(255) NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_id_product_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_product_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_product_seq OWNER TO postgres;

--
-- Name: product_id_product_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_product_seq OWNED BY public.product.id_product;


--
-- Name: product_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_seq OWNER TO postgres;

--
-- Name: product_storage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_storage (
    id_product integer NOT NULL,
    id_storage integer NOT NULL,
    stock integer
);


ALTER TABLE public.product_storage OWNER TO postgres;

--
-- Name: sale_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sale_details (
    id_sale integer NOT NULL,
    id_employee integer NOT NULL,
    id_product integer NOT NULL,
    date timestamp without time zone DEFAULT now(),
    quantity integer
);


ALTER TABLE public.sale_details OWNER TO postgres;

--
-- Name: sale_details_id_sale_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sale_details_id_sale_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sale_details_id_sale_seq OWNER TO postgres;

--
-- Name: sale_details_id_sale_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sale_details_id_sale_seq OWNED BY public.sale_details.id_sale;


--
-- Name: storage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.storage (
    id_storage integer NOT NULL,
    id_branch integer,
    branch_id_branch integer
);


ALTER TABLE public.storage OWNER TO postgres;

--
-- Name: storage_id_storage_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.storage_id_storage_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.storage_id_storage_seq OWNER TO postgres;

--
-- Name: storage_id_storage_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.storage_id_storage_seq OWNED BY public.storage.id_storage;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id_user integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    active boolean DEFAULT true,
    rol character varying(255) DEFAULT 'EMPLOYEE'::public.rol NOT NULL,
    id_employee integer
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_user_seq OWNER TO postgres;

--
-- Name: user_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_user_seq OWNED BY public."user".id_user;


--
-- Name: branch id_branch; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch ALTER COLUMN id_branch SET DEFAULT nextval('public.branch_id_branch_seq'::regclass);


--
-- Name: contact id_contact; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN id_contact SET DEFAULT nextval('public.contact_id_contact_seq'::regclass);


--
-- Name: direction id_direction; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direction ALTER COLUMN id_direction SET DEFAULT nextval('public.direction_id_direction_seq'::regclass);


--
-- Name: employee id_employee; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN id_employee SET DEFAULT nextval('public.employee_id_employee_seq'::regclass);


--
-- Name: order id_order; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id_order SET DEFAULT nextval('public.order_id_order_seq'::regclass);


--
-- Name: product id_product; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id_product SET DEFAULT nextval('public.product_id_product_seq'::regclass);


--
-- Name: sale_details id_sale; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_details ALTER COLUMN id_sale SET DEFAULT nextval('public.sale_details_id_sale_seq'::regclass);


--
-- Name: storage id_storage; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage ALTER COLUMN id_storage SET DEFAULT nextval('public.storage_id_storage_seq'::regclass);


--
-- Name: user id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id_user SET DEFAULT nextval('public.user_id_user_seq'::regclass);


--
-- Data for Name: branch; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branch (id_branch, name, date_start, active, id_contact, id_direction, hour_start, hour_end) FROM stdin;
\.


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (id_contact, tel, email, instagram, facebook) FROM stdin;
3	4121204726	uriel@gmail.com	Instagram	facebook
\.


--
-- Data for Name: direction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.direction (id_direction, zone, street) FROM stdin;
1	Zona Centro	Isabel la Catolica
2	Zona Centro	Pensador Mexicano
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (id_employee, no_employee, gender, name, surname, second_surname, date_start, tel, date_end, id_storage, id_branch) FROM stdin;
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id_order, status, date, id_branch) FROM stdin;
\.


--
-- Data for Name: order_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_details (id_order, id_employee, id_product, quantity) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id_product, price, product, type, active, flavor, presentacion) FROM stdin;
7	20	NIEVE	BEBIDA	t	Fresa	mediano
8	20	NIEVE	BEBIDA	t	Fresa	mediano
\.


--
-- Data for Name: product_storage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_storage (id_product, id_storage, stock) FROM stdin;
\.


--
-- Data for Name: sale_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sale_details (id_sale, id_employee, id_product, date, quantity) FROM stdin;
\.


--
-- Data for Name: storage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.storage (id_storage, id_branch, branch_id_branch) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id_user, email, password, active, rol, id_employee) FROM stdin;
\.


--
-- Name: branch_id_branch_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.branch_id_branch_seq', 1, false);


--
-- Name: contact_id_contact_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_id_contact_seq', 3, true);


--
-- Name: direction_id_direction_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.direction_id_direction_seq', 2, true);


--
-- Name: employee_id_employee_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_id_employee_seq', 1, false);


--
-- Name: order_id_order_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_order_seq', 1, false);


--
-- Name: product_id_product_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_product_seq', 8, true);


--
-- Name: product_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_seq', 201, true);


--
-- Name: sale_details_id_sale_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sale_details_id_sale_seq', 1, false);


--
-- Name: storage_id_storage_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.storage_id_storage_seq', 1, false);


--
-- Name: user_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_user_seq', 1, false);


--
-- Name: branch branch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_pkey PRIMARY KEY (id_branch);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id_contact);


--
-- Name: direction direction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direction
    ADD CONSTRAINT direction_pkey PRIMARY KEY (id_direction);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id_employee);


--
-- Name: order_details order_details_pk1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pk1 PRIMARY KEY (id_product, id_order, id_employee);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id_order);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id_product);


--
-- Name: product_storage product_storage_pk1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_storage
    ADD CONSTRAINT product_storage_pk1 PRIMARY KEY (id_product, id_storage);


--
-- Name: sale_details sale_datails_pk2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT sale_datails_pk2 PRIMARY KEY (id_sale, id_employee, id_product);


--
-- Name: storage storage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage
    ADD CONSTRAINT storage_pkey PRIMARY KEY (id_storage);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id_user);


--
-- Name: branch branch_id_contact_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_id_contact_fkey FOREIGN KEY (id_contact) REFERENCES public.contact(id_contact);


--
-- Name: branch branch_id_direction_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_id_direction_fkey FOREIGN KEY (id_direction) REFERENCES public.direction(id_direction);


--
-- Name: employee employee_id_branch_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_id_branch_fkey FOREIGN KEY (id_branch) REFERENCES public.branch(id_branch);


--
-- Name: storage fkj1kg3jgygmgb7odtld78un9hm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage
    ADD CONSTRAINT fkj1kg3jgygmgb7odtld78un9hm FOREIGN KEY (branch_id_branch) REFERENCES public.branch(id_branch);


--
-- Name: order_details order_details_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_fk1 FOREIGN KEY (id_product) REFERENCES public.product(id_product);


--
-- Name: order_details order_details_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_fk2 FOREIGN KEY (id_order) REFERENCES public."order"(id_order);


--
-- Name: order_details order_details_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_fk3 FOREIGN KEY (id_employee) REFERENCES public.employee(id_employee);


--
-- Name: order order_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_fk1 FOREIGN KEY (id_branch) REFERENCES public.branch(id_branch);


--
-- Name: employee product_storage_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT product_storage_fk1 FOREIGN KEY (id_storage) REFERENCES public.storage(id_storage);


--
-- Name: product_storage product_storage_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_storage
    ADD CONSTRAINT product_storage_fk1 FOREIGN KEY (id_product) REFERENCES public.product(id_product);


--
-- Name: product_storage product_storage_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_storage
    ADD CONSTRAINT product_storage_fk2 FOREIGN KEY (id_storage) REFERENCES public.storage(id_storage);


--
-- Name: sale_details sale_datails_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT sale_datails_fk2 FOREIGN KEY (id_employee) REFERENCES public.employee(id_employee);


--
-- Name: sale_details sale_datails_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_details
    ADD CONSTRAINT sale_datails_fk3 FOREIGN KEY (id_product) REFERENCES public.product(id_product);


--
-- Name: storage storage_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage
    ADD CONSTRAINT storage_fk1 FOREIGN KEY (id_branch) REFERENCES public.branch(id_branch);


--
-- Name: user user_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_fk1 FOREIGN KEY (id_employee) REFERENCES public.employee(id_employee);


--
-- PostgreSQL database dump complete
--

