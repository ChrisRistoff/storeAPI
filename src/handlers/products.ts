import { Request, Response } from "express"
import prisma from "../db"


// get all products of a user
export const getUserProducts = async (req, res: Response) => { 
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { products: true },
  })
  res.json({data: user.products})
}

// get all products
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany()
  res.json({data: products})
}

// get one product
export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id
  const product = await prisma.product.findUnique({
    where: { id: id },
  })
  res.json({data: product})
}

// delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const product = await prisma.product.delete({
      where: { id: id },
    })
    res.json({data: product, message: "Product deleted successfully"})
  }
  catch (error) {
    res.status(500).json({error: error})
  }
}

// update a product
export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id
  const { name, description } = req.body
  try {
    const product = await prisma.product.update({
      where: { id: id },
      data: { name, description },
    })
    res.json({data: product, message: "Product updated successfully"})
  } catch (error) {
    res.status(500).json({error: error})
  }
}
