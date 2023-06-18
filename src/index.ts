import { ClienteBusiness } from "./business/ClienteBusiness";
import { ConsultasBusiness } from "./business/ConsultasBusiness";
import { NutricionistaBusiness } from "./business/NutricionistaBusiness";
import { ClienteController } from "./controller/ClienteController";
import { ConsultasController } from "./controller/ConsultasController";
import { NutricionistaController } from "./controller/NutricionistaController";
import { app } from "./controller/app";
import { ClienteData } from "./data/ClienteData";
import { ConsultasData } from "./data/ConsultasData";
import { NutricionistaData } from "./data/NutricionistaData";
import { HashGenerator } from "./services/hashGenerator";
import { IdGenerator } from "./services/idGenerator";
import { TokenGenerator } from "./services/tokenGenerator";

//Cliente
const clienteBusiness = new ClienteBusiness(
  new HashGenerator(),
  new IdGenerator(),
  new TokenGenerator(),
  new ClienteData()
);
const clienteController = new ClienteController(clienteBusiness);
app.post("/cliente/cadastrar", clienteController.signup);
app.post("/cliente/conectar", clienteController.login);
app.get("/cliente", clienteController.getCliente);
app.put("/cliente/atualizar", clienteController.update);
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
app.get("/nutricionista", nutriController.getNutricionista);


const consultasBusiness = new ConsultasBusiness (
  new IdGenerator(),
  new ConsultasData()
)
const Consultas = new ConsultasController(consultasBusiness);
app.post("/consulta/criar", Consultas.createConsultas)