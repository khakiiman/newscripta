import { Link } from 'react-router-dom'

import IconButton from '../input/IconButtons'
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="h-28">
      <div className="py-6 px-6 max-w-7xl mx-auto sm:flex justify-between items-center">
        <div className="flex lg:flex-1 justify-center sm:justify-start pb-4 sm:pb-0">
          <Link to="/" className="-m-1.5 py-1.5">
            <span className="sr-only">News Aggregator</span>
            <span className="font-logo text-2xl tracking-widest font-bold outlined-text">NEWS</span>
            <span className="font-logo text-2xl tracking-widest font-bold">CRIPTA</span>
          </Link>
        </div>
        <span className="flex gap-6 items-center cursor-pointer justify-center sm:justify-start">
          <IconButton text="Instagram">
            <FaInstagram href='www.instagram.com' className="h-6 w-6" />
          </IconButton>
          <IconButton text="Facebook">
            <FaFacebook className="h-6 w-6" />
          </IconButton>
          <IconButton text="Youtube">
            <FaYoutube className="h-6 w-6" />
          </IconButton>
          <IconButton text="Github">
            <FaGithub className="h-6 w-6" />
          </IconButton>
        </span>
      </div>
    </footer>
  )
}

export default Footer