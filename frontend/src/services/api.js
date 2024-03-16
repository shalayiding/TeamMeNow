import axios from "axios";

const apiBaseUrl = "http://localhost:5001";



export const fetchUserData = () => {
  return axios.get(`${apiBaseUrl}/v1/user/me`, { withCredentials: true });
};

export const handleLogout = () =>{
    return axios.get(`${apiBaseUrl}/v1/user/logout`, { withCredentials: true });
};

export const visitorCollect =(data) =>{
    return axios.post(`${apiBaseUrl}/v1/user/visitor`, data);
};

export const createMatch = (data)=>{
    return axios.post(`${apiBaseUrl}/v1/matchs`, data);

};

export const getGames = () =>{
    return axios.get(`${apiBaseUrl}/v1/matchs/game`);
};


export const GetMatchs = (queryString)=>{
    return axios.get(`${apiBaseUrl}/v1/matchs?${queryString}`);
};

