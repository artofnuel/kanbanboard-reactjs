import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  return (
    <>
      <Flex
        rounded="3px"
        bg="column-bg"
        w="320px"
        minH="100px"
        flexDir="column"
      >
        <Flex
          align="center"
          h="60px"
          bg="column-header-bg"
          rounded="3px 3px 0 0"
          px="1.5rem"
          mb="1.5rem"
        >
          <Text fontSize="18px" fontWeight="700" color="subtle-text">
            {column.title}
          </Text>
        </Flex>

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <Flex
              px="1.5rem"
              flex="1"
              flexDir="column"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Flex
                      mb="1rem"
                      h="72px"
                      bg="card-bg"
                      rounded="3px"
                      p="1.5rem"
                      outline={"2px solid"}
                      outlineColor={
                        snapshot.isDragging ? "card-border" : "transparent"
                      }
                      boxShadow={
                        snapshot.isDragging
                          ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                          : "unset"
                      }
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Text>{task.content}</Text>
                    </Flex>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Flex>
    </>
  );
};

export default Column;
