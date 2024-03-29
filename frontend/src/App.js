import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Archive from './pages/Archive'
import Update from './pages/Update'
import Navbar from './components/Navbar'

function App() {
  return (

    <div className="App">
      <BrowserRouter>

        <Navbar />

        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/api/tasks/archive/"
              element={<Archive />}
            />
            <Route 
              path="/api/tasks/view/:id" 
              element={<Update />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
