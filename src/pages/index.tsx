//CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json"; //@는 src폴더를 가르키는 경로
import BookItem from "@/components/book-item";

export default function Home() { /*home 컴퍼넌트 */
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book)=><BookItem key={book.id} {...book}/>)}
      </section>
      <section>
        <h3>등록한 모든 도서</h3>
        {books.map((book)=><BookItem key={book.id} {...book}/>)}
      </section>
    </div>
  );
}


Home.getLayout=(page: ReactNode ) => { //getLayout 메서드
  return <SearchableLayout>{page}</SearchableLayout>;
}