import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { toDoApis } from '../../shared/api';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [todoId, setTodoId] = useState();
  const [check, setCheck] = useState();

  const navigate = useNavigate();

  const todoRef = useRef();
  const inputRef = useRef();

  const fetchData = async () => {
    try {
      const res = await toDoApis.getTodos();
      setData([...res.data]);
    } catch (err) {
      alert(err.response.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onEdit = (id) => {
    const target = data.find((el) => el.id === id);
    setTodoId(target.id);
    setCheck(target.isCompleted);
    setIsEdit(true);
  };

  const onCreate = async () => {
    const newTodo = {
      todo: inputRef.current.value,
      isCompleted: false
    };
    try {
      const res = await toDoApis.createTodo(newTodo);
      setData([...data, res.data]);
      inputRef.current.value = '';
    } catch (err) {
      alert(err.response.message);
    }
  };

  const onUpdate = async (id) => {
    const todo = todoRef.current.value;
    let newTodo;
    const newData = data.map((el) => {
      return el.id === id
        ? (newTodo = { ...el, todo, isCompleted: check })
        : el;
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
      <div className="infoContainer">
        <h1>ToDo List</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
        >
          로그아웃
        </button>
      </div>
      <InputBox>
        <input type="text" ref={inputRef} />
        <button onClick={onCreate}>추가</button>
      </InputBox>
      {data?.map((it) => {
        return (
          <ToDoItem key={it.id}>
            {isEdit && todoId === it.id && (
              <input
                type="checkbox"
                checked={check}
                onChange={() => setCheck((prev) => !prev)}
              />
            )}
            <div className="edit-box">
              {isEdit && todoId === it.id ? (
                <input defaultValue={it.todo} ref={todoRef} />
              ) : (
                <TodoText isCompleted={it.isCompleted}>{it.todo}</TodoText>
              )}
            </div>
            <ButtonContainer>
              {isEdit && todoId === it.id ? (
                <button className="submit-btn" onClick={() => onUpdate(it.id)}>
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
  min-width: 500px;
  font-size: 1.5rem;
  background-color: #ececec;
  .infoContainer {
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      font-size: 1.2rem;
      background-color: gray;
      color: white;
      padding: 0.5rem;
      border-radius: 8px;
    }
  }
`;
const ToDoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.1rem 0;

  input[type='checkbox'] {
    background-color: #fff;

    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
  }
  .edit-box {
    display: flex;
    align-items: center;
    margin: 0 1rem;
    text-align: left;
    min-width: 300px;

    input {
      font-size: 1.4rem;
    }
  }
`;

const TodoText = styled.p`
  width: 100%;
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
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
  .submit-btn {
    background-color: yellowgreen;
    margin-right: 0.3rem;
  }
  .delete-btn {
    background-color: gold;
  }
`;
export default Todo;
