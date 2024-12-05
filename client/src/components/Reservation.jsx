import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",
        { firstName, lastName, email, phone, date, time },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setPhone(0);
      setEmail("");
      setTime("");
      setDate("");
      navigate("/success");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>
            <form>
              <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  const value = e.target.value;
                  const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]/g, "");
                  setFirstName(lettersOnly);
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  const value = e.target.value;
                  const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s]/g, "");
                  setLastName(lettersOnly);
                }}
              />

              </div>
              <div>
              <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toLocaleDateString('en-CA')}
                 />

              <input
                type="time"
                placeholder="Time"
                value={time}
                onChange={(e) => {
                  const selectedTime = e.target.value;
                  const minTime = "09:00";
                  const maxTime = "24:00";

                  if (selectedTime >= minTime && selectedTime <= maxTime) {
                    setTime(selectedTime);
                  } else {
                    alert("Please select a time between 9:00 AM and 11:59 PM(midnight).");
                    setTime(minTime);
                  }
                }}
                min="09:00"
                max="12:00"
              />

              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => { 
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    setPhone(onlyNumbers);
                  }}
                  
                />
              </div>
              <button type="submit" onClick={handleReservation}>
                RESERVE NOW{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;