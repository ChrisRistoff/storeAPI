import { NextFunction, Request, Response } from "express";
import prisma from "../db";


//get all
export const getAllUpdates = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const update = await prisma.update.findMany();
    res.json({ data: update });

  } catch (error) {
    next(error);
  }
};

// get all by user
export const getAllUpdatesByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const allUpdates = [];

    // probably a terrible solution but it works for now
    // would potentially change my schema later on
    for (const product of products) {
      allUpdates.push(...product.updates);
    }

    res.json({ data: allUpdates });
  } catch (error) {
    next(error);
  }
};

// get by id
export const getOneUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = await prisma.update.findFirst({
      where: { id : req.params.id },
    });
    res.json({ data: update });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

// create
export const createUpdate = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  try {
    const product = await prisma.product.findFirst({
      where: { id: req.body.productId },
    });
    console.log(product);

    if (!product) {
      console.log("product not found");
      return res.status(404).json({ error: "Product not found" });
    }

    const update = await prisma.update.create({
      data: req.body,
    });

   res.json({ data: update });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};


// update
export const updateUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get all products by user
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: { updates: true },
    });

    const updates = [];

    // get all updates from products by user
    for (const product of products) {
      updates.push(...product.updates);
    }

    let match: string | undefined;

    // check if update exists in user's product's updates array
    for (const update of updates) {
      if (update.id === req.params.id) {
        match = update;
      }
    }

    if (!match) {
      return res.status(404).json({ error: "Update not found" });
    }

    // update the update if it exists
    const update = await prisma.update.update({
      where: { id: req.params.id },
      data: req.body,
    });

   res.json({ data: update });
  } catch (error) {
    error.type = "input";
    next(error);
  }
};


// delete
export const deleteUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      where: { belongsToId: req.user.id },
      include: { updates: true },
    });

    const updates = [];

    for (const product of products) {
      updates.push(...product.updates);
    }

    let match: string | undefined;

    for (const update of updates) {
      if (update.id === req.params.id) {
        match = update;
      }
    }

    if (!match) {
      return res.status(404).json({ error: "Update not found" });
    }

    const deleted = await prisma.update.delete({
      where: { id: req.params.id },
    });

    res.json({ data: deleted });


  } catch (error) {
    error.type = "input";
    next(error);
  }
}
