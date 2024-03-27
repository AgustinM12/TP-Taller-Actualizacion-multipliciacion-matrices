export const ctrlSum = (req, res) => {

    const { array1, array2 } = req.body

    if (array1.length !== array2.length || array1[0].length !== array2[0].length) {
        return "El orden de las matrices debe ser igual"
    }

    let result = []


    // * Solución con for anidados
    // for (let filas = 0; filas < array1[0].length; filas++) {
    //     let fila = []
    //     for (let cols = 0; cols < array2.length; cols++) {
    //         fila.push(array1[filas][cols] + array2[filas][cols])
    //     }
    //     result.push(fila)
    // }

    for (let i = 0; i < array1.length; i++) {
        result.push(array1[i] + array2[i]);
    }

    console.log(result);

    return res.status(200).json(result)
}
