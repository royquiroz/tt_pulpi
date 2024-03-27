import { useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import CustomModal from "./Modal";
import Form from "../Common/Form";
import { Link, useLocation } from "wouter";

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [location, setLocation] = useLocation();

  return (
    <AppBar position="static" color="default">
      <CustomModal open={open} handleClose={handleClose}>
        <Form handleClose={handleClose} />
      </CustomModal>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pulpi
        </Typography>
        {location === "/users" ? (
          <Button>
            <Link to="/">Transacciones</Link>
          </Button>
        ) : (
          <>
            <Button>
              <Link to="/users">Usuarios</Link>
            </Button>
            <Button onClick={handleOpen}>Agregar transaccion</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
