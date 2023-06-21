import { ClienteBusiness } from "./business/ClienteBusiness";
import { ConsultasBusiness } from "./business/ConsultasBusiness";
import { FaleConoscoBusiness } from "./business/FaleConoscoBusiness";
import { FamiliaBusiness } from "./business/FamiliaBusiness";
import { FormularioBusiness } from "./business/FormularioBusiness";
import { NutricionistaBusiness } from "./business/NutricionistaBusiness";
import { PlanosBusiness } from "./business/PlanosBusiness";
import { ClienteController } from "./controller/ClienteController";
import { ConsultasController } from "./controller/ConsultasController";
import { FaleConoscoController } from "./controller/FaleConoscoController";
import { FamiliaController } from "./controller/FamiliaController";
import { FormularioController } from "./controller/FormularioController";
import { NutricionistaController } from "./controller/NutricionistaController";
import { PlanosController } from "./controller/PlanosController";

import { app } from "./controller/app";
import { ClienteData } from "./data/ClienteData";
import { ConsultasData } from "./data/ConsultasData";
import { FaleConoscoData } from "./data/FaleConoscoData";
import { FamiliaData } from "./data/FamiliaData";
import { FormularioData } from "./data/FormularioData";
import { NutricionistaData } from "./data/NutricionistaData";
import { PlanosData } from "./data/PlanosData";
import { HashGenerator } from "./services/hashGenerator";
import { IdGenerator } from "./services/idGenerator";
import { TokenGenerator } from "./services/tokenGenerator";

//Cliente
const clienteBusiness = new ClienteBusiness(
  new HashGenerator(),
  new IdGenerator(),
  new TokenGenerator(),
  new ClienteData(),
  new FormularioData()
);
const clienteController = new ClienteController(clienteBusiness);
app.post("/cliente/cadastrar", clienteController.signup);
app.post("/cliente/conectar", clienteController.login);
app.get("/cliente/:id_cliente", clienteController.getClienteById);
app.get("/cliente", clienteController.getAllClientes);
app.put("/cliente/:id_cliente", clienteController.updateClienteById);
//Nutricionista
const nutriBusiness = new NutricionistaBusiness(
  new HashGenerator(),
  new IdGenerator(),
  new TokenGenerator(),
  new NutricionistaData()
);
const nutriController = new NutricionistaController(nutriBusiness);
app.post("/nutricionista/cadastrar", nutriController.signup);
app.post("/nutricionista/conectar", nutriController.login);
app.get("/nutricionista", nutriController.getAllNutricionistas);
app.get("/nutricionista/:id_nutricionista", nutriController.getNutriById);
//Consultas
const consultasBusiness = new ConsultasBusiness(
  new TokenGenerator(),
  new IdGenerator(),
  new ConsultasData(),
  new ClienteData(),
  new NutricionistaData()
);

const consultaController = new ConsultasController(consultasBusiness);
app.post("/consulta/criar", consultaController.createConsultas)
app.get("/consulta/:id", consultaController.getConsultaById);
app.get("/consulta", consultaController.getAllConsultas);


//Formulário
const formsBusiness = new FormularioBusiness(
  new IdGenerator(),
  new TokenGenerator(),
  new FormularioData(),
  new ClienteData()
);
const formsController = new FormularioController(formsBusiness);
app.post("/formulario/criar", formsController.createForm);
app.get("/formulario/:id_formulario", formsController.getFormById);
app.get("/formulario", formsController.getAllFormularios);


//Planos
const planosBusiness = new PlanosBusiness(
  new IdGenerator(),
  new PlanosData()
);

const planosController = new PlanosController(planosBusiness);
app.post("/planos/criar", planosController.createPlanos);
app.get("/planos/:id", planosController.getPlanoById);
app.get("/planos", planosController.getAllPlanos);


//Familia
const familiaBusiness = new FamiliaBusiness(
  new TokenGenerator(),
  new ClienteData(), 
  new IdGenerator(),
  new FamiliaData(),
  new PlanosData()
);
const familiaController = new FamiliaController(familiaBusiness);
app.post("/familia/criar", familiaController.createFamilia);
app.get("/familia/:id_familia", familiaController.getFamiliaById);
app.get("/familia", familiaController.getAllFamilias);

//Fale Conosco
const faleConoscoBusiness = new FaleConoscoBusiness(
  new IdGenerator(),
  new FaleConoscoData()
);
const faleConoscoController = new FaleConoscoController(faleConoscoBusiness);
app.post("/fale-conosco/criar", faleConoscoController.createFaleConosco);
app.get("/fale-conosco/:id", faleConoscoController.getFaleConoscoById);
app.get("/fale-conosco", faleConoscoController.getAllFaleConosco);

