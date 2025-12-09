
// Koden tager inspiration fra medium (https://medium.com/@gahrmicc/basic-implementation-of-interceptors-in-react-js-using-axios-222bf0db6c3f)
export async function requestInterceptor(api){
api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("JWT");
    
if (accessToken) { 
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => { 
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);
}



export async function responseInterceptor(api){
    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            

            if (
                error.response &&
                (error.response.status === 401)
            ) {
                console.error("Response error :: ", error.response);
                
                try {
                    const refresh = sessionStorage.getItem("refreshToken");
                    const response = await api.post("/Auth/refresh", null, {params: {refreshToken: refresh}});
                    
                    const {jwTtoken, refreshToken} = response.data;
                    
                    sessionStorage.setItem("JWT", jwTtoken);
                    sessionStorage.setItem("refreshToken", refreshToken); 
                    

                    const originalRequest = error.config;
                    originalRequest.headers.Authorization = `Bearer ${jwTtoken}`;
                    return await api(originalRequest);
                    
                } catch (refreshError) {
                    sessionStorage.clear();
                    
                    window.location.hash = "#/login";
                    
                    return await Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
}

      