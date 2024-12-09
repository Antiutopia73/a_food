import { Reservation } from '../models/reservationSchema.js';
import ErrorHandler from '../error/error.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';


export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time } = req.body;
  let {phone} = req.body;

  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("Please fill full reservation form!", 400));
  }

  if (!phone.startsWith("+")) {
    phone = `+${phone}`;
  }

  try {
    const existingReservation = await Reservation.findOne({ date, time });
    if (existingReservation) {
      return next(new ErrorHandler("There is already a reservation at this time!", 400));
    }

    await Reservation.create({ firstName, lastName, email, phone, date, time });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'zulfzulfich@gmail.com',
        pass: 'mngn vqoe lgbm smsu',
      },
    });

    const message = {
      from: 'your-email@gmail.com',
      to: email,
      subject: ' A_FOOD Reservation Confirmation',
      text: `
        Dear ${firstName} ${lastName},
        Your reservation has been confirmed!
        
        Date: ${date}
        Time: ${time}

        If you have any questions, feel free to contact us!
      `,
    };

    await transporter.sendMail(message);

    const twilioClient = twilio('ACb755cb585551c5dfdbd474ff36777632', 'fa6a970c5cac05d596641cc45e2bbf20');
    const twilioPhoneNumber = '+17756289956';

    const smsMessage = `Dear ${firstName} ${lastName}, your reservation on ${date} at ${time} has been confirmed. Thank you for choosing us!`;

    await twilioClient.messages.create({
      body: smsMessage,
      from: twilioPhoneNumber,
      to: phone,
    });

    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully! Confirmation email and SMS have been sent.",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};

export const getReservations = async (req, res, next) => {
  const { date } = req.query;
  try {
    const filter = date ? { date } : {};
    const reservations = await Reservation.find(filter);
    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateReservation = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedReservation) {
      return next(new ErrorHandler("Reservation not found!", 404));
    }
    res.status(200).json({
      success: true,
      message: "Reservation Updated Successfully!",
      updatedReservation,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }
    return next(error);
  }
};

export const deleteReservation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return next(new ErrorHandler("Reservation not found!", 404));
    }
    res.status(200).json({
      success: true,
      message: "Reservation Deleted Successfully!",
    });
  } catch (error) {
    return next(error);
  }
};
