import {get} from "@/http/axios";


export function newAricle(url,params){
    return get(url,params);
}

export function deleteAricle(url,params){
    return get(url,params);
}

export function getAricleContent(url,params){
    return get(url,params);
}