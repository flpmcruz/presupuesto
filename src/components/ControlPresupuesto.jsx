import { useEffect, useState } from "react"

//componente externo para graficar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
  gastos, 
  presupuesto, 
  setIsValidPresupuesto,
  setPresupuesto, 
  setGastos}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
      const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
      const totalDisponible = presupuesto - totalGastado
      
      setPorcentaje( (totalGastado / presupuesto * 100).toFixed(2) )
      
      setGastado(totalGastado)
      setDisponible(totalDisponible)
  }, [gastos])
  
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const handleResetApp = () => {

    const resultado = confirm('Deseas reiniciar presupuesto y gastos?')

    if(resultado){
      setPresupuesto(0)
      setGastos([])
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
              value={porcentaje}
              styles = {buildStyles({        
                // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 2.5,
                    pathColor: porcentaje > 100 ? 'red' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? 'red' : '#3B82F6',
              })}
              text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className="contenido-presupuesto">
              
            <button
              className="reset-app"
              type="button"
              onClick={handleResetApp}
            >
                Resetear App
            </button>

            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 && 'negativo'}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto