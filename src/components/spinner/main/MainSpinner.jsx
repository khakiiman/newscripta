import './mainSpinner.css'

const SliderSpinner = () => {
  return (
    <div className="flex flex-col text-center items-center gap-y-4">
      <div className="building-blocks">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span className="text-[14px] font-bold text-[#000000]">Loading...</span>
    </div>

  )
}

export default SliderSpinner;