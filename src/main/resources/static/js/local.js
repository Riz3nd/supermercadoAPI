/* async function sendData(path){
    var myForm = document.getElementById("myForm")
    var formData = new FormData(myForm);
    var jsonData = {};
    //conversion de datos a json
    for(var[k,v] of formData){
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'content-type' : 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    console.log(await request.text())
}

async function getDataProduct(path){
    var id = document.getElementById("id").value;
    console.log(id)
    var myForm = document.getElementById("myForm")
    var formData = new FormData(myForm);
    var jsonData = {};
    //conversion de datos a json
    for(var[k,v] of formData){
        jsonData[k] = v;
    }
    path += "/"+id
    console.log(path)
    const request = await fetch(path, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'content-type' : 'application/json'
        },
    });

    console.log(await request.text())
}

async function deleteProduct(path){
    var id = document.getElementById("id").value;
    console.log(id)
    var myForm = document.getElementById("myForm")
    var formData = new FormData(myForm);
    var jsonData = {};
    //conversion de datos a json
    for(var[k,v] of formData){
        jsonData[k] = v;
    }
    path += "/"+id
    console.log(path)
    const request = await fetch(path, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'content-type' : 'application/json'
        },
    });

    console.log(await request.text())
}

async function modifiDataProduct(path){
    var id = document.getElementById("id").value;
    console.log(id)
    var myForm = document.getElementById("myForm")
    var formData = new FormData(myForm);
    var jsonData = {};
    //conversion de datos a json
    for(var[k,v] of formData){
        jsonData[k] = v;
    }
    path += "/"+id
    console.log(path)
    const request = await fetch(path, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'content-type' : 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    console.log(await request.text())
}

async function listProducts(path){
    const request = await fetch(path, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'content-type' : 'application/json'
        },
    });
    console.log(await request.text())
} */

function listar(){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/products")
    .then(response => response.json())
    .then(function(data){

        //if(data.lenght>0){
            var productos = '';
            for(const producto of data){            
                productos += '<tr>'+
                '<th scope="row">'+producto.id+'</th>'+
                '<td>'+producto.productName+'</td>'+
                '<td>'+producto.description+'</td>'+
                '<td>'+producto.category+'</td>'+
                '<td>'+producto.price+'</td>'+
                '<td>'+
                  '<button type="button" class="btn btn-outline-danger" onclick="eliminarProducto(\''+producto.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
                  '<a href="#" onclick="verModificarProducto(\''+producto.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
                  '<a href="#" onclick="verProducto(\''+producto.id+'\')" class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
                '</td>'+
              '</tr>';
            }
            document.getElementById("listar").innerHTML = productos;
        //}
    })
}



function eliminarProducto(id){
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/product/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar();
        alertas("Se ha eliminado el producto exitosamente!.", 2)
    })
}

function verModificarProducto(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/product/"+id,settings)
    .then(response => response.json())
    .then(function(producto){
            var cadena='';
            if(producto){
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Usuario</h1>'+
                '</div>'+

              '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+producto.id+'">'+
                '<label for="productName" class="form-label">Product Name</label>'+
                '<input type="text" class="form-control" name="productName" id="productName" required value="'+producto.productName+'"> <br>'+
                '<label for="description"  class="form-label">Description</label>'+
                '<input type="text" class="form-control" name="description" id="description" required value="'+producto.description+'"> <br>'+
                '<label for="category" class="form-label">Category</label>'+
                '<input type="text" class="form-control" name="category" id="category" required value="'+producto.category+'"> <br>'+
                '<label for="number" class="form-label">Price</label>'+
                '<input type="number" class="form-control" name="price" id="price" required value="'+producto.price+'"> <br>'+
                '<button type="button" class="btn btn-outline-warning" onclick="modificarProducto(\''+producto.id+'\')">Modificar</button>'+
            '</form>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
            myModal.toggle();
    })
}

async function modificarProducto(id){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/product/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha modificado el producto exitosamente!.", 1)
    document.getElementById("contentModal").innerHTML = '';
    //var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
    var myModalInstance = document.getElementById('modalProducto')
    var modal = bootstrap.Modal.getInstance(myModalInstance)
    modal.hide();
    //console.log(request.text())
}

function registerForm(){
    cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i>Registrar Producto</h1>'+
                '</div>'+

              '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id">'+
                '<label for="productName" class="form-label">Product Name</label>'+
                '<input type="text" class="form-control" name="productName" id="productName" > <br>'+
                '<label for="description"  class="form-label">Description</label>'+
                '<input type="text" class="form-control" name="description" id="description" > <br>'+
                '<label for="category"  class="form-label">Category</label>'+
                '<input type="text" class="form-control" name="category" id="category" > <br>'+
                '<label for="price"  class="form-label">Price</label>'+
                '<input type="number" class="form-control" name="price" id="price" > <br>'+
                '<button type="button" class="btn btn-outline-info" onclick="añadirProducto()">Añadir</button>'+
            '</form>';
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
            myModal.toggle();
}

async function añadirProducto(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/product", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha registrado el producto exitosamente!.", 1)
    document.getElementById("contentModal").innerHTML = '';
    //var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
    var myModalInstance = document.getElementById('modalProducto')
    var modal = bootstrap.Modal.getInstance(myModalInstance)
    modal.hide();
    //console.log(request.text())
}

function verProducto(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/product/"+id,settings)
    .then(response => response.json())
    .then(function(producto){
            var cadena='';
            if(producto){
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i>Visualizar Producto</h1>'+
                '</div>'+
                '<ul class="list-group">'+
                '<li class="list-group-item">Nombre: '+producto.productName+'</li>'+
                '<li class="list-group-item">Descripcion: '+producto.description+'</li>'+
                '<li class="list-group-item">Categoria: '+producto.category+'</li>'+
                '<li class="list-group-item">Precio: '+producto.price+'</li>'+
            '</ul>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
            myModal.toggle();
    })
}

function alertas(mensaje, tipo){
    var color = "alert alert-"
    if(tipo == 1){ //success
        color = "success"
    }else if(tipo == 2){ //Danger
        color = "danger"
    }
    var alerta = '<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
    '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>'+
    ''+mensaje+''
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    document.getElementById("datos").innerHTML = alerta;
}

function modalConfirmacion(texto, funcion){
    document.getElementById("contentConfirmacion").innerHTML = cadena;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar")
    confirmar.onclick  = funcion
}
