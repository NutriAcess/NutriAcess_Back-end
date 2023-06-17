import { ClienteBusiness } from "./business/ClienteBusiness";
import { FormularioBusiness } from "./business/FormularioBusiness";
import { NutricionistaBusiness } from "./business/NutricionistaBusiness";
import { ClienteController } from "./controller/ClienteController";
import { FormularioController } from "./controller/FormularioController";
import { NutricionistaController } from "./controller/NutricionistaController";
import { app } from "./controller/app";
import { ClienteData } from "./data/ClienteData";
import { FormularioData } from "./data/FormularioData";
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
app.get("/nutricionista/:id_nutricionista", nutriController.getNutriById);
app.get("/nutricionista", nutriController.getAllNutricionistas);

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