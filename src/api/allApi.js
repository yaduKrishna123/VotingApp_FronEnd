import { Baseurl } from "./base_url";
import { commonRequest } from "./commonRequest";
export const userRegister=async(body)=>{
    return await commonRequest("POST",`${Baseurl}/register`,body)
}
export const userLogin=async(body)=>{
    return await commonRequest("POST",`${Baseurl}/login`,body)
}

export const createpoll=async(body)=>{
    return await commonRequest("POST",`${Baseurl}/create`,body)
}
export const Allpolls=async(body)=>{
    return await commonRequest("GET",`${Baseurl}/allpolls`)
}
export const AddPolls=async(id,i)=>{
    
    return await commonRequest("POST",`${Baseurl}/vote/${id}/${i}`)
}