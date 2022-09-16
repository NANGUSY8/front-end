import { v4 as uuidv4 } from 'uuid'
export const getUUID = ()=>{
    //如果本地存储有就获取本地,没有则生成再存储在本地,每个uuid只生成一次并且每个游客的uuid都不变    
   let uuid_token = localStorage.getItem("UUIDTOKEN")?localStorage.getItem("UUIDTOKEN"):localStorage.setItem("UUIDTOKEN",uuidv4())
    return uuid_token
}