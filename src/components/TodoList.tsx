import React from 'react'
import styles from './styles.module.css'
// import { Todo } from './model';
import SingleTodo from './SingleTodo';
import { MyAppTodo } from '../../redux/slices/todoSlice';


interface Props{
 todos:   MyAppTodo[];
 
}    
const TodoList:React.FC<Props> = ({todos}:Props) => {
  return (
    <div className={styles.todos}>       


        {todos.map(todo => (
            // <><li>{todo.todo}</li></>
            <SingleTodo 
            todo={todo} 
            key={todo.id}
            todos={todos}
            />

        ))}
      
    </div>
  )
}

export default TodoList
