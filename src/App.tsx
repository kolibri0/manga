import { Home } from './components/home';
import { Main } from './components/main';
import { TopManga } from './components/top-manga';

import { Routes, Route } from 'react-router-dom'
import { MangaItem } from './components/manga-item';
import { Character } from './components/character';
import { Login } from './components/login';
import { SignIn } from './components/sign-in';
import { LoginAuth } from './components/login-auth';
import { AuthAll } from './components/auth-all';
import { Favorites } from './components/favorites';

function App() {
  return (
    <div className='App'>
        <Main />

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/top" element={
              <AuthAll>
                <TopManga/>
              </AuthAll>
            }/>
            <Route path='/:id' element={
              <AuthAll>
                <MangaItem/>
              </AuthAll>
            }/>
            <Route path='/character/:id' element={
              <AuthAll>
                <Character/>
              </AuthAll>
            }/>
            <Route path='/login' element={
              <LoginAuth>
                <Login/>
              </LoginAuth>
            }/>
            <Route path='/signin' element={
              <LoginAuth>
                <SignIn/>
              </LoginAuth>
            }/>
             <Route path='/favorite' element={
             <AuthAll>
              <Favorites/>
             </AuthAll>
            }/>
        </Routes>
    </div>
      
    
  );
}

export default App;
