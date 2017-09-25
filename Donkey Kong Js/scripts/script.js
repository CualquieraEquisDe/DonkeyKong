// JavaScript Document
$(document).ready(Inicio);
$(document).keydown(manejarEvento);


function Inicio(){

	lienzo = $("#lienzo")[0];
	contexto = lienzo.getContext("2d");
	buffer = document.createElement("canvas");
	barril =new Barril();
	simio = new Simio();
	

	animar();	

}


function animar(){

	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");

	contextoBuffer.clearRect(0,0,buffer.width, buffer.height);
	barril.dibujar(contextoBuffer);
	barril.actualizar();
	simio.dibujar(contextoBuffer);
	simio.actualizar();

	

	contexto.clearRect(0,0,lienzo.width, lienzo.height);
	contexto.drawImage(buffer,0,0);

	setTimeout("animar()", 20);

}


function Simio(){


	this.x = 0;
	this.y = 365;
	this.vel = 1;
	this.img = $("#simio")[0];
	
	this.dibujar = function(ctx){
		ctx.drawImage(this.img, this.x , this.y);
	}

	this.actualizar = function(){
		this.x += this.vel;

		if (this.x  >= lienzo.width){
			this.vel *= -1;
		}
  
	}

	this.cambiar_velocidad = function(accion){
		if(accion == "aumentar"){
		
			this.vel += 3;	

		}else{

			this.vel -= 3;

		}

	}

}

function Barril(){


	this.x = 310;
	this.y = -10;
	this.vel = 3;
	this.img = $("#barril")[0];
	
	this.dibujar = function(ctx){
		ctx.drawImage(this.img, this.x , this.y);
	}

	this.actualizar = function(){
		this.y += this.vel;

		if (this.y +300>= lienzo.height ){
			this.vel *= -1;
		}
  
	}

}


function manejarEvento(event){
	
	if(event.which == 38){

		simio.cambiar_velocidad("aumentar");
	}

	if(event.which == 40){

		simio.cambiar_velocidad("disminuir");
	}		

}

