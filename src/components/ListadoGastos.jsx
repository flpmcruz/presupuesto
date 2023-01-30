import Gasto from "./Gasto"

const ListadoGastos = ({
  gastos, 
  setGastoEditar, 
  eliminarGasto,
  filtro, 
  gastosFiltrados
}) => {
  return (
    <div className="listado-gastos contenedor">
        {
            filtro 
              ? (
                <>
                    <h2>{ gastosFiltrados.length 
                      ? <p>Gastos</p> 
                      : <p>No hay gastos aun</p>
                      } 
                    </h2>

                    {gastosFiltrados.map( gasto => (
                      <Gasto
                          key={gasto.id}
                          gasto={gasto}
                          setGastoEditar={setGastoEditar}
                          eliminarGasto={eliminarGasto}
                      />
                    ))}
                </>
            )
            : (
                <>
                    <h2>{ gastosFiltrados.length 
                      ? <p>Gastos</p> 
                      : <p>No hay gastos aun</p>
                      } 
                    </h2>

                    {gastos.map( gasto => (
                      <Gasto
                          key={gasto.id}
                          gasto={gasto}
                          setGastoEditar={setGastoEditar}
                          eliminarGasto={eliminarGasto}
                      />
                    ))}
                </>
            )
        }
    </div>
  )
}

export default ListadoGastos