import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";

type FormAlertProps = {
  message: string;
  severity: boolean;
  autoHideDuration?: number;
  styles?: string;
  className?: string;
};

const FormAlert = ({
  message,
  severity,
  autoHideDuration = 3000,
  styles,
  className,
}: FormAlertProps) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!message) return;
    setShow(true);

    const timeout = setTimeout(() => setShow(false), autoHideDuration);
    return () => clearTimeout(timeout);
  }, [autoHideDuration, message, severity]);

  if (!show) return null;
  return (
    <div className={`relative ${styles}`}>
      <Alert
        className={`w-[30rem] absolute ${className} -top-24 left-24`}
        severity={severity ? "success" : "error"}
      >
        <AlertTitle>{severity ? "Success" : "Error"}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};
export default FormAlert;
