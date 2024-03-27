import { Container } from "@mui/material";

import UserTable from "../Components/UsersTable";
import useApiHook from "../hooks/apihook";
import { User } from "../interfaces";

function Users() {
  const { data } = useApiHook<User[]>(
    "http://localhost:3000/api/v1/user", //endpoint url
    { timeout: 5000 } //extra parameter just for example
  );

  return (
    <>
      <Container maxWidth="md">
        <UserTable data={data} />
      </Container>
    </>
  );
}

export default Users;
