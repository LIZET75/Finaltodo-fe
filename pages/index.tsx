import React, { use } from "react";
import { useState } from "react";
import Inputbar from "../src/components/Inputbar";
import { Todo } from "@/components/model";
import styles from './styles.module.css'
import TodoList from "@/components/TodoList";




const App: React.FC = () => {
   

    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {

            setTodos([...todos, { id: Date.now(), todo:todo, isDone: false}])
    setTodo("");
        }

    }

console.log(todos);


    return (
        <div className={styles.App} >
            <span className={styles.heading} >Task List Pro</span>
            <Inputbar  todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>

            <TodoList todos={todos} setTodos={setTodos} />
              {/* {todos.map((t) => (
                 <li>{t.todo}</li>
             ))} */}
            </div>
    )
}

export default App;