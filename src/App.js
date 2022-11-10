import { Home } from './components/home';
import { Main } from './components/main';
import { TopManga } from './components/top-manga';

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>


        <Main />

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/top" element={<TopManga />} />
        </Routes>
    </div>
      
    
  );
}

export default App;
