import styles from './index.module.css'
import Logo from '../../imgs/logo.png'
import User from '../../imgs/User.svg'
import Category from '../../imgs/Paper.svg'
import Card from '../../imgs/Credit card.svg'
import Chart from '../../imgs/Chart.svg'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


function NavbarComponent() {

const location = useLocation()
const [path, setPath] = useState('')

 useEffect(() => {

  setPath(location.pathname.toLowerCase()) // verifica a url que estamos.

 }, []) 

  return (
    <nav>
    
    <div className={styles.containerLogo}>
    <img src={Logo} alt="Logo sistema" />
    </div>

    <ul className={styles.containerItems}>
    <li className={ path != '/categorias' && path != '/transacoes' && path != '/relatorios' ? styles.itemSelected : ''}><a href='/pessoas'><img src={User} alt="User imagem"/> <span>Pessoas</span></a></li>
    <li className={ path == '/categorias' ? styles.itemSelected : ''}><a href='/categorias'><img src={Category} alt="Category imagem" /> <span>Categorias</span></a></li>
    <li className={ path == '/transacoes' ? styles.itemSelected : ''}><a href='/transacoes'><img src={Card} alt="Card imagem" /> <span>Transações</span></a></li>
    <li className={ path == '/relatorios' ? styles.itemSelected : ''}><a href='/relatorios'><img src={Chart} alt="Chart imagem" /> <span>Relatórios</span></a></li>
    </ul>
    
    </nav>
  )
}

export default NavbarComponent