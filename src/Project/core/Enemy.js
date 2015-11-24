/**
 * Created by abhanneman10 on 11/23/15.
 */

var enemies = [];

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

        enemy.position.set( mesh.position.x + 80, mesh.position.y, mesh.position.z );
        enemy.scale.set(1.2,1.2,1.2);

        enemy.matrixAutoUpdate = true;
        enemy.updateMatrix();
        scene.add( enemy );

        enemies.push(enemy);
    });
}

function shootEnemyLasers(enemy){

}
