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

  console.log(numFila, numCol);

  if (numFila > 0 && numCol > 0) {
    matriz1.innerHTML = "";
    matriz2.innerHTML = "";
    // * Creamos los inputs para la matriz 1
    for (let i = 0; i < numFila; i++) {
      let nuevaFila = document.createElement("div")
      nuevaFila.className = "flex justify-center items-center gap-2 my-2 mx-auto";

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
      let nuevaFila = document.createElement("div")
      nuevaFila.className = "flex justify-center items-center gap-2 my-2 mx-auto";

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
  }
}

//* Funcion para capturar valores y enviarlos al servidor
async function capturarValores() {

  let primerMatriz = [];
  let segundaMatriz = [];

  const inputMatriz1 = document.querySelectorAll('.inputMatriz1');
  const inputMatriz2 = document.querySelectorAll('.inputMatriz2');

  inputMatriz1.forEach((input) => {
    primerMatriz.push(parseInt(input.value));
  });


  inputMatriz2.forEach((input) => {
    segundaMatriz.push(parseInt(input.value));
  });


  //*enviar al servidor
  const res = await fetch('/arrayCalculation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ array1: primerMatriz, array2: segundaMatriz })
  });

  const data = await res.json();

  let numFila = parseInt(numFilaInput1.value);
  let numCol = parseInt(numColInput1.value);

  //*dibujar el resultado
  divResult.innerHTML = "";
  for (let i = 0; i < numFila; i++) {
    let nuevaFila = document.createElement("div")
    nuevaFila.className = "flex justify-center items-center gap-2 my-2 mx-auto";

    for (let j = 0; j < numCol; j++) {
      let input = document.createElement("input");
      input.type = "number";
      input.readOnly = true;
      input.className = "border-2 rounded-md border-slate-400 w-20 resultInput";
      nuevaFila.appendChild(input);
    }
    divResult.appendChild(nuevaFila);
  }

  const resultInput = document.querySelectorAll('.resultInput');
  resultInput.forEach((input, index) => {
    input.value = data[index];
  });
}

// ! EVENTOS
agregarBtn.addEventListener("click", () => {
  crearMatrices();
});

calcularBtn.addEventListener("click", () => {
  capturarValores();
});
