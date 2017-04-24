var borrar=0; //bandera que usare para indicar por medio del json si debo borrar
                //el contenido del canvas

//Se usar para convertir el canvas en una imagen y luego proceder a descargarla
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});
var canvas = document.getElementById("myCanvas");
//Optengo el id del input que me servira para dar la orden de borrado
var bor=document.getElementById("bor");
var context = canvas.getContext("2d");
//manejo el evento para pintar de manera continua sobre el tablero
canvas.addEventListener("mousemove", defineImage, false);
//Manejo el evento para el borrado de la imagen
bor.addEventListener("click", defineImage, false);
function getCurrentPos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
            
function defineImage(evt) {
    var currentPos = getCurrentPos(evt);
    
    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color[i];
            
            break;
        }
    }
            
    for (i = 0; i < document.inputForm.shape.length; i++) {
        if (document.inputForm.shape[i].checked) {
            var shape = document.inputForm.shape[i];
            break;
        }
    }
    
    
    var json = JSON.stringify({
        "erar":borrar, 
        "shape": shape.value,
        "color": color.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }
    });
    drawImageText(json);
        sendText(json);
}

function drawImageText(image) {
    console.log("drawImageText");
    var json = JSON.parse(image);
    //verifica si se desea borrar por medio de la bandera definida en el principio
    //Enviada a traves del JSON
    if(json.erar===1){
         context.clearRect(0, 0, canvas.width, canvas.height);
         borrar=0;
    }else{
    context.fillStyle = json.color;
    switch (json.shape) {
    case "circle":
        context.beginPath();
        context.arc(json.coords.x, json.coords.y, 5, 0, 2 * Math.PI, false);
        context.fill();
        break;
    case "square":
    default:
        context.fillRect(json.coords.x, json.coords.y, 10, 10);
        break;
    }
    }
}
//esta pequeña funcion se usa para cambiar el valor de la bandera
//Si es 1 borra, si es 0 no lo hace
function era(){
    borrar=1;
}

