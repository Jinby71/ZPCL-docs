import DefaultTheme from 'vitepress/theme'
import Contributors from './components/Contributors.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Contributors', Contributors)
  },
}
