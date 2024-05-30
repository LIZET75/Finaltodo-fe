import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MyAppTodo {
    id: number;
    todo: string;
    isdone: boolean;
   
}

interface TodoState {
    currentTodo: MyAppTodo | null;
    allTodos: MyAppTodo[];
    isLoading: boolean;
    error: string;
}

const initialState: TodoState = {
    currentTodo: null,
    allTodos: [],
    isLoading: false,
    error: ''
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Current Todo
        builder.addCase(fetchCurrentTodo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCurrentTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentTodo = action.payload;
        });
        builder.addCase(fetchCurrentTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ? action.error.message : '';
        });

        // Fetch all todos
        builder.addCase(fetchAllTodos.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allTodos = action.payload;
        });
        builder.addCase(fetchAllTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ? action.error.message : '';
        });

        // Updated todo
        builder.addCase(updateTodo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentTodo = action.payload;
        });
        builder.addCase(updateTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ? action.error.message : '';
        });

        // Create todo
        builder.addCase(createTodo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentTodo = action.payload;
        });
        builder.addCase(createTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ? action.error.message : '';
        });

        // Delete todo
        builder.addCase(deleteTodo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allTodos = state.allTodos.filter(todo => todo.id !== action.payload.id);
        });
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ? action.error.message : '';
        });
    }

});


export const fetchAllTodos = createAsyncThunk<MyAppTodo[]>('todo/fetchAllTodos', async () => {
    try {
        const responce = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`);
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
        return responce.data
    } catch (error) {
        console.error('Error fetching todo:', error);
        throw error;
    }
});

// AsyncThunk to fetch current todo form the database
// EXTRA CREDIT
/* TODO: Do an axios GET request to  
    http://localhost:3000/todos/:id
    to featch a todo with that ID.
    Follow the other AsyncThunks as examples
*/
export const fetchCurrentTodo = createAsyncThunk<MyAppTodo, number>('todo/fetchSingleTodo', async (id: number) => {
    const responce = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`);
    try {
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
        return responce.data
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
});


// AsyncThunk to update todo information
export const updateTodo = createAsyncThunk<MyAppTodo, { id: number } & Partial<MyAppTodo>>('todo/updateTodo', async (updateData) => {
    const { id, ...todoData } = updateData;
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`, todoData);
        return res.data;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
});

// AsyncThunk to create todo 
export const createTodo = createAsyncThunk<MyAppTodo, Partial<MyAppTodo>>('todo/createTodo', async (todoData) => {
    try {
        const request = {todo:todoData.todo,label:"default"}
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`,request);
        return res.data;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
});

// AsyncThunk to delete todo by ID
export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id: number) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
});



export default todoSlice.reducer;
