import { useState, useEffect } from "react"
import type {  PropsFormulario,  PropsInputGenero,  PropsInputEspecie,  PropsInputSubEspecie } from "../../../../types/propsTypes"


export default function Formulario({ dataEdit, onSubmit, onClick }: PropsFormulario) {
  const [dinamico, setDinamico] = useState([1])

  useEffect(() => {
    console.log()
    if (dataEdit) {
      const count = dataEdit.Generos.map((g, idx) => {
        return idx + 1
      })
      setDinamico(count)
    }
  }, [])

  function handleDinamicInput(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget.id === 'create') {
      const nuevoArreglo = [...dinamico]
      const indice = nuevoArreglo.length - 1
      const valueState = nuevoArreglo[indice]
      nuevoArreglo.push(valueState + 1)
      setDinamico(nuevoArreglo)
    } else if (event.currentTarget.id === 'delete') {
      const nuevoArreglo = [...dinamico]
      const ultimoElemento = nuevoArreglo.pop()
      setDinamico(nuevoArreglo)
    }
  }

  return (
    <div className='form-container'>
      <form className='form-subfamilia' onSubmit={onSubmit}>
        <div className='input input-subfamilia'>
          <h2>Elige una subfamilia</h2>
          <div className='radio-group'>
            <label>
              Feliane (Felinos)
              <input type='radio' name='subfamilia' value='Felinae' required defaultChecked={dataEdit?.Subfamilia.cientifica === 'Felinae' ? true : false} />
            </label>
            <label>
              Pantherinae (Panterinos)
              <input type='radio' name='subfamilia' value='Pantherinae' required defaultChecked={dataEdit?.Subfamilia.cientifica === 'Pantherinae' ? true : false} />
            </label>
          </div>
          {dinamico.map((d, idx) => (
            <InputGenero key={d} dataEdit={dataEdit?.Generos[idx]} data={d} />
          ))}
          <div className='button'>
            <button type='button' id='create' onClick={handleDinamicInput}>
              Crear Nuevo Genero
            </button>
            <button type='button' className='delete' id='delete' disabled={dinamico.length === 1} onClick={handleDinamicInput}>
              Eliminar Ultimo Genero
            </button>
          </div>
        </div>
        <button type='submit' id='guardar'>
          Guardar
        </button>
        <button type='button' id='cancelar' onClick={onClick}>
          Cancelar
        </button>
      </form>
    </div>
  )
}

function InputGenero({ data, dataEdit }: PropsInputGenero) {
  const [dinamicoDos, setDinamicoDos] = useState([1])
  useEffect(() => {
    console.log()
    if (dataEdit) {
      const count = dataEdit.especies.map((g, idx) => {
        return idx + 1
      })
      setDinamicoDos(count)
    }
  }, [])

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget.id === 'create-especie') {
      const nuevoArreglo = [...dinamicoDos]
      const indice = nuevoArreglo.length - 1
      const valueState = nuevoArreglo[indice]
      nuevoArreglo.push(valueState + 1)
      setDinamicoDos(nuevoArreglo)
    } else if (event.currentTarget.id === 'delete-especie') {
      const nuevoArreglo = [...dinamicoDos]
      const ultimoElemento = nuevoArreglo.pop()
      setDinamicoDos(nuevoArreglo)
    }
  }

  return (
    <div className='input input-genero'>
      <h2>Genero de Subfamilia {data}</h2>
      <label htmlFor={'genero-cientifica-' + data}>Nombre Cientifico:</label>
      <input type='text' name={'genero-cientifica-' + data} defaultValue={dataEdit?.cientifica} required />
      {dinamicoDos.map((d, idx) => (
        <InputEspecies key={d} dataEdit={dataEdit?.especies[idx]} data={d} herencia={data} />
      ))}
      <div className='button'>
        <button type='button' id='create-especie' onClick={handleClick}>
          Crear Nuevo Especie
        </button>
        <button type='button' className='delete' id='delete-especie' disabled={dinamicoDos.length === 1} onClick={handleClick}>
          Eliminar Ultimo Especie
        </button>
      </div>
    </div>
  )
}

function InputEspecies({ data, dataEdit, herencia }: PropsInputEspecie) {
  const [dinamicoTres, setDinamicoTres] = useState([1])
  const [flagBox, setFlagBox] = useState(false)
  const [clave, setClave] = useState(`${herencia}-${data}`)

  useEffect(() => {
    if (dataEdit?.subespecie) {
      const count = dataEdit.subespecie?.map((g, idx) => {
        return idx + 1
      })
      setFlagBox(true)
      setDinamicoTres(count)
    }
  }, [])

  function handleChangeBox(event: React.ChangeEvent<HTMLInputElement>) {
    const fl = !flagBox
    setFlagBox(fl)
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget.id === 'create-subespecie') {
      const nuevoArreglo = [...dinamicoTres]
      const indice = nuevoArreglo.length - 1
      const valueState = nuevoArreglo[indice]
      nuevoArreglo.push(valueState + 1)
      setDinamicoTres(nuevoArreglo)
    } else if (event.currentTarget.id === 'delete-subespecie') {
      const nuevoArreglo = [...dinamicoTres]
      const ultimoElemento = nuevoArreglo.pop()
      setDinamicoTres(nuevoArreglo)
    }
  }

  return (
    <div className='input input-especie'>
      <h2>Especie de Subfamilia {clave}</h2>
      <label htmlFor={'especiecientifica-' + clave}>Nombre Cientifico:</label>
      <input type='text' name={'especie-cientifica-' + clave} defaultValue={dataEdit?.cientifica} required />
      <label htmlFor={'especiecomun-' + clave}>Nombre Comun:</label>
      <input type='text' name={'especie-comun-' + clave} defaultValue={dataEdit?.comun} required />
      <label>
        ¿Agregar subespecie? <input type='checkbox' onChange={handleChangeBox} defaultChecked={dataEdit?.subespecie ? true : false} />
      </label>
      {flagBox !== false && (
        <>
          {dinamicoTres.map((d, idx) => (
            <InputSubespecies key={d} data={d} herencia={clave} dataEdit={dataEdit?.subespecie && dataEdit.subespecie[idx]} />
          ))}
          <div className='button'>
            <button type='button' id='create-subespecie' onClick={handleClick}>
              Crear Nueva Subespecie
            </button>
            <button type='button' className='delete' id='delete-subespecie' disabled={dinamicoTres.length === 1} onClick={handleClick}>
              Eliminar Ultimo Subespecie
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function InputSubespecies({ data, dataEdit, herencia }: PropsInputSubEspecie) {
  const [clave, setClave] = useState(`${herencia}-${data}`)
  return (
    <div className='input input-subespecie'>
      <h2>Subespecie de Subfamilia {clave}</h2>
      <label htmlFor={'sub-cientifica-' + clave}>Nombre Cientifico:</label>
      <input type='text' name={'sub-cientifica-' + clave} defaultValue={dataEdit?.cientifica} required />
      <label htmlFor={'sub-comun-' + clave}>Nombre Comun: (Opcional)</label>
      <input type='text' name={'sub-comun-' + clave} defaultValue={dataEdit?.comun} />
    </div>
  )
}
