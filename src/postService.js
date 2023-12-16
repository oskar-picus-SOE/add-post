import axios from "axios";

const apiGatewayUrl = "http://localhost:9090";

export const addPost = async (formValues) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem('jwt')}`
        }
    };
    return axios.post(`${apiGatewayUrl}/api/v1/posts`, JSON.stringify(formValues), config);
};