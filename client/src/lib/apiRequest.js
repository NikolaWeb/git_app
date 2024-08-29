import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://git-app-server-hyz2.onrender.com",
    withCredentials: true
});

export default apiRequest;