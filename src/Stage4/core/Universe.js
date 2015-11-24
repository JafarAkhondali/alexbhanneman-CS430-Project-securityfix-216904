/**
 * Created by abhanneman10 on 11/21/15.
 */

var incPlanet = 0;
var textureMap = ['texture/meteor.gif', 'texture/sandstone.jpg', 'texture/yellowLava.jpg', 'texture/exploded.jpg',
    'texture/neptune.png','texture/earth.jpg', 'texture/venus.jpg', 'texture/jupiter.png','texture/gas.jpg',
    'texture/mars.png'];
var segmentsPlanet = 100;

function createUniverse(){
    for(var i = 0; i < textureMap.length; i++){
        var planet = createPlanet();
        placePlanet(planet);
        incPlanet++;
    }
    createStars();
}
function createPlanet(){

    var planet = new THREE.SphereGeometry( 100, segmentsPlanet, segmentsPlanet );
    var loader = new THREE.TextureLoader();
    var texture = loader.load(textureMap[incPlanet]);
    texture.minFilter = THREE.LinearFilter;
    var mat = new THREE.MeshPhongMaterial( { map: texture, overdraw: true } );
    var meshPlanet = new THREE.Mesh( planet, mat);
    return meshPlanet;
}
function placePlanet(planet){

    var x = Math.random() * 10000;
    var y = (Math.random() * 5000) - 2500;
    var z = (Math.random() * 5000) - 2500;

    planet.position.set(x,y,z);
    scene.add( planet );
}
function createStars(){

    var starQty = 400;

    for (var i = 0; i < starQty; i++) {
        var geometry   = new THREE.SphereGeometry(3, 16, 16);
        var material = new THREE.MeshPhongMaterial({
            color: white,
            specular: white,
            shininess: 100
        });
        var star = new THREE.Mesh(geometry, material);
        star.position.x = Math.random() * 10000;
        star.position.y = Math.random() * 10000 - 5000;
        star.position.z = Math.random() * 10000 - 5000;
        scene.add(star);
    }
}
