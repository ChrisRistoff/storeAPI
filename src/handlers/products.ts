import { Request, Response } from "express"
import prisma from "../db"

declare module 'express' {
  export interface Request {
    user: {
      id: string
    }
  }
}


// get all products of a user
export const getUserProducts = async (req: Request, res: Response) => { 
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
     include: { products: true },
})
    res.json({data: user.products})

  } catch (error) {
    res.status(500).json({error: "Could not get products"})
  }
}

// get all products
export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany()
    res.json({data: products})
} catch (error) {
  res.status(500).json({error: "Could not get products"})
}
}

// get one product
export const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const product = await prisma.product.findFirst({
      where: { id : id },
      include: { belongsTo: true },
  })
  res.json({data: product})
  } catch (error) {
    res.status(404).json({error: "Product not found"})
  }
}

// delete a product
export const deleteProduct = async (req: Request, res: Response) => {
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
  }
  catch (error) {
    res.status(404).json({error: "Product not found"})
  }
}

// update a product
export const updateProduct = async (req: Request, res: Response) => {
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
    res.status(404).json({error: "Product not found"})
    console.log(error)
  }
}

// create a new product
export const createProduct = async (req: Request, res: Response) => {
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
    res.status(500).json({error: "Product could not be created"})
  }
}
