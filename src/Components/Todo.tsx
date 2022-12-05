import { 
  AddIcon, 
  ArrowBackIcon, 
  CheckIcon, 
  DeleteIcon } from '@chakra-ui/icons';
import { 
  Box, 
  Button, 
  Heading, 
  Input, 
  Textarea, 
  VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { EditModal } from './EditModal';
import FilterMenu from './FilterMenu';

type TodoList = {
  id: number,
  name: string,
  detail: string,
}

const Todo:React.FC = () => {
  const [untouchedTodoList, setUntouchedTodoList] = useState<TodoList[]>([]);
  const [startTodoList, setStartTodoList] = useState<TodoList[]>([]);
  const[completeTodoList, setCompleteTodoList] = useState<TodoList[]>([]);

  const [untouchedListShow, setUntouchedListShow] = useState(true);
  const [startListShow, setStartListShow] = useState(true);
  const [completeListShow, setCompleteListShow] = useState(true);

  const [textName, setTextName] = useState('');
  const [textDetail, setTextDetail] = useState('');
  


  const onClickSetTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTodo: TodoList = {
      id: untouchedTodoList.length + 1,
      name: textName,
      detail: textDetail,
    }
    setUntouchedTodoList([...untouchedTodoList, newTodo]);

    setTextName('');
    setTextDetail('');
  }

  const deleteTodo =  (id: number, status: string) => {
    switch(status){
      case 'Untouched':
      setUntouchedTodoList(untouchedTodoList.filter((todo) => todo.id !== id));
      break;
      case 'Start':
        setStartTodoList(startTodoList.filter((todo) => todo.id !== id));
        break;
      case 'Complete':
        setCompleteTodoList(completeTodoList.filter((todo) => todo.id !== id));
        break;
      default:
        alert('異常な操作');
    }
  }

  const editTodo = (id: number, editTodoState:string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(setTextName === null && setTextDetail === null) return;
    const newTodo: TodoList = {
      id: id,
      name: textName,
      detail: textDetail,
    }
    let todosCopy = [];
    switch(editTodoState) {
      case 'Untouched':
        todosCopy = [...untouchedTodoList];
        todosCopy.splice(id-1, 1, newTodo);
        setUntouchedTodoList(todosCopy);
      break;

      case 'Start':
        todosCopy = [...startTodoList];
        todosCopy.splice(id-1, 1, newTodo);
        setStartTodoList(todosCopy);
      break;

      case 'Complete':
        todosCopy = [...completeTodoList];
        todosCopy.splice(id-1, 1, newTodo);
        setCompleteTodoList(todosCopy);
      break;

      default:
        alert('異常な操作');
    }
    setTextName('');
    setTextDetail('');
  }

  const stateChangeTodo =  (id: number, moveTodoState:string) => {
    let todosCopy = [];
    switch(moveTodoState){
      case 'FormUntouchedToStart':
        setStartTodoList([...startTodoList, untouchedTodoList[id-1]]);
        todosCopy = [...untouchedTodoList];
        todosCopy.splice(id-1, 1);
        setUntouchedTodoList(todosCopy);
      break;
      case 'FormStartToUntouched':
        setUntouchedTodoList([...untouchedTodoList, startTodoList[id-1]]);
        todosCopy = [...startTodoList];
        todosCopy.splice(id-1, 1);
        setStartTodoList(todosCopy);
        break;
      case 'FormStartToComplete':
        setCompleteTodoList([...completeTodoList, startTodoList[id-1]]);
        todosCopy = [...startTodoList];
        todosCopy.splice(id-1, 1);
        setStartTodoList(todosCopy);
        break;
      case 'FormCompleteToStart':
        setStartTodoList([...startTodoList, completeTodoList[id-1]]);
        todosCopy = [...completeTodoList];
        todosCopy.splice(id-1, 1);
        setCompleteTodoList(todosCopy);
        break;
      default:
        alert('異常な操作');
    }
  }

  const FilterHandler = (status : string) => {
    switch(status){
      case 'Untouched':
        setUntouchedListShow(true);
        setStartListShow(false);
        setCompleteListShow(false);
      break;
      case 'Start':
        setStartListShow(true);
        setUntouchedListShow(false);
        setCompleteListShow(false);
      break;
      case 'Complete':
        setCompleteListShow(true);
        setUntouchedListShow(false);
        setStartListShow(false);
      break;
      default:
        setUntouchedListShow(true);
        setStartListShow(true);
        setCompleteListShow(true);
    }
  }

  return (
    <VStack>
    <Heading>Todo</Heading>
      <Box>
        <Input 
          type='text'
          value={textName}
          onChange={(e) => {
            setTextName(e.target.value)
          }}
          className='textNameInput'
          placeholder='買い物に行く'
        />
        <br />
        <Textarea
          value={textDetail}
          onChange={(e) => {
            setTextDetail(e.target.value);
          }}
          className='textDetailInput'
          placeholder='卵を2個、牛乳があったら5個買う'
        />
        <Button 
          className='addButton'
          disabled={textName === ''}
          onClick={onClickSetTodo}
        >
          <AddIcon />
        </Button>
        <FilterMenu
          FilterHandler={FilterHandler}
        />
      </Box>
      {untouchedListShow &&
        <Box>
          <label>未着手</label>
          <ul style={{listStyle: 'none'}} className='untouchedList'>
            {untouchedTodoList.map((todo) => (
              <li>
                {todo.id} :【 {todo.name} 】
                <br/>
                {todo.detail}
                <br/>
                <Button
                  onClick={
                    () => {
                      stateChangeTodo(todo.id, 'FormUntouchedToStart');
                    }}
                ><CheckIcon /></Button>
                <EditModal 
                  editTodo={editTodo} 
                  todoId={todo.id} 
                  status={'Untouched'} 
                  setTextName={setTextName} 
                  setTextDetail={setTextDetail}
                  textName={textName}
                  textDetail={textDetail}
                />
                <Button onClick={() => deleteTodo(todo.id, 'Untouched')}>
                  <DeleteIcon />
                </Button>
              </li>
            ))}
          </ul>
        </Box>
      }
      {startListShow &&
        <Box>
          <label>着手</label>
          <ul style={{listStyle: 'none'}} className='startList'>
            {startTodoList.map((todo) => (
              <li>
              {todo.id} :【 {todo.name} 】
              <br/>
              {todo.detail}
              <br/>
              <Button
                onClick={() => {
                  stateChangeTodo(todo.id, 'FormStartToComplete');
                }}
              ><CheckIcon /></Button>
              <EditModal
                editTodo={editTodo} 
                todoId={todo.id} 
                status={'Start'} 
                setTextName={setTextName}
                setTextDetail={setTextDetail}
                textName={textName}
                textDetail={textDetail}
              />
              <Button
                onClick={() => {
                  stateChangeTodo(todo.id, 'FormStartToUntouched');
                }}
              ><ArrowBackIcon /></Button>
              <Button onClick={() => deleteTodo(todo.id, 'Start')}>
                <DeleteIcon />
              </Button>
            </li>
          ))}
        </ul>
            </Box>

      }
      {completeListShow &&
        <Box>
          <label>完了</label>
          <ul style={{listStyle: 'none'}} className='completeList'>
            {completeTodoList.map((todo) => (
              <li>
                {todo.id} :【 {todo.name} 】
                <br/>
                {todo.detail}
                <br/>
                <EditModal 
                  editTodo={editTodo} 
                  todoId={todo.id} 
                  status={'Complete'} 
                  setTextName={setTextName}
                  setTextDetail={setTextDetail}
                  textName={textName}
                  textDetail={textDetail}
                  />
                <Button
                  onClick={() => {
                    stateChangeTodo(todo.id, 'FormCompleteToStart');
                  }}
                ><ArrowBackIcon /></Button>
                <Button onClick={() => deleteTodo(todo.id, 'Complete')}>
                  <DeleteIcon />
                </Button>
              </li>
            ))}
          </ul>
        </Box>
      }
    </VStack>
  )
}

export default Todo