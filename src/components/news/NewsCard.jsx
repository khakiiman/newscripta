import { HiLink } from "react-icons/hi";

export const NewsCard = ({ source, title, description, publishedAt, url, urlToImage }) => {
  return (
    <article className="break-inside mb-6">
      <div className="flex flex-col rounded-xl border bg-white transition hover:bg-gray-200">
        <div className="">
          <img src={urlToImage || '/images/news_fallback.jpg'} className="w-full object-cover rounded-xl" />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <span className="mb-4 text-xs font-bold">{source?.name}</span>
            <span className="text-xs ml-8">{publishedAt}</span>
          </div>

          <h6 className="mb-4 text-xl font-light">{title}</h6>
          <p className="mb-4 text-xs">{description}</p>
        </div>
        <div className="p-4">
          <a target="blank block p-2" href={url} className="flex gap-3">
            <HiLink />
            <span className="text-xs underline">View Source Page</span>
          </a>
        </div>
      </div>
    </article>
  )
}


export default NewsCard