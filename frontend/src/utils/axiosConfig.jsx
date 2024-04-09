/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { setCredentials } from '../store/auth/authSlice';

let store;

// Recommended approach to avoid circular import dependency error
export const injectStore = (_store) => {
	store = _store;
};

export const apiErrorResponse = (error) => {
	if (error.response) {
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		console.log(error.request);
	} else {
		console.log('Error', error.message);
	}
};

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true
});

instance.interceptors.request.use(
	(config) => {
		const { accessToken } = store.getState().auth;

		if (accessToken) {
			config.headers = {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json'
			};
		}

		return config;
	},
	(err) => Promise.reject(err)
);

let isRefreshingToken = false;

instance.interceptors.response.use((response) => {
	return response;
}, async (error) => {
	const originalRequest = error.config;

	if (error.response !== null) {
		if ((error.response.status === 403 || error.response.status === 401)){
			if(originalRequest._retry){
				// Failed on retry request with new access token
				store.dispatch(setCredentials({
					user:null,
					accessToken: null,
					refreshToken: null
				}));
			}
			if (!isRefreshingToken) {
				isRefreshingToken = true;

				try {
					const { refreshToken } = store.getState().auth;
					const refreshData = await instance.post('/api/token/refresh/',{refresh:refreshToken});

					if (refreshData) {
						const { user } = store.getState().auth;									
						originalRequest.headers.Authorization = `Bearer ${refreshData.data.access}`;								
						store.dispatch(setCredentials({
							user,
							accessToken: refreshData.data.access,
							refreshToken
						}));
						originalRequest._retry = true;
						return instance(originalRequest);
					}
				} catch (error) {
					// Failed on refreshing token and logout
					store.dispatch(setCredentials({
						user:null,
						accessToken: null,
						refreshToken: null
					}));
					if (error.response && error.response.data) {
						return Promise.reject(error.response.data);
					}

					return Promise.reject(error);
				} finally {					
					isRefreshingToken = false;
				}
		  }
		}
	}

	return Promise.reject(error);
});

export default instance;
