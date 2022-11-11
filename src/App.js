import { Home } from './components/home';
import { Main } from './components/main';
import { TopManga } from './components/top-manga';

import { Routes, Route } from 'react-router-dom'
import { MangaItem } from './components/manga-item';

function App() {
  return (
    <div className='App'>


        <Main />

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/top" element={<TopManga />} />
            <Route path='/:id'  element={<MangaItem />}/>
        </Routes>
    </div>
      
    
  );
}

export default App;
