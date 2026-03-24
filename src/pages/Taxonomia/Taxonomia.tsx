import { useEffect, useState } from 'react'
import Familia from './components/Familia/Familia'
import Subfamilia from './components/Subfamilia/Subfamilia'
import Gatos from '../../model/Gatos'
import type { stateTaxonomia } from '../../types/stateTypes'
import './Taxonomia.css'

export default function Taxonomia() {
  const [tax, setTax] = useState<stateTaxonomia>({ status: 'none' })

  useEffect(() => {
    if (tax.status === 'none') {
      Gatos.init()
      const familia = Gatos.getFamilia()
      const subfamilias = Gatos.getSubFamilias()
      setTax({ status: 'success', data: { familia, subfamilias } })
    }
  }, [])



  return (
    <>
      {tax.status === 'success' && (
        <div>
          <Familia data={tax.data.familia}/>
          <Subfamilia data={tax.data.subfamilias} />
        </div>
      )}
    </>
  )
}
