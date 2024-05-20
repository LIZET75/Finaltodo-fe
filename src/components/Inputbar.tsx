import React, { useRef } from 'react'
import styles from './styles.module.css'
interface Props {
  todo:string;
  setTodo:React.Dispatch<React.SetStateAction<string>>;
  handleAdd:(e: React.FormEvent) =>void;
}

const Inputbar:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
 const inputRef = useRef<HTMLInputElement>(null);
 
  return (
    <form className={styles.input}  onSubmit={(e)=>{
      handleAdd(e)
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
