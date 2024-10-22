import React from "react";
import { useRouterContext, type TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";

import logo from "../../../assets/logo.jpeg";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple style={{marginTop: "34px"}}>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Nalongo" width="28px" />
        ) : (
          <img src={logo} alt="Nalongo" width="100px" />
        )}
      </Link>
    </Button>
  );
};
