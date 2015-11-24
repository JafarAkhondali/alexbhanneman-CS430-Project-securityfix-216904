/**
 * Created by abhanneman10 on 11/20/15.
 */

var laserShot = false;
var shots = [];
var asteroidExplodedShot = false;
var asteroidListShot = [], asteroidListShot2 = [],asteroidListShot3 = [];
var schange3 = false, schange4 = false;

function generateLasers(){

    if(numShots > 0){
        laserShot = true;
        var geometry = new THREE.CylinderGeometry( .02, .05, 1.5, 16 );
        var material = new THREE.MeshPhongMaterial({
            color: green,
            specular: green,
            shininess: 100
        });

        var laser = new THREE.Mesh(geometry, material);
        laser.position.x = mesh.position.x+ 1;
        laser.position.y = mesh.position.y;
        laser.position.z = mesh.position.z - .4;

        var geometry2 = geometry;
        THREE.GeometryUtils.merge(geometry, geometry2);

        var laser2 = new THREE.Mesh(geometry2, material);
        laser2.position.x = mesh.position.x+ 1;
        laser2.position.y = mesh.position.y;
        laser2.position.z = mesh.position.z  + .4;

        laser.rotateZ(Math.PI/2);
        laser2.rotateZ(Math.PI/2);
        shots.push(laser);
        shots.push(laser2);

        scene.add(laser);
        scene.add(laser2);
        numShots--;
    }
}
function shootLasers(){
    for(var i = 0; i < shots.length; i++) {
        shots[i].position.x += moveXSpeed + .6;
    }

    if(laserShot){
        for(var i = 0; i < shots.length; i++){
            var originPoint = shots[i].position.clone();

            for (var vertexIndex = 0; vertexIndex < shots[i].geometry.vertices.length; vertexIndex++)
            {
                var localVertex = shots[i].geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4( shots[i].matrix );
                var directionVector = globalVertex.sub( shots[i].position );

                var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                var collisionResults = ray.intersectObjects( meshCollisionList );

                if(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() && getAsteroid(shots[i].position) != null) {
                    var asteroidMesh = getAsteroidShot(shots[i].position);
                    explodeAsteroidShot(asteroidMesh);
                    var incre = removePartnerLaser(shots[i].position, i);
                    i = i - incre;
                    scene.remove(shots[i]);
                    scene.remove(asteroidMesh);
                    shots.splice(i,1);
                    laserShot = false;
                    i = i - 1;
                }
            }

            if(shots[i].position.x > mesh.position.x + 500) {
                shots.splice(i, 1);
                scene.remove(shots[i]);
                var incr = removePartnerLaser(shots[i].position, i);
                i = i - 1 - incr;
            }
        }
    }
    var exp, speed = moveXSpeed/3;
    var mult = 100;

    for(var j = 0; j < asteroidListShot.length; j++){
        exp = (Math.random() * 5) + -5;
        asteroidListShot[j].position.x += speed;

        if (schange3 && schange4){
            if (schange4){
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z -= ((j+1)% exp)/mult;
                schange4 = false;
            }
            else{
                asteroidListShot[j].position.y -= (j % exp)/mult;
                asteroidListShot[j].position.z += ((j+1)% exp)/mult;
                schange4 = true;
            }
            schange3 = false;
        }
        else if (!schange3 && !schange4){
            if (schange4){
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z -= ((j+1)% exp)/mult;
                schange4 = false;
            }
            else{
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z += ((j+1)% exp)/mult;
                schange4 = true;
            }
            schange4 = true;
        }
        else if (schange3 && !schange4){
            if (schange4){
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z -= ((j+1)% exp)/mult;
                schange4 = false;
            }
            else{
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z += ((j+1)% exp)/mult;
                schange4 = true;
            }
            schange3 = true;
        }
        else{
            if (schange4){
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z += ((j+1)% exp)/mult;
                schange4 = false;
            }
            else{
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z -= ((j+1)% exp)/mult;
                schange4 = true;
            }
            schange3 = true;
        }
    }
    for(var j = 0; j < asteroidListShot2.length; j++){
        exp = Math.floor((Math.random() * 3) + -3);
        asteroidListShot2[j].position.x += speed;

        if (schange3 && schange4){
            if (schange4){
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z -= ((j+1)% exp)/mult;
                schange4 = false;
            }
            else{
                asteroidListShot2[j].position.y -= (j % exp)/mult;
                asteroidListShot2[j].position.z += ((j+1)% exp)/mult;
                schange4 = true;
            }
            schange4 = false;
        }
        else if (!schange3 && !schange4){
            if (schange4){
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z -= ((j+1)% exp)/mult;
                schange4 = false;
            }
            else{
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z += ((j+1)% exp)/mult;
                schange4 = true;
            }
            schange3 = true;
        }
        else if (schange3 && !schange4){
            if (change4){
                boxList2[j].position.y += (j % exp)/mult;
                boxList2[j].position.z -= ((j+1)% exp)/mult;
                schange4 = false;
            }
            else{
                boxList[j].position.y += (j % exp)/mult;
                boxList[j].position.z += ((j+1)% exp)/mult;
                schange4 = true;
            }
            schange3 = true;
        }
        else{
            if (schange4){
                boxList[j].position.y += (j % exp)/mult;
                boxList[j].position.z += ((j+1)% exp)/mult;
                schange4 = false;
            }
            else{
                boxList[j].position.y += (j % exp)/mult;
                boxList[j].position.z -= ((j+1)% exp)/mult;
                schange4 = true;
            }
            schange3 = true;
        }
    }

    if(asteroidListShot.length > 0){
        if (asteroidListShot[0].position.x < mesh.position.x)
        {
            for(var i = 0; i < asteroidListShot.length; i++){
                scene.remove(asteroidListShot[i]);
                scene.remove(asteroidListShot2[i]);
                scene.remove(asteroidListShot3[i]);
            }
            asteroidListShot = [];
            asteroidListShot2 = [];
            asteroidListShot3 = [];
            asteroidExplodedShot = false;
        }
    }
}
function removePartnerLaser(position, index){
    var asteroid = null;
    var distFound = 5;

    for(var i = 0; i < shots.length; i++){
        if (Math.abs(position.x - shots[i].position.x) < distFound &&
            Math.abs(position.y - shots[i].position.y) < distFound &&
            Math.abs(position.z - shots[i].position.z) < distFound ) {

            asteroid = shots[i];
            scene.remove(shots[i]);
            shots.splice(i,1);

            if(index > i){
                return 1;
            }
            else
                return 0;
        }
    }
    return 0;
}
function explodeAsteroidShot(astExplode){

    var width = asteroidWidth/10;
    if(!asteroidExplodedShot) {
        for (var i = 0; i < 30; i++) {
            var box = new THREE.CubeGeometry(((i%3)+1)*width,((i%3)+1)*width,((i%3)+1)*width);
            var mat = new THREE.MeshLambertMaterial( {color: 0x663300} );
            var asteroid = new THREE.Mesh(box, mat);

            asteroid.rotateY(Math.random()*100);
            asteroid.rotateZ(Math.random()*100);
            asteroid.position.set(astExplode.position.x +.1, astExplode.position.y + (Math.random()*1.5) -.75, astExplode.position.z + (Math.random()*1.5)-.75);
            asteroid.updateMatrix();
            asteroid.matrixAutoUpdate = true;
            scene.add(asteroid);
            asteroidListShot.push(asteroid);
        }
        for(var p = 0; p < asteroidList.length; p++){
            asteroidListShot2[p] = asteroidListShot[p].clone();
            scene.add(asteroidListShot2[p]);
        }
        asteroidExplodedShot = true;
    }
}
function getAsteroidShot(position){
    var asteroid = null;
    var distFound = 3;

    for(var i = 0; i < meshCollisionList.length; i++){
        if (Math.abs(position.x - meshCollisionList[i].position.x) < distFound &&
            Math.abs(position.y - meshCollisionList[i].position.y) < distFound &&
            Math.abs(position.z - meshCollisionList[i].position.z) < distFound ) {

            if (position.x - meshCollisionList[i].position.x < distFound) {
                distFound = position.x - meshCollisionList[i].position.x;
                asteroid = meshCollisionList[i];
                meshCollisionList.splice(i,1);
            }
        }
    }

    return asteroid;
}
