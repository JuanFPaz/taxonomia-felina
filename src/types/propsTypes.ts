import { type Familia, type NomenclaturaEspecie, type Nomenclatura, type Subfamilias, type NomenclaturaGenero } from '../model/Gatos'

export type PropsFamilia = {
  data: Familia
}

export type PropsSubfamilia = {
  data: Subfamilias[]
}

export type PropsListaSubfamilia = {
  data: Subfamilias[]
  onDeleteSubFamilia: (id: string) => void
  onEditSubfamilia: (id: string) => void
  onClick: () => void
}

export type PropsFormulario = {
  data?: Subfamilias
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
