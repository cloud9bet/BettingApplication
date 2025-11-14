import { Api } from "../apiService";

//alt logges lige nu men skal ændres til at return stuff når de er testet


export async function AddDepositAsync(amount) {
    try {
        const response = await Api.post(`/User/deposit?amount=${amount}`);
        console.log(response.data);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

export async function SetUserDepositLimit(amount) {
    try {
        const response = await Api.put(`/User/depositlimit?amount=${amount}`);
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

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function GetAllUserDepositAsync() {
    try {
        const response = await Api.get(`/deposit`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function GetAllUserTransactionAsync() {
    try {
        const response = await Api.get(`/transaction`); // skal ændres  med (User/transaction)
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        return false;
    }

}

export async function GetUserPresetsAsync() {

    try {
        const response = await Api.get(`/preset`); // skal ændres  med (User/preset)
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}