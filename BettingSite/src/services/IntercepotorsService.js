// Request interceptor to add access token to every request

export async function requestInterceptor(api){
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("JWT"); // Get access token from the local storage
    
if (accessToken) { // if access token is present, add it to the bearer-token
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => { // Error-handling
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);
}


// Response interceptor to handle 401 and 403 response
export async function responseInterceptor(api){
    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            
            // Check if error response is present and error status is 401 or 403
            if (
                error.response &&
                (error.response.status === 401 || error.response.status === 403)
            ) {
                console.error("Response error :: ", error.response);
                
                // fetch new access token
                try {
                    const refresh = localStorage.getItem("refreshToken");
                     const refresh_token_url = `/Auth/refresh?refreshToken=${refresh}`;
                    const response = await api.post(refresh_token_url);
                    
                    const {jwTtoken, refreshToken} = response.data;
                    
                    localStorage.setItem("JWT", jwTtoken); // Update the access token in local storage
                    localStorage.setItem("refreshToken", refreshToken); // Update the refresh token in local storage
                    
                    // Re-try the original request
                    const originalRequest = error.config;
                    originalRequest.headers.Authorization = `Bearer ${jwTtoken}`;
                    return await api(originalRequest);
                    
                } catch (refreshError) {
                    localStorage.clear();
                    
                    // window.location.href = "/login";
                    
                    return await Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
}