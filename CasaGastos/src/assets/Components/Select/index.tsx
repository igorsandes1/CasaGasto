import type { Select } from '../../../interfaces/Select'
import styles from './index.module.css'

interface SelectProps {

label: string,
optionsArray: Select[]
    
}

function SelectComponent({label, optionsArray,}: SelectProps) {
  return (
<div className={styles.containerSelect}>

    <label>{label}</label>
    <select>
    {optionsArray.map((optionArr) => (
        <option key={optionArr.id} value={optionArr.id}>{optionArr.name}</option>
    ))}
    </select>

</div>
  )
}

export default SelectComponent