/**
 * Created by abhanneman10 on 11/20/15.
 */

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var scene, camera, renderer, controls, stats;
var mesh;
var clock = new THREE.Clock();
var maxWidth = 12;
var maxHeight = 10;
var increment = 0;
var value = 0;
var engineFire = [], engineFire2 = [], engineFire3 = [], engineFire4 = [];
var moveXSpeed = 0;
var numShots = 20;

var lvlTime2 = 200;
var lvlTime3 = 500;
var lvlTime4 = 900;
var lvlTime5 = 1250;
var lvlTime6 = 1600;
var lvlTime7 = 2000;

//level management
function level(level){
    var dist, freq, numTimes, shipSpeed = .3;

    if (level == 1){
        dist = 30;      //place distance away from plane
        freq = 3;       //lower freq appears sooner
        numTimes = 1;   //how many times to place a asteroid
        moveXSpeed = .2;
    }
    else if (level == 2){
        dist = 30;
        freq = 2;
        numTimes = 1;
        moveXSpeed = .4;
        shipSpeed = .6;
        changeAsteroidWidth(1.2);
    }
    else if (level == 3){
        dist = 40;
        freq = 2;
        numTimes = 2;
        moveXSpeed = .6;
        shipSpeed = .8;
        changeAsteroidWidth(1.7);
    }
    else if (level == 4){
        dist = 45;
        freq = 2;
        numTimes = 2;
        moveXSpeed = .75;
        shipSpeed = 1;
        changeAsteroidWidth(2.3);
    }
    else if (level == 5){
        dist = 50;
        freq = 2;
        numTimes = 3;
        moveXSpeed = .9;
        shipSpeed = 1.2;
        changeAsteroidWidth(2.7);
    }
    else if (level == 6){
        dist = 50;
        freq = 1;
        numTimes = 3;
        moveXSpeed = 1.1;
        shipSpeed = 1.3;
        changeAsteroidWidth(3.0);
        moveAsteroid(3,1,1);
    }
    else if (level == 7){
        dist = 50;
        freq = 1;
        numTimes = 3;
        moveXSpeed = 1.1;
        shipSpeed = 1.3;
        changeAsteroidWidth(3.3);
        moveAsteroid(4,-1,-1);
    }

    camera.position.x += moveXSpeed;

    //level 8-9 add lasers with finite amount
    //can collect more ammo
    //level 10 introduce bad guys, make asteroids smaller
    //level 11 introduce more bad guys, asteroids bigger
    //level 12 introduce boss
    //level 13 madness


    generatePowerUp();

    if(level != -1) {
        generateAsteroid(dist, freq, numTimes);
        if(powerUpType == '')
            controls.updateShipSpeed(shipSpeed);
    }
}
function checkLevel(){
    var time = 0;
    if(mesh != null)
        time = Math.round(mesh.position.x);
    var level = 1;

    if (time < 40)
        document.getElementById("level").innerHTML = "Level 1";
    else if (time < lvlTime2+60 && time > lvlTime2)
        document.getElementById("level").innerHTML = "Level 2";
    else if (time < lvlTime3+60 && time > lvlTime3)
        document.getElementById("level").innerHTML = "Level 3";
    else if (time < lvlTime4+70 && time > lvlTime4)
        document.getElementById("level").innerHTML = "Level 4";
    else if (time < lvlTime5+80 && time > lvlTime5)
        document.getElementById("level").innerHTML = "Level 5";
    else if (time < lvlTime6+80 && time > lvlTime6) {
        document.getElementById("level").innerHTML = "Level 6";
        document.getElementById("caption").innerHTML = "Asteroids move!";
    }
    else if (time < lvlTime7+80 && time > lvlTime7)
        document.getElementById("level").innerHTML = "Level 7";
    else {
        document.getElementById("level").innerHTML = "";
        document.getElementById("caption").innerHTML = "";
    }


    if(collision != null){
        if (collision)
            level = -1;
        else if (time > lvlTime7)
            level = 7;
        else if (time > lvlTime6)
            level = 6;
        else if (time > lvlTime5)
            level = 5;
        else if (time > lvlTime4)
            level = 4;
        else if (time > lvlTime3)
            level = 3;
        else if (time > lvlTime2)
            level = 2;
    }

    return level;
}

