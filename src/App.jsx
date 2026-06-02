import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './NavMenu';
import ItemDetail from './ItemDetail';
import AdminPanel from './AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <aside className="sidebar">
          <NavMenu />
        </aside>

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <section className="home-hero">
                  <span className="eyebrow">Student Project Dashboard</span>
                  <h1>Welcome to the SCP CRUD Application</h1>
                  <p>
                    Browse classified entries, explore item details, and manage records through a clean admin workspace designed for a polished student project presentation.
                  </p>
                </section>
              }
            />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;