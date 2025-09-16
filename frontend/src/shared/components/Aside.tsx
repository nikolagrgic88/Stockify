import { ReactNode } from "react";
import { NavLink } from "react-router";
import { useThemeState } from "../../state";
import { useBorderColor } from "../hooks/useBorderColor";

interface MenuLinkProps {
  children: ReactNode;
  to: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ children, to }) => {
  const borderColor = useBorderColor();

  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? `p-6 ml-2 border-l-4 ${borderColor} inline-block bg-[#bcc8d047]  `
          : `p-6 ml-2 border-l-2 hover:border-l-2 hover:${borderColor} inline-block`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

const Aside: React.FC = () => {
  const { theme } = useThemeState((state) => state);
  let borderColor: string = "border-white";
  let backgroundColor: string = "bg-[#f4f6f8]";
  if (theme === "light") {
    borderColor = "border-black";
    backgroundColor = "from-[#f4f6f8] from-60% to-[#e0e3e7] to-75%";
  } else if (theme === "dark") {
    borderColor = "border-white";
    backgroundColor = " from-[#1e1e2e] to-[#151821] ";
  }
  return (
    <aside
      className={`border-r-2 ${borderColor} min-w-[15rem] min-h-screen -ml-1 text-center ${backgroundColor} rounded-r-[6rem] bg-gradient-to-t overflow-hidden`}
    >
      <ul className="flex flex-col">
        <MenuLink to="dashboard">Dashboard</MenuLink>
        <MenuLink to="location">Location</MenuLink>
        <MenuLink to="items">Items</MenuLink>
        <MenuLink to="movements">Movements</MenuLink>
        <MenuLink to="users">Users</MenuLink>
        <MenuLink to="orders">Orders</MenuLink>
        <MenuLink to="actions/orders">Actions</MenuLink>
      </ul>
    </aside>
  );
};

export default Aside;
