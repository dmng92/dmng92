const fs = require('fs');
const path = require('path');

const config = [
  { carpeta: './imagenesBaja', nombreConstante: 'imagenesBaja', salida: 'imagenesBaja.js' },
  { carpeta: './imagenesAlta', nombreConstante: 'imagenesAlta', salida: 'imagenesAlta.js' },
];

const extensionesValidas = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP', '.jfif'];

config.forEach(({ carpeta, nombreConstante, salida }) => {
  if (!fs.existsSync(carpeta)) {
    console.error(`❌ La carpeta "${carpeta}" no existe`);
    return;
  }

  const archivos = fs.readdirSync(carpeta)
    .filter(archivo => extensionesValidas.includes(path.extname(archivo)))
    .sort((a, b) =>
      fs.statSync(path.join(carpeta, a)).mtimeMs - fs.statSync(path.join(carpeta, b)).mtimeMs
    );

    const contenido = `const ${nombreConstante} = ${JSON.stringify(
      archivos,
      null,
      2
    )};`;
   

  fs.writeFileSync(salida, contenido);
  console.log(`✅ ${salida} generado con`, archivos.length, 'archivo(s).');
});
