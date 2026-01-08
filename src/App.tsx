import { Route, BrowserRouter, Routes } from "react-router-dom"
import { Home, Ideation, Creativity, Research, Personas } from "./pages/index"
import InteractiveStarfield from "./components/InteractiveStarfield"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <InteractiveStarfield />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ideation" element={<Ideation />} />
          <Route path="creativity" element={<Creativity />} />
          <Route path="research" element={<Research />} />
          <Route path="personas" element={<Personas />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
