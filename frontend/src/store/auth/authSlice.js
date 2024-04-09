import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosConfig from '../../utils/axiosConfig';

export const loginUser = createAsyncThunk('auth/token', async ({
	username, password
}, { rejectWithValue }) => {
	try {
		const response = await axiosConfig.post('/api/token/', {
			username, password
		});

		return await response.data;
	} catch (error) {		
		return rejectWithValue("Invalid credentials or error logging in.");
	}
});


const initialState = {
	loading: false,
	user: null,
	accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
	error: null,
	success: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {			
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
			console.log("========== set credentialss ========", action)

			localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.accessToken = action.payload.access;
				state.refreshToken = action.payload.refresh
				localStorage.setItem('accessToken', action.payload.access);
				localStorage.setItem('refreshToken', action.payload.refresh);
				state.error = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});

export default authSlice.reducer;

export const { setCredentials } = authSlice.actions;
