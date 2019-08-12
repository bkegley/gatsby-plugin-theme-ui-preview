/** @jsx jsx */
import {jsx, Flex, Box} from 'theme-ui'
import React from 'react'
import useThemePreview from './useThemePreview'
import MenuButton from './MenuButton'

const ThemeButton = ({themeKey, name, setActiveTheme, activeTheme}) => {
  const displayName = name ? name : themeKey
  return (
    <Box>
      <button
        type="button"
        onClick={() => setActiveTheme(themeKey)}
        sx={{border: 'none', bg: 'transparent', color: activeTheme === themeKey ? 'primary' : 'text'}}
      >
        {displayName}
      </button>
    </Box>
  )
}

const ThemePreview = ({children}) => {
  const {themes, activeTheme, setActiveTheme} = useThemePreview()
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('presets')

  const {presets, customThemes} = Object.entries(themes).reduce(
    (allThemes, [name, theme]) => {
      if (theme.forkedFrom) {
        return {
          presets: allThemes.presets,
          customThemes: {...allThemes.customThemes, [name]: theme},
        }
      } else {
        return {
          presets: {...allThemes.presets, [name]: theme},
          customThemes: allThemes.customThemes,
        }
      }
    },
    {presets: [], customThemes: []},
  )

  return (
    <div>
      <Box>
        <Box sx={{textAlign: 'center'}}>
          <MenuButton open={open} onClick={() => setOpen(old => !old)} />
        </Box>
        <Flex sx={{flexDirection: 'column', alignItems: 'center', display: open ? 'flex' : 'none'}}>
          <Flex sx={{flexDirection: 'row', mb: 2}}>
            <Box
              sx={{
                py: 2,
                px: 3,
                mx: 3,
                tabIndex: 0,
                borderBottom: activeTab === 'presets' ? '1px solid black' : 'none',
              }}
              onClick={() => setActiveTab('presets')}
            >
              Presets
            </Box>
            <Box
              sx={{
                py: 2,
                px: 3,
                mx: 3,
                tabIndex: 0,
                borderBottom: activeTab === 'custom' ? '1px solid black' : 'none',
              }}
              onClick={() => setActiveTab('custom')}
            >
              Custom
            </Box>
          </Flex>

          {activeTab === 'presets'
            ? Object.keys(presets).map(key => (
                <ThemeButton themeKey={key} setActiveTheme={setActiveTheme} activeTheme={activeTheme} />
              ))
            : activeTab === 'custom'
            ? Object.keys(customThemes).map(key => (
                <ThemeButton key={key} setActiveTheme={setActiveTheme} activeTheme={activeTheme} />
              ))
            : null}
        </Flex>
      </Box>
      <div>{children}</div>
    </div>
  )
}

export default ThemePreview
