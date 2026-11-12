const API_URL = "http://localhost:3000/jobs";

async function request(url,options = {}) {

    const response = await fetch(url,{...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });
if(!response.ok){
    throw new Error(`Request Failed: ${response.status}`)
}   
if(response.status === 204){
    return null;
}
return response.json()   
}

export const jobsApi = {
    list(signal){
        return request(API_URL,{signal})
    },
    getById(id,signal){
        return request(`${API_URL}/${id}`,{signal});
    },
    create(job){
        return request(API_URL,{
            method: "POST",
            body: JSON.stringify(job)
        });
    },
    update(id,changes){
        return request(`${API_URL}/${id}`,{
            method: "PATCH",
            body: JSON.stringify(changes)
        });
    },
    remove(id){
        return request(`${API_URL}/${id}`,{
            method: "DELETE"
        });
    }
};