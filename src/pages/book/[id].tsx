
/* [id]라는 가변적인 값(프로퍼티로 들어감) 즉,URL 파라미터를 갖는 동적 경로에 대응하는 파일 
[id].tsx의 경우에는 localhost:5000/3  이런식으로 /뒤에 3의 숫자가 쿼리 프로퍼티로 들어감*/

/* 두개이상의 프로퍼티를 넣고싶은 경우  localhost:5000/3/1/2/34 가 되게 하려면
 [...id].tsx 로 ...을 설정해주자. 이걸 캐치올세그먼트 catch all segment(구간) 이라 부름 '모든 구간에 대응하겠다'는 뜻
 
 단, http://localhost:3000/book 처럼 book의 index.tsx는 대응할 수 없다.
 그럼 모든 페이지에서 다 정상적인 페이지가 작동되게 하려면?
 [[...id]].tsx로 캐치올세그먼트를 하나 더 입혀준다. 이걸 옵셔널 캐치올 세그먼트 optional catch all segment라고 부름
*/

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';

//동적경로에 ssg설정1 ) getStaticPaths : 현재 이 페이지에 존재할 수 있는는 경로들을 먼저 설정 
export const getStaticPaths=()=>{
  return {
    paths:[
      {params:{id:"1"}}, //url파라미터 값은 반드시 문자열로만 명시하기
      {params:{id:"2"}},
      {params:{id:"3"}},
    ],

    fallback:true,//브라우저에 접속요청 들어오면 이외의 값이 들어올때 대비책
    //false: 404 NotFound
    //blocking : SSR방식
    //true : SSR방식+데이터가 없는 폴백 상태의 페이지부터 반환, (지금 당장 사용할필요가없는 Props를 제외하고 빠르게 page를 출력할수있음)
    // props를 계산하는 getStaticProps의 호출은 생략하고 바로 Page 컴포넌트만 사전 렌더링해서 빠르게 브라우저에게 보내줌
    //UI를 먼저 렌더링하고 데이터는 나중에 전달해줌
  };
};

//동적경로에 ssg설정2) getStaticProps함수를 일일이 한 번씩 다 호출해서 사전에 여러개의 페이지를 렌더링
export const getStaticProps =async(
  context:GetStaticPropsContext
)=>{
  const id=context.params!.id; //.params! 에 느낌표 단언은 'undefined가 아닐거다'라는 뜻
  const book=await fetchOneBook(Number (id));

  if(!book){ //next서버가 자동으로 book데이터를 불러오지 못했을때는
    return{
      notFound:true, //notfound(404페이지)로
    };
  }
  return{
    props:{
      book
    },
  };
};

export default function Page({
  book,
  }:InferGetStaticPropsType<typeof getStaticProps>){

    //fallback상태란, page컴포넌트가 아직 서버로부터 데이터를 전달받지 못한 상태
    const router=useRouter();//데이터 있는데 진짜 로딩중일때 라우터사용해서
    if(router.isFallback) return "로딩중입니다."//데이터 있는데 진짜 로딩중일때를 표현
    
    if(!book) return "문제가 발생했습니다. 다시 시도하세요."//로딩 끝났는데도 데이터가 진짜 없을때
   const {
        id,title,subTitle,description,author,publisher,coverImgUrl,
    }=book;

   return (
   <div className={style.container}>
        <div 
            className={style.cover_img_container} 
            style={{backgroundImage:`url('${coverImgUrl}')`}}>
            <img src={coverImgUrl}/>
        </div>

        <div className={style.title} >{title}</div>
        <div className={style.subTitle} >{subTitle}</div>
        <div className={style.author} >{author} | {publisher}</div>
        <div className={style.description} >{description}</div>
   </div>
   )
}