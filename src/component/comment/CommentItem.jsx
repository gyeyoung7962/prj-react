import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";
import { CommentEdit } from "./CommentEdit.jsx";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const [isEditing, setIsEditing] = useState(false);
  const account = useContext(LoginContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        setIsProcessing(false);
        onClose();
        setIsProcessing(false);
        toast({
          description: "댓글이 삭제되었습니다.",
          status: "info",
          position: "top",
        });
      });
  }

  return (
    <Box border={"1px solid black"} my={3}>
      <Flex>
        <Alert status="success">
          <AlertIcon />
          {comment.comment}
        </Alert>
        <Box>
          {comment.writer}|| || {comment.regDate}
        </Box>
      </Flex>
      {account.hasAccess(comment.memberId) && (
        <Flex>
          <Box>
            <Button colorScheme={"purple"} onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button isLoading={isProcessing} colorScheme="red" onClick={onOpen}>
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </Box>
        </Flex>
      )}
      {isEditing && (
        <CommentEdit
          comment={comment}
          setIsEditting={setIsEditing}
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
        />
      )}
      {account.hasAccess(comment.memberId) && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>삭제 확인</ModalHeader>
            <ModalBody>댓글을 삭제 하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>취소</Button>
              <Button
                isLoading={isProcessing}
                colorScheme={"red"}
                onClick={handleRemoveClick}
              >
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
