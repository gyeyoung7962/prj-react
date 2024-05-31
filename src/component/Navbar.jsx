import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faUser,
  faUserPen,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Center, Flex, Hide, Show, Spacer } from "@chakra-ui/react";

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
      bgColor="whitesmoke.200"
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
        <Show below={"lg"}>
          <FontAwesomeIcon icon={faHouse} />
        </Show>
        <Hide below={"lg"}>HOME</Hide>
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
          <Show below={"lg"}>
            <FontAwesomeIcon icon={faUserPen} />
          </Show>
          <Hide below={"lg"}>글쓰기</Hide>
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
          <Flex gap={2}>
            <Box>
              <FontAwesomeIcon icon={faUser} />
            </Box>
            <Box>{account.nickName}</Box>
          </Flex>
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
          <Show below={"lg"}>
            <FontAwesomeIcon icon={faUsers} />
          </Show>
          <Hide below={"lg"}>
            <FontAwesomeIcon icon={faUsers} />
          </Hide>
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
          <Show below={"lg"}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Show>
          <Hide below={"lg"}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Hide>
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
