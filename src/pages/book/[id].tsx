
/* [id]라는 가변적인 값(프로퍼티로 들어감) 즉,URL 파라미터를 갖는 동적 경로에 대응하는 파일 
[id].tsx의 경우에는 localhost:5000/3  이런식으로 /뒤에 3의 숫자가 쿼리 프로퍼티로 들어감*/

/* 두개이상의 프로퍼티를 넣고싶은 경우  localhost:5000/3/1/2/34 가 되게 하려면
 [...id].tsx 로 ...을 설정해주자. 이걸 캐치올세그먼트 catch all segment(구간) 이라 부름 '모든 구간에 대응하겠다'는 뜻
 
 단, http://localhost:3000/book 처럼 book의 index.tsx는 대응할 수 없다.
 그럼 모든 페이지에서 다 정상적인 페이지가 작동되게 하려면?
 [[...id]].tsx로 캐치올세그먼트를 하나 더 입혀준다. 이걸 옵셔널 캐치올 세그먼트 optional catch all segment라고 부름
*/

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book';

const mockData={
    id: 1,
    title: "한 입 크기로 잘라 먹는 리액트",
    subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
    description: "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
    author: "이정환",
    publisher: "프로그래밍인사이트",
    coverImgUrl: "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg"
  };

export const getServerSideProps =async(
  context:GetServerSidePropsContext
)=>{
  const id=context.params!.id; //.params! 에 느낌표 단언은 'undefined가 아닐거다'라는 뜻
  const book=await fetchOneBook(Number (id));
  console.log(id);

  return{
    props:{
      book
    },
  };
};

export default function Page({
  book,
  }:InferGetServerSidePropsType<typeof getServerSideProps>){

    if(!book) return "문제가 발생했습니다. 다시 시도하세요."
   //const router=useRouter();
   // const {id}=router.query; //[...id].tsx에서 파라미터로 전달한 /123/3/3이런 숫자들은 배열변수로 {id}에 저장됨
   // console.log(id);
    
   // return <h1>Book {id}</h1>;

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