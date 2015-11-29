/**
 * Created by abhanneman10 on 11/20/15.
 */

var asteroidList = [], asteroidList2 = [], asteroidList3 = [];
var moveAsteroidList= [];
var asteroidWidth = 1.5;
var astMoveSpeed = 1;
var asteroidObj = ['obj/asteroid3.json', 'obj/asteroid4.json','obj/asteroid5.json','obj/asteroid6.json'];
//var asteroidObjects = [];

//var shaderMaterial = new THREE.MeshShaderMaterial({
//    vertexShader:   $('#vertexshader').text(),
//    fragmentShader: $('#fragmentshader').text()
//});

function generateAsteroid(dist, freq, numTimes){

    if(camera.position.x / freq > increment){
        increment++;
        //var loader = new THREE.JSONLoader();
        //loader.load(asteroidObj[Math.floor(Math.random()*4)], function ( geometry, material ) {
        //
        //    /* Shader version */
        //    //var ast = new THREE.Mesh( geometry, shaderMaterial );
        //
        //    material[0] = new THREE.MeshLambertMaterial( {color: 0x663300} );
        //    var faceMaterial = new THREE.MeshFaceMaterial( material );
        //    var ast = new THREE.Mesh( geometry, faceMaterial );
        //    ast.scale.multiplyScalar(asteroidWidth);
        //    ast.matrixAutoUpdate = true;
        //    ast.updateMatrix();
        //
        //    //var asteroidObject = new Object();
        //    //asteroidObject.mesh = ast;
        //    //asteroidObject.moveZ = 1.1;
        //    //asteroidObject.moveY = 2.2;
        //    //asteroidObject.push(asteroidObject);
        //
        //    placeAsteroid(ast, dist, numTimes);
        //} );

        /* Cube version */
        var material = new THREE.MeshLambertMaterial( {color: 0x663300} );
        var ast = new THREE.CubeGeometry( asteroidWidth, asteroidWidth, asteroidWidth );
        var asteroid = new THREE.Mesh( ast, material);
        asteroid.moveY = Math.random()*5 - 2.5;
        asteroid.moveZ = Math.random()*5 - 2.5;
        placeAsteroid(asteroid,dist,numTimes);
    }
}
function placeAsteroid(asteroid, dist, numTimes){

    var w = maxWidth * 2.5 * (shipSpeed);
    var l = maxHeight * 2.5 * (shipSpeed + .7);

    for(var i = 0; i < numTimes; i++){
        var x = camera.position.x + dist;
        var y = mesh.position.y + Math.floor((Math.random() * w) - (w/2));
        var z = mesh.position.z + Math.floor((Math.random() * l) - (l/2));
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
function changeAsteroidWidth(width){
    asteroidWidth = width;
}
function moveAsteroids(){
    if(checkLevel() > 5){
        for(var i = 0; i < moveAsteroidList.length; i++){
            moveAsteroidList[i].position.y += moveAsteroidList[i].moveY/100;
            moveAsteroidList[i].position.z += moveAsteroidList[i].moveZ/100;
        }
    }
}
function changeMoveSpeed(speed){
    astMoveSpeed = speed;
}
