import { useEffect, useState } from 'react'
import Familia from './components/Familia/Familia'
import Subfamilia from './components/Subfamilia/Subfamilia'
import Gatos from '../../model/Gatos'
import type { FormFelinos } from '../../model/Gatos'
import type { stateFamilia, stateEditSubfamilia, stateSubfamilias } from '../../types/stateTypes'
import './Taxonomia.css'

export default function Taxonomia() {
  const [data, setData] = useState<stateFamilia>(null)
  const [dataSF, setDataSF] = useState<stateSubfamilias>(null)
  const [dataEdit, setDataEdit] = useState<stateEditSubfamilia>(null)

  useEffect(() => {
    setData(Gatos.getFamilia())
    setDataSF(Gatos.getSubFamilias())
  }, [])

  function handleCreateUpdateSubFamilia(formFelino: FormFelinos) {
    if (dataEdit) {
      Gatos.updateSubfamilia(formFelino, dataEdit.Id)
      Gatos.saveDataLocal()
      setDataSF(Gatos.getSubFamilias())
      setDataEdit(null)
    } else {
      Gatos.createSubfamilias(formFelino)
      Gatos.saveDataLocal()
      setDataSF(Gatos.getSubFamilias())
    }
  }

  function handleDeleteSubfamilia(id: string) {
    Gatos.deleteSubfamilia(id)
    Gatos.saveDataLocal()
    setDataSF(Gatos.getSubFamilias())
  }

  function handleEditSubfamilia(id: string) {
    setDataEdit(Gatos.findSubfamiliaById(id))
  }

  return (
    <div>
      <Familia data={data!} />
      <Subfamilia data={dataSF!} dataEdit={dataEdit!} onSubFamilia={handleCreateUpdateSubFamilia} onEditSubfamilia={handleEditSubfamilia} onDeleteSubFamilia={handleDeleteSubfamilia} />
    </div>
  )
}
