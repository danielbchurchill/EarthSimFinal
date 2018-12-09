var scene, camera, renderer, model;

function init() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
                antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000, 1)
    document.body.appendChild(renderer.domElement);
            
            
    var light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
    scene.add(light);

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('globe_3.dae', function(collada){
                var dae = collada.scene;
                dae.scale.x = dae.scale.y = dae.scale.z = 0.05;
                dae.updateMatrix();
                scene.add(dae);
        
                    var speed = 0.01;
                    function rotateGlobe(){
                        dae.rotation.y -= speed/2;
                    }
        
                    function render (){
                        requestAnimationFrame(render);
                        rotateGlobe();
                        TWEEN.update();
                        renderer.render(scene,camera);
                    }
        
                render();
    });
            
    camera.position.set(50, 15, 50);
    camera.rotation.y= 0.8;
        
//    var axesHelper = new THREE.AxesHelper( 100 );
//    scene.add(axesHelper);
           
}

function start(){
    var pos1 = new TWEEN.Tween(camera.position).to({
        x: 40,
        y: 17,
        z: 20
    },4000).easing(TWEEN.Easing.Quadratic.InOut);
    pos1.start();
}

init();
