/**
 * Created by abhanneman10 on 11/20/15.
 */

//lasers
function generateLasers(){
    var time = [10, 900, 1500, 2000];

    for(var i = 0; i < time.length; i++){
        if(mesh.position.x > time[i] && mesh.position.x < time[i]+1){
            var material = new THREE.MeshPhongMaterial({
                color: 0x0000ff,
                specular: 0xffffff,
                shininess: 400
            });
            var ringGeometry = new THREE.TorusGeometry(.5,.2, 16, 10 );
            ringGeometry.rotateY(Math.PI/2);
            var ring = new THREE.Mesh( ringGeometry, material );

            placePowerUp(ring, 80);
            powerUpType = "quick";
        }
    }
}
