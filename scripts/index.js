let carrito = [];
const items = document.querySelector('#items');
const carro = document.querySelector('#carrito');
const total = document.querySelector('#total');
const botonVaciar = document.querySelector('#boton-vaciar');
const botonFinalizar = document.querySelector('#boton-finalizar');
const signoPeso = '$';
const carroGuardado = window.localStorage;

function crearProducto() {
    productos.forEach((info) => {
        const estructuraBase = document.createElement('div');
        estructuraBase.classList.add('card', 'col-sm-6', 'backgroundCard');
        
            const estructuraCardBody = document.createElement('div');
            estructuraCardBody.classList.add('card-body');

                const categoria = document.createElement('h5');
                categoria.classList.add('card-title', 'txt__center', 'font__productCategoria' );
                categoria.textContent = info.categoria;

                    const fotoProducto = document.createElement('img');
                    fotoProducto.classList.add('img-fluid');
                    fotoProducto.setAttribute('src', info.img);
            
                        const nombre = document.createElement('h5');
                        nombre.classList.add('card-title', 'font__productEspacio');
                        nombre.textContent = info.nombre;
            
                            const descripcion = document.createElement('h7');
                            descripcion.classList.add('card-title', 'font__productEspacio');
                            descripcion.textContent = info.descripcion;

                                const precioProducto = document.createElement('p');
                                precioProducto.classList.add('card-text', 'font__productPrecio');
                                precioProducto.textContent = `${signoPeso}${info.precio}`;
                        
                                    const botonPrincipal = document.createElement('button');
                                    botonPrincipal.classList.add('btnCarro');
                                    botonPrincipal.textContent = 'Agregar al carrito';
                                    botonPrincipal.setAttribute('marcador', info.id);
                                    botonPrincipal.addEventListener('click', sumarProductoAlCarrito);
                                   
    
        estructuraCardBody.appendChild(categoria); 
        estructuraCardBody.appendChild(fotoProducto);
        estructuraCardBody.appendChild(nombre);
        estructuraCardBody.appendChild(descripcion);
        estructuraCardBody.appendChild(precioProducto);
        estructuraCardBody.appendChild(botonPrincipal);
        estructuraBase.appendChild(estructuraCardBody);
        items.appendChild(estructuraBase);
    });
}


function sumarProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    crearCarrito();
    audioAgregar();
    guardarCarroEnLS();
}


function crearCarrito() {
    carro.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const itemSeleccionado = productos.filter((itemProductos) => {
            return itemProductos.id === parseInt(item);
        });
        
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
        
                const itemCarro = document.createElement('li');
                itemCarro.classList.add('list-group-item', 'text-right', 'mx-2');
                itemCarro.textContent = " " + '■' + "   " + `${numeroUnidadesItem} x ${itemSeleccionado[0].nombre} - ${signoPeso} ${itemSeleccionado[0].precio}`;
        
                    const botonBorrar = document.createElement('button');
                    botonBorrar.classList.add('btn', 'btn-danger', 'mx-5');
                    botonBorrar.textContent = 'X';
                    botonBorrar.style.marginLeft = '1rem';
                    botonBorrar.dataset.item = item;
                    botonBorrar.addEventListener('click', borrarItemCarrito);
                          
        
        itemCarro.appendChild(botonBorrar);
        carro.appendChild(itemCarro);
        
    });
    
    total.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    crearCarrito();
    audioEliminarPP();
    guardarCarroEnLS();
}


function calcularTotal() {
    return carrito.reduce((total, item) => {
        const itemSeleccionado = productos.filter((itemProductos) => {
            return itemProductos.id === parseInt(item);
        });
        return total + itemSeleccionado[0].precio;
    }, 0);
}

function vaciarCarrito() {
    carrito = [];
    crearCarrito();
    audioVaciarCarrito();
    localStorage.clear();
}

function guardarCarroEnLS() {
    carroGuardado.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarroDeLS () {
    if (carroGuardado.getItem('carrito') !== null) {
        carrito = JSON.parse(carroGuardado.getItem('carrito'));
    }
}



function mensajeWhatsapp (){
    window.open('https://api.whatsapp.com/send?phone=5493515181422&text=Hola ' + `${nombre.value}` +'.'+ " " +'¡Tu pedido fue recibido con exito!, gracias por confiar en nosotros.' + " " + 'Repasemos tu pedido: ' + " " + 'Datos de contacto: ' + "Email: " + `${email.value}` + " " + "//" + " " + "Telefono: " + " " + `${telefono.value}` + " " + "//" + " " + " Productos: " + " " +  `${carro.textContent}` + " // " + 'Total: $ ' + '' + `${total.textContent}`  ,'_blank').focus();
}


function finalizarCompra (){
    Swal.fire({
        title: '¿Desea finalizar la compra?',
        text: 'En caso de ser afirmativo, sera redirigido a whatsapp',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#e29e00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Deseo Finalizar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Gracias por su compra!',
            'Ustede esta siendo redirigido.',
            'success',
            setTimeout (mensajeWhatsapp, 2500),
          )
        }
      })


}


botonVaciar.addEventListener('click', vaciarCarrito);
botonFinalizar.addEventListener('click', finalizarCompra);

cargarCarroDeLS();
crearProducto();
crearCarrito();






