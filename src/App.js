import { Flex, Heading, Text } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import { initialData } from "./components/Data";
import { useState } from "react";
import Column from "./components/Column";

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

function App() {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // if user tries to drop in an unknown destination
    if (!destination) return;

    // if user drags and drops in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // if the user drops within the same column in a different position
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // if the user drags from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };
    setState(newState);
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex justify="center" align="center" p="0.75rem" px="20px">
        <Heading>
          <a href="https://www.github.com/artofnuel">Github</a>
        </Heading>
      </Flex>
      <Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex py="4rem" flexDir="column" align="center">
          <Heading fontSize={"3xl"} fontWeight="700">
            My Kanban Board
          </Heading>
          <Text fontSize="20px" fontWeight="400" color="subtle-text">
            Drag your tasks!
          </Text>
          <Text fontSize="10px" fontWeight="400" color="subtle-text">
            Currently working on new update, stay tuned.
          </Text>
        </Flex>

        <Flex
          flexDirection={{ md: "row", sm: "column" }}
          justify="space-between"
          align="center"
          px="4rem"
        >
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Flex>
      </Flex>
    </DragDropContext>
  );
}

export default App;
