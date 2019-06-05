export enum Action {
  CREATE = 'Dodaj',
  EDIT = 'Uredi'
}

export interface ResponseMessage {
  message: string;
}

export interface ResponseMessageCreate {
  id: number;
}

export const apiBaseUrl = 'http://localhost/backend/api';
export const imagesBasePath = 'http://localhost/backend/api/admin/car/';
