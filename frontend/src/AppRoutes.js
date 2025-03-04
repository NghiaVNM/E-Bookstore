import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import FoodPage from './pages/Home/Book/FoodPage';

export default function AppRoutes() {
  return <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/search/:searchTerm' element={<HomePage />} />
    <Route path='/tag/:tag' element={<HomePage />} />
    <Route path='/book/:id' element={<FoodPage />} />
  </Routes>
}
