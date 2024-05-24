import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
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
      {account.isLoggedIn() && (
        <GridItem
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          글 쓰기
        </GridItem>
      )}

      {account.isLoggedIn() && (
        <GridItem
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          회원 목록
        </GridItem>
      )}

      {account.isLoggedIn() && (
        <GridItem
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          <FontAwesomeIcon icon={faUser} />
          {account.nickName}
        </GridItem>
      )}

      {account.isLoggedIn() || (
        <GridItem
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          회원가입
        </GridItem>
      )}
      {account.isLoggedIn() || (
        <GridItem
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          로그인
        </GridItem>
      )}
      {account.isLoggedIn() && (
        <GridItem
          onClick={() => {
            account.logout();
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          로그아웃
        </GridItem>
      )}
    </Grid>
  );
}
