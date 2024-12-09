import express from 'express';
import { 
    sendReservation,
    getReservations,
    updateReservation,
    deleteReservation 
  } from '../controller/reservation.js';

const router = express.Router();

router.post('/send', sendReservation);
router.get('/get', getReservations);
router.put('/update/:id', updateReservation);
router.delete('/delete/:id', deleteReservation);

export default router;
