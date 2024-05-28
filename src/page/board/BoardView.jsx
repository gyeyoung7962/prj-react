import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다",
            position: "top",
          });
        }
      });
  }, []);

  function handleClickRemove() {
    axios
      .delete(`/api/board/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(
        () =>
          toast({
            description: "삭제완료",
            position: "top",
            status: "success",
          }),
        navigate("/"),
      )
      .catch(() =>
        toast({
          status: "error",
          description: `${id}번 게시물 삭제중 오류가 발생하였습니다`,
          position: "top",
        }),
      )
      .finally(() => {
        onClose();
      });
  }

  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{board.id}번 게시물</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={board.title} readOnly />
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea value={board.content} readOnly />
        </FormControl>
      </Box>

      <Box>
        {board.fileList &&
          board.fileList.map((file) => (
            <Box border={"2px solid black"} m={3} key={file.src}>
              <Image src={file.src} />
            </Box>
          ))}
      </Box>

      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={board.writer} readOnly />
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel>작성일</FormLabel>
          <Input type={"datetime-local"} value={board.regDate} readOnly />
        </FormControl>
      </Box>
      {account.hasAccess(board.memberId) && (
        <Box>
          <Button
            colorScheme={"purple"}
            onClick={() => navigate(`/edit/${board.id}`)}
          >
            수정
          </Button>
          <Button colorScheme={"red"} onClick={onOpen}>
            삭제
          </Button>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} onClick={handleClickRemove}>
              확인
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
