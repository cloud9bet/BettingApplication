import { Api } from "../apiService";
//alt logges lige nu men skal ændres til at return stuff når de er testet

async function PlayCoinflip(betAmount, choice) {
 try {
    const response = await AuthApi.post('/Game/coinflip', {
      betAmount,
      choice
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }

}


async function playCrash(betAmount, cashOutMultiplier) {
 try {
    const response = await AuthApi.post('/Game/Crash', {
      betAmount,
      cashOutMultiplier
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

async function playSlot(betAmount) {
    try {
        const response = await Api.post(`/Game/Slotmachine${betAmount}`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}