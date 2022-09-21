import InfoIcon from '../icons/InfoIcon'

const TextInfo = ({ text = 'Text info' }) => {
  return (
    <div className="bg-info my-1 text-base-100 rounded-md p-1 text-xs flex items-center shadow-md">
      <span className="text-xl p-1">
        <InfoIcon />
      </span>
      <p className="whitespace-pre-line">{text}</p>
    </div>
  )
}

export default TextInfo
