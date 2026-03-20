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

  descripcion(): string {
    const message: string = `
        Los félidos (Felidae), coloquialmente llamados felinos, son una familia de mamíferos placentarios del orden Carnivora. Poseen un cuerpo esbelto, oído agudo, hocico corto y excelente vista. Son los mamíferos cazadores más sigilosos. La mayoría consume exclusivamente carne e ignora cualquier otra comida que no sea una presa viva. La capturan con sus afiladas garras y suelen matarla de un único y tenaz mordisco en la columna vertebral que conecta el cuello de la presa. Son digitígrados.[2]​

        Los félidos tienen algunas de las fibras musculares más potentes jamás estimadas en relación a su tamaño, siendo tres veces más potentes que las fibras musculares de atletas humanos y un 20 % más potentes que las de los ungulados salvajes.[3]​[4]​

        Se les han encontrado genes seleccionados de forma positiva, relacionados a un mayor desarrollo y mineralización óseos, fibras musculares de propiedades contráctiles superiores, síntesis de hormonas esteroides, y crecimiento de axones y su trayectoria.[5]​

        A excepción de los guepardos, todos los félidos pueden retraer las uñas de sus garras dentro de una vaina protectora mientras no las usan.

        Hay alrededor de cuarenta especies en esta familia; muchas de las cuales escasean en la actualidad, porque han sido objeto de caza por su piel, para aprovechar partes de su cuerpo, o porque su hábitat está siendo destruido, como pasa con el lince ibérico (Lynx pardinus), el félido en mayor peligro de extinción.

        Excepto en Antártida, Oceanía y algunas islas, se los encuentra en todo el mundo.\n\nFuente: Wikipedia - https://es.wikipedia.org/wiki/Felidae
        `

    return message
  }

  grandesFelidos(): string {
    const message = `
        Las cinco especies actuales más grandes de la familia son, por este orden: el tigre, el león, el jaguar, el leopardo, y el puma.

        En general son cazadores rápidos (guepardo: 104 km/h [29 m/s]; tigre: 56 km/h; leopardo: 60 km/h [17 m/s] y león: 74 km/h [20.6 m/s]) y poderosos, capaces de una gran aceleración (guepardo: 12 m/s²; león: 9.5 m/s²)
        `

    return message
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

  ronronear() {
    return 'Prrrr'
  }

  maullar() {
    return 'Miauuu'
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

  rugir() {
    return 'Roaaarrr!!'
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

  static crearFelinos({ subfamilia, generos, id }: FormFelinos, ) {
    const felinos: Felinae = new Felinae()
    felinos.Subfamilia = subfamilia!
    felinos.Generos = generos!
    if(id){
      felinos.Id = id
    }
    this.subFamilias.push(felinos)
  }

  static crearPanterinos({ subfamilia, generos, id }: FormFelinos) {
    const panterinos: Pantherinae = new Pantherinae()
    panterinos.Subfamilia = subfamilia!
    panterinos.Generos = generos!
    if(id){
      panterinos.Id = id
    }
    this.subFamilias.push(panterinos)
    console.log('se creo un panterino')
  }

  static updateSubfamilia({ subfamilia, generos }: FormFelinos, id: string) {
    console.log('Vamo a editarlo')

    console.log(this.subFamilias)
    this.subFamilias.forEach((sf, idx, arr) => {
      if (sf.Id === id) {
        arr[idx].Subfamilia = subfamilia!
        arr[idx].Generos = generos!
      }
    })
    console.log('Se edito?')

    console.log(this.subFamilias)
  }
  static findSubfamiliaById(id: string) {
    const [unaSubfamilia] = this.subFamilias.filter((sf) => {
      console.log(sf)
      if(sf.Id === id) {
        return sf
      }
    })
    console.log(unaSubfamilia);
    
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
