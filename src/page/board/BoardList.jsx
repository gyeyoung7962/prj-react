import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/board/list").then((res) => setBoardList(res.data));
  }, []);

  return (
    <Box>
      <Box>게시물 목록</Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>
                <FontAwesomeIcon icon={faUser} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                _hover={{
                  bgColor: "gray.200",
                }}
                onClick={() => navigate(`/board/${board.id}`)}
                key={board.id}
                style={{ cursor: "pointer" }}
              >
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
