import { Container } from "@mui/material";
import { AuthFormWrapper, PageCard } from "../../shared";
import UserLoginForm from "../components/UserLoginForm";

const UserLoginPage = () => {
  return (
    <PageCard>
      <Container className="mt-20 flex justify-center">
        <AuthFormWrapper form={"User"}>
          <UserLoginForm />
        </AuthFormWrapper>
      </Container>
    </PageCard>
  );
};
export default UserLoginPage;
