import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { BoardWrite } from "./page/board/BoardWrite.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { BoardView } from "./BoardView.jsx";
import { BoardEdit } from "./BoardEdit.jsx";

function App(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          index: true,
          element: <BoardList />,
        },
        {
          path: "/write",
          element: <BoardWrite />,
        },
        {
          path: "board/:id",
          element: <BoardView />,
        },
        {
          path: "edit/:id",
          element: <BoardEdit />,
        },
      ],
    },
  ]);
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
