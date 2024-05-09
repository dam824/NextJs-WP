import Header from "@/components/Header/Header";
import "../styles/style.scss"
import Home from "@/components/Home/Home";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      
    </>
  
  )
}
