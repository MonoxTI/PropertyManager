import express from 'express';
import { EnterProp, getProperty, EnterAmounts, getDetailProperty, EnterExpense } from '../Controller/userController.js';


const router = express.Router();

router.post('/Prop', EnterProp);
router.post('/Amount',EnterAmounts);
router.post('/Expense',EnterExpense);
router.get('/getProperty',getProperty);
router.get('/Detail',getDetailProperty)


export default router;