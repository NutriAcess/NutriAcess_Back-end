CREATE TABLE `cliente` (
  `id_cliente` VARCHAR(50) PRIMARY KEY,
  `nome_completo` varchar(255) NOT NULL,
  `nome_social` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(255) not null 
);

CREATE TABLE `planos` (
  `id_plano` VARCHAR(50) PRIMARY KEY,
  `tipo` Enum('plus1', 'familia', 'plus2') NOT NULL,
  `duracao` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `valor` decimal NOT NULL
);

CREATE TABLE `familia` (
  `id_familia` VARCHAR(50) PRIMARY KEY,
  `nome` varchar(255) NOT NULL,
  `idade` int,
  `sexo` Enum('masculino', 'feminino', 'outro') NOT NULL,
  `peso` decimal NOT NULL,
  `id_cliente` VARCHAR(50),
  `id_plano` VARCHAR(255),
  foreign key (id_cliente) references cliente (id_cliente),
  foreign key (id_plano) references planos (id_plano)
);

CREATE TABLE `nutricionista` (
  `id_nutricionista` VARCHAR(50) PRIMARY KEY,
  `nome_completo` varchar(255) NOT NULL,
  `nome_social` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(255) not null,
  `especialidade` varchar(255),
  `crn` int NOT NULL
);

CREATE TABLE `consultas` (
  `id` VARCHAR(50) PRIMARY KEY,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `status` varchar(255) NOT NULL,
  `observacoes` varchar(255) NOT NULL,
  `id_nutricionista` VARCHAR(255),
  `id_cliente` VARCHAR(50),
  foreign key (id_nutricionista) references nutricionista (id_nutricionista),
  foreign key (id_cliente) references cliente (id_cliente)
);
ALTER TABLE formulario
ADD COLUMN foto ENUM('avatarUva', 'avatarMaca', 'avatarLaranja', 'avatarAbacaxi');

CREATE TABLE `formulario` (
  `id_formulario` VARCHAR(50) PRIMARY KEY,
  `objetivo` Enum('Perder peso', 'manter peso', 'ganhar massa') NOT NULL,
  `genero` ENUM('feminino', 'masculino', 'outro'),
  `altura` float(8,2) NOT NULL,
  `idade` int NOT NULL,
  `peso` float(8,2) NOT NULL,
  `capacidade_fisica` Enum('Sedentarismo', 'Atividade fisica moderada', 'Atividade fisica intensa'),
  `restricao_alimentar` Enum('Qualquer coisa', 'vegetariano', 'vegano'),
 `alergia` ENUM('gluten', 'laticinios', 'amendoim', 'peixes', 'ovos', 'mariscos', 'nenhum'),
  `tempo_preparo` Enum('Sim', 'Nao') NOT NULL,
	`foto`  ENUM('avatarUva', 'avatarMaca', 'avatarLaranja', 'avatarAbacaxi'),
  `plano` ENUM('plus1', 'familia', 'plus2') DEFAULT NULL,
  `id_cliente` VARCHAR(50),
  foreign key (id_cliente) references cliente (id_cliente)
);

CREATE TABLE `fale_conosco` (
  `id` VARCHAR(50) PRIMARY KEY,
  `avaliacao` Enum('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'),
  `nome_usuario` varchar(255),
  `email` varchar(255),
  `mensagem` varchar(255)
);

CREATE TABLE familia_cliente (
  id_familia_cliente VARCHAR(50) PRIMARY KEY,
  id_cliente VARCHAR(50),
  id_familia VARCHAR(50),
  foreign key (id_cliente) references cliente (id_cliente),
  foreign key (id_familia) references familia (id_familia)
);

CREATE TABLE perfil_nutri (
  id_perfil VARCHAR(50) PRIMARY KEY,
  nome varchar(255),
  foto blob,
  instagram varchar(255) NOT NULL,
  bio varchar(300) not null,
  especialidades varchar(255) NOT NULL
);

create table `ArmazenaPagamento` (
`id_pagamento` varchar(50) primary key,
`id_cliente` varchar(50),
`nomeTitular`varchar(255) not null,
`numeroCartao`bigint not null unique,
`validadeCartao` int not null unique,
`codigoSeguranca` int not null unique,
foreign key (id_cliente) references cliente (id_cliente)
);

