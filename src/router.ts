import { Request, Response, Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputError } from './modules/middleware';
import { createProduct, deleteProduct, getAllProducts, getOne, getUserProducts, updateProduct } from './handlers/products';

const router = Router();


// Product
router.get('/product', getUserProducts);

router.get('/product/:id', getOne); 

router.put('/product/:id',
  body('name').isString(),
  body('description').isString(),
  handleInputError,
  updateProduct);

router.post('/product',
  body('name').isString(),
  body('description').isString(),
  handleInputError,
  createProduct);

router.delete('/product/:id', deleteProduct);


// Update
router.get('/update',(req: Request, res: Response) => {});

router.get('/update/:id', 
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional,
  handleInputError,
  (req: Request, res: Response) => {});

router.put('/update/:id', (req: Request, res: Response) => {});

router.post('/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  handleInputError,
  (req: Request, res: Response) => {});

router.delete('/update/:id', (req: Request, res: Response) => {});


// Update Point
router.get('/updatepoint', (req: Request, res: Response) => {});

router.get('/updatepoint/:id', (req: Request, res: Response) => {});

router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req: Request, res: Response) => {});

router.post('/updatepoint',
  body('name').exists().isString(),
  body('description').exists().isString(),
  handleInputError,
  (req: Request, res: Response) => {});

router.delete('/updatepoint/:id', (req: Request, res: Response) => {});

export default router;
