import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faUserPen,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Flex,
  Hide,
  Show,
  Spacer,
  Stack,
} from "@chakra-ui/react";

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
            <Stack direction="row" spacing={4}>
              <Avatar>
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Stack>
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
  );
}
