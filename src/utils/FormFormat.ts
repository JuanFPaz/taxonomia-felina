import type { FormFelinos, Nomenclatura, NomenclaturaGenero } from '../model/Gatos'

export default class FormFormat {
  private static formFelino: FormFelinos = {}
  private static formData: FormData

  static getFelino(): FormFelinos {
    return this.formFelino
  }

  static setFormData(fd: HTMLFormElement) {
    this.formData = new FormData(fd)
  }

  static setSubfamiliaFelina() {
    for (const [, v] of this.formData) {
      if (v === 'Felinae') {
        const subfamilia: Nomenclatura = {
          cientifica: v,
          comun: 'Felinos',
        }
        this.formFelino.subfamilia = subfamilia
        break
      } else if (v === 'Pantherinae') {
        const subfamilia: Nomenclatura = {
          cientifica: v,
          comun: 'Panterinos',
        }
        this.formFelino.subfamilia = subfamilia
        break
      }
    }
  }

  static setGenerosFelinos() {
    const regExr: RegExp = /genero-cientifica-(\d+)/
    const genero: NomenclaturaGenero[] = []
    for (const [key, value] of this.formData) {
      const v = value as string

      const matchGen: RegExpMatchArray | null = key.match(regExr)
      if (matchGen) {
        const gIndex = Number(matchGen[1]) - 1
        const nomeclatura = {
          cientifica: v,
          especies:[]
        }

        genero[gIndex] = nomeclatura
        continue
      }
    }
    this.formFelino.generos = genero
  }

  static setEspeciesFelinos() {
    const regExrCientifico: RegExp = /especie-cientifica-(\d+)-(\d+)/
    const regExrComun: RegExp = /especie-comun-(\d+)-(\d+)/
    for (const [key, value] of this.formData) {
      const v = value as string

      const matchEspCien: RegExpMatchArray | null = key.match(regExrCientifico)
      if (matchEspCien) {
        const gIndex = Number(matchEspCien[1]) - 1
        const eIndex = Number(matchEspCien[2]) - 1

        const nomeclatura = {
          cientifica: v,
          comun: '',
        }
        this.formFelino.generos![gIndex].especies[eIndex] = nomeclatura
        continue
      }
      const matchEspComun: RegExpMatchArray | null = key.match(regExrComun)
      if (matchEspComun) {
        const gIndex = Number(matchEspComun[1]) - 1
        const eIndex = Number(matchEspComun[2]) - 1

        this.formFelino.generos![gIndex].especies![eIndex].comun = v
        continue
      }
    }
  }

  static setSubEspeciesFelinos() {
    const regExrCientifico: RegExp = /sub-cientifica-(\d+)-(\d+)-(\d+)/
    const regExrComun: RegExp = /sub-comun-(\d+)-(\d+)-(\d+)/

    for (const [key, value] of this.formData) {
      const v = value as string

      const matchSubCien: RegExpMatchArray | null = key.match(regExrCientifico)
      if (matchSubCien) {
        const gIndex = Number(matchSubCien[1]) - 1
        const eIndex = Number(matchSubCien[2]) - 1
        const sIndex = Number(matchSubCien[3]) - 1

        if (!this.formFelino.generos![gIndex].especies![eIndex].subespecie) {
          this.formFelino.generos![gIndex].especies![eIndex].subespecie = []
        }

        const nomeclatura = {
          cientifica: v,
          comun: '',
        }
        this.formFelino.generos![gIndex].especies![eIndex].subespecie[sIndex] = nomeclatura
        continue
      }
      const matchSubComun: RegExpMatchArray | null = key.match(regExrComun)
      if (matchSubComun) {
        const gIndex = Number(matchSubComun[1]) - 1
        const eIndex = Number(matchSubComun[2]) - 1
        const sIndex = Number(matchSubComun[3]) - 1

        this.formFelino.generos![gIndex].especies![eIndex].subespecie![sIndex].comun = v
        continue
      }
    }
  }

  // TODO: Comparar el proceso con las otras funciones separadas con proccess.now()
  // static setEstructura() {
  //     const generos: NomenclaturaGenero[] = []

  //     for (let [k, v] of this.formData) {
  //         const value = v as string

  //         // 🟢 GENERO
  //         let matchGen = k.match(/genero-cientifica-(\d+)/)
  //         if (matchGen) {
  //             const gIndex = Number(matchGen[1]) - 1

  //             generos[gIndex] = {
  //                 cientifica: value,
  //                 especies: []
  //             }

  //             continue
  //         }

  //         // 🟡 ESPECIE
  //         let matchEsp = k.match(/especie-cientifica-(\d+)-(\d+)/)
  //         if (matchEsp) {
  //             const gIndex = Number(matchEsp[1]) - 1
  //             const eIndex = Number(matchEsp[2]) - 1

  //             if (!generos[gIndex]) continue //Comprueba si NO existe !generos[gIndex]. Si es true, saltea la iteracion?

  //             if (!generos[gIndex].especies) {
  //                 generos[gIndex].especies = []
  //             } //Comprueba si NO existe !generos[gIndex].especie. Si es true, crea el arreglo de especies?

  //             generos[gIndex].especies![eIndex] = {
  //                 cientifica: value,
  //                 comun: '',
  //                 subespecie: []
  //             }

  //             continue
  //         }

  //         // 🟣 SUBESPECIE
  //         let matchSub = k.match(/sub-cientifica-(\d+)-(\d+)-(\d+)/)
  //         if (matchSub) {
  //             const gIndex = Number(matchSub[1]) - 1
  //             const eIndex = Number(matchSub[2]) - 1
  //             const sIndex = Number(matchSub[3]) - 1

  //             const especie = generos[gIndex]?.especies?.[eIndex]
  //             if (!especie) continue

  //             if (!especie.subespecie) {
  //                 especie.subespecie = []
  //             }

  //             especie.subespecie[sIndex] = {
  //                 cientifica: value,
  //                 comun: ''
  //             }

  //             continue
  //         }
  //     }

  //     this.formFelino.generos = generos
  // }
}
