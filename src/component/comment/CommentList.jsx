import { useEffect } from "react";
import axios from "axios";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export function CommentList({ boardId }) {
  useEffect(() => {
    axios
      .get(`/api/comment/list/${boardId}`)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }, []);
  if (commentList.length === 0) {
    return <Box>댓글이 없습니다. 첫 댓글을 작성해보세요</Box>;
  }
  return (
    <Box>
      {commentList.map((comment) => (
        <Box key={comment.id} border={"1px solid black"} my={3}>
          <Flex>
            <Box>{comment.memberId}</Box>
            <Spacer />
            <Box>{comment.regDate}</Box>
            <Box>{comment.comment}</Box>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
