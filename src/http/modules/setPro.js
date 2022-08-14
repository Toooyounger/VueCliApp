import {post} from "@/http/axios"

export function setPro(url,params){
    return post(url,params);
}