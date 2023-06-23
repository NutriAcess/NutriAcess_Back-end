import { NutricionistaModel } from "../model/NutricionistaModel";

export type NutriInputDTO = {
  nome_completo: string;
  nome_social: string;
  email: string;
  senha: string;
  crn: string;
};

export type NutriInputDTO2 = {
  nome_completo: string;
};
export type TEsp = {
  data: NutricionistaModel;
};
export type TLogin = {
  accessToken: string;
  esp:  TEsp;
};