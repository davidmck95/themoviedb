import { Routes, Route } from 'react-router-dom'
import 'reactjs-popup/dist/index.css'
import Layout from './components/Layout'
import Starred from './pages/Starred'
import WatchLater from './pages/WatchLater'
import Home from './pages/Home'
import './app.scss'

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/starred" element={<Starred/>} />
        <Route path="/watch-later" element={<WatchLater/>} />
        <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
      </Routes>
    </Layout>
  )
}

export default App
