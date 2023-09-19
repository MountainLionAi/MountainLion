import { createI18n } from 'vue-i18n'

import zh from './zh.js'
import en from './en.js'
let lang =  localStorage.getItem('lang')
if (!lang) {
  let language = navigator.language
  language = language.toLocaleLowerCase()
  lang = language.indexOf('zh') != '-1' ? 'zh' : 'en'
}
localStorage.setItem('lang',lang)
const i18n = createI18n({
    legacy: false,
    locale: lang,
    messages: {
        zh,
        en
    }
})
export default i18n