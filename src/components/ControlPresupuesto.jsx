import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto,setPresupuesto, gastos, setGastos, setIsValidPresupuesto   }) => {
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0)

    useEffect(() =>{
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)

        const totalDisponible = presupuesto - totalGastado

        //Calculo de porcentaje
        const porcentajeNuevo = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
  
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(porcentajeNuevo) 
        }, 1000);
    }, [gastos])




    const formatearCantidad = (cantidad) => {
        return Number(cantidad).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Quieres reiniciar tu presupuesto?')

        if (resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor:porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    
                })}
                value={porcentaje}
                text= {`${porcentaje}% Gastado`}
            />

        </div>

        <div className="contenido-presupuesto">
            <button 
            className='reset-app'
            type="button"
            onClick={handleResetApp}
            >
                Resetear app
            </button>

            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p> 

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> {formatearCantidad(disponible)}
            </p> 

            <p>
                <span>Gastado:</span> {formatearCantidad(gastado)}
            </p> 
        </div>
    </div>
  )
}

export default ControlPresupuesto