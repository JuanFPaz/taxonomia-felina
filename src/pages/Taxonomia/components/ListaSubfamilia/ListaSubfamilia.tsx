import type { PropsListaSubfamilia } from '../../../../types/propsTypes'

export default function ListaSubfamilia({ data, onDeleteSubFamilia, onEditSubfamilia, onClick }: PropsListaSubfamilia) {
  function handleEditSubfamilia(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(event.currentTarget.id);
    
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
                </button>
                <button id={Id} onClick={handleDeleteSubfamilia}>
                  Eliminar Subfamilias
                </button>
              </li>
              {Generos.map((gn, idx) => (
                <ul className='listaGenero' key={idx}>
                  <li className='itemGenero'><b>Género:</b> <i>{gn.cientifica}</i></li>
                  {gn.especies?.map((es, idx) => (
                    <ul className='listaEspecie' key={idx}>
                      <li className='itemEspecie'>
                        <b>Especie:</b> {es.comun} <i>({es.cientifica})</i>
                      </li>
                      {es.subespecie && (
                        <ul className='listaSubespecie'>
                          {es.subespecie?.map((sb, idx) => (
                            <li key={idx} className='itemSubEspecie'>
                              <b>Subespecie:</b> {sb.comun} <i>({sb.cientifica})</i>
                            </li>
                          ))}
                        </ul>
                      )}
                    </ul>
                  ))}
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
