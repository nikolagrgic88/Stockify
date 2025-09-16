import { Button } from "@mui/material";
import { useNavigate } from "react-router";

interface ViewButtonProps {
  data: {
    _id: string;
    // add other properties of 'data' here if needed
  };
}

const ViewButton: React.FC<ViewButtonProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() =>
        navigate(`/home/actions/orders/${data._id}`, { state: data })
      }
    >
      View
    </Button>
  );
};

export default ViewButton;
