import { Api } from "../apiService";

export async function AddDepositAsync(amount) {
    try {
        const response = await Api.post("/User/deposit", null, {params: {amount: amount}});
        console.log(response.data);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export async function SetUserDepositLimit(amount) {
    try {
        const response = await Api.put("/User/depositlimit", null, {params: {amount: amount}});
        console.log(response.data);
        return true;
    } catch (error) {
        console.error(error.message);
       return false;
    }
}

export async function DeleteUser() {
    try {
        const response = await Api.delete(`/User/account`);
        console.log(response.data);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export async function GetAllUserDepositAsync() {
    try {
        const response = await Api.get(`/deposit`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
    }
}

export async function GetAllUserTransactionAsync() {
    try {
        const response = await Api.get(`/User/transaction`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        return false;
    }

}

export async function GetUserPresetsAsync() {

    try {
        const response = await Api.get(`/User/preset`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}