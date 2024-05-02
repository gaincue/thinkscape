import * as THREE from 'three'
import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer, Text3D, Center, Stats } from '@react-three/drei'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import useSound from 'use-sound'

export const App = () => {
  return <Scene />
}

function Scene(props) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{
        position: [0, 0, 3]
      }}
      {...props}>
      <color
        attach="background"
        // args={[null]}
        args={['#ffff00']}
      />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
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
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
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

function Model({ children, color = 'white', roughness = 0, ...props }) {
  // const { scene } = useGLTF('/test.glb')
  // const { scene } = useGLTF('/test2.glb')
  const { scene } = useGLTF('/Test 2.gltf')
  const [play] = useSound('/sfx.mp3', { volume: 0.1 })

  return (
    <>
      <group scale={2} position={[-4.2, -3.2, 7.3]}>
        {scene.children.map((child) => {
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
