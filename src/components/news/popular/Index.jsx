import { useEffect, useState } from "react";

import { getMostPopularNews } from "../../../utils/api";
import { Slider } from "./Slider";
import SliderSpinner from "../../spinner/slider/SliderSpinner";

const Popular = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setLoading(true)
    getMostPopularNews()
      .then(res => {
        setArticles(res);
        setLoading(false);
      })
      .catch(e => console.log(e))
  }, []);

  if (loading) {
    return <SliderSpinner loadingText="Loading Slides..." />

  }

  return (
    <Slider items={articles} />
  )
}

export default Popular;