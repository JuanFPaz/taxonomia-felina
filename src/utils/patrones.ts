const patron1: RegExp = /genero-cientifica-(\d+)/
// const patroncientifico: RegExp = /especie-cientifica-(\d+)-(\d+)/
// const patroncomun: RegExp = /especie-comun-(\d+)-(\d+)/
// const patron3: RegExp = /subespecie-cientifica-(\d+)-(\d+)-(\d+)/

const objeto = {
  'genero-cientifica-1': 'Panthera',
  'genero-cientifica-2': 'Neofelis',
  'especie-cientifica-1-1': 'Panthera Leo',
  'especie-comun-1-1': 'León',
  'especie-cientifica-1-2': 'Pantera Tigris',
  'especie-comun-1-2': 'Tigre',
  'especie-cientifica-1-3': 'Pantera Onca',
  'especie-comun-1-3': 'Leopardo',
}

const felino: {
  subfamilia: string
  generos?: {
    cientifica: string
    especies?: { cientifica: string; comun: string }[]
  }[]
} = {
  subfamilia: 'Pantherinae',
}

const generos: {
  cientifica: string
  especies?: { cientifica: string; comun: string }[]
}[] = []

const start = performance.now()

for (const [k, v] of Object.entries(objeto)) {
  const matchGen: RegExpMatchArray | null = k.match(patron1)
  // if (!matchGen) break

  // const gIndex = Number(matchGen[1]) - 1
  // const nomeclatura = {
  //     cientifica: v,
  // }

  // generos[gIndex] = nomeclatura
  if (matchGen) {
    const gIndex = Number(matchGen[1]) - 1
    const nomeclatura = {
      cientifica: v,
    }

    generos[gIndex] = nomeclatura
    continue
  }

  break
}

// for (let [k, v] of Object.entries(objeto)) {
//     let matchEsp: RegExpMatchArray | null = k.match(patroncientifico)
//     let matchEspComun: RegExpMatchArray | null = k.match(patroncomun)
//     if (matchEsp) {
//         console.log(matchEsp)
//         const gIndex = Number(matchEsp[1]) - 1
//         const eIndex = Number(matchEsp[2]) - 1

//         if (!generos[gIndex].especies) {
//             generos[gIndex].especies = []
//         }
//         const nomeclatura = {
//             cientifica: v,
//             comun: ''
//         }
//         generos[gIndex].especies![eIndex] = nomeclatura
//     }

//     if (matchEspComun) {
//         console.log(matchEspComun)
//         const gIndex = Number(matchEspComun[1]) - 1
//         const eIndex = Number(matchEspComun[2]) - 1

//         generos[gIndex].especies![eIndex].comun = v
//     }
// }
felino.generos = generos
console.log(felino)
const end = performance.now()
console.log('Tiempo empleado:', end - start, 'milisegundos')
