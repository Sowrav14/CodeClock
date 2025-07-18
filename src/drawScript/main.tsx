
import ReactDOM from 'react-dom/client'
import App from './app'

const containerId = 'cf-sketch-container'
if (!document.getElementById(containerId)) {
    const div = document.createElement('div')
    div.id = containerId
    document.body.appendChild(div)
    
    ReactDOM.createRoot(div).render(
        <App />
    )
}
