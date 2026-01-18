import { useState } from 'react'
import ButtonComponent from '../../../Components/Button'
import InputComponent from '../../../Components/Input'
import Logo from '../../../imgs/logo.png'
import styles from '../index.module.css'
import { useNavigate } from 'react-router-dom'

function RegisterComponent() {


  const navigate = useNavigate()
  const date = new Date()
  const todayFormatted = date.getFullYear()+'-'+date.getMonth()+1+"-"+date.getDate()
  
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [dateBirthday, setDateBirthday] = useState('')
  const [passwd, setPasswd] = useState('')
  const [confirmPasswd, setConfirmPasswd] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorUser, setErrorUser] = useState('')
  const [errorBirthday, setErrorBirthday] = useState('')
  const [errorPasswd, setErrorPasswd] = useState('')
  const [errorConfirmPasswd, setErrorConfirmPasswd] = useState('')

  const dateBirthdayToString = new Date(dateBirthday)

  function checkRegister():boolean {

  setErrorEmail('')
  setErrorUser('')
  setErrorBirthday('')
  setErrorPasswd('')
  setErrorConfirmPasswd('')
  
  if(!email || !username || !dateBirthday || dateBirthdayToString > date || dateBirthdayToString.getFullYear().toString() < '1900' || !passwd || !confirmPasswd || passwd != confirmPasswd) {

if(!email) {

  setErrorEmail("É necessário preencher seu e-mail")
 
  }

  if(!username) {

  setErrorUser("É necessário preencher seu usuário")

  }  

  if(dateBirthdayToString > date || dateBirthday < "1900-01-01") {

  setErrorBirthday("Data de nascimento inválida")

  }
  
  if(!dateBirthday) {

  setErrorBirthday('É necessário preencher sua data de nascimento')

  }

  if(!passwd) {

  setErrorPasswd("É necessário inserir uma senha")

  }  

  if(!confirmPasswd) {

  setErrorConfirmPasswd("É necessário confirmar sua senha")

  }  

  if(passwd && confirmPasswd && passwd != confirmPasswd) {

  setErrorPasswd("As senhas não conferem")
  setErrorConfirmPasswd("As senhas não conferem")

  }

  return false

  }

 navigate('/login')

  return true

  }

  return (
    <div className={styles.container}>
    <div className={styles.containerLogo}>
    <img src={Logo} alt="Logo do sistema" />
    </div>
    <div className={styles.containerComponents}>
    <div className={styles.boxComponents}>
   <InputComponent label='E-mail' placeholder='Digite seu e-mail' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} error={errorEmail}/>
    <InputComponent label='Usuário' placeholder='Digite seu nome de usuário' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} error={errorUser}/>
    <InputComponent type='date' label='Data de nascimento' min='1900-01-01' max={todayFormatted && todayFormatted} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateBirthday(e.target.value)} error={errorBirthday}/>
    <InputComponent type='password' label='Senha' placeholder='Máximo 32 caractéres' maxLength={32} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswd(e.target.value)} error={errorPasswd}/>
    <InputComponent type='password' label='Confirme sua senha' placeholder='Digite sua senha novamente' maxLength={32} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPasswd(e.target.value)} error={errorConfirmPasswd}/>
    <ButtonComponent label='Cadastrar' onClick={() => checkRegister()}/>
    </div>
    </div>
    </div>
  )
}

export default RegisterComponent