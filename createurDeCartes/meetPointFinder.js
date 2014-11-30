

function MeetPointFinder () {
	
	

	this.principal_worker = new SharedWorker("worker.js");
	
	
	
	this.onPrincipalWorkerMsg = function( msg )
	{
		var MSG = JSON.parse( msg );
		
		switch ( MSG.type )
		{
			case 'info' : {
				
				$('body').html( $('body').html()+ "<br />" + MSG.data );
					
			};break;
			
			default : {};
		}
		
	};
	
	
	
	
	this.initPrincipal_worker = function(){
		
		var mpf = this ;
		
		this.principal_worker.port.onmessage = function(e){
	  	
		    mpf.onPrincipalWorkerMsg(e.data);
		    
		};
		
		var msg = { 
			
			type:"info",
			data:"init"
			
		};
		
		this.principal_worker.port.postMessage(JSON.stringify(msg));
	
	};
	
	
	
	this.loadMap = function( url ){
		
		var w = this.principal_worker;
		
		$.getJSON( url, function( data ) {
			
			var msg = { 
			
				type:"cmd",
				name:"loadMap",
				data:data
				
			};
		
			w.port.postMessage( JSON.stringify(msg) );
		
		}).fail( function(){
			
			var msg = { 
			
				type:"error",
				data:"404 : map not found"
				
			};
			
			w.port.postMessage( JSON.stringify(msg) );
			 
		});
	
		
	};


	
	this.research_workers = [] ;
	
	
	
	this.new_research = function(){
		
		var no = this.research_workers.length;
		
		this.research_workers.push( new SharedWorker("worker.js") );
		
		this.research_workers[no].port.onmessage = function(e){
		  	
		    $('body').html( $('body').html()+ "<br />" + e.data );
		    
		};
		
		var msg = { 
			
			type:"info",
			data:"init"
			
		};
		
		this.research_workers[no].port.postMessage(JSON.stringify(msg));
		
	};
	
	

}