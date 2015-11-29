/**
 * Created by abhanneman10 on 11/23/15.
 */

var enemies = [];
var enemyShots = [];

function createEnemy(){
    var loader = new THREE.JSONLoader();
    loader.load( 'obj/enemyShip.json', function ( geometry, materials ) {
        var body = 2;
        var windshield = 1;
        var engine = 0;

        //body
        materials[body] = new THREE.MeshPhongMaterial({ //body
            color: alienGreen,
            specular: 0xffffff,
            shininess: 30
        });

        materials[engine] = new THREE.MeshPhongMaterial({ //body
            color: black,
            specular: 0xffffff,
            shininess: 30
        });
        materials[windshield] = new THREE.MeshPhongMaterial({ //body
            color: black,
            specular: purple,
            shininess: 30
        });

        var faceMaterial = new THREE.MeshFaceMaterial( materials );
        var enemy = new THREE.Mesh( geometry, faceMaterial );

        enemy.position.set( mesh.position.x + 50,
            mesh.position.y + Math.random()*(5 * Math.pow(-1,Math.floor(Math.random() * 2)) + (5 * Math.pow(-1,Math.floor(Math.random() * 2)))),
            mesh.position.z + Math.random()*(5 * Math.pow(-1,Math.floor(Math.random() * 2))) + (5 * Math.pow(-1,Math.floor(Math.random() * 2))) );
        enemy.scale.set(1.2,1.2,1.2);

        enemy.matrixAutoUpdate = true;
        enemy.updateMatrix();
        scene.add( enemy );

        enemy.moveY = Math.floor(Math.random()*(mesh.position.x/100));
        enemy.moveZ = Math.floor(Math.random()*(mesh.position.x/100));

        enemies.push(enemy);
    });
}
function enemyShootLasers(enemy){

    var geometry = new THREE.CylinderGeometry( .2, .2, 1.5, 16 );
    var material = new THREE.MeshPhongMaterial({
        color: purple,
        specular: purple,
        shininess: 100
    });

    var laser = new THREE.Mesh(geometry, material);
    laser.position.x = enemy.position.x - 1;
    laser.position.y = enemy.position.y;
    laser.position.z = enemy.position.z - .4;

    laser.rotateZ(-Math.PI/2);
    enemyShots.push(laser);

    scene.add(laser);
}
function moveEnemies(){
    for(var i = 0; i < enemies.length; i++){
        var y = enemies[i].moveY;
        var z = enemies[i].moveZ;

        if(enemies[i].position.y > mesh.position.y + maxHeight)
            enemies[i].moveY = y*-1;
        else if(enemies[i].position.z > mesh.position.z + maxWidth)
            enemies[i].moveZ = z*-1;
        else if(enemies[i].position.y + maxHeight < mesh.position.y)
            enemies[i].moveY = y*-1;
        else if(enemies[i].position.z + maxWidth < mesh.position.z)
            enemies[i].moveZ = z*-1;

        enemies[i].position.x = (mesh.position.x + 50);
        enemies[i].position.y += enemies[i].moveY/100;
        enemies[i].position.z += enemies[i].moveZ/100;

        if(Math.floor(enemies[i].position.x) % (40+(6*i)) == 0) {
            enemyShootLasers(enemies[i]);
        }
    }

    for(var i = 0; i < enemyShots.length; i++) {

        enemyShots[i].position.x -= (moveXSpeed*1.5);

        if(enemyShots[i].position.x + 5 < mesh.position.x){
            scene.remove(enemyShots[i]);
            enemyShots.splice(i,1);
            i--;
        }
    }
}

