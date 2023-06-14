// import { Application, Request, Response } from 'express';

// // Import Routes
// import ClientesRoutes from './ClienteRoutes';

// // GET: Busca uma ou mais informações do back-end
// // POST: Criar uma nova informação no back-end
// // PUT: Atualizar uma informação existente no back-end
// // DELETE: Remover/Excluir uma informação do back-end

// class Routes {
//     app: Application;

//     constructor(app: Application) {
//         this.app = app;

//         this.app.get('/', (req: Request, resp: Response) => {
//             resp.json('API NutriAcess');
//         });

//         ClientesRoutes(this.app);

//         // Login and validate token
//         const AuthService = require('../controllers/authController');
//         this.app.post('/login/:type?', AuthService.login);
//         this.app.post('/token', AuthService.token);
//         this.app.post('/validateToken', AuthService.validateToken);
//     }
   
// }
// //  // Training Routes
// //  routes.get('/users', usersContoller.index);
// //  routes.get('/users/:id', usersContoller.show);
// //  routes.post('/users', usersContoller.create);



// export default Routes;