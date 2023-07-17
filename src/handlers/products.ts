import { NextFunction, Request, Response } from "express"
import prisma from "../db"

declare module 'express' {
  export interface Request {
    user: {
      id: string
    }
  }
}


// get all products of a user
export const getUserProducts = async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { products: true },
    })
    res.json({data: user.products})

  } catch (error) {
    next(error);
  }
}

// get all products
export const getAllProducts = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany()
    res.json({data: products})

  } catch (error) {
    next(error);
  }
}

// get one product
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const product = await prisma.product.findFirst({
      where: { id : id },
      include: { belongsTo: true },
    })
    res.json({data: product})

  } catch (error) {
    error.type = "input";
    next(error);
  }
}

// delete a product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id
        }
      },
    })
    res.json({data: product, message: "Product deleted successfully"})
  
  } catch (error) {
    // default error type is "server"
    next(error);
  }
}

// update a product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body
  try {
    const product = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id
        }
      },
      data: { name, description },
    })
    res.json({data: product, message: "Product updated successfully"})

  } catch (error) {
    error.type = "input";
    next(error);
  }
}

// create a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        belongsToId: req.user.id,
      }
    })
    res.json({data: product, message: "Product created successfully"})

  } catch (error) {
    error.type = "input";
    next(error);
  }
}
