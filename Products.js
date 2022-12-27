// iniciando modulo fs de node
const fs = require('fs');

//inicio de la clase
class Products {

    constructor(path){
        this.path = path;
    }

    // metodo para obtener todos los productos
    async getAll(){
        try {
            
            const objs = await fs.promises.readFile(`${this.path}`, 'utf-8', err => {
                if(err){
                    console.log(err);
                }
            });
            return JSON.parse(objs);


        } catch (err) {
            console.log(`ERROR: ${err}`);
            return [];
        }
    }

    // guardando los productos
    async save(objeto){

        const objects = await this.getAll();
        let newId;

        // con esto se define el id que el elemento va a tener
        if (objects.length == 0) {
            newId = 1
        } else {
            newId = objects[objects.length-1].id+1;
        }

        // creamos el objeto definitivo y lo pusheamos al array contenedor
        const newObject = {...objeto, id: newId};
        objects.push(newObject);

        try{
            await fs.promises.writeFile(`${this.path}`, JSON.stringify(objects, null, 2));
            console.log('Producto añadido exitosamente!');
            // return newId;

        } catch(err) {
            throw new Error(`Errar al guardar: ${err}`)
        }
    }

}

// exportando la clase para usarlo en server.js
module.exports = Products;