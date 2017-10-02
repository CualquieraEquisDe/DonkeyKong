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
	this.vel = 4;
	this.img = $("#barril")[0];
	contextoBuffer = buffer.getContext("2d");
	
	this.dibujar = function(ctx){
		ctx.drawImage(this.img, this.x , this.y);
	}

	this.actualizar = function(){
		
		this.y += this.vel;
		
		if(this.x < simio.x + simio.width && this.x + this.width > simio.x && this.y < simio.y + simio.height && this.y + this.height > simio.y ){
			
			!alert("choco");
			simio.estado = 0;
			
		}
		
		 console.log(simio.estado);
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

		simio.cambiar_velocidad("aumentar");
	}

	if(event.which == 65 || event.which == 37){

		simio.cambiar_velocidad("disminuir");

	}	


}

function dibujarBarril(ctx){


	barril.dibujar(ctx);
	barril.actualizar();


}
