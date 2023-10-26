import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
// import { HTTP_UNAUTHORIZED } from '../constants/http_status';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.access_token as string;
    if (!token) return res.status(HttpStatus.UNAUTHORIZED).send();

    try {
      const decodedUser = verify(token, process.env.JWT_KEY!);
      req.user = decodedUser;
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }

    return next();
  }
}