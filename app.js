const express = require('express');
const app = express();
const port = 3000;

// Función para obtener el valor del dólar oficial
async function getDolarOficial() {
  const url = 'https://dolarapi.com/v1/dolares/oficial';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el valor del dólar oficial', error);
    throw error;
  }
}

// Función para obtener el valor del dólar blue
async function getDolarBlue() {
  const url = 'https://dolarapi.com/v1/dolares/blue';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener el valor del dólar blue', error);
    throw error;
  }
}

// Ruta principal que muestra una tabla con los valores del dólar oficial y blue
app.get('/', async (req, res) => {
  try {
    const oficialData = await getDolarOficial();
    const blueData = await getDolarBlue();

    res.send(`
      <html>
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 50%;
            margin: 20px auto;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          tr:hover {
            background-color: #ddd;
          }
        </style>
      </head>
      <body>
        <h2>Valores del Dólar</h2>
        <table>
          <tr>
            <th>Casa</th>
            <th>Nombre</th>
            <th>Compra</th>
            <th>Venta</th>
            <th>Fecha de Actualización</th>
          </tr>
          <tr>
            <td>${oficialData.casa}</td>
            <td>${oficialData.nombre}</td>
            <td>${oficialData.compra}</td>
            <td>${oficialData.venta}</td>
            <td>${oficialData.fechaActualizacion}</td>
          </tr>
          <tr>
            <td>${blueData.casa}</td>
            <td>${blueData.nombre}</td>
            <td>${blueData.compra}</td>
            <td>${blueData.venta}</td>
            <td>${blueData.fechaActualizacion}</td>
          </tr>
        </table>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error al obtener los valores del dólar', error);
    res.status(500).send('Error al obtener los valores del dólar');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
