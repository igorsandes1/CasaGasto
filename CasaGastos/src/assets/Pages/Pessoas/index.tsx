import React, { useState } from 'react'
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
const [modalEditPerson, setModalEditPerson] = useState(false) //ativa/desativa modal de edicao de pessoas
const [personSelectedEdit, setPersonSelectedEdit] = useState<Pessoa | null>(null) //e o array da pessoa que foi selecionada para a edicao
const [modalCreatePerson, setModalCreatePerson] = useState(false) //ativa/desativa modal de criacao de pessoas
const [personName, setPersonName] = useState('') //nome da pessoa inserido pelo usuario no modal de criacao de pessoas
const [dateBirthday, setDateBirthday] = useState('') //data de aniversario inserida pelo usuario no modal de criacao de pessoas
const [errorPersonName, setErrorPersonName] = useState('') //caso ocorra algum erro, setar/aparecer a mensagem para o usuario no modal de criacao de pessoas
const [errorBirthday, setErrorBirthday] = useState('') //caso ocorra algum erro, setar/aparecer a mensagem para o usuario no modal de criacao de pessoas

  let pessoas: Pessoa[] = [

  {
    id: 'asdasda',
    username: 'Igor',
    birthday: '2004-04-29',
  }

  ]

  function editPerson(): boolean {

  

  return true

  }

  function createNewPerson(): boolean {

  //reset de errors

  setErrorBirthday('')
  setErrorPersonName('')

  //check de data de nascimento, para ver se está no range de hoje e acima do ano de 1900.

  const dateBirthdayCheck = new Date(dateBirthday)

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

  return true

  }

  //calc para trazer o valor inteiro de idade da pessoa

  function calcYearsOld(dateBirth: string): number {

  let dateToday = new Date()
  let dateBirthString = new Date(dateBirth)

  let year = dateToday.getFullYear()
  let month = dateToday.getMonth() + 1
  let day = dateToday.getDate()
  let yearUser = dateBirthString.getFullYear()
  let monthUser = dateBirthString.getMonth() + 1
  let dayUser = dateBirthString.getDate()
  
let yearsOld = year - yearUser

console.log(month, monthUser)

if(month < monthUser) {

yearsOld = yearsOld - 1

}

if(month == monthUser) {

if(day < dayUser) {

yearsOld = yearsOld - 1

}

}

  return yearsOld

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
    .filter((pessoa: Pessoa) => pessoa.username.toLowerCase().includes(search.toLowerCase())) // Filtrar pelo username caso o search tenha valor
    .map((pessoa: Pessoa) => { //Listando todos os usuários que possuem no array de pessoas.
    return (
    
   <div key={pessoa.id} className={styles.containerUser}>
   <div className={styles.containerUserInfo}>
    <h3>{pessoa.username}</h3>
    <span>
    ID: #{pessoa.id} <br />
    IDADE: {calcYearsOld(pessoa.birthday)} anos
    </span>
   </div>
   <div className={styles.containerButtons}>
   <ButtonComponent label='Editar' onClick={() => {
    setModalEditPerson(true)
    setPersonSelectedEdit(pessoa)
   }}/>
   <ButtonComponent label='Excluir' color='rgb(151, 21, 21)'/>
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
  <InputComponent label='Nome' error={errorPersonName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonName(e.target.value)}/>
  <InputComponent type='date' label='Data de nascimento' min='1900-01-01' max={todayFormatted && todayFormatted} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateBirthday(e.target.value)} error={errorBirthday}/>
  <ButtonComponent label='Criar pessoa' onClick={() => createNewPerson()}/>
  </ModalComponent>
  }
  {
  
  //caso o modalEditPerson for true, abre o modal para editar pessoa selecionada (a pessoa vem do obj personSelectedEdit)

  modalEditPerson && personSelectedEdit &&
  <ModalComponent onClose={() => setModalEditPerson(false)}>
  <h2>Edição de pessoa</h2>
  <InputComponent label='Nome' value={personSelectedEdit.username} error={errorPersonName}/>
  <InputComponent type='date' label='Data de nascimento' value={personSelectedEdit.birthday} min='1900-01-01' max={todayFormatted && todayFormatted} error={errorBirthday} disabled/>
  <ButtonComponent label='Editar pessoa' />
  </ModalComponent>
  }

    </main>

    </>

  )
}

export default PessoasComponent