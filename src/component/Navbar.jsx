import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      h={"50px"}
      gap={4}
      bg={"blue.200"}
      style={{ textAlign: "center", alignItems: "center" }}
    >
      <GridItem
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        Home
      </GridItem>
      <GridItem
        onClick={() => navigate("/write")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        글 쓰기
      </GridItem>

      <GridItem
        onClick={() => navigate("/member/list")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        회원 목록
      </GridItem>

      <GridItem
        onClick={() => navigate("/signup")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        회원가입
      </GridItem>

      <GridItem
        onClick={() => navigate("/login")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        로그인
      </GridItem>

      <GridItem
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        로그아웃
      </GridItem>
    </Grid>
  );
}
