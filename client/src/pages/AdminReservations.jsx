import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Modal, Box, TextField } from "@mui/material";
import "../pages/adminStyles.css";


const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  const fetchReservations = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/reservation/get", {
        withCredentials: true,
      });
      setReservations(data.reservations);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching reservations");
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/reservation/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Reservation deleted successfully");
      fetchReservations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting reservation");
    }
  };

  const updateReservation = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/reservation/update/${currentReservation.id}`,
        {
          firstName: currentReservation.firstName,
          lastName: currentReservation.lastName,
          email: currentReservation.email,
          phone: currentReservation.phone,
          date: currentReservation.date,
          time: currentReservation.time,
        },
        { withCredentials: true }
      );
      toast.success("Reservation updated successfully");
      setOpen(false);
      fetchReservations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating reservation");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleOpen = (reservation) => {
    setCurrentReservation({ ...reservation });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentReservation(null);
  };

  const handleChange = (field, value) => {
    setCurrentReservation({ ...currentReservation, [field]: value });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100, sortable: false },
    { 
      field: "firstName", 
      headerName: "First Name", 
      width: 150, 
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    { field: "lastName", headerName: "Last Name", width: 150, sortable: false },
    { field: "email", headerName: "Email", width: 200, sortable: false },
    { field: "phone", headerName: "Phone", width: 150, sortable: false },
    { field: "date", headerName: "Date", width: 150 },
    { field: "time", headerName: "Time", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ marginRight: "10px" }}
            onClick={() => handleOpen(params.row)}
          >
            Update
          </Button>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={() => deleteReservation(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const rows = reservations.map((reservation) => ({
    id: reservation._id,
    firstName: reservation.firstName,
    lastName: reservation.lastName,
    email: reservation.email,
    phone: reservation.phone,
    date: reservation.date,
    time: reservation.time,
  }));

  return (
    <div className="admin-page" style={{ height: 600, width: "100%", padding: "20px" }}>
      <h2>Admin Panel - Reservations</h2>
      {loading ? (
        <p>Loading reservations...</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 500, 
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <h3>Edit Reservation</h3>
          {currentReservation && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                value={currentReservation.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                value={currentReservation.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={currentReservation.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone"
                value={currentReservation.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Date"
                type="date"
                value={currentReservation.date}
                onChange={(e) => handleChange("date", e.target.value)}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Time"
                type="time"
                value={currentReservation.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={updateReservation}
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AdminReservations;
