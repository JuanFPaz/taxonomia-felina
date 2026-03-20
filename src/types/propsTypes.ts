import { type Familia, type NomenclaturaEspecie, type Nomenclatura, type Subfamilias, type FormFelinos, type NomenclaturaGenero } from '../model/Gatos'

export type PropsFamilia = {
  data: Familia
}

export type PropsSubfamilia = {
  data: Subfamilias[]
  dataEdit?: Subfamilias
  onSubFamilia: (subfamilia: FormFelinos) => void
  onEditSubfamilia: (id: string) => void
  onDeleteSubFamilia: (id: string) => void
}

export type PropsListaSubfamilia = {
  data: Subfamilias[]
  onDeleteSubFamilia: (id: string) => void
  onEditSubfamilia: (id: string) => void
  onClick: () => void
}

export type PropsFormulario = {
  dataEdit?: Subfamilias
  onClick: () => void
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void
}

export type PropsInputGenero = {
  data: number
  dataEdit?: NomenclaturaGenero
}

export type PropsInputEspecie = {
  data: number
  dataEdit?: NomenclaturaEspecie
  herencia?: number | string
}

export type PropsInputSubEspecie = {
  data: number
  dataEdit?: Nomenclatura
  herencia?: number | string
}
