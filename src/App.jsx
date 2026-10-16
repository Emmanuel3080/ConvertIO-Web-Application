import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Dashboard/LandingPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="*" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
