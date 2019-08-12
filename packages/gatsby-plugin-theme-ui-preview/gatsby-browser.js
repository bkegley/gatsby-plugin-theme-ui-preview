import React from 'react'
import ThemePreview from './src/ThemePreview'
import ThemePreviewProvider from './src/ThemePreviewProvider'

export const wrapRootElement = ({element}) => {
  return (
    <ThemePreviewProvider>
      <ThemePreview>{element}</ThemePreview>
    </ThemePreviewProvider>
  )
}
