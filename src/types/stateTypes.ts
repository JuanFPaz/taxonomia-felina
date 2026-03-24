import { type Familia, type Subfamilias } from '../model/Gatos'

export type stateFamilia = Familia

export type stateSubfamilias = { status: 'idle' } | { status: 'success'; data: Subfamilias[] }

export type stateEditSubfamilia = Subfamilias | null

export type stateTaxonomia = { status: 'none' } | { status: 'idle' } | { status: 'success'; data: { familia: Familia; subfamilias: Subfamilias[] } }

export type stateForm = {status:'hide'} | { status: 'show' } | { status: 'edit'; data: Subfamilias }

export type stateList = { status: 'idle'; data: Subfamilias[] }
