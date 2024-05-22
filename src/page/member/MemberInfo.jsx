import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        setMember(res.data);
        toast({});
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            description: "존재하지 않는 회원입니다",
            position: "top",
            status: "error",
          });
          navigate("/member/list");
        }
      })
      .finally();
  }, []);

  const navigate = useNavigate();

  function handleClickRemove() {
    axios
      .delete(`/api/member/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: "회원 탈퇴하였습니다",
          position: "top",
        });
        navigate("/member/list");
      })
      .catch(
        toast({
          status: "warning",
          description: "탈퇴 안됨",
          position: "top",
        }),
      )
      .finally(setIsLoading(true));
  }

  if (member === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>회원 정보</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input isReadOnly value={member.email} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>별명</FormLabel>
            <Input isReadOnly value={member.nickName} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>가입일</FormLabel>
            <Input type={"datetime-local"} isReadOnly value={member.regDate} />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"purple"}>수정</Button>
          <Button
            isLoading={isLoading}
            colorScheme={"red"}
            onClick={handleClickRemove}
          >
            탈퇴
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
