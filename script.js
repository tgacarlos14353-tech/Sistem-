const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
5000
)

camera.position.set(0,80,160)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById("space").appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera,renderer.domElement)
controls.enableDamping = true

const loader = new THREE.TextureLoader()

// LUZ
const sunLight = new THREE.PointLight(0xffffff,4,5000)
scene.add(sunLight)

const ambient = new THREE.AmbientLight(0xffffff,0.4)
scene.add(ambient)


// ESTRELAS
const starsGeometry = new THREE.BufferGeometry()
const starVertices = []

for(let i=0;i<10000;i++){

starVertices.push(
(Math.random()-0.5)*4000,
(Math.random()-0.5)*4000,
(Math.random()-0.5)*4000
)

}

starsGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(starVertices,3)
)

const starsMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:1
})

const stars = new THREE.Points(starsGeometry,starsMaterial)

scene.add(stars)


// SOL
const sun = new THREE.Mesh(

new THREE.SphereGeometry(20,64,64),

new THREE.MeshBasicMaterial({
map:loader.load("https://threejsfundamentals.org/threejs/resources/images/sun.jpg")
})

)

scene.add(sun)


// FUNÇÃO PLANETA
function createPlanet(size,texture,distance){

const mesh = new THREE.Mesh(

new THREE.SphereGeometry(size,64,64),

new THREE.MeshStandardMaterial({
map:loader.load(texture)
})

)

mesh.position.x = distance

scene.add(mesh)

return mesh

}


// PLANETAS
const mercury = createPlanet(
2,
"https://threejsfundamentals.org/threejs/resources/images/mercury.jpg",
35
)

const venus = createPlanet(
3,
"https://threejsfundamentals.org/threejs/resources/images/venus.jpg",
50
)

const earth = createPlanet(
3.5,
"https://threejsfundamentals.org/threejs/resources/images/earth.jpg",
70
)

const mars = createPlanet(
3,
"https://threejsfundamentals.org/threejs/resources/images/mars.jpg",
90
)

const jupiter = createPlanet(
8,
"https://threejsfundamentals.org/threejs/resources/images/jupiter.jpg",
130
)

const saturn = createPlanet(
7,
"https://threejsfundamentals.org/threejs/resources/images/saturn.jpg",
170
)


// ANEL DE SATURNO
const ringGeo = new THREE.RingGeometry(9,14,64)

const ringMat = new THREE.MeshBasicMaterial({
map:loader.load("https://threejsfundamentals.org/threejs/resources/images/saturnringcolor.jpg"),
side:THREE.DoubleSide
})

const ring = new THREE.Mesh(ringGeo,ringMat)

ring.rotation.x = Math.PI/2

saturn.add(ring)


// LUA
const moon = new THREE.Mesh(
new THREE.SphereGeometry(1,32,32),
new THREE.MeshStandardMaterial({
map:loader.load("https://threejsfundamentals.org/threejs/resources/images/moon.jpg")
})
)

moon.position.x = 7

earth.add(moon)


// ORBITAS
let mercuryOrbit=0
let venusOrbit=0
let earthOrbit=0
let marsOrbit=0
let jupiterOrbit=0
let saturnOrbit=0


function animate(){

requestAnimationFrame(animate)

mercuryOrbit+=0.04
venusOrbit+=0.02
earthOrbit+=0.01
marsOrbit+=0.008
jupiterOrbit+=0.003
saturnOrbit+=0.002

mercury.position.x=Math.cos(mercuryOrbit)*35
mercury.position.z=Math.sin(mercuryOrbit)*35

venus.position.x=Math.cos(venusOrbit)*50
venus.position.z=Math.sin(venusOrbit)*50

earth.position.x=Math.cos(earthOrbit)*70
earth.position.z=Math.sin(earthOrbit)*70

mars.position.x=Math.cos(marsOrbit)*90
mars.position.z=Math.sin(marsOrbit)*90

jupiter.position.x=Math.cos(jupiterOrbit)*130
jupiter.position.z=Math.sin(jupiterOrbit)*130

saturn.position.x=Math.cos(saturnOrbit)*170
saturn.position.z=Math.sin(saturnOrbit)*170


// rotações
earth.rotation.y+=0.02
moon.rotation.y+=0.04

controls.update()

renderer.render(scene,camera)

}

animate()


window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})
