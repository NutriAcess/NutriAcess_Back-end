import { ClienteModel } from "../model/ClienteModel";
import { FormularioModel } from "../model/FormularioModel";

export type ClienteInputDTO = {
  nome_completo: string,
  nome_social: string,
  email: string,
  senha: string
  telefone: string
}
export type ClienteInputDTO2 = {
  token:string,
  nome_completo: string,
  nome_social: string,
  email: string,
  senha: string,
  telefone: string
}

export type TUser = {
  form?: FormularioModel;
  data: ClienteModel;
  hasRespondedForm?: boolean;
};


export type TLogin = {
  accessToken: string;
  user: TUser;
};