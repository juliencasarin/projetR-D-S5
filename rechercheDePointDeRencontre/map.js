
function Map(){ 

	
	this.db = TAFFY();
	
	
	
	this.loadMap = function( data ){
		
		for(var i=0 ; i<data.map.points.length ; i++){
			
			this.db.insert( { type:"point" , data: data.map.points[i] } )
			
		}
		
		for(var i=0 ; i<data.map.edges.length ; i++){
			
			this.db.insert( { type:"edge" , data: data.map.edges[i] } )
			
		}
			
	};
	
	
	
	
	this.worseDistance = function( UserArray , point ){
		
		var res = -1 ;
		for( var i=0 ; i < UserArray.length ; i++ ){
			
			var d = GEO.computeDistance(point.lat , point.lng , UserArray[i].lat , UserArray[i].lng);
			
			if( res == -1 )res = d;
			else res = Math.max(res , d)
			
		}
		return res;
		
	}
	
	
	
	this.naiveBestAdresse = function( UserArray ){

		var find = false ;
		var bestValue = -1 ;
		var res ;
		var wd = this.worseDistance ;
		this.db( { "type":"point" } ).each( function(node){

			var value = wd( UserArray , node.data ) ;

			if( value < bestValue || find == false ){

				find = true;
				best = value;
				res = node.data;

			}

		} );

	}
	
	
	
};
