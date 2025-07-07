import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { useRouter } from "next/router";
 
export default function Page(){
   // const router=useRouter();
  //  const {q}=router.query;
   // return <h1>search {q}</h1>;

    return(
        <div>
            {books.map((book)=>(
                <BookItem key={book.id} {...book}/>
            ))}
        </div>
    ); 
}

//페이지별 개별 레이아웃 설정하고싶으면 
Page.getLayout=(page:ReactNode)=>{
    return <SearchableLayout>{page}</SearchableLayout>;
}