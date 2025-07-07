import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { useRouter } from "next/router";

// export const getStaticProps =async(
//     context:GetStaticPropsContext
// )=>{
//     const q=context.query.q;
//     const books=await fetchBooks(q as string);
//     return{
//         props:{
//             books,
//         },
//     };
// };

export default function Page(){
    const [books, setBooks]=useState<BookData[]>([])
    const router=useRouter();
    const q=router.query.q;

    const fetchSearchResult=async()=>{
        const data=await fetchBooks(q as string);
        setBooks(data);
    };
    useEffect(()=>{
      if(q){ //검색어있다면
            fetchSearchResult();
        }
    },[q]);
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