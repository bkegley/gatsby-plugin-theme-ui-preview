import React from 'react'
import {useThemeUI} from 'theme-ui'
import * as themePresets from '@theme-ui/presets'

export const ThemePreviewContext = React.createContext()

const THEME_PREVIEW_LOCAL_STORAGE_KEY = 'theme-ui-preview'
const THEME_PREVIEW_LOCAL_STORAGE_ACTIVE_KEY = 'theme-ui-preview-active'

const INIT_THEMES = 'INIT_THEMES'
const CREATE_THEME = 'CREATE_THEME'
const UPDATE_THEME = 'UPDATE_THEME'
const DELETE_THEME = 'DELETE_THEME'
const SET_ACTIVE_THEME = 'SET_ACTIVE_THEME'

function reducer(state, action) {
  switch (action.type) {
    case INIT_THEMES: {
      return {
        ...state,
        themes: action.themes,
        activeTheme: action.activeTheme,
      }
    }
    case CREATE_THEME: {
      return {
        ...state,
      }
    }
    case UPDATE_THEME: {
      return {
        ...state,
      }
    }
    case DELETE_THEME: {
      delete state.customThemes[action.id]
      return {
        ...state,
      }
    }
    case SET_ACTIVE_THEME: {
      return {
        ...state,
        activeTheme: action.data,
      }
    }
    default: {
      throw new Error('Please provide a valid action type')
    }
  }
}

const initialState = {
  activeTheme: 'default',
  themes: {},
}

function ThemePreviewProvider({children}) {
  const {theme, setTheme} = useThemeUI()
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    const customThemes = JSON.parse(localStorage.getItem(THEME_PREVIEW_LOCAL_STORAGE_KEY)) || {}
    const activeTheme = localStorage.getItem(THEME_PREVIEW_LOCAL_STORAGE_ACTIVE_KEY)
    const presets = Object.assign(
      ...Object.entries(themePresets).map(([name, theme]) => {
        return {
          [name]: {
            displayName: name,
            forkedFrom: null,
            theme,
          },
        }
      }),
    )
    const themes = Object.assign({default: {displayName: 'default', forkedFrom: null, theme}}, presets, customThemes)

    setTheme(themes[activeTheme].theme)
    dispatch({
      type: INIT_THEMES,
      themes,
      activeTheme,
    })
  }, [])

  const setActiveTheme = themeKey => {
    setTheme(state.themes[themeKey].theme)
    localStorage.setItem(THEME_PREVIEW_LOCAL_STORAGE_ACTIVE_KEY, themeKey)
    dispatch({type: SET_ACTIVE_THEME, data: themeKey})
  }

  const value = React.useMemo(() => ({themes: state.themes, activeTheme: state.activeTheme, setActiveTheme}), [state])
  return <ThemePreviewContext.Provider value={value}>{children}</ThemePreviewContext.Provider>
}

export default ThemePreviewProvider
