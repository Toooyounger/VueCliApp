
import * as axios from "@/http/axios";

export function findPermissions(url,params){
    return axios.get(url,params);
}
export  function newUser(url,params){
    return axios.post(url,params)
}