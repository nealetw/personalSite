import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ip = (await axios.get("https://api.ipify.org?format=json"))?.data?.ip;
const token = Cookies.get("login");
const apiCall = async (route, type, data) => {
    const address =
        process.env.NODE_ENV === "production"
            ? "https://nealetw.com"
            : "http://localhost:5000";
    let response;
    switch (type) {
        case "put":
            response = await axios
                .put(address + route, { ...data, ip: ip, token: token })
                .catch((e) => console.log(e));
            break;
        case "post":
            response = await axios
                .post(address + route, { ...data, ip: ip, token: token })
                .catch((e) => console.log(e));
            break;
        default:
            response = await axios
                .get(address + route, { ...data, ip: ip, token: token })
                .catch((e) => console.log(e));
            break;
    }

    if (response?.error || response?.data?.error) {
        toast.error(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            error: true,
            progress: undefined,
            theme: "light",
        });
    } else return response?.data;
};

export const getLeagueChamps = async (version) => {
    return (await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)).data
}
export const getLeagueVersion = async () => {
    return (await axios.get(`https://ddragon.leagueoflegends.com/api/versions.json`)).data[0]
}
export const getLeagueChampInfo = async (version, name) => {
    return (await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${name}.json`)).data
}

export const getBoardPosts = async () => {
    const data = await apiCall("/api/board/posts");
    return data;
};
export const createBoardPost = async (payload) => {
    const data = await apiCall("/api/board/createPost", "put", payload);
    return data;
};
export const createPostReply = async (payload) => {
    const data = await apiCall("/api/board/createReply", "put", payload);
    return data;
};
export const getUsers = async () => {
    const data = await apiCall("/api/board/users");
    return data;
};
export const getUserByToken = async (token) => {
    const data = await apiCall(`/api/board/user/${token}`);
    return data;
};
export const checkUsername = async (username) => {
    const data = await apiCall(`/api/board/username/${username}`);
    return data;
};
export const createUser = async (payload) => {
    return await apiCall(`/api/board/user/create`, "put", payload);
};
export const login = async (payload) => {
    return await apiCall(`/api/board/login`, "put", payload);
};
export const deletePost = async (payload) => {
    return await apiCall(`/api/board/deletePost/`, "put", payload);
};
export const deleteReply = async (payload) => {
    return await apiCall(`/api/board/deleteReply/`, "put", payload);
};
export const leagueSmash = async (payload) => {
    return await apiCall(`/api/smash/`, "put", payload);
};
export const sendTextToApi = async (payload) => {
    return await apiCall(`/api/prompt/`, "put", payload);
};
