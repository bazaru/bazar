
//Objetos importantes de canvas
var canvas = document.getElementById('principal');
var ctx = canvas.getContext('2d');

//Definir variables para las imagener
var fondo;

//Crear la nave
var nave = {
	x: 100,
	y: canvas.height-100,
	width: 50,
	height: 50
};

//Creamos el juego
var partida	= {
	estado: 'iniciando'
};

//Arreglo que almaena los enemigos
var enemigos = [];

//Movimiento con teclado
var teclado = {};

//Arreglo para los disparos
var disparos = [];

//Definicion de funciones
function cargarMedia(){
	fondo = new Image();
	fondo.src = 'recursos/espacio.jpg'
	fondo.onload = function(){
		var intervalo = window.setInterval(frameLoop, 1000/55);
	}
}

function dibujarFondo(){
	ctx.drawImage(fondo,0,0);
}

function dibujarNave(){
	ctx.save();
	ctx.fillStyle = 'white';
	ctx.fillRect(nave.x, nave.y, nave.width, nave.height);
}

function moverNave(){
	if(!teclado[32]){
		teclado.disparar = false;
	}
	if(teclado[37] & nave.x > 0){
		nave.x -= 10;
	}else if(teclado[39] & nave.x < 800 - nave.width){
		nave.x += 10;
	}else if(teclado[32] & !teclado.disparar){
		disparar();
		teclado.disparar = true;
	}
}

function actualizaEnemigos(){
	if(partida.estado == 'iniciando'){
		for(var i = 0; i < 10; i++){
			enemigos.push({
				x : 10 + (i*50),			
				y : 10,	
				height : 40,
				width : 40,
				estado : 'vivo',
				contador : 0
			});
		}
		partida.estado = 'iniciada';
	}
	for(var i in enemigos){
			var enemigo = enemigos[i];
			if(!enemigo) continue;
			if(enemigo && enemigo.estado == 'vivo'){
				enemigo.contador++;
				enemigo.x += Math.sin(enemigo.contador * Math.PI /90)*5;
			}
	}
}

function moverDisparos(){
	for(var i = 0 in disparos){
		var disparo = disparos[i];
		disparo.y -=2
	}
	disparos = disparos.filter(function(disparo){
		return disparo.y > 0;
	});
}

function disparar(){
	disparos.push({
		x: nave.x+20, 
		y: nave.y-10,
		width: 10,
		height: 30
	});
}

function dibujarDisparos(){
	ctx.save();
	ctx.fillStile = 'white';
	for(var i in disparos){
		var disparo = disparos[i];
		ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height);
	}
	ctx.restore();
}

function golpe(a, b){
	if(b.x + b.width >= a.x && b.x <= a.x + a.width){
		if(b.y + b.height >= a.y && b.y <= a.y + a.height){
			return true;
		}
	}
	if(b.x <= a.x && b.x + b.width >= a.x + a.width){
		if(b.y <= a.y && b.y + b.height >= a.y + a.height){
			return true;
		}
	}
	if(a.x <= b.x && a.x + a.width >= a.x + a.width){
		if(a.y <= b.y && a.y + a.height >= b.y + b.height){
			return true;
		}
	}
}

function verificarColisiones(){
	for(var i in disparos){
		var disparo = disparos[i];
			for(var x in enemigos){
				var enemigo = enemigos[x];
				if(golpe(disparo, enemigo)){
					enemigo.estado = 'hit';
					enemigo.contador = 0;
					console.log('contacto');
				}
			}
		}

	enemigos = enemigos.filter(function(enemigo){
		return enemigo.estado != 'hit';
	});
}

function frameLoop(){
	moverNave();
	actualizaEnemigos();
	moverDisparos();
	verificarColisiones();
	dibujarFondo();
	dibujarDisparos();
	dibujarNave();
	dibujarEnemigos();
}

function agregarEventosTeclado(){
	agregarEvento(document, 'keydown', function(e){
		//Ponemos en true la tecla presionada
		teclado[e.keyCode] = true;
	});
	agregarEvento(document, 'keyup', function(e){
		//Ponemos en false la tecla presionada
		teclado[e.keyCode] = false;
	});
	function agregarEvento(elemento, nombreEvento, funcion){
		if(elemento.addEventListener){
			//navegadores de verdad
			elemento.addEventListener(nombreEvento, funcion, false);
		}else if(elemento.attachEvent){
			//Internet Explorer 
			elemento.attachEvent(nombreEvento, funcion);
		}
	}
}

function dibujarEnemigos(){
	for (var i in enemigos){
		var enemigo = enemigos[i];
		ctx.save();
		if(enemigo.estado == 'vivo') ctx.fillStyle = 'red';
		else if(enemigo.estado == 'muerto') ctx.fillStyle = 'muerto';
		ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height)
		ctx.restore();	
	}
}

//Ejecucion de funciones
cargarMedia();
agregarEventosTeclado();
