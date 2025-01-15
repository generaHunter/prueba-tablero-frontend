import './App.css'
import { RootState } from './store/store';
import { useSelector } from 'react-redux';
import Tablero from './components/Tablero'
import Login from './components/Login';
function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  return (
    <>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
          <Tablero />
        </>
      )}
    </>
  )
}

export default App
