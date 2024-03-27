import { Container } from "@mui/material";

import CustomTable from "../Components/Table";
import useApiHook from "../hooks/apihook";
import { Transaction } from "../interfaces";

function Default() {
  const { data } = useApiHook<Transaction[]>(
    "http://localhost:3000/api/v1/transaction", //endpoint url
    { timeout: 5000 } //extra parameter just for example
  );

  return (
    <Container maxWidth="md">
      <CustomTable data={data} />
    </Container>
  );
}

export default Default;
