import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();


// Product
router.get('/product', (req: Request, res: Response) => {});

router.get('/product/:id', (req: Request, res: Response) => {});

router.put('/product/:id', body('name').isString(), (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
});

router.post('/product', (req: Request, res: Response) => {});

router.delete('/product/:id', (req: Request, res: Response) => {});


// Update
router.get('/update', (req: Request, res: Response) => {});

router.get('/update/:id', (req: Request, res: Response) => {});

router.put('/update/:id', (req: Request, res: Response) => {});

router.post('/update', (req: Request, res: Response) => {});

router.delete('/update/:id', (req: Request, res: Response) => {});


// Update Point
router.get('/updatepoint', (req: Request, res: Response) => {});

router.get('/updatepoint/:id', (req: Request, res: Response) => {});

router.put('/updatepoint/:id', (req: Request, res: Response) => {});

router.post('/updatepoint', (req: Request, res: Response) => {});

router.delete('/updatepoint/:id', (req: Request, res: Response) => {});

export default router;