function rotateMesh(){

    if((controls.leftTilt || controls.rightTilt) &&
        (!controls.upTilt || controls.downTilt) &&
        Math.abs(controls.degRotated) < .4 &&
        Math.abs(controls.degRotated) < .2)
    {
        mesh.rotateX(Math.sin(controls.rotate));
        controls.degRotated += controls.rotate;
    }

    if((controls.downTilt || controls.upTilt) &&
        (!controls.rightTilt || !controls.leftTilt) &&
        Math.abs(controls.degRotated) < .2 &&
        Math.abs(controls.degRotated) < .4)
    {
        mesh.rotateZ(Math.sin(controls.rotateVert));
        controls.degRotatedVert += controls.rotateVert;
    }

    //move back when key isn't pressed
    if(!controls.rightTilt && !controls.leftTilt){
        mesh.rotateX(Math.sin(-controls.degRotated ));
        controls.rotate = 0;
        controls.degRotated = 0;
    }

    //move back when key isn't pressed
    if(!controls.upTilt && !controls.downTilt){
        mesh.rotateZ(Math.sin(-controls.degRotatedVert));
        controls.rotateVert = 0;
        controls.degRotatedVert = 0;
    }
}
function engine(){

    for (var i = 0; i < 5; i++) {
        var box = new THREE.BoxGeometry(.01, .01, .01);
        var mat = new THREE.MeshLambertMaterial( {color: generateColor()} );
        var asteroid = new THREE.Mesh(box, mat);

        asteroid.position.set(mesh.position.x -.1, mesh.position.y, mesh.position.z);
        scene.add(asteroid);
        asteroid.updateMatrix();
        asteroid.matrixAutoUpdate = true;
        engineFire.push(asteroid);
    }

    for(var p = 0; p < engineFire.length; p++){
        engineFire2[p] = engineFire[p].clone();
        engineFire3[p] = engineFire[p].clone();
        engineFire4[p] = engineFire[p].clone();
        scene.add(engineFire2[p]);
        scene.add(engineFire3[p]);
        scene.add(engineFire4[p]);
    }

    var exp;
    var mult = 1000, speed = .001;
    for(var j = 0; j < engineFire.length; j++){
        exp = Math.floor((Math.random() * 6) + -6);
        engineFire[j].position.x -= speed;

        if (change5&& change6){
            if (change6){
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire[j].position.y -= (j % exp)/mult;
                engineFire[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= false;
        }
        else if (!change5&& !change6){
            if (change6){
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
        else if (change5&& !change6){
            if (change6){
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
        else{
            if (change6){
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z += ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z -= ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
    }
    for(var j = 0; j < engineFire2.length; j++){
        exp = Math.floor((Math.random() * 5) + -5);
        engineFire2[j].position.x -= speed;

        if (change5&& change6){
            if (change6){
                engineFire2[j].position.y += (j % exp)/mult;
                engineFire2[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire2[j].position.y -= (j % exp)/mult;
                engineFire2[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= false;
        }
        else if (!change5&& !change6){
            if (change6){
                engineFire2[j].position.y += (j % exp)/mult;
                engineFire2[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire2[j].position.y += (j % exp)/mult;
                engineFire2[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
        else if (change5&& !change6){
            if (change6){
                engineFire2[j].position.y += (j % exp)/mult;
                engineFire2[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
        else{
            if (change6){
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z += ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire[j].position.y += (j % exp)/mult;
                engineFire[j].position.z -= ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
    }
    for(var j = 0; j < engineFire3.length; j++){
        exp = Math.floor((Math.random() * 3) + -3);
        engineFire3[j].position.x -= speed;

        if (change5&& change6){
            if (change6){
                engineFire3[j].position.y += (j % exp)/mult;
                engineFire3[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire3[j].position.y -= (j % exp)/mult;
                engineFire3[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= false;
        }
        else if (!change5&& !change6){
            if (change6){
                engineFire3[j].position.y += (j % exp)/mult;
                engineFire3[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire3[j].position.y += (j % exp)/mult;
                engineFire3[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
        else if (change5&& !change6){
            if (change6){
                engineFire3[j].position.y += (j % exp)/mult;
                engineFire3[j].position.z -= ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire3[j].position.y += (j % exp)/mult;
                engineFire3[j].position.z += ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
        else{
            if (change6){
                engineFire3[j].position.y += (j % exp)/mult;
                engineFire3[j].position.z += ((j+1)% exp)/mult;
                change6 = false;
            }
            else{
                engineFire3[j].position.y += (j % exp)/mult;
                engineFire3[j].position.z -= ((j+1)% exp)/mult;
                change6 = true;
            }
            change5= true;
        }
    }

    for(var j = 0; j < engineFire.length; j++){
        if(engineFire[j].position.x > mesh.position.x + 1)
            engineFire.splice(j,1);
        if(engineFire2[j].position.x > mesh.position.x + 1)
            engineFire2.splice(j,1);
        if(engineFire3[j].position.x > mesh.position.x + 1)
            engineFire3.splice(j,1);
        if(engineFire4[j].position.x > mesh.position.x + 1)
            engineFire4.splice(j,1);
    }
}

// Sets up and run the scene.
function init() {

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var width = window.innerWidth,
        height = window.innerHeight;

    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer._microCache = new MicroCache();

    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20000);
    camera.position.set(-2,.5,0);

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });
    scene.add(camera);

    // LIGHTS
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, -500 );
    scene.add( hemiLight );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 50 );
    scene.add( dirLight );
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;

    createUniverse();

    // **************SHIP LOADED HERE*************************
    var loader = new THREE.JSONLoader();
    loader.load( 'obj/LatestShip.json', function ( geometry, materials ) {
        var engStream = 0;
        var decMin = 1;
        var decMax = 6;
        var finRing = 7;
        var windshield = 8;
        var engine = 9;
        var dec2Min = 10;
        var dec2Max = 18;
        var bodyMain = 19;
        var wingSt = 20;
        var wingSt2 = 21;

        //body
        materials[bodyMain] = new THREE.MeshPhongMaterial({ //body
            color: gray,
            specular: 0x555555,
            shininess: 30
        });

        //windshield
        materials[windshield] = new THREE.MeshPhongMaterial({
            color: blue,
            specular: 0x555555,
            shininess: 60
        });

        //engine
        materials[engine] = new THREE.MeshPhongMaterial({
            color: black,
            specular: 0x000000,
            shininess: 30
        });

        //red decal
        for(var i = decMin; i < decMax+1; i++){
            materials[i] = new THREE.MeshPhongMaterial( {
                color: red,
                specular: 0xff0000,
                shininess: 30 } );
        }
        for(var i = dec2Min; i < dec2Max+1; i++){
            materials[i] = new THREE.MeshPhongMaterial( {
                color: red,
                specular: 0xff0000,
                shininess: 30 } );
        }

        //back fin
        materials[finRing] = new THREE.MeshPhongMaterial({
            color: gray,
            specular: 0x555555,
            shininess: 30
        });

        //engine stream
        materials[engStream] = new THREE.MeshPhongMaterial({
            color: orange,
            specular: 0x555555,
            shininess: 30,
            opacity: 0.5
        });

        //wing stream
        materials[wingSt] = new THREE.MeshPhongMaterial({
            color: blue,
            specular: 0x555555,
            shininess: 30
        });
        materials[wingSt2] = new THREE.MeshPhongMaterial({
            color: blue,
            specular: 0x555555,
            shininess: 30
        });

        var faceMaterial = new THREE.MeshFaceMaterial( materials );
        mesh = new THREE.Mesh( geometry, faceMaterial );

        mesh.position.set( 0, 0, 0 );
        mesh.scale.set(.2,.2,.2);

        mesh.matrixAutoUpdate = true;
        mesh.updateMatrix();

        scene.add( mesh );
    } );
    camera.add(mesh);

    // GROUND
    var groundGeo = new THREE.PlaneBufferGeometry( 250, 2*(maxWidth+2) );

    var loader = new THREE.TextureLoader();
    var texture = loader.load('texture/stone.jpg');
    texture.minFilter = THREE.LinearFilter;
    var groundMat = new THREE.MeshPhongMaterial( { map: texture} );
    groundMat.color.setHSL( 0.095, 1, 0.75 );
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -1;
    scene.add( ground );

    controls = new THREE.StandardControls( camera, document, mesh, .5, maxWidth, maxHeight);
    controls.movementSpeed = 10;
    controls.lookSpeed = 0.125;
    controls.lookVertical = true;
    controls.constrainVertical = true;
    controls.verticalMin = 1.1;
    controls.verticalMax = 2.2;

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );
}
function animate() {

    requestAnimationFrame(animate);

    level(checkLevel());
    detectCollision();

    rotateMesh();
    checkPowerUp();
    shootLasers();

    if(checkLevel() != -1) {
        document.getElementById("score").innerHTML = Math.round(mesh.position.x).toString() + "  Hi:" + getCookie("HighScore");
        document.getElementById("shots").innerHTML = numShots.toString();
        document.getElementById("asteroids").innerHTML = meshCollisionList.length.toString() + "  " + moveAsteroidList.length.toString();
    }
    else
        document.getElementById("caption").innerHTML = "";

    //this handles moving the object and camera together
    controls.update(clock.getDelta()); // required if controls.enableDamping = true, or if controls.autoRotate = true
    mesh.position.set(camera.position.x + 2.2 + explodeEffect + shrinkMoveX, camera.position.y - 1.3 + shrinkMoveY, camera.position.z );
    camera.lookAt(new THREE.Vector3(mesh.position.x + 3 + meshExplode, mesh.position.y, mesh.position.z));

    renderer.render(scene, camera);


    window.addEventListener( 'keydown', checkEnter, true );
}

//restart game with enter
function checkEnter(e){
    var key = e.keyCode;
    if (key == 13 && collision) {
        var btn = document.getElementById("btn");
        btn.click();
        e.preventDefault();
    }
}
function restart() {
    location.reload();
    init();
    animate();
}

init();
animate();

