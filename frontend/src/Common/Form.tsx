/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IPForm {
  handleClose: () => void;
}

function Form({ handleClose }: IPForm) {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [rfc, setRfc] = useState("");
  const [amount, setAmount] = useState("");
  const [comision, setComision] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleChangeDate = (event: any) => {
    setDate(event as string);
  };

  const handleChangeRfc = (event: any) => {
    setRfc(event.target.value as string);
  };

  const handleChangeAmount = (event: any) => {
    setAmount(event.target.value as string);
  };

  const handleChangeComision = (event: any) => {
    setComision(event.target.value as string);
  };

  const postTransaction = async () => {
    await axios.post("http://localhost:3000/api/v1/transaction", {
      status,
      retirement_date: date,
      rfc,
      amount: Number(amount),
      comision: Number(comision),
    });

    handleClose();
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Nueva Transaccion
      </Typography>

      <DatePicker
        onChange={handleChangeDate}
        label="Basic date picker"
        sx={{ width: "100%" }}
      />

      <TextField
        id="outlined-basic"
        label="RFC"
        variant="outlined"
        sx={{ margin: "8px 0" }}
        onChange={handleChangeRfc}
        fullWidth
      />
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
      <TextField
        id="outlined-basic"
        label="Monto"
        variant="outlined"
        sx={{ margin: "8px 0" }}
        onChange={handleChangeAmount}
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="Comision"
        variant="outlined"
        sx={{ margin: "8px 0" }}
        onChange={handleChangeComision}
        fullWidth
      />
      <Button onClick={postTransaction} variant="contained">
        Guardar
      </Button>
    </>
  );
}

export default Form;
