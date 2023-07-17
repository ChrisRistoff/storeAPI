import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
      },
  });

  // Create a token
  const token = createJWT(user);

  // Send back the token to the user
  res.json({ token });

  } catch (error) {
    error.type = "input";
    next(error);
  }
};


export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(404).json({ error: "Invalid password" });
    return;
  }

  // Create a token
  const token = createJWT(user);

  // Send back the token to the user
  res.json({ token });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};
