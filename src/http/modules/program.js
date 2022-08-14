import {post} from "@/http/axios";
import {get} from "@/http/axios"

export function insertPro(url,params){
    return post(url,params);
}

export function getPro(url,params){
    return get(url,params);
}

export function deletePro(url,params){
    return post(url,params)
}

export function updatePro(url,params){
    return post(url,params);
}