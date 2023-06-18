// import express, { Application } from 'express';
// import { ClienteController } from '../controller/ClienteController';
// import { ClienteBusiness } from '../business/ClienteBusiness';
// import { HashGenerator } from '../services/hashGenerator';
// import { IdGenerator } from '../services/idGenerator';
// import { TokenGenerator } from '../services/tokenGenerator';
// import { ClienteData } from '../data/ClienteData';

// const ClienteRoutes = (app: Application) => {
//   const router = express.Router();
//   const clienteBusiness = new ClienteBusiness(
//     new HashGenerator(),
//     new IdGenerator(),
//     new TokenGenerator(),
//     new ClienteData()
//   );
//   const clienteController = new ClienteController(clienteBusiness);

//   app.post('/cadastrar', clienteController.signup);
//   app.post('/conectar', clienteController.login);
//   app.get('/', clienteController.getCliente);

//   app.use('/cliente', router);
// };

// export default ClienteRoutes;