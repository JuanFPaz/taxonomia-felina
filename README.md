# 🐾 Taxonomía Felina

Aplicación web desarrollada con **React + TypeScript** para modelar y gestionar una jerarquía biológica de la familia **Felidae** (felinos).

Permite crear, editar y eliminar **subfamilias**, junto con sus respectivos **géneros, especies y subespecies**, utilizando un formulario dinámico completamente construido desde cero.

---

## 🚀 Features

* 📚 Visualización de la taxonomía base (Reino → Familia)
* 🧬 Creación dinámica de:

  * Subfamilias
  * Géneros
  * Especies
  * Subespecies
* ✏️ Edición completa de estructuras existentes
* 🗑️ Eliminación de subfamilias
* 💾 Persistencia en `localStorage`
* 🧠 Reconstrucción de estructuras complejas desde `FormData` + RegExp

---

## 🧠 Arquitectura

El proyecto está dividido conceptualmente en tres capas:

### 🔹 Dominio (`Gatos.ts`)

Encapsula la lógica principal de la aplicación:

* Modelado de clases:

  * `Felidae`
  * `Felinae`
  * `Pantherinae`

* Métodos estáticos para:

  * Crear
  * Editar
  * Eliminar
  * Persistir datos

---

### 🔹 Transformación (`FormFormat.ts`)

Encargado de convertir datos del formulario (`FormData`) en una estructura tipada:

* Uso de **RegExp** para interpretar inputs dinámicos
* Construcción jerárquica:

  * Géneros → Especies → Subespecies

---

### 🔹 Presentación (React Components)

Componentes principales:

* `Familia` → muestra la taxonomía base.
* `Subfamilia` → controla vista lista/formulario.
* `Formulario` → creación y edición de una subfamilia.
* `InputGenero` → creación y edición de uno o varios géneros de una subfamilia.
* `InputEspecie` → creación y edición de uno o varias especies de un género.
* `InputSubespecie` → creación y edición de uno o varias subespecie de una especie.

---

## 🧩 Modelo de Datos

```ts
type Nomenclatura = {
  cientifica: string
  comun?: string
}

type NomenclaturaGenero = {
  cientifica: string
  especies?: NomenclaturaEspecie[]
}

type NomenclaturaEspecie = {
  cientifica: string
  comun: string
  subespecie?: Nomenclatura[]
}
```

---

## ⚙️ Cómo funciona el formulario

El formulario es completamente dinámico y jerárquico:

* Cada input tiene un `name` estructurado:

```txt
genero-cientifica-1
especie-cientifica-1-2
sub-cientifica-1-2-1
```

* Luego se utiliza `FormData` + `RegExp` para reconstruir el árbol de datos.

---

## 💾 Persistencia

Se utiliza `localStorage` para guardar:

* `familia`
* `subfamilia`

Los datos se serializan como JSON y luego se **rehidratan** en instancias de clase al iniciar la app.

---

## 🛠️ Tecnologías

* React
* TypeScript
* CSS
* LocalStorage API

---

## 🧪 Estado del proyecto

✔️ Funcional
✔️ Soporta creación y edición compleja
⚠️ Código optimizable (especialmente en manejo de estado)

---

## 📌 Aprendizajes clave

Este proyecto explora:

* Manejo de formularios dinámicos complejos
* Modelado de dominio con clases
* Uso de `FormData` y `RegExp`
* Persistencia en frontend
* Separación de responsabilidades

---

## 🙌 Autor

Desarrollado por **Juan Paz** como proyecto de práctica y exploración de lógica compleja en frontend.

---

## 💬 Nota final

Este proyecto no busca ser perfecto, sino demostrar comprensión profunda de:

> cómo estructurar, procesar y manipular datos complejos en una UI dinámica.

---
