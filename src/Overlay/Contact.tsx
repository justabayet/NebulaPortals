import './Contact.css'

function Contact(): JSX.Element | undefined {
  const emailAddress = 'anthony.bayet1999@gmail.com'

  return (
    <div className='contact' onClick={() => {
      if (window.confirm('Open your email app?'))
        window.open(`mailto:${emailAddress}`, '_blank')
    }}>
      <span className='short-text'>{'[ email ]'}</span>
      <span className='long-text'>{`[ ${emailAddress} ]`}</span>
    </div>
  )
}

export default Contact