import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box
      // style={{
      //   position: "absolute",
      //   top: "50%",
      //   left: "50%",
      //   transform: "translate(-50%,-50%)",
      // }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
