import { Alert, AlertIcon, Box, Flex } from "@chakra-ui/react";

export function CommentItem({ comment }) {
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
    </Box>
  );
}
