import Styles from '../theme/snackbar.module.css'

function Snackbar({message}) {
  return(<div className={[Styles.snackbar, Styles.show].join(" ")}>{message}</div>)
}

export default Snackbar;