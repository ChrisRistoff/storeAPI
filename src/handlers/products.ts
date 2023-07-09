import { Request, Response } from "express"
import prisma from "../db"

export const getProducts = async (_: Request, res: Response) => { 
  const products = await prisma.product.findMany()
  res.json({data: products})
}

export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id
  const product = await prisma.product.findUnique({
    where: { id: id },
  })
  res.json({data: product})
}
