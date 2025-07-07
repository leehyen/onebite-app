import Link from "next/link";
import {ReactNode} from "react";
import style from "./global-layout.module.css";
export default function GlobalLayout({
    children,
}:{
    children: ReactNode; //내부 프로퍼티의 타입은 children이라는 프로퍼티는 React Node라는 타입을 갖는다
}) {
    return ( 
   <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📚 ONEBITE BOOKS</Link>
      </header>

      <main className={style.main}>
        {children}
      </main>

      <footer className={style.footer}>제작 @hyen</footer>
   </div>
  ); 
}

//{"/"}는 index페이지