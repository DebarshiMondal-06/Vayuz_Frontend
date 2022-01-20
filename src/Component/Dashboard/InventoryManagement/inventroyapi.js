import axios from "axios";
const url = process.env.REACT_APP_URL;


export const getAllInventory = async () => {
    return await axios({
        method: 'get',
        url: `${url}/inventory`,
    });
}

export const addInventory = async (data) => {
    return await axios({
        method: 'post',
        url: `${url}/inventory`,
        data
    });
};

export const updateInventory = async (data) => {
    return await axios({
        method: 'put',
        url: `${url}/inventory`,
        data
    });
}