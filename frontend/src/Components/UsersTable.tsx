import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { User } from "../interfaces";

interface IPUserTable {
  data: User[] | null;
}

function UserTable({ data }: IPUserTable) {
  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Apellido</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>RFC</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow
                key={row.rfc}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.rfc}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
