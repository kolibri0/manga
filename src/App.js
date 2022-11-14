import { Home } from './components/home';
import { Main } from './components/main';
import { TopManga } from './components/top-manga';

import { Routes, Route } from 'react-router-dom'
import { MangaItem } from './components/manga-item';
import { Character } from './components/character';
import { Login } from './components/login';
import { SignIn } from './components/sign-in';

function App() {
  return (
    <div className='App'>
        <Main />

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/top" element={<TopManga/>}/>
            <Route path='/:id' element={<MangaItem/>}/>
            <Route path='/character/:id' element={<Character/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signin' element={<SignIn/>} />
        </Routes>
    </div>
      
    
  );
}

export default App;
