import React from 'react'
import useThemePreview from './useThemePreview'

const ThemePreview = ({children}) => {
  const {themes, setActiveTheme} = useThemePreview()

  return (
    <div>
      {Object.keys(themes).map(key => (
        <button type="button" onClick={() => setActiveTheme(key)} key={key}>
          {key}
        </button>
      ))}
      <div>{children}</div>
    </div>
  )
}

export default ThemePreview
