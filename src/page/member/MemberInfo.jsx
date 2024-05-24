import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberInfo() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [password, setPassword] = useState("");
  const account = useContext(LoginContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    axios
      .get(`/api/member/${id}`, {
        //자신의 정보만 볼수있게 토큰넘김
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
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
        } else if (err.response.status === 403) {
          toast({
            description: "권한이 없습니다",
            position: "top",
            status: "error",
          });
          navigate(-1);
        }
      })
      .finally();
  }, []);

  const navigate = useNavigate();

  function handleClickRemove() {
    setIsLoading(true);
    axios
      .delete(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id, password },
      })
      .then(() => {
        toast({
          status: "success",
          description: "회원 탈퇴하였습니다",
          position: "top",
        });
        account.logout();
        navigate("/member/list");
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "탈퇴 안됨",
          position: "top",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setPassword("");
        onClose();
      });
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
        {account.hasAccess(member.id) && (
          <Box>
            <Button
              colorScheme={"purple"}
              onClick={() => navigate(`/member/edit/${member.id}`)}
            >
              수정
            </Button>
            <Button colorScheme={"red"} onClick={onOpen}>
              탈퇴
            </Button>
          </Box>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              isLoading={isLoading}
              colorScheme={"red"}
              onClick={handleClickRemove}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
