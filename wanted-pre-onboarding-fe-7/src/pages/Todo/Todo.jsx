import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GrCheckbox } from 'react-icons/gr';
import { GrCheckboxSelected } from 'react-icons/gr';
import { toDoApis } from '../../shared/api';

const Todo = () => {
  const data = [
    {
      id: 1,
      todo: 'todo2',
      isCompleted: false,
      userId: 1
    },
    {
      id: 2,
      todo: 'todo3',
      isCompleted: false,
      userId: 1
    },
    {
      id: 3,
      todo: 'todo4',
      isCompleted: true,
      userId: 1
    }
  ];

  // const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await toDoApis.getTodos();
      console.log(res.data, 'res');
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h1>ToDo List</h1>
      {data.map((it) => {
        return (
          <ToDoItem key={it.id}>
            <p>{it.todo}</p>
            {it.isCompleted ? <GrCheckboxSelected /> : <GrCheckbox />}
          </ToDoItem>
        );
      })}
      <InputBox>
        <input type="text" />
        <button>추가</button>
      </InputBox>
    </Container>
  );
};

const Container = styled.ul`
  padding: 1rem 3rem;
  font-size: 1.5rem;
  background-color: #ececec;
`;
const ToDoItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const InputBox = styled.div`
  margin: 1rem 0;
  display: flex;
  input {
    padding: 0.5rem 0;
  }

  button {
    background-color: black;
    color: white;
  }
`;
export default Todo;
