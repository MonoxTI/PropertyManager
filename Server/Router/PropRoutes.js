import express from 'express';
import { EnterProp, getProperty, EnterAmounts, getDetailProperty } from '../Controller/userController.js';


const router = express.Router();

router.post('/Prop', EnterProp);
router.post('/Amount',EnterAmounts);
router.get('/getProperty',getProperty);
router.get('/Detail',getDetailProperty)


export default router;