import { useEffect, useState } from 'react'
import NavbarComponent from '../../Components/Navbar'
import styles from './index.module.css'
import type { RelatorioPessoasIndividual } from '../../../interfaces/RelatorioPessoasIndividual'

function RelatoriosComponent() {

  const [ValuesGeral, setValuesGeral] = useState({
  totalReceitas: 0,
  totalDespesa: 0,
  totalSaldo: 0
  })
  const [ValuesIndividual, setValuesIndividual] = useState([])
  const [filterSelected, setFilterSelected] = useState("pessoas")

  const loadPessoasTotais = () => {

  fetch("https://localhost:7223/api/pessoas/totais", {
    method: "GET"
  })
  .then((response) => {

  if(!response.ok) {

  throw new Error("Houve um erro ao buscar os dados") //Caso ocorra um erro, ele da esse retorno

  }

  return response.json()

  }).then((data) => {

  setValuesGeral(data.geral) //setando na variavél o retorno da api
  setValuesIndividual(data.individual)
  console.log(data.individual)

  })

  }

  const loadCategoriasTotais = () => {

    fetch("https://localhost:7223/api/categorias/totais", {
    method: "GET"
  })
  .then((response) => {

  if(!response.ok) {

  throw new Error("Houve um erro ao buscar os dados") //Caso ocorra um erro, ele da esse retorno

  }

  return response.json()

  }).then((data) => {

  setValuesGeral(data.geral) //setando na variavél o retorno da api
  setValuesIndividual(data.individual)
  console.log(data.individual)

  })

  }

  useEffect(() => {

  loadPessoasTotais()

  }, [])

  return (
  <>
  
    <NavbarComponent />
    <main>

    <h1>Relatórios</h1>

    <div className={styles.containerRadioButton}>
    <p className={`${styles.buttonPessoaRadioButton} ${filterSelected == "pessoas" && styles.active}`} onClick={() => {
      loadPessoasTotais()
      setFilterSelected("pessoas")
    }}>Pessoas</p>
    <p className={`${styles.buttonCategoriaRadioButton} ${filterSelected == "categorias" && styles.active}`} onClick={() => {
      loadCategoriasTotais()
      setFilterSelected("categorias")
    }}>Categorias</p>
    </div>

    <div className={styles.containerGeral}>

    <div className={styles.containerReceita}>
      <h3>Total de receitas</h3>
      <p>R$ {ValuesGeral.totalReceitas.toLocaleString("pt-br")}</p>
    </div>
    <div className={styles.containerDespesa}>
      <h3>Total de despesas</h3>
      <p>R$ {ValuesGeral.totalDespesa.toLocaleString("pt-br")}</p>
    </div>
    <div className={styles.containerSaldo}>
      <h3>Saldo líquido</h3>
      <p>R$ {ValuesGeral.totalSaldo.toLocaleString("pt-br")}</p>
    </div>

    </div>

    <div className={styles.containerIndividual}>

    <div className={styles.headerIndividual}>
    <h3>Nome</h3>
    <h3>Total Receitas</h3>
    <h3>Total Despesas</h3>
    <h3>Saldo Líquido</h3>
    </div>

    <div>

    {ValuesIndividual.map((item: RelatorioPessoasIndividual) => (

    <div className={styles.boxIndividual} key={item.id}>
    <p>{item.name.length < 20 ? item.name : item.name.substring(0,20) + "..."}</p>
    <p>R$ {item.totalReceitas.toLocaleString("pt-br")}</p>
    <p>R$ {item.totalDespesas.toLocaleString("pt-br")}</p>
    <p>R$ {item.saldo.toLocaleString("pt-br")}</p>
    </div>

    ))}

    </div>

    </div>

    </main>

  </>
  )
}

export default RelatoriosComponent