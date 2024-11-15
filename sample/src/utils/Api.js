import axios from "axios"

export const loginApiCall = ()=>{
   return axios.post("http://localhost:8000/api/v1/users/login",{email:"preethambs2002@gmail.com",password:"Preethambs"})
}