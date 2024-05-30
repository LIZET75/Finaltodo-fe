import React, { useRef } from 'react'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { createTodo } from '../../redux/slices/todoSlice';
interface Props {
  todo:string;
  setTodo:React.Dispatch<React.SetStateAction<string>>;
  handleAdd:(e: React.FormEvent) =>void;
}

const Inputbar:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
 const inputRef = useRef<HTMLInputElement>(null);
 const dispatch = useDispatch<AppDispatch>();
 
  return (
    <form className={styles.input}  onSubmit={(e)=>{
      handleAdd(e);
      dispatch(createTodo({todo:todo}))
      inputRef.current?.blur}}>
      <input 
      type="input" 
      ref={inputRef}
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
      placeholder="Enter a task" className={styles.input_box}/>
      {/* <button className={styles.input_submit} type="submit">
        </button> */}
      </form>
  )
}

export default Inputbar
