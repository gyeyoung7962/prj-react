import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Navbar
        mx={{
          base: 0,
          lg: 0,
        }}
      />
      <Box
        mx={{
          base: 0,
          lg: 300,
        }}
        my={{
          base: 0,
          lg: 0,
        }}
        mt={10}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
