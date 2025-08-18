
export const BACKEND_URL = "http://localhost:5000";

export const signup = async (data) => {
    console.log(data);
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json(); 
};

export const login = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json(); 
}
