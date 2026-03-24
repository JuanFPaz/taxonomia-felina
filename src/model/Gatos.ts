class Felidae {
  private id: string

  private reino: Nomenclatura
  private filo: Nomenclatura
  private clase: Nomenclatura
  private orden: Nomenclatura
  private suborden: Nomenclatura
  private familia: Nomenclatura

  protected subfamilia?: Nomenclatura
  protected generos?: NomenclaturaGenero[]

  constructor() {
    this.id = self.crypto.randomUUID()
    this.reino = {
      cientifica: 'Animalia',
      comun: 'Animal',
    }
    this.filo = {
      cientifica: 'Chordata',
      comun: 'Cordados',
    }
    this.clase = {
      cientifica: 'Mammalia',
      comun: 'Mamiferos',
    }
    this.orden = {
      cientifica: 'Carnivora',
      comun: 'Carnivoro',
    }
    this.suborden = {
      cientifica: 'Felofirmia',
      comun: 'Feliformes',
    }
    this.familia = {
      cientifica: 'Felidae',
      comun: 'Félidos',
    }
  }

  get Reino(): Nomenclatura {
    return this.reino
  }
  set Reino(_reino: Nomenclatura) {
    this.reino = _reino
  }
  get Filo(): Nomenclatura {
    return this.filo
  }

  get Clase(): Nomenclatura {
    return this.clase
  }

  get Orden(): Nomenclatura {
    return this.orden
  }

  get Suborden(): Nomenclatura {
    return this.suborden
  }
  get Familia(): Nomenclatura {
    return this.familia
  }

  get Id(): string {
    return this.id
  }

  set Id(id: string) {
    this.id = id
  }
}

class Felinae extends Felidae {
  constructor() {
    super()
  }
  get Subfamilia(): Nomenclatura {
    return this.subfamilia!
  }

  set Subfamilia(sf: Nomenclatura) {
    this.subfamilia! = sf
  }

  get Generos(): NomenclaturaGenero[] {
    return this.generos!
  }

  set Generos(gn: NomenclaturaGenero[]) {
    this.generos = gn
  }
}

class Pantherinae extends Felidae {
  constructor() {
    super()
  }

  get Subfamilia(): Nomenclatura {
    return this.subfamilia!
  }

  set Subfamilia(sf: Nomenclatura) {
    this.subfamilia! = sf
  }

  get Generos(): NomenclaturaGenero[] {
    return this.generos!
  }

  set Generos(gn: NomenclaturaGenero[]) {
    this.generos = gn
  }
}
export type Familia = Felidae

export type Subfamilias = Felinae | Pantherinae

export type Nomenclatura = { cientifica: string; comun: string }

export type NomenclaturaGenero = {
  cientifica: string
  especies: NomenclaturaEspecie[]
}

export type NomenclaturaEspecie = {
  cientifica: string
  comun: string
  subespecie?: Nomenclatura[]
}

export type FormFelinos = {
  subfamilia?: Nomenclatura
  id?: string
  generos?: NomenclaturaGenero[]
}

export default class Gatos {
  private static familia: Familia = new Felidae()
  private static subFamilias: Subfamilias[] = []

  static init() {
    const familia = localStorage.getItem('familia')
    const subfamilia = localStorage.getItem('subfamilia')
    this.subFamilias = []

    if (familia) {
      console.log('Existe el almacenamiento de Familia: Guardando ID')
      const parseFamilia = JSON.parse(familia)
      this.familia.Id = parseFamilia.Id
    } else {
      console.log('No existe el almacenamiento de Familia: ' + familia)
      localStorage.setItem('familia', JSON.stringify(this.familia))
    }

    if (subfamilia) {
      const parseSubfamilia = JSON.parse(subfamilia)
      if (parseSubfamilia.length > 0) {
        console.log('Existe el almacenamiento de Subfamilia: Recorriendo items')
        parseSubfamilia.forEach((psf: FormFelinos) => {
          this.createSubfamilias(psf)
        })
        return
      }
      console.log('Existe el almacenamiento de Subfamilia, pero esta vacio: ' + subfamilia)
    } else {
      console.log('No existe el almacenamiento de Subfamilia: ' + subfamilia)
      localStorage.setItem('subfamilia', JSON.stringify(this.subFamilias))
    }
  }

  static getFamilia() {
    return this.familia
  }
  static getSubFamilias() {
    return this.subFamilias
  }

  static createSubfamilias(ff: FormFelinos) {
    if (ff.subfamilia?.cientifica === 'Felinae') {
      this.crearFelinos(ff)
    } else {
      this.crearPanterinos(ff)
    }
  }

  static crearFelinos({ subfamilia, generos, id }: FormFelinos) {
    const felinos: Felinae = new Felinae()
    felinos.Subfamilia = subfamilia!
    felinos.Generos = generos!
    if (id) {
      felinos.Id = id
    }
    this.subFamilias.push(felinos)
  }

  static crearPanterinos({ subfamilia, generos, id }: FormFelinos) {
    const panterinos: Pantherinae = new Pantherinae()
    panterinos.Subfamilia = subfamilia!
    panterinos.Generos = generos!
    if (id) {
      panterinos.Id = id
    }
    this.subFamilias.push(panterinos)
  }

  static updateSubfamilia({ subfamilia, generos }: FormFelinos, id: string) {
    this.subFamilias.forEach((sf, idx, arr) => {
      if (sf.Id === id) {
        arr[idx].Subfamilia = subfamilia!
        arr[idx].Generos = generos!
      }
    })
  }
  static findSubfamiliaById(id: string) {
    const [unaSubfamilia] = this.subFamilias.filter((sf) => {
      if (sf.Id === id) {
        return sf
      }
    })

    return unaSubfamilia
  }

  static deleteSubfamilia(id: string) {
    const nuevoArreglo = this.subFamilias.filter((sf) => sf.Id !== id)
    this.subFamilias = nuevoArreglo
  }

  static saveDataLocal() {
    localStorage.setItem('subfamilia', JSON.stringify(this.subFamilias))
  }
}
