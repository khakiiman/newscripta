import Heading from "../common/Heading"
import NewsCard from "./NewsCard"

const NewsList = ({ articles = [], text1 = "Latest", text2 = "News" }) => {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-7">
        <Heading text1={text1} text2={text2} />
        <div className="masonry sm:masonry-sm md:masonry-md">
          {articles.map((article, index) => (
            <NewsCard key={index} {...article} />
          ))}
        </div>
      </section>
    </div>
  )
}


export default NewsList