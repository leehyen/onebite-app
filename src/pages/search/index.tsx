import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps =async(
    context:GetServerSidePropsContext
)=>{
    const q=context.query.q;
    const books=await fetchBooks(q as string);
    return{
        props:{
            books,
        },
    };
};

export default function Page({
    books,
}:InferGetServerSidePropsType<typeof getServerSideProps>){
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