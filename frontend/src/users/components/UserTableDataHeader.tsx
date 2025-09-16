import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UserTableData from "./UserTableData";
import { User } from "../services/api";

type UserSearchFormHeaderProps = {
  usersData: User[];
};

const UserTableDataHeader: React.FC<UserSearchFormHeaderProps> = ({
  usersData,
}) => {
  return (
    <TableContainer component={Paper} className="min-w-[80rem] m-5">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Auth</TableCell>
          </TableRow>
        </TableHead>
        {usersData.map((user, i) => (
          <UserTableData key={i} usersData={user} />
        ))}
      </Table>
    </TableContainer>
  );
};

export default UserTableDataHeader;
