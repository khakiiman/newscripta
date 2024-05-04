import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getNewsByCategory } from "../../utils/api";
import NewsList from "../news/NewsList";
import MainSpinner from "../spinner/main/MainSpinner";

export default function Category() {
  const { id } = useParams()

  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    () => {
      setIsLoading(true)
      getNewsByCategory(id)
        .then(res => {
          setArticles(res.articles)

          setIsLoading(false)
        })
        .catch(e => console.log(e))
    }, [id])

  if (isLoading)
    return <MainSpinner />


  return (
    <NewsList text={id.toUpperCase()} articles={articles} />
  )
}
