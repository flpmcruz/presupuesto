import { useEffect, useState } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    const [mensaje, setMensaje] = useState('')

    const ocultarModal = () => {
        setGastoEditar({})
        setModal(false)

        setTimeout(()=>{
            setAnimarModal(false)
        }, 500)
    }

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [])
    

    const handleSubmit = e => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(()=> {
                setMensaje('')
            }, 3000)
            return
        }

        guardarGasto({
            nombre, 
            cantidad, 
            categoria,
            fecha,
            id
        })

        setAnimarModal(false)
        setTimeout(()=> {
            setModal(false)
        }, 500)
        return

    }

  return (
    <div className="modal">
        
        <div className="cerrar-modal">
            <img
                src={CerrarBtn}
                alt="Cerrar"
                onClick={ocultarModal}
            />
        </div>

        <form 
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            onSubmit={handleSubmit}
        >
            
            <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Añade el nombre del gasto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="nombre">Cantidad</label>
                <input
                    id="cantidad"
                    type="number"
                    placeholder="Añade la cantidad de gasto: ej: 300"
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor="nombre">Categoría</label>

                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="">--Seleccione--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input
                type="submit"
                value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir'}
            />

        </form>
    </div>
  )
}

export default Modal