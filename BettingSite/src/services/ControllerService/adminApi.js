import { Api } from "../apiService";
//alt logges lige nu men skal ændres til at return stuff når de er testet

//huske skal enten være true eller false
async function SetUserActiveState(id, status) {

    try {
        const response = await Api.put(`/Admin/activeStatus?id=${id}&status=${status}`);
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}



async function GetAllUserInfoAsync() {
    try {
        const response = await Api.get(`/Admin/user`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function GetAllUserDepositAsync() {
    try {
        const response = await Api.get(`/Admin/deposit`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function GetAllUserTransactionAsync() {
    try {
        const response = await Api.get(`/Admin/transaction`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}



async function GetUserTransactionByIdAsync(id) {
    try {
        const response = await Api.get(`/Admin/transaction${id}`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

async function GetUserDepositByIdAsync(id) {
    try {
        const response = await Api.get(`/Admin/deposit${id}`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}