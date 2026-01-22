import InputComponent from '../../Components/Input'
import NavbarComponent from '../../Components/Navbar'
import SelectComponent from '../../Components/Select'
import styles from './index.module.css'
import Alarm from '../../imgs/Alarm.svg'
import ButtonComponent from '../../Components/Button'
import type { Transacoes } from '../../../interfaces/Transacoes'
import { useEffect, useState, type ChangeEvent } from 'react'
import type { Pessoa } from '../../../interfaces/Pessoas'
import type { Select } from '../../../interfaces/Select'
import type { Categorias } from '../../../interfaces/Categorias'

function TransacoesComponent() {

  const [targetSelected, setTargetSelected] = useState<Select[]>([])
  const [pessoasDados, setPessoasDados] = useState<Pessoa[]>([]);
  const [transacoesDados, setTransacoesDados] = useState([]);
  const [categoriasDados, setCategoriasDados] = useState<Categorias[]>([])

  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [target, setTarget] = useState('default')
  const [category, setCategory] = useState('default')
  const [personName, setPersonName] = useState('default')

  const [errorDescription, setErrorDescription] = useState('')
  const [errorValue, setErrorValue] = useState('')
  const [errorTarget, setErrorTarget] = useState('')
  const [errorCategory, setErrorCategory] = useState('')
  const [errorPersonName, setErrorPersonName] = useState('')

  const loadPessoas = async() => {

  fetch("https://localhost:7223/api/pessoas", {
    method: "GET"
  })
  .then((response) => {

  if(!response.ok) {

  throw new Error("Houve um erro ao buscar os dados")

  }

  return response.json()

  }).then((data) => {

  setPessoasDados(data)

  })

  }

  const loadCategorias = async (finalidade?: string) => {

  fetch(`https://localhost:7223/api/categorias?finalidade=${finalidade}`, {

  method: "GET"

  })
  .then((response) => {

  if(!response.ok) {

  throw new Error("Houve um erro ao buscar os dados")

  }

  return response.json()

  }).then((data) => {

  setCategoriasDados(data)

  })
    
  }

  const loadTransacoes = async () => {

  fetch("https://localhost:7223/api/transacoes", {
    method: "GET"
  })
  .then((response) => {

  if(!response.ok) {

  throw new Error("Houve um erro ao buscar os dados")

  }

  return response.json()

  }).then((data) => {

  setTransacoesDados(data)

  })

  }

  function createTransaction(): boolean {

  setErrorDescription('')
  setErrorValue('')
  setErrorTarget('')
  setErrorCategory('')
  setErrorPersonName('')

  if(!description || value <= 0 || target == 'default' || category == 'default' || personName == "default") {

  if(!description) {

  setErrorDescription("O campo descrição é obrigatório")

  }

  if(value <= 0) {

  setErrorValue("O valor precisa ser maior que 0")

  }

  if(!target || target == 'default') {

  setErrorTarget("O campo finalidade é obrigatório")

  }

  if(!category || category == 'default') {

  setErrorCategory("O campo categoria é obrigatório")

  }

  if(!personName || personName == 'default') {

  setErrorPersonName("O campo pessoa é obrigatório")

  }

  return false

  }

  fetch("https://localhost:7223/api/transacoes/create", {

  method: "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": JSON.stringify({
    "Category": category,
    "Description": description,
    "Owner": personName,
    "Target": target,
    "Value": value
  })

  })
  .then((response) => {

  if(!response.ok) {

  throw new Error("Houve um erro ao postar esse item em categorias.")

  }

  loadTransacoes()

  })
  return true

  }

  useEffect(() => {

  loadCategorias()
  loadPessoas()
  loadTransacoes()

  }, [])

  useEffect(() => {
  
  let personSelected = pessoasDados.find((b: Pessoa) => b.id == personName) 
  
  if(personSelected && personSelected.yearsOld < 18) {

  setTargetSelected([
    {
      id: 'Despesa',
      name: 'Despesa'
    },
])

  } else {

  setTargetSelected([
  {
    id: 'Despesa',
    name: 'Despesa' 
  },
  { 
    id: 'Receita',
    name: 'Receita'
   }
  ])

  }

  }, [personName])

  return (
  <>
  
  <NavbarComponent />
  <main>
  <h1>Gerenciar Transações</h1>
  <div className={styles.containerCreateTransaction}>
  <h2>+ Criar nova transação</h2>
  <div className={styles.boxCreateTransaction}>
  <InputComponent label='Descrição' error={errorDescription} onChange={(e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setDescription(value)
  value != '' && setErrorDescription('')
  }}/>
  <InputComponent label='Valor (R$)' type='number' min='0.01' step='0.01' placeholder='0,00' error={errorValue} onChange={(e: ChangeEvent<HTMLInputElement>) => {
  const value = Number(e.target.value)
  setValue(Number(value))
  value > 0 && setErrorValue('')  
  }}/>
  <SelectComponent label='Pessoa' optionsArray={pessoasDados.map((b) => {
    return {
    id: b.id,
    name: b.name.length < 30 ? b.name : b.name.substring(0,30)+"..."
    }
  })}error={errorPersonName} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value
  setPersonName(value)

  value != 'default' && setErrorPersonName('')
  }}/>
  <SelectComponent label='Finalidade (selecione uma pessoa)' optionsArray={targetSelected} error={errorTarget} disabled={personName == 'default'} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value
  setTarget(value)
  loadCategorias(value)
  value != 'default' && setErrorTarget('')
  }}/>
  <SelectComponent label='Categoria (selecione uma finalidade)' optionsArray={categoriasDados.map((b) => {
    return {
      id: b.id,
      name: b.description.length < 30 ? b.description : b.description.substring(0,30)+"..."
    }
  })} disabled={target == 'default'} error={errorCategory} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value
  setCategory(value)
  value != 'default' && setErrorCategory('')
  }}/>
  </div>
  <ButtonComponent label='Criar transação' onClick={() => createTransaction()}/>
  <p className={styles.alarmYearsOld}><img src={Alarm} alt="Alarm icon" /> Menores de idade só podem registrar despesas.</p>
  </div>

  <div className={styles.containerListTransactions}>

  <h2>Lista de transações</h2>

  <div className={styles.boxListItems}>
  {

    transacoesDados && transacoesDados.map((transaction: Transacoes) => (
    <div className={styles.containerItemListTransactions} key={transaction.id}>
    <h3>{transaction.target}</h3>
    <p><span>Categoria:</span> {transaction.category.length < 30 ? transaction.category : transaction.category.substring(0,30)+'...'}</p>
    <p><span>Pessoa:</span> {transaction.owner.length < 30 ? transaction.owner : transaction.owner.substring(0,30)+'...'}</p>
    <p><span>Valor:</span> R$ {transaction.value.toLocaleString('pt-BR')}</p>
    <p><span>Id:</span> #{transaction.id}</p>
    <p title={transaction.description}><span>Descrição</span>: {transaction.description.length > 40 ? transaction.description+'...' : transaction.description}</p>
    </div>
    ))

  }
  </div>

  </div>

  </main>

  </>
  )
}

export default TransacoesComponent