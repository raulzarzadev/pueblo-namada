import { useUser } from 'comps/context/userContext'
import InfoIcon from '../icons/InfoIcon'

const TextInfo = ({ textType = 'info', text = 'Text info' }) => {

  const { user: { hiddeInfoText } } = useUser()
  const textTyping = {
    info: 'bg-info',
    warning: 'bg-warning',
    error: 'bg-error'

  }

  if (hiddeInfoText === true) return <></>
  return (
    <div className={ `
    ${textTyping[textType]}
    bg-info my-1 text-base-100 rounded-md p-1 text-xs flex items-center shadow-md`}>
      <span className='text-xl p-1'>
        <InfoIcon />
      </span>
      <p className='whitespace-pre-line'>{ text }</p>
    </div>
  )
}

export default TextInfo
