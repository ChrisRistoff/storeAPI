import { Request, Response } from "express";
import prisma from "../db";


//get all
export const getAllUpdates = async (req: Request, res: Response) => {
  try {
    const update = await prisma.update.findMany();
    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all by user
export const getAllUpdatesByUser = async (req: Request, res: Response) => {
  try {
    const update = await prisma.update.findMany({
      where: { id : req.user.id },
      include: { updatedPoints: true }
    });
    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get by id
export const getOneUpdate = async (req: Request, res: Response) => {
  try {
    const update = await prisma.update.findFirst({
      where: { id: req.params.id },
      include: { updatedPoints: true }
    });
    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create
export const createUpdate = async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body;
  const update = await prisma.update.create({
    data: {
      title,
      body,
      product: { connect: { id: req.body.productId} },
    },
  });
    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
      

// update
export const updateUpdate = async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body;
    const update = await prisma.update.update({
      where: { id: req.params.id },
      data: { title, body },
    });
    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// delete
export const deleteUpdate = async (req: Request, res: Response) => {
  try {
    const update = await prisma.update.delete({
      where: { id: req.params.id },
    });
    res.json({ data: update });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}