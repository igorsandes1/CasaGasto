import styles from './index.module.css'

type modalProps = {

onClose: () => void // void pois é o fechamento do modal, nada de retorno.
children?: React.ReactNode // corpo HTML do modal

}

function ModalComponent({children, onClose}: modalProps) {
  return (
<>

<div className={styles.bgModal} onClick={onClose}></div>
<div className={styles.modal}>
{children}
</div>

</>
  )
}

export default ModalComponent