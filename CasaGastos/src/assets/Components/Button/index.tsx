import type {ComponentProps} from 'react'
import './index.module.css'

// Typando as propriedades default do button
type ButtonProps = ComponentProps<'button'> & {

label?: string
color?: string

}

function ButtonComponent({label, color, ...props}: ButtonProps) {
  return (
    <button {...props} style={{backgroundColor: color}}>{label}</button>
  )
}

export default ButtonComponent