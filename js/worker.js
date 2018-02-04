console.log("worker thread");
self.importScripts('three.min.js');

var loader = new THREE.ObjectLoader(),ray,array_for_raycaster,element_moved,element_position,colision=false;
var originPoint,counter_raycaster,vertexIndex;
onmessage=(evt)=>{
    var element_moved=loader.parse(evt.data.element[0]);
    var element_position=new THREE.Vector3();
    element_position.x=evt.data.element[2].x;
    element_position.y=evt.data.element[2].y;
    element_position.z=evt.data.element[2].z;
    var element_matrix=new THREE.Matrix4();
    element_matrix.elements=evt.data.element[1];
    array_for_raycaster=[];
    for(counter_raycaster=0,element_pivot=null,length=evt.data.colliding[0].length;counter_raycaster<length;counter_raycaster++){
      element_pivot=loader.parse(evt.data.colliding[0][counter_raycaster]);
      element_pivot.matrixWorld.elements=evt.data.colliding[1][counter_raycaster];
      array_for_raycaster.push(element_pivot);
    }
    originPoint=element_position.clone();
    for (vertexIndex = 0,vertices_length=element_moved.geometry.vertices.length; vertexIndex < vertices_length; vertexIndex++)
    {
        var localVertex = element_moved.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(element_matrix);//elementMoved.matrix );
        var directionVector = globalVertex.sub(element_position);//elementMoved.position );
        ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects(array_for_raycaster);
        if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() && collisionResults[0].distance<100){
            postMessage("1");
        }

    }
    if(!colision)
      postMessage("0");
}
