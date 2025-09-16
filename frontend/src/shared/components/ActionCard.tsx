import { Card, CardActionArea, CardContent } from "@mui/material";
import { FC, ReactNode } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
interface ActionCardProps {
  children: ReactNode;
  to: string;
}

const ActionCard: FC<ActionCardProps> = ({ children, to }) => {
  return (
    <motion.li layout className="w-full md:w-64">
      <NavLink to={to}>
        <Card
          elevation={4}
          sx={{
            height: "8rem",
            width: "16rem",
            background: (theme) =>
              theme.palette.mode === "dark" ? "#424242" : "#c2daf7",
            borderRadius: "10px",
          }}
        >
          <CardActionArea sx={{ width: "100%", height: "100%" }}>
            <CardContent className="flex items-center justify-center font-medium">
              {children}
            </CardContent>
          </CardActionArea>
        </Card>
      </NavLink>
    </motion.li>
  );
};

export default ActionCard;
