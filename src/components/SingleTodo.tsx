
import { Props, Todo } from './model'
import styles from './styles.module.css'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { MdDone, } from 'react-icons/md'
// import TodoList from './TodoList'
import React, { useEffect, useRef, useState }  from "react";




const SingleTodo = ({ todo, todos, setTodos }:Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const handleDone = (id:number) => {
    setTodos(
      todos.map(( todo) => 
        todo.id===id?{...todo,isDone:!todo.isDone}:todo)
    )
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id:number) => {
    setTodos(
      todos.filter(( todo) => 
        todo.id !==id));
  };


  return (
    <form className={styles.todos_single}>
      {edit ? (
            <input value = {editTodo} onChange={(e)=>setEditTodo(e.target.value)} className={styles.todos__single_text}/>
        ):todo.isDone? (
          <s className={styles.todos__single_text}>{todo.todo}</s>
        ) : (
        <span className={styles.todos__single_text}>{todo.todo}</span>
        )}
     
     
   
      
      <div>
      <span className={styles.icon} 
      onClick={()=>{
        if(!edit && !todo.isDone) {
        setEdit(!edit);
      }
    }}
    >
        <AiFillEdit/>
        </span>
      <span className={styles.icon} onClick={()=>handleDelete(todo.id)}>
        <AiFillDelete/>
      </span>
      <span className={styles.icon} onClick={()=>handleDone(todo.id)}>
      <MdDone />
      </span>
      
    </div>
    </form>
  )
}

export default SingleTodo


