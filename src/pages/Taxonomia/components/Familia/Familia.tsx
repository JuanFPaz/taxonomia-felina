import type { PropsFamilia } from "../../../../types/propsTypes"

export default function Familia({ data: { Familia, Reino, Filo, Clase, Orden, Suborden } }: PropsFamilia) {
  return (
    <div className='familia'>
      <h1>
        Familia: {Familia.comun} ({Familia.cientifica})
      </h1>
      <h2>Taxonomía</h2>
      <ul className='listaFamilia'>
        <li className='itemFamilia'>
          Reino: {Reino.comun} <i>({Reino.cientifica})</i>
        </li>
        <li className='itemFamilia'>
          Filo: {Filo.comun} <i>({Filo.cientifica})</i>
        </li>
        <li className='itemFamilia'>
          Clase: {Clase.comun} <i>({Clase.cientifica})</i>
        </li>
        <li className='itemFamilia'>
          Orden: {Orden.comun} <i>({Orden.cientifica})</i>
        </li>
        <li className='itemFamilia'>
          Suborden: {Suborden.comun} <i>({Suborden.cientifica})</i>
        </li>
        <li className='itemFamilia'>
          Familia: {Familia.comun} <i>({Familia.cientifica})</i>
        </li>
      </ul>
    </div>
  )
}
