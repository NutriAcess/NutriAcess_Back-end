CREATE TABLE `cliente` (
  `id_cliente` VARCHAR(255) PRIMARY KEY,
  `nome_completo` varchar(255) NOT NULL,
  `nome_social` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
);


CREATE TABLE `planos` (
  `id_plano` VARCHAR(255) PRIMARY KEY,
  `tipo` Enum('Plus', 'Família', 'Premium') NOT NULL,
  `duracao` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `valor` decimal NOT NULL
);


CREATE TABLE `familia` (
  `id_familia` VARCHAR(255) PRIMARY KEY,
  `nome` varchar(255) NOT NULL,
  `idade` int,
  `sexo` Enum('masculino', 'feminino', 'outro') NOT NULL,
  `peso` decimal NOT NULL,
  `id_cliente` VARCHAR(255),
  `id_plano` VARCHAR(255),
  foreign key (id_cliente) references cliente (id_cliente),
  foreign key (id_plano) references planos (id_plano)
);



CREATE TABLE `nutricionista` (
  `id_nutricionista` VARCHAR(255) PRIMARY KEY,
  `nome_completo` varchar(255) NOT NULL,
  `nome_social` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `crn` int NOT NULL
);



CREATE TABLE `consultas` (
  `id` VARCHAR(255) PRIMARY KEY,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `status` varchar(255) NOT NULL,
  `observacoes` varchar(255) NOT NULL,
  `id_nutricionista` VARCHAR(255),
  `id_cliente` VARCHAR(255),
  foreign key (id_nutricionista) references nutricionista (id_nutricionista),
  foreign key (id_cliente) references cliente (id_cliente)
);


CREATE TABLE `formulario` (
  `id_formulario` VARCHAR(255) PRIMARY KEY,
  `objetivo` Enum('Perder peso', 'Manter meu peso atual', 'Ganhar massa muscular') NOT NULL,
  `genero` ENUM('feminino', 'masculino', 'outro'),
  `altura` decimal NOT NULL,
  `idade` int NOT NULL,
  `peso` decimal NOT NULL,
  `capacidade_fisica` Enum('Sedentarismo', 'Atividade física moderada', 'Atividade física intensiva'),
  `restricao_alimentar` Enum('Qualquer coisa', 'Sou vegetariano(a)', 'Sou vegano(a)'),
  `alergia` ENUM('gluten', 'laticinios', 'amendoim', 'peixes', 'ovos', 'mariscos'),
  `tempo_preparo` Enum('Sim', 'Nao') NOT NULL,
  `foto`LONGBLOB,
  `id_cliente` VARCHAR(255),
  foreign key (id_cliente) references cliente (id_cliente)
);
CREATE TABLE `fale_conosco` (
  `id` VARCHAR(255) PRIMARY KEY,
  `avaliacao` Enum('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'),
  `nome_usuario` varchar(255),
  `email` varchar(255),
  `mensagem` varchar(255)
);

CREATE TABLE familia_cliente (
  id_familia_cliente VARCHAR(255) PRIMARY KEY,
  id_cliente VARCHAR(255),
  id_familia VARCHAR(255),
  foreign key (id_cliente) references cliente (id_cliente),
  foreign key (id_familia) references familia (id_familia)
);



CREATE TABLE perfil_nutri (
  id_perfil VARCHAR(255) PRIMARY KEY,
  nome varchar(255),
  foto blob,
  instagram varchar(255) NOT NULL,
  bio varchar(300) not null,
  especialidades varchar(255) NOT NULL
);



create table `ArmazenaPagamento` (
`id_pagamento` varchar(255) primary key,
`id_cliente` varchar(255),
`nomeTitular`varchar(255) not null,
`numeroCartao`bigint not null unique,
`validadeCartao` int not null unique,
`codigoSeguranca` int not null unique,
foreign key (id_cliente) references cliente (id_cliente)
);