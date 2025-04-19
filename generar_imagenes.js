// generar_imagenes.js
const fs = require('fs');
const path = require('path');

const carpeta = './imagenes';
const extensionesValidas = ['.jpg', '.jpeg', '.png', '.webp'];

const archivos = fs.readdirSync(carpeta)
  .filter(archivo => extensionesValidas.includes(path.extname(archivo).toLowerCase()))
  .sort((a, b) => fs.statSync(path.join(carpeta, a)).mtimeMs - fs.statSync(path.join(carpeta, b)).mtimeMs); // orden cronológico

const contenido = `const imagenes = ${JSON.stringify(archivos, null, 2)};`;

fs.writeFileSync('imagenes.js', contenido);
console.log('📷 Se generó imagenes.js con', archivos.length, 'archivos.');
