import { Reservation } from '../models/reservationSchema.js';
import ErrorHandler from '../error/error.js';

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body;

  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("Please fill full reservation form!", 400));
  }

  try {
    const existingReservation = await Reservation.findOne({ date, time });
    if (existingReservation) {
      return next(new ErrorHandler("There is already a reservation at this time!", 400));
    }

    await Reservation.create({ firstName, lastName, email, phone, date, time });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};
