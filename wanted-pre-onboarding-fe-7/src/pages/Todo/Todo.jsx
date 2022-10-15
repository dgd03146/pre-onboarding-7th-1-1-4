import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GrCheckbox } from 'react-icons/gr';
import { GrCheckboxSelected } from 'react-icons/gr';
import { toDoApis } from '../../shared/api';

const Todo = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState();
  const [updatedTodo, setUpdatedTodo] = useState();

  const todoRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await toDoApis.getTodos();
        setData([...res.data]);
      } catch (err) {
        alert(err.response.message);
      }
    };

    fetchData();
  }, []);

  const onEdit = (id) => {
    const target = data.find((el) => el.id === id);

    setTodoId(target.id);
    setIsEdit(true);
  };

  const onCreate = async () => {
    const newTodo = {
      id: data.length,
      todo: inputRef.current.value,
      isCompleted: false,
      userId: data[0].userId
    };
    try {
      await toDoApis.createTodo(newTodo);
      setData([...data, newTodo]);
      inputRef.current.value = '';
    } catch (err) {
      alert(err.response.message);
    }
  };

  const onUpdate = async (id) => {
    const todo = todoRef.current.value;
    let newTodo;
    const newData = data.map((el) => {
      return el.id === id ? (newTodo = { ...el, todo }) : el;
    });

    try {
      await toDoApis.updateTodo(newTodo, id);
      setData(newData);
      setIsEdit(false);
    } catch (err) {
      alert(err.response.message);
    }
  };

  const onDelete = async (id) => {
    const newData = data.filter((el) => {
      return el.id !== id;
    });
    try {
      await toDoApis.deleteTodo(id);
      setData(newData);
      setIsEdit(false);
    } catch (err) {
      alert(err.response.message);
    }
  };

  return (
    <Container>
      <h1>ToDo List</h1>
      <InputBox>
        <input type="text" ref={inputRef} />
        <button onClick={onCreate}>추가</button>
      </InputBox>
      {data?.map((it) => {
        return (
          <ToDoItem key={it.id}>
            {it.isCompleted ? <GrCheckboxSelected /> : <GrCheckbox />}
            <div className="edit-box">
              {isEdit && todoId === it.id ? (
                <input defaultValue={it.todo} ref={todoRef} />
              ) : (
                <p>{it.todo}</p>
              )}
            </div>
            <ButtonContainer>
              {isEdit && todoId === it.id ? (
                <button className="edit-btn" onClick={() => onUpdate(it.id)}>
                  제출
                </button>
              ) : (
                <button className="edit-btn" onClick={() => onEdit(it.id)}>
                  수정
                </button>
              )}
              {isEdit && todoId === it.id ? (
                <button
                  className="delete-btn"
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  취소
                </button>
              ) : (
                <button className="delete-btn" onClick={() => onDelete(it.id)}>
                  삭제
                </button>
              )}
            </ButtonContainer>
          </ToDoItem>
        );
      })}
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
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.1rem 0;

  .edit-box {
    display: flex;
    align-items: center;
    margin: 0 1rem;
    text-align: left;
    min-width: 300px;
    p {
    }
    input {
      font-size: 1.4rem;
    }
  }
`;

const InputBox = styled.div`
  margin: 1rem 0;
  display: flex;
  input {
    flex: 1;
    padding: 0.5rem 1rem;
  }

  button {
    background-color: black;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
  .edit-btn {
    background-color: lightgray;
    margin-right: 0.3rem;
  }
  .delete-btn {
    background-color: gold;
  }
`;
export default Todo;
