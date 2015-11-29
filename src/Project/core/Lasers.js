/**
 * Created by abhanneman10 on 11/20/15.
 */

var laserShot = false;
var shots = [];
var asteroidExplodedShot = false;
var explodedEnemy = false;
var asteroidListShot = [], asteroidListShot2 = [];
var boxListE = [], boxListE2 = [], boxListE3 = [];
var change13 = false, change14 = false;
var change11 = false, change12 = true;

function generateLasers(){

    if(numShots > 0){
        laserShot = true;
        var geometry = new THREE.CylinderGeometry( .04, .1, 1.5, 16 );
        var material = new THREE.MeshPhongMaterial({
            color: yellow,
            specular: red,
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
        shots[i].position.x += moveXSpeed + 2;
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

                var rayEnemy = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                var collisionResultsEnemy = rayEnemy.intersectObjects( enemies );

                if(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() && getAsteroid(shots[i].position) != null) {
                    var asteroidMesh = getAsteroidShot(shots[i].position);
                    removePartnerLaser(shots[i].position);
                    scene.remove(shots[i]);
                    explodeAsteroidShot(asteroidMesh);
                    scene.remove(asteroidMesh);
                    shots.splice(i,1);
                    laserShot = false;
                    i = i - 1;
                }

                if(collisionResultsEnemy.length > 0 && collisionResultsEnemy[0].distance < directionVector.length() && getEnemyShot(shots[i].position) != null) {
                    var enemy = getEnemyShot(shots[i].position);
                    for(var z = 0; z < enemies.length; z++){
                        if(enemy == enemies[z]){
                            enemies.splice(z,1);
                        }
                    }
                    removePartnerLaser(shots[i].position);
                    scene.remove(shots[i]);
                    explodeEnemy(enemy);
                    scene.remove(getEnemyShot(enemy.position));
                    shots.splice(i,1);
                    laserShot = false;
                    i = i - 1;
                }
            }

            if(shots[i].position.x > mesh.position.x + 100) {
                scene.remove(shots[i]);
                shots.splice(i, 1);
                removePartnerLaser(shots[i].position);
            }
        }
    }
    var exp, speed = moveXSpeed/3;
    var mult = 1000;

    for(var j = 0; j < asteroidListShot.length; j++){
        exp = (Math.random() * 5) + -5;
        asteroidListShot[j].position.x += speed;

        if (change13 && change14){
            if (change14){
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z -= ((j+1)% exp)/mult;
                change14 = false;
            }
            else{
                asteroidListShot[j].position.y -= (j % exp)/mult;
                asteroidListShot[j].position.z += ((j+1)% exp)/mult;
                change14 = true;
            }
            change13 = false;
        }
        else if (!change13 && !change14){
            if (change14){
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z -= ((j+1)% exp)/mult;
                change14 = false;
            }
            else{
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z += ((j+1)% exp)/mult;
                change14 = true;
            }
            change14 = true;
        }
        else if (change13 && !change14){
            if (change14){
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z -= ((j+1)% exp)/mult;
                change14 = false;
            }
            else{
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z += ((j+1)% exp)/mult;
                change14 = true;
            }
            change13 = true;
        }
        else{
            if (change14){
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z += ((j+1)% exp)/mult;
                change14 = false;
            }
            else{
                asteroidListShot[j].position.y += (j % exp)/mult;
                asteroidListShot[j].position.z -= ((j+1)% exp)/mult;
                change14 = true;
            }
            change13 = true;
        }
    }
    for(var j = 0; j < asteroidListShot2.length; j++){
        exp = Math.floor((Math.random() * 3) + -3);
        asteroidListShot2[j].position.x += speed;

        if (change13 && change14){
            if (change14){
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z -= ((j+1)% exp)/mult;
                change14 = false;
            }
            else{
                asteroidListShot2[j].position.y -= (j % exp)/mult;
                asteroidListShot2[j].position.z += ((j+1)% exp)/mult;
                change14 = true;
            }
            change14 = false;
        }
        else if (!change13 && !change14){
            if (change14){
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z -= ((j+1)% exp)/mult;
                change14 = false;
            }
            else{
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z += ((j+1)% exp)/mult;
                change14 = true;
            }
            change13 = true;
        }
        else if (change13 && !change14){
            if (change4){
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z -= ((j+1)% exp)/mult;
                change14 = false;
            }
            else{
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z += ((j+1)% exp)/mult;
                change14 = true;
            }
            change13 = true;
        }
        else{
            if (change14){
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z += ((j+1)% exp)/mult;
                change14 = false;
            }
            else{
                asteroidListShot2[j].position.y += (j % exp)/mult;
                asteroidListShot2[j].position.z -= ((j+1)% exp)/mult;
                change14 = true;
            }
            change13 = true;
        }
    }
    for(var j = 0; j < boxListE.length; j++){
        exp = ((Math.random() * 9) + 9)/10000;
        boxListE[j].position.x -= speed/10;

        if (change11 && change12){
            if (change12){
                boxListE[j].position.y += (j % exp)*mult;
                boxListE[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE[j].position.y -= (j % exp)*mult;
                boxListE[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= false;
        }
        else if (!change11 && !change12){
            if (change12){
                boxListE[j].position.y += (j % exp)*mult;
                boxListE[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE[j].position.y += (j % exp)*mult;
                boxListE[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
        else if (change11 && !change12){
            if (change12){
                boxListE[j].position.y += (j % exp)*mult;
                boxListE[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE[j].position.y += (j % exp)*mult;
                boxListE[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
        else{
            if (change12){
                boxListE[j].position.y += (j % exp)*mult;
                boxListE[j].position.z += ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE[j].position.y += (j % exp)*mult;
                boxListE[j].position.z -= ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
    }
    for(var j = 0; j < boxListE2.length; j++){
        exp = Math.floor((Math.random() * 6) + -6)/10000;
        boxListE2[j].position.x += speed/10;

        if (change11 && change12){
            if (change12){
                boxListE2[j].position.y += (j % exp)*mult;
                boxListE2[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE2[j].position.y -= (j % exp)*mult;
                boxListE2[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= false;
        }
        else if (!change11 && !change12){
            if (change12){
                boxListE2[j].position.y += (j % exp)*mult;
                boxListE2[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE2[j].position.y += (j % exp)*mult;
                boxListE2[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
        else if (change11 && !change12){
            if (change12){
                boxListE2[j].position.y += (j % exp)*mult;
                boxListE2[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE2[j].position.y += (j % exp)*mult;
                boxListE2[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
        else{
            if (change12){
                boxListE2[j].position.y += (j % exp)*mult;
                boxListE2[j].position.z += ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE2[j].position.y += (j % exp)*mult;
                boxListE2[j].position.z -= ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
    }
    for(var j = 0; j < boxListE3.length; j++){
        exp = Math.floor((Math.random() * 3) + 3)/10000;
        boxListE3[j].position.x -= speed/10;

        if (change11 && change12){
            if (change12){
                boxListE3[j].position.y += (j % exp)*mult;
                boxListE3[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE3[j].position.y -= (j % exp)*mult;
                boxListE3[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= false;
        }
        else if (!change11 && !change12){
            if (change12){
                boxListE3[j].position.y += (j % exp)*mult;
                boxListE3[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE3[j].position.y += (j % exp)*mult;
                boxListE3[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
        else if (change11 && !change12){
            if (change12){
                boxListE3[j].position.y += (j % exp)*mult;
                boxListE3[j].position.z -= ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE3[j].position.y += (j % exp)*mult;
                boxListE3[j].position.z += ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
        else{
            if (change12){
                boxListE3[j].position.y += (j % exp)*mult;
                boxListE3[j].position.z += ((j+1)% exp)*mult;
                change12 = false;
            }
            else{
                boxListE3[j].position.y += (j % exp)*mult;
                boxListE3[j].position.z -= ((j+1)% exp)*mult;
                change12 = true;
            }
            change11= true;
        }
    }

    if(asteroidListShot.length > 0){
        if (asteroidListShot[0].position.x < mesh.position.x)
        {
            for(var i = 0; i < asteroidListShot.length; i++){
                scene.remove(asteroidListShot[i]);
                scene.remove(asteroidListShot2[i]);
            }
            asteroidListShot = [];
            asteroidListShot2 = [];
            asteroidExplodedShot = false;
        }
    }
    if(boxListE.length > 0){
        if (boxListE[0].position.x < mesh.position.x || boxListE[0].position.y - 2 > mesh.position.y )
        {
            for(var i = 0; i < boxListE.length; i++){
                scene.remove(boxListE[i]);
                scene.remove(boxListE2[i]);
                scene.remove(boxListE3[i]);
            }
            boxListE = [];
            boxListE2 = [];
            boxListE3 = [];
            explodedEnemy = false;
        }
    }
}
function removePartnerLaser(position){
    //var asteroid = null;
    //var distFound = 5;
    //
    //for(var i = 0; i < shots.length; i++){
    //    if (Math.abs(position.x - shots[i].position.x) < distFound &&
    //        Math.abs(position.y - shots[i].position.y) < distFound &&
    //        Math.abs(position.z - shots[i].position.z) < distFound ) {
    //
    //        asteroid = shots[i];
    //        scene.remove(shots[i]);
    //        shots.splice(i,1);
    //    }
    //}
    //return 0;
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
        createEnemy();
    }
}
function explodeEnemy(enemy){

    if(!explodedEnemy) {
        for (var i = 0; i < 100; i++) {
            var box = new THREE.BoxGeometry(.1, .1, .1);
            var mat = new THREE.MeshLambertMaterial( {color: generateColor()} );
            var asteroid = new THREE.Mesh(box, mat);

            asteroid.position.set(enemy.position.x +.2, enemy.position.y, enemy.position.z);
            asteroid.rotateY(Math.random()*100);
            asteroid.rotateZ(Math.random()*100);
            scene.add(asteroid);
            asteroid.updateMatrix();
            asteroid.matrixAutoUpdate = true;
            boxListE.push(asteroid);
        }

        explodedEnemy = true;
        scene.remove(enemy);

        for(var p = 0; p < boxListE.length; p++){
            boxListE2[p] = boxListE[p].clone();
            scene.add(boxListE2[p]);
            boxListE3[p] = boxListE[p].clone();
            scene.add(boxListE3[p]);
        }
    }
}

function getEnemyShot(position){
    var enemy = null;
    var distFound = 3;

    for(var i = 0; i < enemies.length; i++){
        if (Math.abs(position.x - enemies[i].position.x) < 3 &&
            Math.abs(position.y - enemies[i].position.y) < 3 &&
            Math.abs(position.z - enemies[i].position.z) < 3 ) {

            if (position.x - enemies[i].position.x < distFound) {
                distFound = position.x - enemies[i].position.x;
                enemy = enemies[i];
            }
        }
    }

    return enemy;
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
