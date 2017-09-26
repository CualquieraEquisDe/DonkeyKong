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
	
	crearBarril(contextoBuffer);
	simio.dibujar(contextoBuffer);
	simio.actualizar();

	
	contexto.clearRect(0,0,lienzo.width, lienzo.height);
	contexto.drawImage(buffer,0,0);

	setTimeout("animar()", 20);

}


function Simio(){


	this.x = 450;
	this.y = 365;
	this.vel = 10;
	this.estado = 1;
	this.img = $("#simio")[0];
	
	this.dibujar = function(ctx){
		ctx.drawImage(this.img, this.x , this.y);
	}

	this.actualizar = function(){
		this.x += this.vel;

		if (this.x  <= lienzo.width){
			this.vel *= 2/5;
		}
  
	}

	this.cambiar_velocidad = function(accion){
		if(accion == "aumentar"){
		
			this.vel += 5;	

		}else{

			this.vel -= 5;

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
		
		
		
		if(this.y > simio.y && this.x > simio.x){
			
			!alert("Juego terminado");
			simio.estado = 0;
			
		}
		
		
	}

}


function manejarEvento(event){
	
	if(event.which == 68){

		simio.cambiar_velocidad("aumentar");
	}

	if(event.which == 65){

		simio.cambiar_velocidad("disminuir");
	}		

}

function crearBarril(ctx){
	
	barril.dibujar(contextoBuffer);
	barril.actualizar();
	
}
