import { useState } from "react"
import ListaSubfamilia from "../ListaSubfamilia/ListaSubfamilia"
import Formulario from "../Formulario/Formulario"
import FormFormat from "../../../../utils/FormFormat"
import type { PropsSubfamilia } from "../../../../types/propsTypes"

export default function Subfamilia({ data, dataEdit, onSubFamilia, onEditSubfamilia, onDeleteSubFamilia }: PropsSubfamilia) {
  const [renderForm, setRenderForm] = useState(false)

  function handleRenderForm() {
    const fl = !renderForm
    setRenderForm(fl)
  }

  function handleRenderEditForm(id: string) {
    console.log(id);
    
    onEditSubfamilia(id)
    handleRenderForm()
  }

  function handleSubmitForm(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    FormFormat.setFormData(event.currentTarget)
    FormFormat.setSubfamiliaFelina()
    FormFormat.setGenerosFelinos()
    FormFormat.setEspeciesFelinos()
    FormFormat.setSubEspeciesFelinos()
    onSubFamilia(FormFormat.getFelino())!
    setRenderForm(false)
  }

  function showForm(): boolean{
    return renderForm === false
  }

  return (
    <div className='subfamilia'>
      {showForm() ? (
        <ListaSubfamilia data={data} onClick={handleRenderForm} onEditSubfamilia={handleRenderEditForm} onDeleteSubFamilia={onDeleteSubFamilia} />
      ) : (
        <Formulario dataEdit={dataEdit} onSubmit={handleSubmitForm} onClick={handleRenderForm} />
      )}
    </div>
  )
}
