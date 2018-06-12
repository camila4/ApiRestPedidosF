const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ***************************************************************
// ***************************************************************

let users = [
    {id: 0, username: 'Admin', password: '12345', name: 'Camila', lastname: 'Rosero', email: 'mcrp0406@gmail.com', image: 'https://cdn3.iconfinder.com/data/icons/trico-circles-solid/24/Circle-Solid-Profile-512.png'},
	{id: 1, username: 'IvanGT', password: '67890', name: 'Ivan', lastname: 'Getial', email: 'ivanandresgt@gmail.com', image: 'https://cdn3.iconfinder.com/data/icons/trico-circles-solid/24/Circle-Solid-Profile-512.png'}
];

let producto = [
    {id: 0, name: 'Repollo Verde', valor: '$ 1.000', cantidad: '1', descripcion: 'Es una planta comestible de la familia de las Brasicáceas, y una herbácea bienal, cultivada como anual, cuyas hojas lisas forman un característico cogollo compacto.', image: 'https://2.bp.blogspot.com/-wINAnETbj1A/V2dN3P3AuXI/AAAAAAAAASo/UPllMFEtPVkI-FQztf4CewaZPO1fcb9sACLcB/s1600/beneficios-e-propriedades-do-repolho.jpg'},
	{id: 1, name: 'Repollo Morado', valor: '$ 2.000', cantidad: '1', descripcion: 'Es una planta comestible de la familia de las Brasicáceas, y una herbácea bienal, cultivada como anual, cuyas hojas lisas forman un característico cogollo compacto.', image: 'https://www.lasemilleria.com/img/med/semillas_de_col_morada.jpg'},
	{id: 2, name: 'Lechuga', valor: '$ 1.000', cantidad: '1', descripcion: 'Es una planta herbácea, anual, con hojas abiertas en los márgenes y punta redonda. Las hojas miden hasta 15cm y la planta puede llegar a medir de 15 a 50cm.', image: 'https://i.pinimg.com/originals/0c/d5/bf/0cd5bfff6adc9806612347662560f9d8.jpg'},
	{id: 3, name: 'Zanahoria', valor: '$ 1.000', cantidad: '1', descripcion: 'Es una planta comestible de la familia de las Brasicáceas, y una herbácea bienal, cultivada como anual, cuyas hojas lisas forman un característico cogollo compacto.', image: 'https://biotrendies.com/wp-content/uploads/2015/07/zanahoria.jpg'},
	{id: 4, name: 'Papa Amarilla', valor: '$ 1.000', cantidad: '1', descripcion: 'La papa criolla amarilla, originaria de Colombia, es un tubérculo de piel delgada y de color amarillo. Tiene un gran valor alimenticio ya que es una fuente rica en proteína, carbohidratos, potasio, vitaminas y minerales..', image: 'http://miplacitavirtual.com/wp-content/uploads/2016/06/PapaCriolla.jpg'},
	{id: 5, name: 'Coliflor', valor: '$ 1.000', cantidad: '1', descripcion: 'Es una planta comestible de la familia de las Brasicáceas, y una herbácea bienal, cultivada como anual, cuyas hojas lisas forman un característico cogollo compacto.', image: 'https://t1.uc.ltmcdn.com/images/7/5/2/img_27257_ins_3699529_600.jpg'},
	{id: 6, name: 'Acelga', valor: '$ 1.000', cantidad: '1', descripcion: 'Es una planta comestible de la familia de las Brasicáceas, y una herbácea bienal, cultivada como anual, cuyas hojas lisas forman un característico cogollo compacto.', image: 'https://biotrendies.com/wp-content/uploads/2015/06/Acelga.jpg'},
	{id: 7, name: 'Brocoli', valor: '$ 1.000', cantidad: '1', descripcion: 'Es una planta comestible de la familia de las Brasicáceas, y una herbácea bienal, cultivada como anual, cuyas hojas lisas forman un característico cogollo compacto.', image: 'http://diariodegastronomia.com/wp-content/uploads/2013/03/brocoli-punto.jpg'}
];

// ***************************************************************
// ***************************************************************

app.get('/', (req, res) => {
    res.status(200).send("WELCOME TO API REST FARMIN APP")
})

app.get('/users', (req, res) => {
    res.send(users)
})

// Validar usuarios al momento de hacer login
app.post('/validateUsers', (req, res) => {
    let data = req.body;
    let usersTmp = [{success: false, id: 0, username: '', password: '', name: '', lastname:'', email: '', image: ''}];

    users.some(function (value, index, _arr) {
        if( (value.username == data.Username) && (value.password == data.Password) ){
            usersTmp[0]['success'] = true;
			usersTmp[0]['id'] = value.id;
            usersTmp[0]['username'] = value.username;
			usersTmp[0]['password'] = value.password;
            usersTmp[0]['name'] = value.name;
			usersTmp[0]['lastname'] = value.lastname;
			usersTmp[0]['email'] = value.email;
            usersTmp[0]['image'] = value.image;
            return true;
        }else{
            return false;
        }
    });

     res.send(usersTmp)
})

// Crear usuarios para una nueva cuenta
app.post('/createUsers', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    let usersTmp = [{
        success: true,
        id: consecutive,
        username: data.Username,
        password: data.Password,
        name: data.Name,
		lastname: data.Lastname,
        email: data.Email,
        image: 'https://cdn3.iconfinder.com/data/icons/trico-circles-solid/24/Circle-Solid-Profile-512.png'
    }];
    users.push(usersTmp[0])

    res.send(usersTmp)
})

// Listar todos los producto
app.get('/producto', (req, res) => {
    let pos = 0;
    producto.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
res.send(producto)
})

// Eliminar un producto
app.delete('/producto/:id',(req, res) => {
    let params = req.params;
    producto.splice(params.id, 1);
    res.send('Producto Eliminado')
})

// Actualizar un productos
app.put('/producto/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    producto[params.id]['name'] = data.Name;
    producto[params.id]['valor'] = data.Valor;
	producto[params.id]['cantidad'] = data.Cantidad;
	producto[params.id]['descripcion'] = data.Descripcion;
    res.send("Producto Actualizado")
})

// Crear Producto
app.post('/producto', (req, res) => {
    let data = req.body;
    let consecutive = producto.length;
    let productoTmp = {
        id: consecutive,
        name: data.Name,
		valor: data.Valor,
		descripcion: data.Descripcion,
        image: 'https://www.icf.cl/wp-content/uploads/2016/09/el-auge-de-los-productos-agricolas-organicos-1200x642.jpg'
    };
   producto.push(productoTmp)

    res.send("producto Creado")
})

// *************************************************************
// *************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})