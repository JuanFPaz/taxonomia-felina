export function mapeo<T>(array: T[]): number[] {
  console.log(array.length)
  let count: number[] = []
  for (let i = 0; i < array.length; i++) {
    count.push(i + 1)
    console.log(count);
    
  }
  return count
}

export function createInput(target: string, key: string, state: number[], callback: (st: number[]) => void) {
  if (target === key) {
    const nuevoArreglo = [...state]
    const indice = nuevoArreglo.length - 1
    const valueState = nuevoArreglo[indice]
    nuevoArreglo.push(valueState + 1)
    callback(nuevoArreglo)
  }
}

export function deleteInput(target: string, key: string, state: number[], callback: (st: number[]) => void) {
  if (target === key) {
    const nuevoArreglo = [...state]
    const ultimoElemento = nuevoArreglo.pop()
    if (ultimoElemento) callback(nuevoArreglo)
  }
}
