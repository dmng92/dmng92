const fs = require('fs');
const path = require('path');

const carpeta = './imagenes';
const extensionesValidas = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP', '.jfif'];

if (!fs.existsSync(carpeta)) {
  console.error('❌ La carpeta "imagenes" no existe');
  process.exit(1);
}

const archivos = fs.readdirSync(carpeta)
  .filter(archivo => extensionesValidas.includes(path.extname(archivo)))
  .sort((a, b) => fs.statSync(path.join(carpeta, a)).mtimeMs - fs.statSync(path.join(carpeta, b)).mtimeMs);

const contenido = `const imagenes = ${JSON.stringify(archivos, null, 2)};`;

fs.writeFileSync('imagenes.js', contenido);
console.log('✅ imagenes.js generado con', archivos.length, 'archivo(s).');
