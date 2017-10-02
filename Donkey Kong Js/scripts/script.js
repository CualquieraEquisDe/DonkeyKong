// JavaScript Document
$(document).ready(Inicio);
$(document).keydown(manejarEvento);


function Inicio(){

	lienzo = $("#lienzo")[0];
	contexto = lienzo.getContext("2d");
	buffer = document.createElement("canvas");


	barril = (new Barril(Math.floor((Math.random() * 1100) + 0) , -10));


	simio = new Simio();
	
	animar();

}

var i = 0;
var retraso = 0;

function animar(){

	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");

	contextoBuffer.clearRect(0,0,buffer.width, buffer.height);
	
	
	dibujarBarril(contextoBuffer);
	simio.dibujar(contextoBuffer);
	
	simio.actualizar();
	
	contexto.clearRect(0,0,lienzo.width, lienzo.height);
	contexto.drawImage(buffer,0,0);
	cargarImagen(retraso);
	retraso++;
	setTimeout("animar()", 20);

}


	var misImagenesIzq= new Array(7);
	var misImagenesDer= new Array(7);
	var misImagenes = misImagenesDer;

  	misImagenesDer [0]= "imagenes/Derecha/frame-1.gif";
  	misImagenesDer [1]= "imagenes/Derecha/frame-2.gif";
  	misImagenesDer [2]= "imagenes/Derecha/frame-3.gif";
  	misImagenesDer [3]= "imagenes/Derecha/frame-4.gif";
  	misImagenesDer [4]= "imagenes/Derecha/frame-5.gif";
  	misImagenesDer [5]= "imagenes/Derecha/frame-6.gif";
  	misImagenesDer [6]= "imagenes/Derecha/frame-7.gif";
  	misImagenesIzq [0]= "imagenes/Izquierda/frame-1.gif";
  	misImagenesIzq [1]= "imagenes/Izquierda/frame-2.gif";
  	misImagenesIzq [2]= "imagenes/Izquierda/frame-3.gif";
  	misImagenesIzq [3]= "imagenes/Izquierda/frame-4.gif";
  	misImagenesIzq [4]= "imagenes/Izquierda/frame-5.gif";
  	misImagenesIzq [5]= "imagenes/Izquierda/frame-6.gif";
  	misImagenesIzq [6]= "imagenes/Izquierda/frame-7.gif";

function cargarImagen(retraso){
	
	
	document.getElementById("simio").src = misImagenes[i];
	if(retraso%15 == 0)
		i++;

	if(i == 6)
		i = 0;	


}

function Simio(){


	this.x = 271;
	this.y = 335;
	this.width=260;
	this.height=271;
	this.vel = 10;
	this.estado = 1;

	
  	

	this.img = $("#simio")[0];

	
	this.dibujar = function(ctx){
		
		ctx.drawImage(this.img, this.x , this.y);
	}

	this.actualizar = function(){
		this.x += this.vel;

		collider();

		if (this.x  <= lienzo.width){
			this.vel *= 2/5;
		}
  
	}

	this.cambiar_velocidad = function(accion){
		if(accion == "aumentar"){
		
			this.vel += 10;	

		}else{

			this.vel -= 10;

		}

	}

}

function Barril(x , y){


	var a = 0;
	this.x = x;
	this.y = y;
	this.width=128;
	this.height=122;
	this.vel = 4;
	this.img = $("#barril")[0];
	contextoBuffer = buffer.getContext("2d");
	this.fondo = $("#jungla")[0];
	
	this.dibujar = function(ctx){
		ctx.drawImage(this.fondo, 0, 0);
		ctx.drawImage(this.img, this.x , this.y);
	}

	this.actualizar = function(){
		
		this.y += this.vel;
		
		 
		 if(simio.estado != 0){
			if(this.y > lienzo.height){
				a++;
				this.x = (Math.floor((Math.random() * 1100) + 0));
				this.y = 0;
				if(a == 3){
					this.vel += 5;
					if(this.vel >= 25){
						alert("Ganó");
						this.vel = 5;
					}
					a = 0;
				}
			}
		 }	
	}
}


function manejarEvento(event){
	
	if(event.which == 68 || event.which == 39){
		misImagenes = misImagenesDer;
		simio.cambiar_velocidad("aumentar");
	}

	if(event.which == 65 || event.which == 37){
		misImagenes = misImagenesIzq;
		simio.cambiar_velocidad("disminuir");

	}	


}

function dibujarBarril(ctx){


	barril.dibujar(ctx);
	barril.actualizar();


}

function collider() {
	


	if (simio.x < barril.x + barril.width && 
			simio.x + simio.width > barril.x && 
			simio.y < barril.y + barril.height &&
			simio.height + simio.y > barril.y){

			alert("Colision");
			simio.estado = 0;

		}

}
