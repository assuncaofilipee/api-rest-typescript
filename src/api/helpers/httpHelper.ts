import { Response, response } from "express";

export const ok = (response: Response, data: any): Response => {
  return response.status(200).send(data);
};

export const created = (response: Response, data: any): Response => {
  return response.status(201).send(data);
};

export const noContent = (response: Response): Response => {
  return response.status(204).send(null);
};

export const badRequest = (error: Error): Response => {
  return response.status(400).send(error);
};

export const unprocessableEntity = (response: Response, error: any): Response => {
  return response.status(422).send(error);
};

export const forbidden = (response: Response, error: Error): Response => {
  return response.status(403).send(error);
};

export const unauthorized = (response: Response, error: Error): Response => {
  return response.status(401).send('Unauthorized');
};

export const serverError = (response: Response): Response => {
  return response.status(500).send({errors: 'Internal Server Error'});
};