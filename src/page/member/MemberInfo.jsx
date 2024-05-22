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
          <Button colorScheme={"red"}>취소</Button>
        </Box>
      </Box>
    </Box>
  );
}
