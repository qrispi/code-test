import React, { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";
import useStoredState from './useStoredState';

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

function App() {
  const [todos, setTodos] = useStoredState<Todo[]>('todos')

  const addTodo = useCallback((label: string) => {
    setTodos((prevTodos) => {
      const newTodo = {
        id: uuid(),
        label,
        checked: false,
        created_at: Date.now(),
      };
      const items = [...prevTodos, newTodo];
      const sorted = items.sort((a, b) => a.created_at - b.created_at);
      const done = sorted.filter((todo) => todo.checked);
      const pending = sorted.filter((todo) => !todo.checked);
      return [...pending, ...done];
    });
  }, []);
  
  const handleChange = useCallback((checked: boolean, id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: checked,
            completed_at: checked ? Date.now() : undefined,
          };
        } else {
          return todo;
        }
      });
  
      const sorted = [...updatedTodos].sort((a, b) => {
        if (a.checked === b.checked) {
          if (a.checked) {
            return (a.completed_at || 0) - (b.completed_at || 0);
          } else {
            return (b.created_at || 0) - (a.created_at || 0);
          }
        } else {
          return a.checked ? 1 : -1;
        }
      });
  
      return sorted;
    });
  }, []);  

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);
   
  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} onChange={handleChange} deleteTodo={deleteTodo} />
      ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
