
import axios from "axios";

export const saveOrUpdateUser = async (userData) => {
    const { data } = await axios.post(`https://asset-server.vercel.app/user`, userData);
    return data;
};
