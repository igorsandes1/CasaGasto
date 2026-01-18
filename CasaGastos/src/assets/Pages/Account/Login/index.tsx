import InputComponent from '../../../Components/Input'
import ButtonComponent from '../../../Components/Button'
import Logo from '../../../imgs/logo.png'
import styles from '../index.module.css'
import { useState } from 'react'

function LoginComponent() {

const [username, setUsername] = useState('')
const [passwd, setPasswd] = useState('')
const [errorUsername, setErrorUsername] = useState('')
const [errorPasswd, setErrorPasswd] = useState('')

function checkLogin():boolean {

setErrorPasswd('')
setErrorUsername('')

if(!username) {

setErrorUsername('Usuário inválido')

}

if(!passwd) {

setErrorPasswd('Senha inválida')

}

return true

}

  return (
<div className={styles.container}>
    <div className={styles.containerLogo}>
    <img src={Logo} alt='Logo do sistema'></img>
    </div>
    <div className={styles.containerComponents}>
    <div className={styles.boxComponents}>
    <InputComponent placeholder='Digite seu e-mail ou usuário' error={errorUsername} label='Usuário' id='username' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
    <InputComponent type='password' placeholder='Digite sua senha' error={errorPasswd} label='Senha' id='passwd' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswd(e.target.value)}/>
    <ButtonComponent label="Entrar" onClick={() => checkLogin()}></ButtonComponent>
    <p className={styles.forgetPasswd}>Esqueci a minha senha</p>
    <p className={styles.registerAcc}>Não possui uma conta? <a href='/register'>Cadastre-se já</a>!</p>
    </div>
    </div>
</div>
  )
}

export default LoginComponent