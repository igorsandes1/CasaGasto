import imgNotFound from '../../imgs/undraw_not-found_6bgl.svg'
import './index.css'

function NotFoundComponent() {

  // Página para caso de algum erro, aparece-la

  return (
  <div className="container-not-found">
  <div>
    <img src={imgNotFound}></img>
    <p>Página não encontrada</p>
  </div>
  </div>
  )
}

export default NotFoundComponent