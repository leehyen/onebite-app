//CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

  //SSR : getServerSideProps함수는 사전 렌더링을 하는 그 과정에서 딱 한번만 실행히 될꺼기때문에
  // 오직 서버측에서만 실행됨,홈페이지에는 출력안되고 터미널에만 출력됨
  //SSG : getStaticProps
export const getStaticProps=async()=>{ 
  //페이지 역할을 하는 컴포넌트(여기서는 Home)보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
  //const data="hello";

  console.log("인덱스 페이지");
  const [allBooks,recoBooks]=await Promise.all([
    fetchBooks(),fetchRandomBooks()
  ]);
  return{
    props:{ //객체 형태의 프롭스 형태여야 페이지 역할을 하는 home 컴퍼넌트에게 전달가능함
      allBooks,
      recoBooks,
    },
  }
  //window.location; //javascript의 window는 브라우저를 의미함.
};

//페이지 역할을 하는 Home컴퍼넌트는 사실 서버에서 한 번 먼저 실행되고, 브라우저에서 한번더 실행됨
export default function Home({
  allBooks,recoBooks,
} : InferGetStaticPropsType<typeof getStaticProps>) { /*home 컴퍼넌트 */
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book)=>(<BookItem key={book.id} {...book}/>))}
      </section>
      <section>
        <h3>등록한 모든 도서</h3>
        {allBooks.map((book)=>(<BookItem key={book.id} {...book}/>))}
      </section>
    </div>
  );
}


Home.getLayout=(page: ReactNode ) => { //getLayout 메서드
  return <SearchableLayout>{page}</SearchableLayout>;
}

