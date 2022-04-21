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