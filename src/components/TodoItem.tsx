import React, { FC } from "react";
import styled from "@emotion/styled";
import { useState } from "react";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

export interface TodoItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean, id: string) => void;
  deleteTodo?: (id: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  label,
  checked = false,
  onChange,
  deleteTodo,
}) => {
  const [display, setDisplay] = useState('none');

  return (
    <Wrapper 
      className="wrapper"
      onMouseEnter={() => setDisplay('block')}
      onMouseLeave={() => setDisplay('none')}
      >
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked, e.target.id)}
      />
      <Label checked={checked}>{label}</Label>
      <button 
        className="delete-button" 
        style={{display: display}}
        id={id}
        onClick={(e) => deleteTodo(e.target.id)}
      >X</button>
    </Wrapper>
  );
};
