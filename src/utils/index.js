//save or update user
import axios from "axios";

export const saveOrUpdateUser = async (userData) => {
    const { data } = await axios.post(`http://localhost:5001/user`, userData);
    return data;
};
