import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import App from './global/App'
import './assets/fonts/apercu_regular_pro.otf'
import './assets/fonts/apercu_regular_italic_pro.otf'
import './assets/fonts/apercu_medium_pro.otf'
import './assets/fonts/apercu_medium_italic_pro.otf'
import './assets/fonts/apercu_bold_pro.otf'
import './assets/fonts/apercu_bold_italic_pro.otf'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
