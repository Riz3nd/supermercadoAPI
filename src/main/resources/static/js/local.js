async function sendData(path){
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

function listProducts(path){
    var myForm2 = document.getElementById("myForm2")
    var formData = new FormData(myForm2);
    var jsonData = {};
//    //conversion de datos a json
    for(var[k,v] of formData){
        jsonData[k] = v;
    }
    const request = fetch(path, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'content-type' : 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    console.log(request.text())
}