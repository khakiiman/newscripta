import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getSearchResults } from "../../utils/api";
import { useSearchParamValues } from "../../hooks/useParamValues";

import NewsList from "../news/NewsList";
import MainSpinner from "../spinner/main/MainSpinner";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const params = useSearchParamValues();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);

      getSearchResults(params)
        .then(res => {
          setArticles(res.articles)
          setIsLoading(false)
        })
        .catch(e => console.log(e))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

  if (isLoading)
    return <MainSpinner />


  return (
    <NewsList text="Search Results" articles={articles} />
  )
}