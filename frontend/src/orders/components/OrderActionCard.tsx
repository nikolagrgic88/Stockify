import { Button, Paper, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import { FormAlert } from "../../shared";

type OrderActionCardProps = {
  formName: string;
  children: ReactNode;
  style?: string;
};
type AlertDetailsProps = {
  success?: boolean;
  message?: string;
  details?: string;
};

const OrderActionCard = ({
  formName,
  children,
  style,
}: OrderActionCardProps) => {
  const { state } = useNavigation();
  const actionData = useActionData() as AlertDetailsProps;
  const [alertDetails, setAlertDetails] =
    useState<AlertDetailsProps>(actionData);

  useEffect(() => {
    if (actionData) {
      setAlertDetails(actionData);
    }
  }, [actionData]);

  return (
    <Paper className={`w-full px-5 py-10 ${style}`}>
      <FormAlert
        key={Date.now()}
        message={alertDetails?.message as string}
        className="-top-16 w-full"
        severity={alertDetails?.success as boolean}
      />

      <Typography variant="h4" gutterBottom marginBottom={5}>
        {formName}
      </Typography>

      <Form method="POST" className={`grid grid-cols-2 gap-1 `}>
        {children}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="col-span-2 "
        >
          {state === "submitting" ? "Actioning..." : "Action"}
        </Button>
      </Form>
    </Paper>
  );
};

export default OrderActionCard;
