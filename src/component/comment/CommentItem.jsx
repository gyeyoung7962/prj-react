import { Alert, AlertIcon, Box, Button, Flex } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export function CommentItem({ comment }) {
  function handleRemoveClick() {
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});
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
      <Flex>
        <Button
          colorScheme={"red"}
          variant={"solid"}
          onClick={() => handleRemoveClick()}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Flex>
    </Box>
  );
}
