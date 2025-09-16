import { Button } from "@mui/material";
import { useNavigate } from "react-router";
type BackButtonProps = {
  styles?: string;
};

const BackButton = ({ styles }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <div className={`mt-7 mb-20 ${styles}`}>
      <Button variant="outlined" onClick={() => navigate(-1)} size="small">
        Back
      </Button>
    </div>
  );
};

export default BackButton;
