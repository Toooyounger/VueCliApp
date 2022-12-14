import {post} from "@/http/axios";
import {get} from "@/http/axios"

export function insertMsg(url,params){
    return post(url,params);
}

export function getDoctorMsg(url,params){
    return get(url,params);
}

export function deleteDoctor(url,params){
    return get(url,params);
}

export function updateDoctor(url,params){
    return post(url,params);
}