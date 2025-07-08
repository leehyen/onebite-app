import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    try{
        await res.revalidate('/')
        return res.json({revalidate:true});
    }catch(err){
        res.status(500).send("Revalidation Failed");
    }

}
//http://localhost:3000/api/revalidate 
//위 주소 접속 후 revalidate:true 메시지 확인하고나서 / 페이지 다시 확인하면 업데이트됨을 확인할수있음
//특정 조건이나 사용자의 행동으로 인해 업데이트됨