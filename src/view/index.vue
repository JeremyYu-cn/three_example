<script setup lang="ts">
import { Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, LineBasicMaterial, Vector3, Line, BufferGeometry } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted } from 'vue'

function createLine() {
  const points: Vector3[] = []
  points.push(new Vector3(-10, 0, 0))
  points.push(new Vector3(0, 10, 0))
  points.push(new Vector3(10, 0, 0))
  points.push(new Vector3(0, 0, 10))
  const grometry = new BufferGeometry().setFromPoints(points)
  const material = new LineBasicMaterial({ color: "#0000ff" })
  return new Line(grometry, material)
}

const cubeMaterial = new MeshBasicMaterial({ color: "#a1a1a1" })

function createCube(
  preWidth: number,
  preDepth: number,
  floorWidth: number,
  floorHeight: number,
  marginLeft: number = 10,
  marginRight: number = 10,
) {
  const width = preWidth
  const height = 100 * Math.random() + 30
  const depth = preDepth
  const grometry = new BoxGeometry(width, height, depth)
  const totalRow = floorWidth / (preWidth + marginLeft)
  const totalColumn = floorHeight / (preWidth + marginLeft)
  const cubeArr: Mesh[] = []
  for(let i = 0; i < totalColumn; i++) {
    for(let j = 0; j < totalRow; j++) {
      const cube = new Mesh(grometry, cubeMaterial)
      cube.position.set(j * width + marginLeft, i * preDepth + marginRight, i * preDepth + marginRight)
      cubeArr.push(cube)
    }
  }
  return cubeArr
}

onMounted(() => {
  
  const scene = new Scene()
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const render = new WebGLRenderer()
  render.setSize(window.innerWidth, window.innerHeight)
  document.querySelector("#area_page")?.appendChild(render.domElement)
  
  const geometry = new BoxGeometry(500, 500, 0.1)
  const material = new MeshBasicMaterial({ color: "#f5f5f5" })
  const floor = new Mesh(geometry, material)
  const buildings = createCube(10, 10, window.innerWidth, window.innerHeight)
  console.log(buildings);
  
  buildings.forEach(val => {
    scene.add(val)
  })
  scene.add(floor)
  camera.position.z = 50;
  camera.position.x = 0;

  floor.rotation.x = 4.1

  const controls = new OrbitControls(camera, render.domElement)
  controls.enableRotate = true
  camera.position.set(-300, 600, 200)
  controls.update()
  // function animation() {
  //   requestAnimationFrame(animation)
  //   render.render(scene, camera);
  // }

  // animation()
  
  render.render(scene, camera)
})

</script>

<template>
  <div id="area_page" />
</template>

<style lang="scss">

</style>
