/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Transaction } from "../interfaces";

interface IPForm {
  data?: Transaction | null;
  handleClose: () => void;
}

function Form({ data, handleClose }: IPForm) {
  const [status, setStatus] = useState("");
  console.log(data);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const editTransaction = async () => {
    await axios.patch("http://localhost:3000/api/v1/transaction", null, {
      params: {
        id: data._id,
        status,
      },
    });

    handleClose();
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Actualizar estatus
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="PENDING">Pendiente</MenuItem>
          <MenuItem value="COMPLETED">Completada</MenuItem>
          <MenuItem value="FAILED">Fallida</MenuItem>
        </Select>
      </FormControl>

      <Button
        onClick={editTransaction}
        variant="contained"
        sx={{ marginTop: "12px" }}
      >
        Actualizar
      </Button>
    </>
  );
}

export default Form;
