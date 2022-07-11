import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.sass';
import HomePage from './routes/home';
import LoginPage from './routes/login';
import AuthProvider, { RequireAuth } from './context/auth-context';
import RegistrationPage from './routes/registration';
import LikedPhotos from './routes/liked-photos';

axios.defaults.headers.common.Authorization = `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`;

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/liked-photos" element={<LikedPhotos />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;