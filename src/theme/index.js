import { lightTheme, darkTheme } from 'naive-ui'

// Naive UI 主题覆盖
export const themeOverrides = {
  common: {
    primaryColor: '#3366FF',
    primaryColorHover: '#4775FF',
    primaryColorPressed: '#0039E6',
    primaryColorSuppl: '#7094FF',
    borderRadius: '6px',
  },
  Button: {
    textColor: '#FFFFFF',
    fontWeight: '500',
  },
  Card: {
    borderRadius: '12px',
    paddingMedium: '20px',
  },
  Input: {
    borderRadius: '6px',
  },
  Select: {
    peers: {
      InternalSelection: {
        borderRadius: '6px',
      }
    }
  },
  Tabs: {
    tabFontWeight: '500',
    barColor: '#3366FF',
  }
}

// 导出主题配置
export const themeConfig = {
  light: lightTheme,
  dark: darkTheme,
}