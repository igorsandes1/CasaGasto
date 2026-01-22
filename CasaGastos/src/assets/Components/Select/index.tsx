import type { ComponentProps } from 'react'
import type { Select } from '../../../interfaces/Select'
import styles from './index.module.css'

//tipando todas as propriedades que o select irá receber.
type SelectProps = ComponentProps<'select'> & {

error: string
identificador?: string
label: string,
optionsArray: Select[]
    
}

function SelectComponent({error, identificador, label, optionsArray, ...props}: SelectProps) {
  return (
<div className={styles.containerSelect}>

    <label>{label}</label>
    <select className={error && styles.selectError} {...props}>
    <option value="default">Selecione um item</option>
    {optionsArray.map((optionArr) => (
        <option key={optionArr.id} value={optionArr.id}>{identificador ? optionArr[identificador] : optionArr.name}</option>
    ))}
    </select>
{error && <span className={styles.containerError}>{error}</span>}
</div>
  )
}

export default SelectComponent