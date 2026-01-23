CREATE DATABASE casagastos;

\c casagastos;

CREATE TABLE public.pessoas (
    "Id" uuid,
    "Name" varchar(100),
    "DateBirth" date,
    "Created_At" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.categorias (
    "Id" UUID,
    "Description" varchar(100),
    "Target" varchar(50),
    "Created_At" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.transacoes (
    "Id" UUID,
    "Description" varchar(100),
    "Value" numeric(10,2),
    "Target" varchar(50),
    "Category" UUID,
    "Owner" UUID,
    "Created_At" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.users (
    "Id" SERIAL PRIMARY KEY,
    "Email" varchar(255),
    "DateBirth" varchar(10),
    "Username" varchar(100),
    "Password" varchar(32),
    "Created_At" TIMESTAMP DEFAULT NOW()
);