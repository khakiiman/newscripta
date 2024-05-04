import './sliderSpinner.css'

const SliderSpinner = ({ loadingText, }) => {
  return (
    <div className="flex flex-col text-center items-center gap-y-4">
      <div className="loading">
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <span className="text-[14px] font-bold text-[#000000]">{loadingText}</span>
    </div>

  )
}

export default SliderSpinner;