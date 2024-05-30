import { MyAppTodo } from "../../redux/slices/todoSlice";

// export interface Todo{
//     id:number;
//     todo:string;
//     isDone:boolean;
// }

export type Props = {
    todo:MyAppTodo,
    todos: MyAppTodo[]
}