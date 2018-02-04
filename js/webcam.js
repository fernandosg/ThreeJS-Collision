var THREEx = THREEx || {}

THREEx.WebcamTexture	= function(WIDTH_CANVAS,HEIGHT_CANVAS){
	console.assert(THREEx.WebcamTexture.available === true)
	// create the video element
	var video	= document.createElement('video');
	video.width	= WIDTH_CANVAS;
	video.height	= HEIGHT_CANVAS;
	video.autoplay	= true;
	video.loop	= true;
	// expose video as this.video
	this.video	= video;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
	if (navigator.getUserMedia) {       
	    navigator.getUserMedia({video: true}, handleVideo, videoError);
	}
	 
	function handleVideo(stream) {
	    video.src = window.URL.createObjectURL(stream);
	}
	 
	function videoError(e) {
	    // do something
	    alert("No funciona");
	    console.dir(e);
	}




	// create the texture
	var texture	= new THREE.Texture( video );
	// expose texture as this.texture
	this.texture	= texture

	/**
	 * update the object
	 */
	this.update	= function(delta, now){
		if( video.readyState !== video.HAVE_ENOUGH_DATA )	return;
		texture.needsUpdate	= true;		
	}

	/**
	 * destroy the object
	 */
	this.destroy	= function(){
		video.pause()
	}
}


THREEx.WebcamTexture.available	= navigator.webkitGetUserMedia || navigator.mozGetUserMedia ? true : false;