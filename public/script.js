(function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.z = 30;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.AmbientLight(0xFFFFFF);
    scene.add(light);

    var geometry = new THREE.SphereGeometry(10, 32, 32);
    var material = new THREE.MeshPhongMaterial();
    material.map = new THREE.TextureLoader().load('./assets/earthmap4k.jpg');
    var earthMesh = new THREE.Mesh( geometry, material );

    scene.add( earthMesh );

    var orbit = new THREE.OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = false;

    var render = () => {
        requestAnimationFrame(render);
        earthMesh.rotation.x += 0.005;
        earthMesh.rotation.y += 0.005;
        renderer.render(scene, camera);
    };
    render();

    var imagePrefix = "./assets/";
    var urls = [ 'space.jpg', 'space.jpg', 'space.jpg', 'space.jpg', 'space.jpg', 'space.jpg' ];
    var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
    scene.background = skyBox;

    var controls = new function() {
        this.textColor = 0xffae23;
        this.guiRotationX = 0.005;
        this.guiRotationY = 0.005;
    };

    var gui = new dat.GUI();
    gui.add(controls, 'guiRotationX', 0, .2);
    gui.add(controls, 'guiRotationY', 0, .2);

    gui.addColor(controls, 'textColor').onChange(function (e) {
        textMesh.material.color = new THREE.Color(e);
    });

    earthMesh.rotation.x += controls.guiRotationX;
    earthMesh.rotation.y += controls.guiRotationY;
})();
