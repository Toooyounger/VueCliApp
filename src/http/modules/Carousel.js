import {get,post} from "@/http/axios";


export function getCarousel(url,params){
    return get(url,params);
}

export function uploadPic(url,params){
    return post(url,params);
}
export function newPic(url,params){
    return post(url,params)
}
export function delPic(url,params){
    return post(url,params)
}

export  function updataPic(url,params){
    return post(url,params)
}