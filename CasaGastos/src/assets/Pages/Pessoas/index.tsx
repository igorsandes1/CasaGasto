import React, { useEffect, useState } from 'react'
import type { Pessoa } from '../../../interfaces/Pessoas'
import ButtonComponent from '../../Components/Button'
import InputComponent from '../../Components/Input'
import NavbarComponent from '../../Components/Navbar'
import Search from '../../imgs/Search_alt.svg'
import styles from './index.module.css'
import ModalComponent from '../../Components/Modal'

function PessoasComponent() {

const date = new Date()
const todayFormatted = date.getFullYear()+'-'+date.getMonth()+1+"-"+date.getDate() // pega a data de hoje para limitar no type date

const [search, setSearch] = useState('') //é o valor/edicao do campo de busca
const [modalCreatePerson, setModalCreatePerson] = useState(false) //ativa/desativa modal de criacao de pessoas
const [personName, setPersonName] = useState('') //nome da pessoa inserido pelo usuario no modal de criacao de pessoas
const [dateBirthday, setDateBirthday] = useState('') //data de aniversario inserida pelo usuario no modal de criacao de pessoas
const [errorPersonName, setErrorPersonName] = useState('') //caso ocorra algum erro, setar/aparecer a mensagem para o usuario no modal de criacao de pessoas
const [errorBirthday, setErrorBirthday] = useState('') //caso ocorra algum erro, setar/aparecer a mensagem para o usuario no modal de criacao de pessoas
const [pessoas, setPessoas] = useState([])

  //busca na api de pessoas ( GET )
  const loadPessoas = async() => {

  fetch("https://localhost:7223/api/pessoas", {
    method: "GET"
  })
  .then((response) => {

  if(!response.ok) {

  throw new Error("Houve um erro ao buscar os dados") //Caso ocorra um erro, ele da esse retorno

  }

  return response.json()

  }).then((data) => {

  setPessoas(data) //setando na variavél o retorno da api

  })

  }

  //Carrega a api ao entrar na pagina
  useEffect(() => {

  loadPessoas()

  }, [])

  // funcao para deletar o usuário
  function deletePerson(pessoa: Pessoa): boolean {

  //exclusao de pessoas ( DELETE )
  fetch("https://localhost:7223/api/pessoas/delete", {
    "method": "DELETE",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({
      Id: pessoa.id
    })
  }).then((response) => {
  if(!response.ok) {
  throw new Error("Não é possível deletar este usuário") //Caso ocorra um erro, ele da esse retorno
  }

  loadPessoas()

  })

  return true

  }

  function createNewPerson(): boolean {

  //reset de errors

  setErrorBirthday('')
  setErrorPersonName('')

  //check de data de nascimento, para ver se está no range de hoje e acima do ano de 1900.

  const dateBirthdayCheck = new Date(dateBirthday)

  if(dateBirthdayCheck > date || dateBirthday < "1900-01-01" || !personName || !dateBirthday) {

  if(dateBirthdayCheck > date || dateBirthday < "1900-01-01") {

  setErrorBirthday("Data de nascimento inválida")

  }

  //check se o nome não está vázio

  if(!personName) {

  setErrorPersonName('A pessoa a ser criada necessita de um nome')

  }

  //check se data de nascimento não está vazia

  if(!dateBirthday) {

  setErrorBirthday('A pessoa a ser criada necessita de uma data de nascimento')

  }

  }

  //criacao de pessoas ( POST )
   fetch("https://localhost:7223/api/pessoas/create", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({
     Name: personName,
     DateBirth: dateBirthday 
    })
  }).then((response) => {

  if(!response.ok) {
    throw new Error("Não foi possível criar o usuário") //Caso ocorra um erro, ele da esse retorno
  }

  loadPessoas() //recarrega a funcao de GET em pessoas
  setModalCreatePerson(false) //fecha o modal de criacao de pessoa

  })

  return true

  }
  
  return (

    <>
    
    <NavbarComponent />
    
    <main>
    <h1>Gerenciar Pessoas</h1>
    <div className={styles.containerSearch}>
    <span>
    <img src={Search} alt="Search image" />
    <InputComponent placeholder='Pesquisar uma pessoa' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
    </span>
    <ButtonComponent label='+ Criar nova pessoa' onClick={() => setModalCreatePerson(true)}/>
    </div>
    <div className={styles.containerUsers}>
    <h2>Listagem de pessoas:</h2>
    <div className={styles.boxUsers}>

    {

    pessoas
    .filter((pessoa: Pessoa) => pessoa.name.toLowerCase().includes(search.toLowerCase())) // Filtrar pelo username caso o search tenha valor
    .map((pessoa: Pessoa) => { //Listando todos os usuários que possuem no array de pessoas.
    return (
    
   <div key={pessoa.id} className={styles.containerUser}>
   <div className={styles.containerUserInfo}>
    <h3>{pessoa.name.length < 35 ? pessoa.name : pessoa.name.substring(0,35)+"..."}</h3>
    <span>
    ID: #{pessoa.id} <br />
    IDADE: {pessoa.yearsOld} anos
    </span>
   </div>
   <div className={styles.containerButtons}>
   <ButtonComponent label='Excluir' color='rgb(151, 21, 21)' onClick={() => deletePerson(pessoa)}/>
   </div>
   </div>
    
    )

    })
    }
    </div>
    </div>

  {

    //caso modalCreatePerson for true, abre o modal para criar uma nova pessoa

   modalCreatePerson && 
  <ModalComponent onClose={() => setModalCreatePerson(false)}>
  <h2>Criar nova pessoa</h2>
  <InputComponent label='Nome' maxLength={100} error={errorPersonName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonName(e.target.value)}/>
  <InputComponent type='date' label='Data de nascimento' min='1900-01-01' max={todayFormatted && todayFormatted} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateBirthday(e.target.value)} error={errorBirthday}/>
  <ButtonComponent label='Criar pessoa' onClick={() => createNewPerson()}/>
  </ModalComponent>
  }

    </main>

    </>

  )
}

export default PessoasComponent