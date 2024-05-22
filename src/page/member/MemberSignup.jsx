import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleClick() {
    axios
      .post("/api/member/signup", {
        email,
        password,
        nickName,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "회원가입 성공",
          position: "top",
        }),
          navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "입력값을 확인해주세요",
            position: "top",
          });
        }
        toast({
          status: "error",
          description: "회원가입 실패",
          position: "top",
        });
      })
      .finally(setIsLoading(false));
  }

  function handleCheckEmail() {
    axios
      .get(`/api/member/check?email=${email}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 이메일입니다",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          //사용할 수 있는 이메일
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다",
            position: "top",
          });
        }
      })
      .finally();
  }

  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <InputGroup>
            <Input onChange={(e) => setEmail(e.target.value)} />
            <InputRightElement w={"75px"} mr={1}>
              <Button onClick={handleCheckEmail} size={"sm"}>
                중복확인
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <Input onChange={(e) => setNickName(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <Button
            isLoading={isLoading}
            colorScheme={"blue"}
            onClick={handleClick}
          >
            가입
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
