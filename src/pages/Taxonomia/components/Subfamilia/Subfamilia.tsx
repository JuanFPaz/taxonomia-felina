import React, { useState } from 'react'
import ListaSubfamilia from '../ListaSubfamilia/ListaSubfamilia'
import Formulario from '../Formulario/Formulario'
import FormFormat from '../../../../utils/FormFormat'
import type { PropsSubfamilia } from '../../../../types/propsTypes'
import type { stateForm, stateList } from '../../../../types/stateTypes'
import Gatos from '../../../../model/Gatos'

export default function Subfamilia({ data }: PropsSubfamilia) {
  const [form, setForm] = useState<stateForm>({ status: 'hide' })
  const [list, setList] = useState<stateList>({ status: 'idle', data })

  function handleCreateSubfamilia() {
    setForm({ status: 'show' })
  }

  function handleCloseForm() {
    setForm({ status: 'hide' })
    setList({ status: 'idle', data: Gatos.getSubFamilias() })
  }

  function handleEditSubfamilia(id: string) {
    setForm({ status: 'edit', data: Gatos.findSubfamiliaById(id) })
  }

  function handleDeleteSubFamilia(id: string) {
    Gatos.deleteSubfamilia(id)
    Gatos.saveDataLocal()
    setList({ status: 'idle', data: Gatos.getSubFamilias() })
  }

  function handleSubmitSubfamilia(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    FormFormat.setFormData(event.currentTarget)
    FormFormat.setSubfamiliaFelina()
    FormFormat.setGenerosFelinos()
    FormFormat.setEspeciesFelinos()
    FormFormat.setSubEspeciesFelinos()
    if (form.status === 'show') {
      console.log('Ocurre en show?');
      Gatos.createSubfamilias(FormFormat.getFelino())
    } else if (form.status === 'edit') {
      Gatos.updateSubfamilia(FormFormat.getFelino(), form.data.Id)
    }
    Gatos.saveDataLocal()
    setForm({ status: 'hide' })
    setList({ status: 'idle', data: Gatos.getSubFamilias() })
  }

  return (
    <div className='subfamilia'>
      {form.status === 'hide' && <ListaSubfamilia data={list.data} onClick={handleCreateSubfamilia} onEditSubfamilia={handleEditSubfamilia} onDeleteSubFamilia={handleDeleteSubFamilia} />}
      {form.status === 'show' && <Formulario onSubmit={handleSubmitSubfamilia} onClick={handleCloseForm} />}
      {form.status === 'edit' && <Formulario data={form.data} onSubmit={handleSubmitSubfamilia} onClick={handleCloseForm} />}
    </div>
  )
}
