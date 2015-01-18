GEO = {
	
	computeDistance : function(lat1,lng1,lat2,lng2){
		
		var LAT1 = lat1 * Math.PI * 2 / 360 ;
		var LAT2 = lat2 * Math.PI * 2 / 360 ;
		var LNG1 = lng1 * Math.PI * 2 / 360 ;
		var LNG2 = lng2 * Math.PI * 2 / 360 ;
		
		var d_lng = LNG2 - LNG1 ;
		var S_A_B = Math.acos( Math.sin(LAT1)*Math.sin(LAT2) + Math.cos(LAT1)*Math.cos(LAT2)*Math.cos(d_lng) );
		return 6378000 * S_A_B ;
		
	}
	
}
