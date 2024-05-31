import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Center, Flex, Spacer } from "@chakra-ui/react";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex
      px={{
        lg: 200,
        base: 0,
      }}
      gap={3}
      height={20}
      bgColor="gray.100"
    >
      <Center
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
        p={8}
        fontSize={20}
        fontWeight={600}
      >
        HOME
      </Center>
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          글쓰기
        </Center>
      )}
      <Spacer />
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          <FontAwesomeIcon icon={faUser} />
          {account.nickName}
        </Center>
      )}
      {account.isAdmin() && (
        <Center
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          회원목록
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          회원가입
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          로그인
        </Center>
      )}
      {account.isLoggedIn() && (
        <Center
          onClick={() => {
            account.logout();
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          로그아웃
        </Center>
      )}
    </Flex>

    /*
    <Grid
      templateColumns="repeat(5, 1fr)"
      h={"50px"}
      gap={4}
      bg={"blue.200"}
      style={{ textAlign: "center", alignItems: "center", margin: "0 auto" }}
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

      {account.isAdmin() && (
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

     */
  );
}
