/**
 * Created by abhanneman10 on 11/20/15.
 */

var collision = false, exploded = false, asteroidExploded = false, explodeShot = false;
var explodeEffect = 0, meshExplode = 0;
var meshCollisionList= [];
var boxList = [], boxList2 = [], boxList3 = [];
var change = true, change2 = true, change3 = true, change4 = true, change5 = true, change6 = true;

//collision detection and explosion event
function generateColor(){

    var array = [orange,
        yellow,
        black,
        red];
    return array[Math.floor((Math.random() * array.length))];
}
function explode(){

    if(!exploded) {
        for (var i = 0; i < 80; i++) {
            var box = new THREE.BoxGeometry(.1, .1, .1);
            var mat = new THREE.MeshLambertMaterial( {color: generateColor()} );
            var asteroid = new THREE.Mesh(box, mat);

            asteroid.position.set(mesh.position.x +.2, mesh.position.y +.3, mesh.position.z +.1);
            asteroid.rotateY(Math.random()*100);
            asteroid.rotateZ(Math.random()*100);
            scene.add(asteroid);
            asteroid.updateMatrix();
            asteroid.matrixAutoUpdate = true;
            boxList.push(asteroid);
        }

        exploded = true;
        scene.remove(mesh);

        for(var p = 0; p < boxList.length; p++){
            boxList2[p] = boxList[p].clone();
            boxList3[p] = boxList[p].clone();
            scene.add(boxList2[p]);
            scene.add(boxList3[p]);
        }
    }

    explodeAsteroid();

    var exp;
    var mult = 1/100, speed = .001;
    for(var j = 0; j < boxList.length; j++){
        exp = (Math.random() * 6) + -6;
        boxList[j].position.x -= speed;

        if (change && change2){
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y -= (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = false;
        }
        else if (!change && !change2){
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else if (change && !change2){
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else{
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
    }
    for(var j = 0; j < boxList2.length; j++){
        exp = Math.floor((Math.random() * 5) + -5);
        boxList2[j].position.x -= speed;

        if (change && change2){
            if (change2){
                boxList2[j].position.y += (j % exp)*mult;
                boxList2[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList2[j].position.y -= (j % exp)*mult;
                boxList2[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = false;
        }
        else if (!change && !change2){
            if (change2){
                boxList2[j].position.y += (j % exp)*mult;
                boxList2[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList2[j].position.y += (j % exp)*mult;
                boxList2[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else if (change && !change2){
            if (change2){
                boxList2[j].position.y += (j % exp)*mult;
                boxList2[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else{
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
    }
    for(var j = 0; j < boxList3.length; j++){
        exp = Math.floor((Math.random() * 3) + -3);
        boxList3[j].position.x -= speed;

        if (change && change2){
            if (change2){
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList3[j].position.y -= (j % exp)*mult;
                boxList3[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = false;
        }
        else if (!change && !change2){
            if (change2){
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else if (change && !change2){
            if (change2){
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else{
            if (change2){
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z += ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z -= ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
    }
}
function explodeFromShot(){

    if(!exploded) {
        for (var i = 0; i < 80; i++) {
            var box = new THREE.BoxGeometry(.1, .1, .1);
            var mat = new THREE.MeshLambertMaterial( {color: generateColor()} );
            var asteroid = new THREE.Mesh(box, mat);

            asteroid.position.set(mesh.position.x +.2, mesh.position.y +.3, mesh.position.z +.1);
            asteroid.rotateY(Math.random()*100);
            asteroid.rotateZ(Math.random()*100);
            scene.add(asteroid);
            asteroid.updateMatrix();
            asteroid.matrixAutoUpdate = true;
            boxList.push(asteroid);
        }

        exploded = true;
        for(var p = 0; p < enemyShots.length; p++){
            scene.remove(enemyShots[p]);
        }

        explodeShot = true;
        scene.remove(mesh);


        for(var p = 0; p < boxList.length; p++){
            boxList2[p] = boxList[p].clone();
            boxList3[p] = boxList[p].clone();
            scene.add(boxList2[p]);
            scene.add(boxList3[p]);
        }
    }

    var exp;
    var mult = 1/100, speed = .001;
    for(var j = 0; j < boxList.length; j++){
        exp = (Math.random() * 6) + -6;
        boxList[j].position.x -= speed;

        if (change && change2){
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y -= (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = false;
        }
        else if (!change && !change2){
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else if (change && !change2){
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else{
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
    }
    for(var j = 0; j < boxList2.length; j++){
        exp = Math.floor((Math.random() * 5) + -5);
        boxList2[j].position.x -= speed;

        if (change && change2){
            if (change2){
                boxList2[j].position.y += (j % exp)*mult;
                boxList2[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList2[j].position.y -= (j % exp)*mult;
                boxList2[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = false;
        }
        else if (!change && !change2){
            if (change2){
                boxList2[j].position.y += (j % exp)*mult;
                boxList2[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList2[j].position.y += (j % exp)*mult;
                boxList2[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else if (change && !change2){
            if (change2){
                boxList2[j].position.y += (j % exp)*mult;
                boxList2[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else{
            if (change2){
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z += ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList[j].position.y += (j % exp)*mult;
                boxList[j].position.z -= ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
    }
    for(var j = 0; j < boxList3.length; j++){
        exp = Math.floor((Math.random() * 3) + -3);
        boxList3[j].position.x -= speed;

        if (change && change2){
            if (change2){
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList3[j].position.y -= (j % exp)*mult;
                boxList3[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = false;
        }
        else if (!change && !change2){
            if (change2){
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else if (change && !change2){
            if (change2){
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z -= ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z += ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
        else{
            if (change2){
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z += ((j+1)% exp)*mult;
                change2 = false;
            }
            else{
                boxList3[j].position.y += (j % exp)*mult;
                boxList3[j].position.z -= ((j+1)% exp)*mult;
                change2 = true;
            }
            change = true;
        }
    }
}
function explodeAsteroid(){

    var width = asteroidWidth/10;
    if(!asteroidExploded) {
        for (var i = 0; i < 30; i++) {
            var box = new THREE.BoxGeometry(((i%3)+1)*width,((i%3)+1)*width,((i%3)+1)*width);
            var loader = new THREE.TextureLoader();
            var texture = loader.load('texture/exploded.jpg');
            texture.minFilter = THREE.LinearFilter;
            var mat = new THREE.MeshPhongMaterial( { map: texture, overdraw: true } );
            var asteroid = new THREE.Mesh(box, mat);

            asteroid.position.set(mesh.position.x +.2, mesh.position.y +.3, mesh.position.z);
            asteroid.rotateY(Math.random()*100);
            asteroid.rotateZ(Math.random()*100);
            asteroid.updateMatrix();
            asteroid.matrixAutoUpdate = true;
            scene.add(asteroid);
            asteroidList.push(asteroid);
        }
        for(var p = 0; p < asteroidList.length; p++){
            asteroidList2[p] = asteroidList[p].clone();
            asteroidList3[p] = asteroidList[p].clone();
            scene.add(asteroidList2[p]);
            scene.add(asteroidList3[p]);
        }
        explodeEffect = 3;
        asteroidExploded = true;
    }

    var exp, speed = .05;
    var mult = 100;
    for(var j = 0; j < asteroidList.length; j++){
        exp = (Math.random() * 5) + -5;
        asteroidList[j].position.x += speed;

        if (change4 && change4){
            if (change4){
                asteroidList[j].position.y += (j % exp)/mult;
                asteroidList[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList[j].position.y -= (j % exp)/mult;
                asteroidList[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = false;
        }
        else if (!change3 && !change4){
            if (change4){
                asteroidList[j].position.y += (j % exp)/mult;
                asteroidList[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList[j].position.y += (j % exp)/mult;
                asteroidList[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
        else if (change3 && !change4){
            if (change4){
                asteroidList[j].position.y += (j % exp)/mult;
                asteroidList[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList[j].position.y += (j % exp)/mult;
                asteroidList[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
        else{
            if (change4){
                asteroidList[j].position.y += (j % exp)/mult;
                asteroidList[j].position.z += ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList[j].position.y += (j % exp)/mult;
                asteroidList[j].position.z -= ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
    }
    for(var j = 0; j < asteroidList2.length; j++){
        exp = Math.floor((Math.random() * 3) + -3);
        asteroidList2[j].position.x += speed;

        if (change3 && change4){
            if (change4){
                asteroidList2[j].position.y += (j % exp)/mult;
                asteroidList2[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList2[j].position.y -= (j % exp)/mult;
                asteroidList2[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = false;
        }
        else if (!change3 && !change4){
            if (change4){
                asteroidList2[j].position.y += (j % exp)/mult;
                asteroidList2[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList2[j].position.y += (j % exp)/mult;
                asteroidList2[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
        else if (change3 && !change4){
            if (change4){
                boxList2[j].position.y += (j % exp)/mult;
                boxList2[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                boxList[j].position.y += (j % exp)/mult;
                boxList[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
        else{
            if (change4){
                boxList[j].position.y += (j % exp)/mult;
                boxList[j].position.z += ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                boxList[j].position.y += (j % exp)/mult;
                boxList[j].position.z -= ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
    }
    for(var j = 0; j < asteroidList3.length; j++){
        exp = Math.floor((Math.random() * 2) + -2);
        asteroidList3[j].position.x += speed;

        if (change3 && change4){
            if (change4){
                asteroidList3[j].position.y += (j % exp)/mult;
                asteroidList3[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList3[j].position.y -= (j % exp)/mult;
                asteroidList3[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = false;
        }
        else if (!change3 && !change4){
            if (change4){
                asteroidList3[j].position.y += (j % exp)/mult;
                asteroidList3[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList3[j].position.y += (j % exp)/mult;
                asteroidList3[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
        else if (change3 && !change4){
            if (change4){
                asteroidList3[j].position.y += (j % exp)/mult;
                asteroidList3[j].position.z -= ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList3[j].position.y += (j % exp)/mult;
                asteroidList3[j].position.z += ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
        else{
            if (change4){
                asteroidList3[j].position.y += (j % exp)/mult;
                asteroidList3[j].position.z += ((j+1)% exp)/mult;
                change4 = false;
            }
            else{
                asteroidList3[j].position.y += (j % exp)/mult;
                asteroidList3[j].position.z -= ((j+1)% exp)/mult;
                change4 = true;
            }
            change3 = true;
        }
    }
}
function detectCollision(){

    if (!collision){
        var originPoint = mesh.position.clone();

        for (var vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++)
        {
            var localVertex = mesh.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( mesh.matrix );
            var directionVector = globalVertex.sub( mesh.position );

            var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( meshCollisionList );

            var rayPow = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResultsPow = rayPow.intersectObjects( powerUpList );

            var rayE = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResultsE = rayE.intersectObjects( enemyShots );

            if(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() && getAsteroid(mesh.position) != null) {

                var asteroidMesh = getAsteroid(mesh.position);

                moveXSpeed = 0;
                collision = true;
                explode();
                scene.remove(asteroidMesh);
                document.getElementById("text").innerHTML = "Your score: " + Math.round(mesh.position.x).toString();
                document.getElementById("score").style.visibility = "hidden";
                document.getElementById("level").style.visibility = "hidden";
                document.getElementById("displayScore").style.visibility = "visible";
                controls.turnOff();
            }

            else if(collisionResultsPow.length > 0 && collisionResultsPow[0].distance < directionVector.length()) {

                var powerUp = getPowerUp(mesh.position);
                scene.remove(powerUp);
                enablePowerUp();
            }

            else if(collisionResultsE.length > 0 && collisionResultsE[0].distance < directionVector.length()) {

                moveXSpeed = 0;
                collision = true;
                explodeFromShot();
                document.getElementById("text").innerHTML = "Your score: " + Math.round(mesh.position.x).toString();
                document.getElementById("score").style.visibility = "hidden";
                document.getElementById("level").style.visibility = "hidden";
                document.getElementById("displayScore").style.visibility = "visible";
                controls.turnOff();
            }
        }

        //delete asteroids if they're behind ship
        for (var i = 0; i < meshCollisionList.length; i++){
            if(meshCollisionList[i].position.x < mesh.position.x-5) {
                scene.remove(meshCollisionList[i]);
                meshCollisionList.splice(i, 1);
            }
        }
        for (var i = 0; i < moveAsteroidList.length; i++){
            if(moveAsteroidList[i].position.x < mesh.position.x-5) {
                moveAsteroidList.splice(i, 1);
            }
        }
        if(meshCollisionList.length > 200){
            meshCollisionList.splice(0, 30);
        }
    }
    else if(explodeShot){
        explodeFromShot();
    }
    else {
        explode();
    }

}
