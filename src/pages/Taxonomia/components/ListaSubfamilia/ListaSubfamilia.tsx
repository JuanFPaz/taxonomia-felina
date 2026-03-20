import type { PropsListaSubfamilia } from "../../../../types/propsTypes"

export default function ListaSubfamilia({ data, onDeleteSubFamilia, onEditSubfamilia, onClick }: PropsListaSubfamilia) {
  function handleEditSubfamilia(event: React.MouseEvent<HTMLButtonElement>) {
    onEditSubfamilia(event.currentTarget.id)
  }

  function handleDeleteSubfamilia(event: React.MouseEvent<HTMLButtonElement>) {
    onDeleteSubFamilia(event.currentTarget.id)
  }

  return (
    <div className='subfamilia-container'>
      <h1>Subfamilias:</h1>
      {data.length === 0 ? (
        <div className='no-data'>
          <p>
            <i>No hay registros</i>
          </p>
        </div>
      ) : (
        <div className='data-subfamilia'>
          {data.map(({ Subfamilia, Generos, Id }) => (
            <ul className='listaSubfamilia' key={Id}>
              <li className='itemSubfamilia'>
                Subfamilia: {Subfamilia.comun} ({Subfamilia.cientifica}){' '}
                <button id={Id} onClick={handleEditSubfamilia}>
                  Editar Subfamilias
                </button>{' '}
                <button id={Id} onClick={handleDeleteSubfamilia}>
                  Eliminar Subfamilias
                </button>
              </li>
              {Generos.map((gn, idx) => (
                <ul className='listaGenero' key={idx}>
                  <li className='itemGenero'>Genero: {gn.cientifica}</li>
                  <ul className='listaEspecie'>
                    {gn.especies?.map((es, idx) => (
                      <li className='itemEspecie' key={idx}>
                        Especie: {es.comun} ({es.cientifica})
                        {es.subespecie && (
                          <ul className='listaSubespecie' >
                            {es.subespecie?.map((sb, idx) => (
                              <li key={idx} className='itemSubEspecie'>
                                Subespecie: {sb.comun} {sb.cientifica}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </ul>
              ))}
            </ul>
          ))}
        </div>
      )}
      <button id='subfamilia' onClick={onClick}>
        Crear Subfamilias
      </button>
    </div>
  )
}
