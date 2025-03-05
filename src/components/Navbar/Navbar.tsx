/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";

import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface ParentComponentProps {
  children: ReactNode;
}

export const Navbar: React.FC<ParentComponentProps> = ({ children }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("one");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
        }}
        sx={{ width: "100%" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab
            value="one"
            label="Home"
            style={{ fontSize: "20px" }}
            onClick={() => navigate("/")}
          />
          <Tab
            value="two"
            label="Models"
            style={{ fontSize: "20px" }}
            onClick={() => navigate("/list")}
          />
        </Tabs>
      </Box>
      <div>{children}</div>
    </>
  );
};
