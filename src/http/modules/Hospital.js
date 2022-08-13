import {post} from "@/http/axios";
import {get} from "@/http/axios";

export function insertMsg(url,params){
    return post(url,params);
}

export function getHospitalList(url,params){
    return get(url,params);
}

export function deleteHospital(url,params){
    return get(url,params);
}

export function updateHospital(url,params){
    return post(url,params);
}