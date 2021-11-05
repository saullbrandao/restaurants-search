import ReactDOM from 'react-dom'

export const Portal = ({ children }) => {
  const portal = document.querySelector('#modal-root')

  return ReactDOM.createPortal(children, portal)
}
