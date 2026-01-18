import NavbarComponent from '../../Components/Navbar'
import styles from './index.module.css'
import Search from '../../imgs/Search_alt.svg'
import InputComponent from '../../Components/Input'
import ButtonComponent from '../../Components/Button'
import type { Categorias } from '../../../interfaces/categorias'
import React, { useState } from 'react'

function CategoriasComponent() {

  const [search, setSearch] = useState('')

  let categorias = [

  {
    id: '123123123',
    description: 'pagar carro',
    target: 'despesa'
  },
  {
    id: '12312',
    description: 'salário',
    target: 'receita'
  }

  ]

  return (
  <>
  
    <NavbarComponent />
    <main>
    <h1>Gerenciar Categorias</h1>
    <div className={styles.containerSearch}>
    <span>
    <img src={Search} alt="Search image" />
    <InputComponent placeholder='Pesquisar uma categoria' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
    </span>
    <ButtonComponent label='+ Criar nova categoria'/>
    </div>
    <div className={styles.containerCategorys}>
    <h2>Listagem de categorias:</h2>
    <div className={styles.boxCategorys}>

    <div className={styles.headerItemCategorys}>
    <div><p>ID</p> <p>DESCRIÇÃO</p> <p>FINALIDADE</p></div>
    </div>

    <div className={styles.containerItemsCategorys}>
    {
    categorias
    .filter((categorias: Categorias) => categorias.description.toLowerCase().includes(search.toLowerCase()) || categorias.id.includes(search.toLowerCase()))
    .map((categoria: Categorias) => (
    <div key={categoria.id} className={styles.itemCategory}>
    <div> <span>#{categoria.id}</span> <p>{categoria.description}</p> <p>{categoria.target}</p></div>
    </div>
    ))

    }
    </div>

    </div>
    </div>
    </main>

  </>
  )
}

export default CategoriasComponent