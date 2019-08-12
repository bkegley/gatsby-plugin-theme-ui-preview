import React from 'react'
import {ThemePreviewContext} from './ThemePreviewProvider'

const useThemePreview = () => {
  const context = React.useContext(ThemePreviewContext)
  if (!context) {
    throw new Error('useThemePreview must be wrapped with a ThemePreviewProvider')
  }

  return context
}

export default useThemePreview
