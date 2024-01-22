import { Response, response } from 'express';

export const ok = (response: Response, data: any): Response => {
  return response.status(200).send(data);
};

export const created = (response: Response, data: any): Response => {
  return response.status(201).json(data);
};

export const noContent = (response: Response): Response => {
  return response.status(204).json(null);
};

export const badRequest = (error: Error): Response => {
  return response.status(400).json(error);
};

export const unprocessableEntity = (
  response: Response,
  error: any
): Response => {
  return response.status(422).json(error);
};

export const forbidden = (response: Response, error: Error): Response => {
  return response.status(403).json(error);
};

export const unauthorized = (response: Response): Response => {
  return response.status(401).json({ error: 'Unauthorized' });
};

export const notFound = (response: Response, error: string): Response => {
  return response.status(404).json({ errors: error });
};

export const serverError = (response: Response): Response => {
  return response.status(500).json({ error: 'Internal Server Error' });
};
