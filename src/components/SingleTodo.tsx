
import { Props  } from './model'
import styles from './styles.module.css'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { MdDone, } from 'react-icons/md'
// import TodoList from './TodoList'
import React, { useEffect, useRef, useState }  from "react";
import { deleteTodo, updateTodo } from '../../redux/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';




const SingleTodo = ({ todo, todos }:Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const handleDone = (id:number) => {
    if ( id !=null) {
      //condition
      dispatch(updateTodo({ id, isdone:true }));
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    
    // add edit to do
    setEdit(false);
  };

  const handleDelete = (id:number) => {
    console.log('Deleting user...');
    dispatch(deleteTodo(id));
};
    



  return (
    <form className={styles.todos_single}>
      {edit ? (
            <input value = {editTodo} onChange={(e)=>setEditTodo(e.target.value)} className={styles.todos__single_text}/>
        ):todo.isdone? (
          <s className={styles.todos__single_text}>{todo.todo}</s>
        ) : (
        <span className={styles.todos__single_text}>{todo.todo}</span>
        )}
     
     
   
      
      <div>
      <span className={styles.icon} 
      onClick={()=>{
        if(!edit && !todo.isdone) {
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


