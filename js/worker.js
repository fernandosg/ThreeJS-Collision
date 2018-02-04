console.log("worker thread");
self.importScripts('three.min.js');

var loader = new THREE.ObjectLoader();
var avanzar=false;
onmessage=(evt)=>{
  var ray;
    var colision=false;
    var array_for_raycaster;
    var element_moved=loader.parse(evt.data.element);
    var element_position=new THREE.Vector3();
    element_position.x=evt.data.element_moved_position.x;
    element_position.y=evt.data.element_moved_position.y;
    element_position.z=evt.data.element_moved_position.z;
    var element_matrix=new THREE.Matrix4();
    element_matrix.elements=evt.data.element_moved_matrix;
    array_for_raycaster=[];
    for(var counter_raycaster=0,element_pivot=null,length=evt.data.colliding_arr.length;counter_raycaster<length;counter_raycaster++){
      element_pivot=loader.parse(evt.data.colliding_arr[counter_raycaster]);
      element_pivot.matrixWorld.elements=evt.data.colliding_matrix_array[counter_raycaster];
      array_for_raycaster.push(element_pivot);
    }
    var originPoint=element_position.clone();
    for (var vertexIndex = 0,vertices_length=element_moved.geometry.vertices.length; vertexIndex < vertices_length; vertexIndex++)
    {
        var localVertex = element_moved.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(element_matrix);//elementMoved.matrix );
        var directionVector = globalVertex.sub(element_position);//elementMoved.position );
        ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects(array_for_raycaster);
        if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() && collisionResults[0].distance<100){
            colision=true;
            postMessage("1");
        }

    }
    if(!colision)
      postMessage("0");
}
