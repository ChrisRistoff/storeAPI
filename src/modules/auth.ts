import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const createJWT = (user: any): string => {
  const token = jwt.sign({
    id: user.id,
    username: user.username
  },
  process.env.JWT_SECRET
  )

  return token;
 }

export const protect = (req: Request & {user: any}, res: Response, next: NextFunction) => {

  // set token to req.headers.authorization
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: 'You need to be logged in' });
    return;
  }

  // split the token into an array and get the token from the array at index 1
  const [, token] = bearer.split(' ');

  // verify the token
  if (!token) {
    res.status(401).json({ message: 'Token not valid' });
    return;
  }

  // verify the token and get the user id from the token payload
  // if the token is valid, set the user to req.user
  // if the token is not valid, send a 401 response
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token not valid' });
    return;
  }

}
