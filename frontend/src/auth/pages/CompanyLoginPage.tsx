import { Container } from "@mui/material";
import { AuthFormWrapper, PageCard } from "../../shared";
import CompanyLoginForm from "../components/CompanyLoginForm";

const CompanyLoginPage = () => {
  
  return (
    <PageCard>
      <Container className="mt-20 flex justify-center">
        <AuthFormWrapper form="Company">
          <CompanyLoginForm />
        </AuthFormWrapper>
      </Container>
    </PageCard>
  );
};
export default CompanyLoginPage;
