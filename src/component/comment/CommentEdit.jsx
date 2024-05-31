import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

export function CommentEdit({
  comment,
  setIsEditing,
  setIsProcessing,
  isProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put("/api/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {
        {
          toast({
            description: "댓글 수정 완료",
            status: "success",
            position: "bottom",
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);

        onClose();
      });
  }

  return (
    <Flex>
      <Box flex={1}>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          variant={"outline"}
          colorScheme={"gray"}
          onClick={() => setIsEditing(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Button
          onClick={onOpen}
          variant={"outline"}
          colorScheme={"blue"}
          isLoading={isProcessing}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>댓글 수정</ModalHeader>
          <ModalBody>댓글을 수정 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={handleCommentSubmit}>확인</Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
