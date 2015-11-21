/**
 * @author AlexBHanneman / http://alexbhanneman.com/
 */

THREE.StandardControls = function ( object, domElement, plane, speedScale, maxWidth, maxAltitude ) {
	this.object = object;
    this.plane = plane;
	this.target = new THREE.Vector3( 0, 0, 0 );

    this.rightTilt = false;
    this.leftTilt = false;
    this.upTilt = false;
    this.downTilt = false;

    this.speedScale = speedScale;
    this.maxWidth = maxWidth;
    this.maxAltitude = maxAltitude;
    var move;

    this.rotate = 0;
    this.degRotated = 0;

    this.rotateVert = 0;
    this.degRotatedVert = 0;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.movementSpeed = 0.01;
	this.lookSpeed = 0.005;

	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lat = 0;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.moveUp = false;
	this.moveDown = false;
	this.moveLeft = false;
	this.moveRight = false;
    this.allowMove = true;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;

	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', - 1 );

	}

    this.turnOff = function(){
        this.allowMove = false;
    };

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

    this.onMouseDown = function ( event ) {

        if ( this.domElement !== document ) {

            this.domElement.focus();

        }

        event.preventDefault();
        event.stopPropagation();

        if ( this.activeLook ) {

            switch ( event.button ) {

                case 0:
                    this.mouseX = event.pageX - this.viewHalfX;
                    break;
                case 2:
                    //this.mouseY = event.pageY - this.viewHalfY;
                    break;

            }

        }

        this.mouseDragOn = true;

    };

    this.onMouseUp = function ( event ) {

        event.preventDefault();
        event.stopPropagation();

        if ( this.activeLook ) {

            switch ( event.button ) {

                case 0:
                    this.mouseX = 0;
                    break;
                case 2:
                    this.mouseY = 0;
                    break;

            }

        }

        this.mouseDragOn = false;

    };

	this.onMouseMove = function ( event ) {

		if ( this.domElement === document ) {

			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;

		} else {

			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

		}

	};

	this.onKeyDown = function ( event ) {

		//event.preventDefault();


        if (this.rotate == 0)
        {
            if(this.leftTilt)
                this.rotate = .0001;
            else if(this.rightTilt)
                this.rotate = -.0001;
        }

        if (this.rotateVert == 0)
        {
            if(this.upTilt)
                this.rotateVert = -.0001;
            else if(this.downTilt)
                this.rotateVert = .0001;
        }

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/
                this.moveUp = true;

                if(!this.upTilt) {
                    this.rotateVert = Math.PI / 360;
                    this.upTilt = true;
                }
                else {
                    this.rotateVert = 0;
                }

                break;

			case 37: /*left*/
			case 65: /*A*/
                this.moveLeft = true;

                if(!this.leftTilt) {
                    this.rotate = -Math.PI / 270;
                    this.leftTilt = true;
                }
                else {
                    this.rotate = 0;
                }

                break;

			case 40: /*down*/
			case 83: /*S*/
                this.moveDown = true;
                if(!this.downTilt) {
                    this.rotateVert = -Math.PI / 360;
                    this.downTilt = true;
                }
                else {
                    this.rotateVert = 0;
                }
                break;

			case 39: /*right*/
			case 68: /*D*/
                this.moveRight = true;

                if(!this.rightTilt) {
                    this.rotate = Math.PI / 270;
                    this.rightTilt = true;
                }
                else
                    this.rotate = 0;


                break;

		}

	};

	this.onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/
                this.moveUp = false;
                this.upTilt = false;
                break;

			case 37: /*left*/
			case 65: /*A*/
                this.moveLeft = false;
                this.leftTilt = false;
                break;

			case 40: /*down*/
			case 83: /*S*/
                this.moveDown = false;
                this.downTilt = false;
                break;

			case 39: /*right*/
			case 68: /*D*/
                this.moveRight = false;
                this.rightTilt = false;
                break;

		}

	};

    this.updateShipSpeed = function(speed){
        this.speedScale = speed;
    };

	this.update = function( delta ) {


        if(Math.abs(this.rotate) > 2)
            this.rotate = 0;

		if ( this.enabled === false ) return;

		if ( this.heightSpeed ) {

			var y = THREE.Math.clamp( this.plane.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed * this.speedScale;

        if(this.allowMove){
            //handles moving up
            if ( this.moveUp ) {

                this.object.position.y += actualMoveSpeed;
                move = true;

                //if(this.object.position.y < this.maxAltitude){
                //    this.object.position.y += actualMoveSpeed;
                //    move = true;
                //}
                //else{
                //    this.object.position.y = maxAltitude;
                //    move = false;
                //}
            }

            //handles moving down
            if ( this.moveDown ) {

                this.object.position.y -= actualMoveSpeed;
                move = true;

                //if(this.object.position.y > -this.maxAltitude){
                //    this.object.position.y -= actualMoveSpeed;
                //    move = true;
                //}
                //else{
                //    this.object.position.y = -this.maxAltitude;
                //    move = false;
                //}
            }

            //handles moving left
            if ( this.moveLeft ) {

                this.object.position.z -= actualMoveSpeed;
                move = true;

                //if(this.object.position.z > -maxWidth) {
                //    this.object.position.z -= actualMoveSpeed;
                //    move = true;
                //}
                //else{
                //    this.object.position.z = -maxWidth;
                //    move = false;
                //}
            }

            //handles moving right
            if ( this.moveRight ) {

                this.object.position.z += actualMoveSpeed;
                move = true;

                //if(this.object.position.z < maxWidth) {
                //    this.object.position.z += actualMoveSpeed;
                //    move = true;
                //}
                //else{
                //    this.object.position.z = maxWidth;
                //    move = false;
                //}
            }
        }

		var actualLookSpeed = delta * this.lookSpeed;

		if ( ! this.activeLook ) {

			actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

		}

        //this.lon += this.mouseX * actualLookSpeed;
        //if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
        //
        //this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
        //this.phi = THREE.Math.degToRad( 90 - this.lat );
        //
        //this.theta = THREE.Math.degToRad( this.lon );
        //
        //if ( this.constrainVertical ) {
        //
        //    this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);
        //
        //}
	};

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function() {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );

		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );

	};

	var _onMouseMove = bind( this, this.onMouseMove );
	var _onMouseDown = bind( this, this.onMouseDown );
	var _onMouseUp = bind( this, this.onMouseUp );
	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
	this.domElement.addEventListener( 'mouseup', _onMouseUp, false );

	window.addEventListener( 'keydown', _onKeyDown, true );
	window.addEventListener( 'keyup', _onKeyUp, true );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}

	this.handleResize();

};
