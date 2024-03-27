import { Typography } from "@mui/material";
import { Transaction } from "../interfaces";
import { StatusLabel } from "../interfaces/index";
import dayjs from "dayjs";

interface IPDetail {
  data?: Transaction | null;
}

function Detail({ data }: IPDetail) {
  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Transferencia {StatusLabel[data?.status]}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {dayjs(data?.retirement_date).format("DD-MM-YYYY")}
      </Typography>
      <Typography
        id="modal-modal-description"
        variant="h2"
        component="h1"
        sx={{ mt: 2 }}
      >
        ${data?.amount}
      </Typography>
      <Typography
        id="modal-modal-description"
        variant="h4"
        component="h1"
        sx={{ mt: 2 }}
      >
        Comision ${data?.comision}
      </Typography>
      <Typography
        id="modal-modal-description"
        variant="h6"
        component="h1"
        sx={{ mt: 2 }}
      >
        RFC: {data?.rfc}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {data?.folio}
      </Typography>
    </>
  );
}

export default Detail;
