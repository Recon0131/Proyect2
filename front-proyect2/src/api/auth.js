import axios from './axios';

export const registerRequest = user =>  axios.post(`/register`,user)

export const loginRequest = user => axios.post(`/login`,user)

export const verifyTokenRequest = () => axios.get(`/verify`)

export const getUsersRequest = () => axios.get(`/home`)

export const updateUserRequest = (user) => axios.put("/update", user)

export const feedBackRequest = (feed) => axios.put("/feed",feed)

