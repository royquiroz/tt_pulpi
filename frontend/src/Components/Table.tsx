import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import CustomModal from "./Modal";
import Detail from "../Common/Detail";
import UpdateStatus from "../Common/UpdateStatus";
import { StatusLabel, Transaction } from "../interfaces";

interface IPCustomTable {
  data: Transaction[] | null;
}

function CustomTable({ data }: IPCustomTable) {
  const [open, setOpen] = useState(false);
  const [viewDetail, setViewDetail] = useState(true);
  const [detail, setDetail] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CustomModal open={open} handleClose={handleClose}>
        {viewDetail ? (
          <Detail data={detail} />
        ) : (
          <UpdateStatus data={detail} handleClose={handleClose} />
        )}
      </CustomModal>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Folio</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estatus</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Monto
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Comision
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Detalle
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <TableRow
                  key={row.folio}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.folio}
                  </TableCell>
                  <TableCell>
                    {StatusLabel[row.status]}
                    {row.status === "PENDING" && (
                      <IconButton
                        onClick={() => {
                          setViewDetail(false);
                          setDetail(data[index]);
                          handleOpen();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.comision}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setViewDetail(true);
                        setDetail(data[index]);
                        handleOpen();
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CustomTable;
