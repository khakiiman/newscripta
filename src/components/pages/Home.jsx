import { useEffect, useState } from "react";

import { getLatestNews } from "../../utils/api";
import MainSpinner from "../spinner/main/MainSpinner";
import NewsList from "../news/NewsList";
import Popular from "../news/popular/Index";

export default function Home() {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    ()=> {
      setIsLoading(true)
      getLatestNews()
      .then( res => {
        setArticles(res.articles)
        setIsLoading(false)
      })
      .catch(e => console.log(e))  
  }, [])

  if(isLoading)
    return <MainSpinner />

    return (
      <main className="">
        <div className="p-6 max-w-7xl mx-auto">
          <Popular />
        </div>
        <NewsList text1="Latest" text2="News" articles={articles} />
      </main>
    )
    
}