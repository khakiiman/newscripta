import { FiFacebook, FiGithub, FiInstagram, FiYoutube } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="h-28">
      <div className="py-10 px-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 py-1.5">
            <span className="sr-only">News Aggregator</span>
            <span className="font-logo text-2xl tracking-widest font-bold outlined-text">NEWS</span>
            <span className="font-logo text-2xl tracking-widest font-bold">CRIPTA</span>
          </Link>
        </div>
        <span className="flex gap-6 items-center cursor-pointer">
          <FiInstagram className="h-6 w-6" />
          <FiFacebook className="h-6 w-6" />
          <FiYoutube className="h-6 w-6" />
          <FiGithub className="h-6 w-6" />
        </span>
      </div>
    </footer>
  )
}

export default Footer