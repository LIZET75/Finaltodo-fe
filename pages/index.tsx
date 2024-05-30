import React, { use, useEffect } from "react";
import { useState } from "react";
import Inputbar from "../src/components/Inputbar";

import styles from './styles.module.css'
import TodoList from "@/components/TodoList";
import { fetchAllTodos } from "../redux/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";




const App: React.FC = () => {
   

    const [todo, setTodo] = useState<string>("");
    const todos = useSelector((state: RootState) => state.todo.allTodos);
    // const [todos, setTodos] = useState<Todo[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        console.log('Fetching all todos...');
        dispatch(fetchAllTodos());
    }, [dispatch]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {

            // setTodos([...todos, { id: Date.now(), todo:todo, isDone: false}])
    setTodo("");
        }

    }

console.log(todos);


    return (
        <div className={styles.App} >
            <span className={styles.heading} >Task List Pro Current Version</span>
            <Inputbar  todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>

            <TodoList todos={todos}  />
              {/* {todos.map((t) => (
                 <li>{t.todo}</li>
             ))} */}
            </div>
    )
}

export default App;