export const ctrlSum = (req, res) => {

    const { array1, array2 } = req.body

    let result = []

    // Obtener las dimensiones de las matrices A y B
    let filas1 = array1.length;
    let cols1 = array1[0].length;
    let cols2 = array2[0].length;

    // Inicializar la matriz C con ceros
    for (let i = 0; i < filas1; i++) {
        result[i] = [];
        for (let j = 0; j < cols2; j++) {
            result[i][j] = 0;
        }
    }

    // Realizar la multiplicación de matrices
    for (let i = 0; i < filas1; i++) {
        for (let j = 0; j < cols2; j++) {
            for (let k = 0; k < cols1; k++) {
                result[i][j] += array1[i][k] * array2[k][j];
            }
        }
    }

    // Imprimir la matriz resultante C
    console.log("Matriz resultante");
    console.log(result);

    return res.status(200).json(result)
}
