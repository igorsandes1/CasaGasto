
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PessoasComponent from './assets/Pages/Pessoas'
import CategoriasComponent from './assets/Pages/Categorias'
import TransacoesComponent from './assets/Pages/Transacoes'
import RelatoriosComponent from './assets/Pages/Relatorios'


function App() {

  return (
   <BrowserRouter>
   
   <Routes>

    <Route path='*' element={<PessoasComponent />}/>
    <Route path='/categorias' element={<CategoriasComponent />}/>
    <Route path='/transacoes' element={<TransacoesComponent />}/>
    <Route path='/relatorios' element={<RelatoriosComponent />}/>

   </Routes>

   </BrowserRouter>
  )
}

export default App
