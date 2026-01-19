import InputComponent from '../../Components/Input'
import NavbarComponent from '../../Components/Navbar'
import SelectComponent from '../../Components/Select'
import styles from './index.module.css'
import Alarm from '../../imgs/Alarm.svg'
import ButtonComponent from '../../Components/Button'
import type { Transacoes } from '../../../interfaces/Transacoes'

function TransacoesComponent() {

  let targetSelected = [
    {
      id: '1',
      name: 'Despesa'
    },
    {
      id: '2',
      name: 'Receita'
    },
    {
      id: '3',
      name: 'Ambas'
    },
  ]

let allTransactions = [
{

id: '12012',
description: 'Pagamento carro 10/48Pagamento carro 10/48Pagamento carro 10/48',
value: 1100,
target: 'Despesa',
category: 'carro',
owner: 'Igor'

}


]

  return (
  <>
  
  <NavbarComponent />
  <main>
  <h1>Gerenciar Transações</h1>
  <div className={styles.containerCreateTransaction}>
  <h2>+ Criar nova transação</h2>
  <div className={styles.boxCreateTransaction}>
  <InputComponent label='Descrição'/>
  <InputComponent label='Valor (R$)' type='number' min='0.01' step='0.01' placeholder='0,00'/>
  <SelectComponent label='Finalidade' optionsArray={targetSelected}/>
  <SelectComponent label='Categoria' optionsArray={targetSelected}/>
  <SelectComponent label='Pessoa' optionsArray={targetSelected}/>
  </div>
  <ButtonComponent label='Criar transação'/>
  <p className={styles.alarmYearsOld}><img src={Alarm} alt="Alarm icon" /> Menores de idade só podem registrar despesas.</p>
  </div>

  <div className={styles.containerListTransactions}>

  <h2>Lista de transações</h2>

  {

    allTransactions.map((transaction: Transacoes) => (
    <div className={styles.containerItemListTransactions}>
    <h3>{transaction.target}</h3>
    <p><span>Categoria:</span> {transaction.category}</p>
    <p><span>Pessoa:</span> {transaction.owner}</p>
    <p><span>Valor:</span> R${transaction.value}</p>
    <p><span>Id:</span> #{transaction.id}</p>
    <p title={transaction.description}><span>Descrição</span>: {transaction.description.length > 40 ? transaction.description+'...' : transaction.description}</p>
    </div>
    ))

  }

  </div>

  </main>

  </>
  )
}

export default TransacoesComponent