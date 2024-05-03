import * as THREE from 'three'
import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer, Text3D, Center, Stats, useEnvironment } from '@react-three/drei'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import useSound from 'use-sound'

export const App = () => {
  return <Scene />
}

function Scene(props) {

  return (
    <Canvas
      // shadows
      // dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{
        position: [0, 0, 3]
      }}
      {...props}>
      <color
        attach="background"
        // args={[null]}
        args={['#faeb1e']}
      />
      {/* <ambientLight intensity={0.4} /> */}
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow /> */}
      {/* <OrbitControls enableZoom /> */}
      <TT />
      <Stats />
      <Suspense>
        <Physics
          // debug
          gravity={[0, 0, 0]}
          colliders={false}
          //
        >
          <Pointer />
          <Model />
        </Physics>
      </Suspense>
      {/* <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer> */}
      {/* <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment> */}
    </Canvas>
  )
}

function TT() {
  const camera = useThree((state) => state.camera)

  return (
    <group position={[-1, 0, 0]} scale={1.5}>
      <Center>
        <Text3D size={0.5} height={0.01} quaternion={camera.quaternion} font="/Inter_Bold.json" position={[0, 1.2, 0]}>
          THINK
          <meshStandardMaterial color="black" />
        </Text3D>
        <Text3D size={0.3} height={0.01} quaternion={camera.quaternion} font="/Inter_Bold.json" position={[0, 0.8, 0]}>
          OF
          <meshStandardMaterial color="black" />
        </Text3D>
        <Text3D size={0.3} height={0.01} quaternion={camera.quaternion} font="/Inter_Bold.json" position={[0, 0.4, 0]}>
          SIMPLE
          <meshStandardMaterial color="black" />
        </Text3D>
        <Text3D size={0.4} height={0.01} quaternion={camera.quaternion} font="/Inter_Bold.json" position={[0, -0.1, 0]}>
          POTENT
          <meshStandardMaterial color="black" />
        </Text3D>
        <Text3D size={0.5} height={0.01} quaternion={camera.quaternion} font="/Inter_Bold.json" position={[0, -0.7, 0]}>
          IDEAS
          <meshStandardMaterial color="black" />
        </Text3D>
      </Center>
    </group>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
  })

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <CuboidCollider args={[0.1, 0.1, 10]} />
    </RigidBody>
  )
}


/*--- refraction start ---*/
const materialPink = new THREE.MeshPhysicalMaterial({
  color: 0xf00074,
  transmission: 1.8,
  thickness: 100,
  roughness: 0,
  ior: 2.1,
  reflectivity: 0.95,
  metalness: 0.25
});
const materialYellow = new THREE.MeshPhysicalMaterial({
  color: 0xf5cc00,
  transmission: 1,
  thickness: 80,
  roughness: 0,
  ior: 2.3,
  reflectivity: 1,
  metalness: 0
});
const materialOrange = new THREE.MeshPhysicalMaterial({
  color: 0xf08000,
  transmission: 1.6,
  thickness: 100,
  roughness: 0.1,
  ior: 1.7,
  reflectivity: 0.7,
  metalness: 0.1
});
const materialBlue = new THREE.MeshPhysicalMaterial({
  color: 0x0034d1,
  transmission: 10,
  thickness: 150,
  roughness: 0,
  ior: 2.5,
  reflectivity: 0.6,
  metalness: 0.8
});


function Model({ children, color = 'white', roughness = 0, ...props }) {
  // const { scene } = useGLTF('/test.glb')
  // const { scene } = useGLTF('/test2.glb')
  const { scene } = useGLTF('/model.gltf')
  const [play] = useSound('/sfx.mp3', { volume: 0.1 })

  /*--- refraction start ---*/
  const envMap = useEnvironment({files:"/hdri.jpg"})
  /*--- refraction end ---*/

  return (
    <>
      <Environment map={envMap} />
      <group scale={2} position={[-4.2, -3.2, 7.3]}>
        {scene.children.map((child) => {
          scene.traverse((child) =>
          {
              if (child.name.includes("pink") ){
                  child.material = materialPink;
                  child.material.side = THREE.DoubleSide;
              }
              if (child.name.includes("yellow") ){
                child.material = materialYellow;
                child.material.side = THREE.DoubleSide;
              }
              if (child.name.includes("orange") ){
                child.material = materialOrange;
                child.material.side = THREE.DoubleSide;
              }
              if (child.name.includes("blue") ){
                child.material = materialBlue;
                child.material.side = THREE.DoubleSide;
              }
          })
          return (
            <RigidMesh key={child.uuid} position={child.position} playAudio={play}>
              <primitive object={child.children[0]} quarternion={child.quaternion} rotation={child.rotation} />
            </RigidMesh>
          )
        })}
      </group>
    </>
  )
}

function RigidMesh({ children, position, playAudio }) {
  const api = useRef()
  const pos = useMemo(() => position || [r(10), r(10), r(10)], [])

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders="ball"
      onCollisionEnter={({ manifold }) => {
        console.log('Collision at world position ', manifold.solverContactPoint(0))
        playAudio()
      }}
      //
    >
      {children}
    </RigidBody>
  )
}
