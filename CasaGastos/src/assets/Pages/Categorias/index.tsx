import NavbarComponent from '../../Components/Navbar'
import styles from './index.module.css'
import Search from '../../imgs/Search_alt.svg'
import InputComponent from '../../Components/Input'
import ButtonComponent from '../../Components/Button'
import type { Categorias } from '../../../interfaces/Categorias'
import React, { useEffect, useState, type ChangeEvent } from 'react'
import ModalComponent from '../../Components/Modal'
import SelectComponent from '../../Components/Select'

function CategoriasComponent() {

  const [search, setSearch] = useState('') //valor da barra de pesquisa de categoria
  const [modalCreateCategory, setModalCreateCategory] = useState(false) //ativa/desativa modal de criacao de categorias

  const [description, setDescription] = useState('') //descricao da categoria digitado pelo usuario
  const [target, setTarget] = useState('') //finalidade da categoria digitado pelo usuario
  const [categorias, setCategorias] = useState([]) //todas as categorias

  const [errorDescription, setErrorDescription] = useState('') //caso ocorra algum erro na descricao da categoria
  const [errorTarget, setErrorTarget] = useState('') //caso ocorra algum erro na finalidade da categoria

  //funcao para busca de finalidade
  const loadCategorias = async () => {

  fetch(`https://localhost:7223/api/categorias?finalidade=Ambas`, {

  method: "GET"

  })
  .then((response) => {

  if(!response.ok) {

  throw new Error("Houve um erro ao buscar os dados")

  }

  return response.json()

  }).then((data) => {

  setCategorias(data)

  })
    
  }

  useEffect(() => {

    loadCategorias() //rodando a funcao de get de categorias

  }, [])

  //criacao de categoria
  function createCategory(): boolean {

  //resetando erros.
  setErrorDescription('') 
  setErrorTarget('')


  if(target == 'default' || !description) {

  if(target == 'default') { //caso finalidade seja valor default (sem valor)

  setErrorTarget("O campo finalidade é obrigatório")

  }

  if(!description) { //caso a descricao venha vazia

  setErrorDescription("O campo descrição é obrigatório")

  }

  return false

  }

  //solicitacao de criacao de categoria endpoint
  fetch(`https://localhost:7223/api/categorias/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Description: description,
      Target: target
    })
  }).then((response) => {
  if(!response.ok) {
    
    throw new Error("Houve um erro ao buscar os dados")

  }

  loadCategorias() //rodando o endpoint de get das categorias
  setModalCreateCategory(false) //desabilitando o modal de criacao de categoria

  })

  return true

  }

  let selectItems = [
    {
      id: 'Despesa',
      name: 'Despesa'
    },
    {
      id: 'Receita',
      name: 'Receita'
    },
    {
      id: 'Ambas',
      name: 'Ambas'
    },
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
    <ButtonComponent label='+ Criar nova categoria' onClick={() => setModalCreateCategory(true)}/>
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
    <div> <span>#{categoria.id}</span> <p>{categoria.description.length < 20 ? categoria.description : categoria.description.substring(0,20)+"..."}</p> <p>{categoria.target}</p></div>
    </div>
    ))

    }
    </div>

    </div>
    </div>

    {

    modalCreateCategory &&
    <ModalComponent onClose={() => setModalCreateCategory(false)}>
    <InputComponent label='Descrição' maxLength={100} error={errorDescription} onChange={(e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setDescription(value)
      description != '' && setErrorDescription('')
    }}/>
    <SelectComponent label='Finalidade' optionsArray={selectItems} error={errorTarget} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value
      setTarget(value)
      target != 'default' && setErrorTarget('')
    }}/>
    <ButtonComponent label='Criar Categoria' onClick={() => createCategory()}/>
    </ModalComponent>

    }

    </main>

  </>
  )
}

export default CategoriasComponent