

var backgroundScene, backgroundMesh, backgroundCamera, scene, camera, renderer, model, itemsToLoad = 1,
    stopSpinning = false,
    once = true,
    loaded = 0,
    speed, globe;

function checkLoad() {
    loaded++;
    console.log("loaded++");
    if (loaded == itemsToLoad) {
        console.log("if state");
        render();
        document.getElementById("preloader").style.visibility = 'hidden';

    }
}

function init() {

    if (!Detector.webgl) Detector.addGetWebGLMessage();
    console.log("init");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x141414, 1)
    document.body.appendChild(renderer.domElement);
    
    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
    scene.add(light);

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('globe_3.dae', function (collada) {
        var dae = collada.scene;
        dae.scale.x = dae.scale.y = dae.scale.z = 0.05;
        dae.updateMatrix();
        globe = dae;
        scene.add(globe);

        console.log("loaded model");

        checkLoad();
    });

    camera.position.set(50, 15, 50);
    camera.rotation.y = 0.8;
    
    //image files are from http://www.custommapmakers.org/skyboxes.php
    var geometry = new THREE.BoxGeometry (1200,1200,1200)
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("/library/SkyBox/front.jpg"), side: THREE.DoubleSide}),
    
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("/library/SkyBox/back.jpg"), side: THREE.DoubleSide}),
    
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("/library/SkyBox/up.jpg"), side: THREE.DoubleSide}),
    
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("/library/SkyBox/down.jpg"), side: THREE.DoubleSide}),
    
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("/library/SkyBox/right.jpg"), side: THREE.DoubleSide}),
    
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("/library/SkyBox/left.jpg"), side: THREE.DoubleSide})
    ];
    
    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var cube = new THREE.Mesh(geometry, cubeMaterial);
    scene.add(cube);
    

//        var axesHelper = new THREE.AxesHelper( 1000 );
//        scene.add(axesHelper);
}

const rotateGlobe = () => {
    if (!stopSpinning) {
        speed = 0.01, globe.rotation.y -= speed / 2
    } else {
        let ocean1 = (Math.sin(globe.rotation.y) < 0.9) && (Math.sin(globe.rotation.y) > 0.8) && (Math.cos(globe.rotation.y) < 0.5) && (Math.cos(globe.rotation.y) > 0.4);
        if (once == true && ocean1 == false) {
            speed = 0.01, globe.rotation.y -= speed / 2
        } else {
            once = false;
        }
    }

}

function render() {
    requestAnimationFrame(render);
    rotateGlobe();
    TWEEN.update();
    renderer.render(scene, camera);
}

function start() {
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 40,
        y: 17,
        z: 20
    }, 3000).easing(TWEEN.Easing.Quadratic.InOut);
    pos1.start();


    $("#startButton").delay(0).fadeOut(0);
    $("#textBoxOne").delay(5000).fadeIn(1000);
    $("#pageTitleOne").delay(1000).fadeIn(1000);
    $("#nextButtonOne").delay(5000).fadeIn(1000);
    $("#subheaderOne").delay(3000).fadeIn(1000);


};

function nextOne() {
    $("#textBoxOne").delay(0).fadeOut(1000);
    $("#pageTitleOne").delay(0).fadeOut(1000);
    $("#nextButtonOne").delay(0).fadeOut(1000);
    $("#subheaderOne").delay(0).fadeOut(1000);


    $("#nextButtonTwo").delay(6000).fadeIn(1000);
    $("#textBoxTwo").delay(3000).fadeIn(1000);
    $("#pageTitleTwo").delay(1000).fadeIn(1000);
    $("#subheaderTwo").delay(2000).fadeIn(1000);


    stopSpinning = true;
}

function nextTwo() {
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 14,
        y: 27,
        z: 14
    }, 3000).easing(TWEEN.Easing.Quadratic.InOut);
    pos1.start();
    
    $("#nextButtonTwo").delay(0).fadeOut(1000);
    $("#textBoxTwo").delay(0).fadeOut(1000);
    $("#pageTitleTwo").delay(0).fadeOut(1000);
    $("#subheaderTwo").delay(0).fadeOut(1000);

    
    $("#textBoxThree").delay(3000).fadeIn(1000);
    $("#pageTitleThree").delay(1000).fadeIn(1000);
    $("#subheaderThree").delay(2000).fadeIn(1000);




};


init();
