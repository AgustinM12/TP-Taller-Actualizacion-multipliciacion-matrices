let numFilaInput1 = document.getElementById("fila1");
let numColInput1 = document.getElementById("columna1");

let numFilaInput2 = document.getElementById("fila2");
let numColInput2 = document.getElementById("columna2");

const agregarBtn = document.getElementById("crearMatricesBtn");
const calcularBtn = document.getElementById("calcular");

const sectionResult = document.getElementById("sectionResult");
const divResult = document.getElementById("divResult");
const matriz1 = document.getElementById("matriz1Content");
const matriz2 = document.getElementById("matriz2Content");

// ! FUNCIONES
function crearMatrices() {

  let numFila = parseInt(numFilaInput1.value);
  let numCol = parseInt(numColInput1.value);

  let numFila2 = parseInt(numFilaInput2.value);
  let numCol2 = parseInt(numColInput2.value);

  if (numFila > 0 && numCol > 0 && numFila2 > 0 && numCol2 > 0 && numCol == numFila2) {

    matriz1.innerHTML = "";
    matriz2.innerHTML = "";
    // * Creamos los inputs para la matriz 1
    for (let i = 0; i < numFila; i++) {
      let nuevaFila = document.createElement("div");
      nuevaFila.className = "gap-2 py-1 flex justify-center ";

      for (let j = 0; j < numCol; j++) {
        let input = document.createElement("input");
        input.type = "number";
        input.className = "border-2 rounded-md border-slate-400 w-20 inputMatriz1";
        input.required = true;
        nuevaFila.appendChild(input);
      }
      matriz1.appendChild(nuevaFila);
    }

    // * Creamos los inputs para la matriz 2
    for (let i = 0; i < numFila2; i++) {
      let nuevaFila = document.createElement("div");
      nuevaFila.className = "gap-2 py-1 flex justify-center";

      for (let j = 0; j < numCol2; j++) {
        let input = document.createElement("input");
        input.type = "number";
        input.className = "border-2 rounded-md border-slate-400 w-20 inputMatriz2";
        input.required = true;
        nuevaFila.appendChild(input);
      }
      matriz2.appendChild(nuevaFila);
    }
    sectionResult.classList.remove("hidden");
    calcularBtn.classList.remove("hidden");
  } else {
    alert("Las matrices no cumplen con las condiciones para realizar la multiplicación, las columnas de la matriz 1 deben ser iguales a las filas de la matriz 2.");
  }
}

//* Funcion para capturar valores y enviarlos al servidor
async function capturarValores() {

  let numFila1 = parseInt(numFilaInput1.value);
  let numCol1 = parseInt(numColInput1.value);

  let numFila2 = parseInt(numFilaInput2.value);
  let numCol2 = parseInt(numColInput2.value);

  let primerMatriz = [];
  let segundaMatriz = [];
  let newFila = []
  let index = 0;

  const inputMatriz1 = document.querySelectorAll('.inputMatriz1');
  const inputMatriz2 = document.querySelectorAll('.inputMatriz2');

  //* matriz 1
  for (let i = 0; i < numFila1; i++) {
    newFila = [];
    for (let j = 0; j < numCol1; j++) {
      newFila.push(inputMatriz1[index].value);
      index++;
    }
    primerMatriz.push(newFila);
  }
  //* matriz 2
  index = 0;
  for (let i = 0; i < numFila2; i++) {
    newFila = [];
    for (let j = 0; j < numCol2; j++) {
      newFila.push(inputMatriz2[index].value);
      index++;
    }
    segundaMatriz.push(newFila);
  }

  console.log(primerMatriz);
  console.log(segundaMatriz);

  //*enviar al servidor
  const res = await fetch('/arrayCalculation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ array1: primerMatriz, array2: segundaMatriz })
  });

  const data = await res.json();

  //*dibujar el resultado
  divResult.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let nuevaFila = document.createElement("div")
    nuevaFila.className = "gap-2 py-1 flex justify-center ";

    for (let j = 0; j < data[0].length; j++) {
      let input = document.createElement("input");
      input.type = "number";
      input.readOnly = true;
      input.className = "border-2 rounded-md border-slate-400 w-20 resultInput";
      input.value = data[i][j];
      nuevaFila.appendChild(input);
    }
    divResult.appendChild(nuevaFila);
  }

}

// ! EVENTOS
agregarBtn.addEventListener("click", () => {
  crearMatrices();
});

calcularBtn.addEventListener("click", () => {
  capturarValores();
});
