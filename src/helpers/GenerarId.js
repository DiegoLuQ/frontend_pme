const generarId = (img_dpmc) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZaeiou0123456789';
    let cadenaGenerada = img_dpmc;
  
    for (let i = 0; i < 7; i++) {
      const indiceCaracter = Math.floor(Math.random() * caracteres.length);
      cadenaGenerada += caracteres.charAt(indiceCaracter);
    }
  
    return cadenaGenerada;
}

export default generarId;