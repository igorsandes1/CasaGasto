import type { ComponentProps } from 'react'
import styles from './index.module.css'

// Typando todas as propriedades do INPUT & label e error

type InputProps = ComponentProps<'input'> & {
  label?: string
  error?: string
}

function InputComponent({label, error, ...props}: InputProps) {
  return (
<div className={styles.containerInput}>
{label && <label htmlFor={props?.id}>{label}</label>}
<input {...props} className={error && styles.inputError}/>
{error && <span>{error}</span>}
</div>
  )
}

export default InputComponent