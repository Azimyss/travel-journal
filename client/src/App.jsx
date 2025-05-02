import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TravelList from './pages/TravelList';
import AddTravel from './pages/AddTravel';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col w-full">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-900">
                  Дневник путешествий
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  to="/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Добавить путешествие
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<TravelList />} />
              <Route path="/add" element={<AddTravel />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
