// import { Request, Response } from "express";
// import { PerfilNutriInuptDTO } from "../types/PerfilNutriInuptDTO";


// export class PerfilNutriController {
//     constructor(private perfilNutriBusiness: PerfilNutriBusiness) {}

//     createPerfilNutri = async (req: Request, res: Response) => {
//         try {
//             const { nome, foto, instagram, bio, especialidades } = req.body;
//             const perfilInput: PerfilNutriInuptDTO = {
//               nome,
//               foto,
//               instagram,
//                 bio,
//                 especialidades
//             };
//             const result = await this.perfilInput.createPerfilNutri(perfilInput);
//             res.status(201).send({ message: "Created successfully.", result });
//         } catch (error: any) {
//             const { statusCode, message } = error;
//             res.status(statusCode || 400).send({ message });
//         }
//     };

//     getPerfilNutriById = async (req: Request, res: Response) => {
//         try {
//             const id_perfil = req.params.id_plano;
//             const perfil = await this.perfilNutriBusiness.getPerfilNutriById(id_perfil);
//             res.status(200).send({ message: "Profile found!", perfil });
//         } catch (error: any) {
//             const { statusCode, message } = error;
//             res.status(statusCode || 400).send({ message });
//         }
//     };

//     getAllPerfilNutri= async (req: Request, res: Response) => {
//         try {
//             const result = await this.perfilNutriBusiness.getAllPerfilNutri();
//             res.status(200).send({ result });
//         } catch (error: any) {
//             const { statusCode, message } = error;
//             res.status(statusCode || 400).send({ message });
//         }
//     };
// }
