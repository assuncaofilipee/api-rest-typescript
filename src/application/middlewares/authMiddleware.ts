import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from '../../api/helpers/httpHelper';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request, response: Response, next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return unauthorized(response);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, 'secret');
    
    const { id } = data as TokenPayload;

    request.userId = id;

    return next();
  } catch {
    return unauthorized(response);
  }
}