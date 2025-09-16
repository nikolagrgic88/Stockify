import { Form, HTMLFormMethod } from "react-router";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { User } from "../services/api";

interface UserFormProps {
  userDetails?: User | null;
  className?: string;
  method?: HTMLFormMethod;
  isDisabled: boolean;
  children: ReactNode;
  id: string;
  isSearchForm?: boolean;
  isAddUser?: boolean;
  errors?: { msg: string; path: string }[];
}
const UserForm: FC<UserFormProps> = ({
  userDetails,
  className,
  method,
  isDisabled,
  children,
  id,
  isSearchForm,
  isAddUser = false,
  errors,
}) => {
  const handleError = (fieldName: string) => {
    if (errors && errors?.length > 0) {
      const error = errors.filter((error) => error.path === fieldName);
      if (error.length > 0) return true;
    }
    return false;
  };

  const HelperText = ({ fieldName }: { fieldName: string }) => {
    if (!errors?.length) return null;

    const error = errors.find((error) => error.path === fieldName);
    if (!error) return null;

    return (
      <span
        style={{
          position: "absolute",
          bottom: "-18px",
          left: "0",
          fontSize: "12px",
          color: "red",
        }}
      >
        {error?.msg}
      </span>
    );
  };

  return (
    <Form
      method={method}
      className={`max-w-[85rem] my-5 ml-5 flex ${className} ${
        !isSearchForm && "w-[30rem]"
      }  `}
      id={id}
    >
      <div
        className={`${
          isSearchForm ? "flex flex-row gap-1 mb-3" : "flex flex-col gap-5"
        }`}
      >
        {!isAddUser && (
          <TextField
            label="ID"
            name="id"
            fullWidth
            value={userDetails?._id}
            size="small"
          />
        )}
        <TextField
          disabled={isDisabled}
          label="Username"
          name="userName"
          fullWidth
          type="text"
          defaultValue={userDetails?.userName}
          error={handleError("userName")}
          helperText={HelperText({ fieldName: "userName" })}
          autoComplete="username"
          size="small"
        />
        <TextField
          disabled={isDisabled}
          autoComplete="current-password"
          label="Password"
          name="password"
          type="password"
          fullWidth
          defaultValue={userDetails?.userName}
          error={handleError("password")}
          helperText={HelperText({ fieldName: "password" })}
          size="small"
        />
        <TextField
          disabled={isDisabled}
          label="First Name"
          name="firstName"
          fullWidth
          type="text"
          defaultValue={userDetails?.firstName}
          error={handleError("firstName")}
          helperText={HelperText({ fieldName: "firstName" })}
          autoComplete="name"
          size="small"
        />
        <TextField
          disabled={isDisabled}
          label="Last Name"
          name="lastName"
          fullWidth
          type="text"
          defaultValue={userDetails?.lastName}
          error={handleError("lastName")}
          helperText={HelperText({ fieldName: "lastName" })}
          autoComplete="family-name"
          size="small"
        />
        <TextField
          disabled={isDisabled}
          label="Email"
          name="email"
          fullWidth
          type="email"
          defaultValue={userDetails?.email}
          error={handleError("email")}
          helperText={HelperText({ fieldName: "email" })}
          autoComplete="email"
          size="small"
        />
        <TextField
          disabled={isDisabled}
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          type="tel"
          defaultValue={userDetails?.phoneNumber}
          error={handleError("phoneNumber")}
          helperText={HelperText({ fieldName: "phoneNumber" })}
          autoComplete="tel"
          size="small"
        />
        <TextField
          disabled={isDisabled}
          label="Position"
          name="position"
          fullWidth
          type="text"
          defaultValue={userDetails?.position}
          error={handleError("position")}
          helperText={HelperText({ fieldName: "position" })}
          size="small"
        />
        <FormControl error={handleError("isActive")} fullWidth size="small">
          <InputLabel id="activity-label">Activity</InputLabel>
          <Select
            labelId="activity-label"
            id="activity"
            disabled={isDisabled}
            name="isActive"
            defaultValue={userDetails?.isActive || ""}
          >
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
            {isSearchForm && <MenuItem value="">Please select</MenuItem>}
          </Select>
        </FormControl>
        <FormControl fullWidth error={handleError("auth")} size="small">
          <InputLabel>Authentication</InputLabel>
          <Select
            name="auth"
            defaultValue={userDetails?.auth || ""}
            disabled={isDisabled}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="">
              <em>Please Select</em>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      {children}
    </Form>
  );
};
export default UserForm;
