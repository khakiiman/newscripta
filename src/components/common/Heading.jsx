const Heading = ({ text1, text2 }) => {
  return (
    <div className="flex gap-1 mb-4">
      <span className="font-logo text-2xl sm:text-4xl tracking-tighter font-bold outlined-text">{text1}</span>
      <span></span>
      <span className="font-logo text-2xl sm:text-4xl tracking-tighter font-bold">{text2}</span>
    </div>
  )
}


export default Heading