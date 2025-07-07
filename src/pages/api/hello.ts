// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" }); //http://localhost:3000/api/hello라고 주소창에 치면 {"name":"John Doe뜸"}
}

//api 폴더안에 hello.ts는 routes로써 웹페이지를 정의하는 파일이 아닌 이렇게 api응답을 정의하는 코드