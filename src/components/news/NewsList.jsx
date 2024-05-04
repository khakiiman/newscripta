import Heading from "../common/Heading"
import NewsCard from "./NewsCard"
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'

const NewsList = ({ articles = [], text1 = "Latest", text2 = "News" }) => {
  const navigate = useNavigate();

  return (
    <div>
      {articles.length > 0 ?
        <section className="mx-auto max-w-7xl px-4 py-7">
          <Heading text1={text1} text2={text2} />
          <div className="masonry sm:masonry-sm md:masonry-md">
            {articles.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        </section> :
        <div className="flex flex-col gap-8 items-center justify-center text-xl">
          <span> There is no news card correspond to your search!!! </span>
          <button
            type="button"
            className="flex items-center gap-2 border-2 border-black rounded-xl py-1.5 px-6 text-black hover:text-white hover:bg-black "
            onClick={() => navigate(-1)}
          >
            <span className="sr-only">Go back</span>
            <RiArrowGoBackFill className="h-5 w-5" aria-hidden="true" />
            <span className="text-md">Go back</span>
          </button>
        </div>
      }
    </div>
  )
}


export default NewsList