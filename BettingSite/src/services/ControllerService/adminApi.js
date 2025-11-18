import { Api } from "../apiService";
//alt logges lige nu men skal ændres til at return stuff når de er testet

//huske skal enten være true eller false
export async function SetUserActiveState(id, status) {

    try {
        const response = await Api.put("/Admin/activeStatus", null, {params: {id: id, status: status}});
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}


export async function GetAllUserInfoAsync() {
    try {
        const response = await Api.get(`/Admin/user`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function GetAllUserDepositAsync() {
    try {
        const response = await Api.get(`/Admin/deposit`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function GetAllUserTransactionAsync() {
    try {
        const response = await Api.get(`/Admin/transaction`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}



export async function GetUserTransactionByIdAsync(id) {
    try {
        const response = await Api.get(`/Admin/transaction/${id}`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function GetUserDepositByIdAsync(id) {
    try {
        const response = await Api.get(`/Admin/deposit/${id}`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}