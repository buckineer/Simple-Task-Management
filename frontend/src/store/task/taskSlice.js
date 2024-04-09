import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';


export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    const state = getState().task;
    const params = {};
    if(state.searchTerm) params["search"] = state.searchTerm;  
    if(state.orderByField) params["ordering"] = `${state.orderAscending==="asc" ? '' : '-'}${state.orderByField}`
    if(state.filterCompleted) params["is_completed"]='True'
    try {
      const response = await axios.get('/api/tasks/',{
        params
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchTasksWithLink = createAsyncThunk('tasks/fetchWithLink/', async (url) => {
  const response = await axios.get(url);
  return response.data;
});

export const addTask = createAsyncThunk(
  'tasks/addTask/',
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/tasks/', task);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update/",
  async ({ id, updatedData }) => {
    const response = await axios.put(`/api/tasks/${id}/`, updatedData);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask/',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const toggleTaskCompletedState = createAsyncThunk(
  'tasks/toggleTask/',
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/tasks/${task.id}/`, task);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks:[],
    loading:false,
    error:null,
    searchTerm: undefined,
    orderByField: undefined,
    orderAscending: "asc",
    filterCompleted:false,
    nextLink: undefined,
    prevLink: undefined,
  },
  reducers: {    
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortField: (state, action) => {
      state.orderByField = action.payload.field;
      state.orderAscending = action.payload.asc
    },
    setFilterCompleted:(state, action) => {
      state.filterCompleted = action.payload
    }
  },
  extraReducers:(builder)=> {
    builder
      .addCase(fetchTasks.pending, (state)=>{
        state.loading = true;
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state,action)=> {
        state.loading = false;
        state.tasks = action.payload["results"]
        state.nextLink = action.payload["next"] 
        state.prevLink = action.payload["previous"]
        state.currentPageNumber = 1
      })
      .addCase(fetchTasks.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(fetchTasksWithLink.pending, (state)=>{
        state.loading = true;
        state.error = null
      })
      .addCase(fetchTasksWithLink.fulfilled, (state, action)=>{
        state.loading = false;
        state.tasks = action.payload["results"]
        state.nextLink = action.payload["next"] 
        state.prevLink = action.payload["previous"]
        state.currentPageNumber = 1
      })
      .addCase(fetchTasksWithLink.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log(action)
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(toggleTaskCompletedState.fulfilled, (state, action) => {
        const task = state.tasks.find(task => task.id === action.payload);
        if (task) {
          task.completed = !task.completed;
        }
      });
  }
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;