import { useNavigation } from "react-router";
import LoadingBar from "./LoadingBar";
import { Modal } from "@mui/material";

const GlobalLoader = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <Modal open={isLoading}>
      <LoadingBar />
    </Modal>
  );
};

export default GlobalLoader;
