import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/authContext"
import Home from "./routes/Home"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
