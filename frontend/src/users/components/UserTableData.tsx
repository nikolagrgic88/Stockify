import {
  Button,
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useModalState, useSelectedUserStore } from "../../state";

import { useNavigate } from "react-router";
import { User } from "../services/api";

const UserTableData: React.FC<{ usersData: User }> = ({ usersData }) => {
  const { setIsOpen } = useModalState((state) => state);
  const { setSeletedUser } = useSelectedUserStore((state) => state);
  const navigate = useNavigate();

  const handleModal = () => {
    setSeletedUser(usersData);
    setIsOpen(true);
    navigate(`${usersData._id}/edit`);
  };
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>{usersData._id}</TableCell>
          <TableCell>{usersData.userName}</TableCell>
          <TableCell>{usersData.firstName}</TableCell>
          <TableCell>{usersData.lastName}</TableCell>
          <TableCell>{usersData.email}</TableCell>
          <TableCell>{usersData.phoneNumber}</TableCell>
          <TableCell>{usersData.position}</TableCell>
          <TableCell>
            <Checkbox checked={usersData.isActive} readOnly />
          </TableCell>
          <TableCell>{usersData.auth}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={handleModal}
            >
              Details
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};
export default UserTableData;
