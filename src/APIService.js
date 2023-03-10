

export default class APIService {
    static LoginUser(body) {
        return fetch('http://127.0.0.1:8000/auth/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }).then(resp=>resp.json())
    }
    static RegisterUser(body) {
        return fetch('http://127.0.0.1:8000/api/users/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }).then(resp=>resp.json())
    }
    static SaveImage(body,token){
        return fetch('http://127.0.0.1:8000/api/images/',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token} `
            },
            body:JSON.stringify(body)
        }).then(resp=>resp.json())
    }
    static RemoveImage(body,token){
        return fetch(`http://127.0.0.1:8000/api/images/${body}`,{
            'method':'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token} `
            },
           
        })
    }
    static async CallImage(body){
        const resp = await fetch('http://127.0.0.1:8000/api/create/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        return await resp.json()
    }

}