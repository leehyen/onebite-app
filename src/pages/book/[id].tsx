
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths=()=>{
  return {
    paths:[
      {params:{id:"1"}}, 
      {params:{id:"2"}},
      {params:{id:"3"}},
    ],
    fallback:true,
  };
};

export const getStaticProps =async(
  context:GetStaticPropsContext
)=>{
  const id=context.params!.id;
  const book=await fetchOneBook(Number (id));

  if(!book){
    return{
      notFound:true,
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
    const router=useRouter();
    if(router.isFallback){ //fallback 상태에도 seo 설정(meta태그값)이 나머지 경로들에 적용되지 않는 단점이 발생하여 이를 명시
      return(
        <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png"/>
          <meta property="og:title" content="한입북스"/>
          <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
        </Head>
        <div> "로딩중입니다."</div>
        </>
      );
    } 
    
    if(!book) return "문제가 발생했습니다. 다시 시도하세요."
   const {
        id,title,subTitle,description,author,publisher,coverImgUrl,
    }=book;

   return (
    <>
    <Head>
      <title>{title}</title>
      <meta property="og:image" content={coverImgUrl}/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
    </Head>
 
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
      </>
   )
}