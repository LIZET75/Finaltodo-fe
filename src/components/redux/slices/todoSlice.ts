import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface MyTodo {
    id: number;
    name: string;
    email: string;
}
interface TodoState {
    currentTodo: MyTodo | null;
    allUsers: MyTodo[];
    isLoading: boolean;
    error: string;
}

// const initialState: TodoState = {
//     currentTodo: null,
//     allUsers: [],
//     isLoading: false,
//     error: ''
// };

// const todoSlice = createSlice({
//     name: 'Todo',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         // Fetch Current User
//         builder.addCase(fetchCurrentUser.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.currentUser = action.payload;
//         });
//         builder.addCase(fetchCurrentUser.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.error.message ? action.error.message : '';
//         });

// // Fetch all tasks
// builder.addCase(fetchAllTodos.pending, (state) => {
//     state.isLoading = true;
// });
// builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
//     state.isLoading = false;
//     state.allUsers = action.payload;
// });
// builder.addCase(fetchAllTodos.rejected, (state, action) => {
//     state.isLoading = false;
//     state.error = action.error.message ? action.error.message : '';
// });
//     }
// });

export const fetchAllTodos = createAsyncThunk<MyTodo[]>('user/fetchAllTodos', async () => {
    const response = await axios.get('http://localhost:3000/todos');
    console.log(response);
    return response.data;
});