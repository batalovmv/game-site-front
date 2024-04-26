import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Login from './features/auth/Login';
import GamePageContainer from './containers/GamePageContainer';


const App: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
console.log(`renderApp`);
    return (
        <div className="App">
            
            {isAuthenticated ? <Login /> : <GamePageContainer />}
        </div>
    );
};//дселал условие всегда false чтоб отображался контейнер, потом хотел добавить авторизацию поэтому оставил так

export default App;