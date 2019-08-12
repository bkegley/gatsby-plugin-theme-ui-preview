/** @jsx jsx */
import {jsx} from 'theme-ui'

const sharedStyles = {
  width: '25px',
  height: '4px',
  backgroundColor: 'primary',
  my: '4px',
  transition: '.4s',
}

const MenuIcon = ({open, ...props}) => {
  return (
    <button type="button" {...props} sx={{bg: 'transparent', border: 'none'}}>
      <div sx={{...sharedStyles, transform: open ? 'rotate(-45deg) translate(-6px, 5px)' : null}} />
      <div sx={{...sharedStyles, opacity: open ? 0 : 1}} />
      <div sx={{...sharedStyles, transform: open ? 'rotate(45deg) translate(-6px, -5px)' : null}} />
    </button>
  )
}

export default MenuIcon
