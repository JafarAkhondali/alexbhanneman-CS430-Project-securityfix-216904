/**
 * Created by abhanneman10 on 11/20/15.
 */

var asteroidList = [], asteroidList2 = [], asteroidList3 = [];
var moveAsteroidList= [];
var asteroidWidth = 1.5;
var asteroidObj = ['obj/asteroid3.json', 'obj/asteroid4.json','obj/asteroid5.json','obj/asteroid6.json'];

//asteroid object functions
function generateAsteroid(dist, freq, numTimes){

    if(mesh.position.x > 2000){
        if(camera.position.x / freq > increment){
            increment++;
            var loader = new THREE.JSONLoader();
            loader.load( asteroidObj[Math.floor(Math.random()*4)], function ( geometry, material ) {
                material[0] = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( 'texture/yellowLava.jpg' ) } );
                material[0] = new THREE.MeshLambertMaterial( {color: 0x4d0000} );
                var faceMaterial = new THREE.MeshFaceMaterial( material );
                var ast = new THREE.Mesh( geometry, faceMaterial );
                ast.scale.multiplyScalar(1.2);
                ast.matrixAutoUpdate = true;
                ast.updateMatrix();
                placeAsteroid(ast, dist, numTimes);
            } );
        }
    }
    else if(mesh.position.x < 2000){
        if(camera.position.x / freq > increment){
            increment++;
            var loader = new THREE.JSONLoader();
            loader.load(asteroidObj[Math.floor(Math.random()*4)], function ( geometry, material ) {
                material[0] = new THREE.MeshLambertMaterial( {color: 0x663300} );
                var faceMaterial = new THREE.MeshFaceMaterial( material );
                var ast = new THREE.Mesh( geometry, faceMaterial );
                ast.scale.multiplyScalar(1.2);
                ast.matrixAutoUpdate = true;
                ast.updateMatrix();
                placeAsteroid(ast, dist, numTimes);
            } );
        }
    }

    //planets

    //var segments = 16;
    //if(mesh.position.x > 2000){
    //    if(camera.position.x / freq > increment){
    //        increment++;
    //        var boxgeometry =  new THREE.SphereGeometry( asteroidWidth, segments, segments );
    //        var mat = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( 'texture/yellowLava.jpg' ) } );
    //        var box = new THREE.Mesh( boxgeometry, mat);
    //        placeAsteroid(box, dist, numTimes);
    //    }
    //}
    //else if(mesh.position.x < 2000){
    //    if(camera.position.x / freq > increment){
    //        increment++;
    //        var boxgeometry2 = new THREE.SphereGeometry( asteroidWidth, segments, segments );
    //        var mat2 = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture( 'texture/meteor.gif' ) } );
    //        var box2 = new THREE.Mesh( boxgeometry2, mat2);
    //        placeAsteroid(box2, dist, numTimes);
    //    }
    //}

}
function placeAsteroid(asteroid, dist, numTimes){

    for(var i = 0; i < numTimes; i++){
        var x = camera.position.x + dist;
        var y = mesh.position.y + Math.floor((Math.random() * maxWidth * 3) + -maxWidth);
        var z = mesh.position.z + Math.floor((Math.random() * maxHeight * 3) + -maxHeight);
        asteroid.rotateY(Math.random()*100);
        asteroid.rotateZ(Math.random()*100);
        asteroid.position.set(x, y, z);
        scene.add( asteroid );
        meshCollisionList.push(asteroid);
        moveAsteroidList.push(asteroid);
    }
}
function getAsteroid(position){
    var asteroid = null;
    var distFound = 3;

    for(var i = 0; i < meshCollisionList.length; i++){
        if (Math.abs(position.x - meshCollisionList[i].position.x) < 3 &&
            Math.abs(position.y - meshCollisionList[i].position.y) < 3 &&
            Math.abs(position.z - meshCollisionList[i].position.z) < 3 ) {

            if (position.x - meshCollisionList[i].position.x < distFound) {
                distFound = position.x - meshCollisionList[i].position.x;
                asteroid = meshCollisionList[i];
            }
        }
    }

    return asteroid;
}
function moveAsteroid(speed, directionY, directionZ){

    var mult = 4000;
    for(var j = 0; j < moveAsteroidList.length; j++){
        moveAsteroidList[j].position.y += directionY*(j % (100*speed))/mult;
        moveAsteroidList[j].position.z += directionZ*(j% (100*speed))/mult;
    }
}
function changeAsteroidWidth(width){
    asteroidWidth = width;
}




