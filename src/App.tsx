/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as THREE from "three"
import { FC, PropsWithChildren, Suspense, useMemo, useRef } from "react"
import { Canvas, ReactThreeFiber, useFrame, useThree } from "@react-three/fiber"
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Center,
  Environment,
  // Instance,
  // Instances,
  // OrbitControls,
  PerformanceMonitor,
  // Stats,
  Text3D,
  useEnvironment,
  useGLTF,
  // usePerformanceMonitor,
} from "@react-three/drei"
import { CuboidCollider, Physics, RapierRigidBody, RigidBody } from "@react-three/rapier"
import useSound from "use-sound"

THREE.ColorManagement.enabled = true

// const randomVector = (r: number) => [
//   r / 2 - Math.random() * r,
//   r / 2 - Math.random() * r,
//   r / 2 - Math.random() * r,
// ]
// const randomEuler = () => [
//   Math.random() * Math.PI,
//   Math.random() * Math.PI,
//   Math.random() * Math.PI,
// ]

// const box = new THREE.BoxGeometry()
// const torus = new THREE.TorusGeometry()
// const sphere = new THREE.SphereGeometry()
// const cylinder = new THREE.CylinderGeometry()

// const configPink = {
//   color: 0xf00074,
//   transmission: 1.8,
//   thickness: 100,
//   roughness: 0,
//   ior: 2.1,
//   reflectivity: 0.95,
//   metalness: 0.25,
// }
// const configYellow = {
//   color: 0xf5cc00,
//   transmission: 1,
//   thickness: 80,
//   roughness: 0,
//   ior: 2.3,
//   reflectivity: 1,
//   metalness: 0,
// }
// const configOrange = {
//   color: 0xf08000,
//   transmission: 1.6,
//   thickness: 100,
//   roughness: 0.1,
//   ior: 1.7,
//   reflectivity: 0.7,
//   metalness: 0.1,
// }
// const configBlue = {
//   color: 0x0034d1,
//   transmission: 10,
//   thickness: 150,
//   roughness: 0,
//   ior: 2.5,
//   reflectivity: 0.6,
//   metalness: 0.8,
// }
const materialPink = new THREE.MeshPhysicalMaterial({
  color: 0xf00074,
  transmission: 1.8,
  thickness: 100,
  roughness: 0,
  ior: 2.1,
  reflectivity: 0.95,
  metalness: 0.25,
})
const materialYellow = new THREE.MeshPhysicalMaterial({
  color: 0xf5cc00,
  transmission: 1,
  thickness: 80,
  roughness: 0,
  ior: 2.3,
  reflectivity: 1,
  metalness: 0,
})
const materialOrange = new THREE.MeshPhysicalMaterial({
  color: 0xf08000,
  transmission: 1.6,
  thickness: 100,
  roughness: 0.1,
  ior: 1.7,
  reflectivity: 0.7,
  metalness: 0.1,
})
const materialBlue = new THREE.MeshPhysicalMaterial({
  color: 0x0034d1,
  transmission: 10,
  thickness: 150,
  roughness: 0,
  ior: 2.5,
  reflectivity: 0.6,
  metalness: 0.8,
})

function App() {
  return (
    <>
      <Canvas
        shadows={false}
        gl={{ antialias: true }}
        camera={{
          position: [0, 0, 3],
        }}
        // frameloop="demand"
      >
        <PerformanceMonitor factor={0.5}>
          {/* <Stats /> */}
          <color attach="background" args={["#faeb1e"]} />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          {/* <OrbitControls /> */}
          <Suspense>
            <TT />
            <Physics gravity={[0, 0, 0]} colliders={false}>
              <Pointer />
              <Model />
            </Physics>
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </>
  )
}

function TT() {
  const camera = useThree((state) => {
    console.log(state)
    return state.camera
  })

  return (
    <>
      <group position={[-1.5, 0, 0]} scale={1.5}>
        <Center>
          <Text3D
            size={0.48}
            height={0.01}
            quaternion={camera.quaternion}
            font="/BebasNeue.json"
            position={[0, 1.2, 0]}
          >
            THINK
            <meshStandardMaterial color="black" />
          </Text3D>
          <Text3D
            size={0.15}
            height={0.01}
            letterSpacing={0.02}
            quaternion={camera.quaternion}
            font="/Ultra_Regular.json"
            position={[0.43, 1, 0]}
          >
            OF
            <meshStandardMaterial color="black" />
          </Text3D>
          <Text3D
            size={0.15}
            height={0.01}
            letterSpacing={0.02}
            quaternion={camera.quaternion}
            font="/Ultra_Regular.json"
            position={[0.08, 0.8, 0]}
          >
            SIMPLE
            <meshStandardMaterial color="black" />
          </Text3D>
          <Text3D
            size={0.15}
            height={0.01}
            letterSpacing={0.02}
            quaternion={camera.quaternion}
            font="/Ultra_Regular.json"
            position={[0.055, 0.6, 0]}
          >
            POTENT
            <meshStandardMaterial color="black" />
          </Text3D>
          <Text3D
            size={0.5}
            height={0.01}
            quaternion={camera.quaternion}
            font="/BebasNeue.json"
            position={[0, 0.06, 0]}
          >
            IDEAS
            <meshStandardMaterial color="black" />
          </Text3D>
        </Center>
      </group>
      <group position={[1.5, 0, 0]} scale={1.5}>
        <Center>
          <Text3D
            size={0.48}
            height={0.01}
            quaternion={camera.quaternion}
            font="/BebasNeue.json"
            position={[0, 1.2, 0]}
          >
            SHAPE
            <meshStandardMaterial color="black" />
          </Text3D>
          <Text3D
            size={0.15}
            height={0.01}
            letterSpacing={0.02}
            quaternion={camera.quaternion}
            font="/Ultra_Regular.json"
            position={[0.12, 1, 0]}
          >
            DEEPLY
            <meshStandardMaterial color="black" />
          </Text3D>
          <Text3D
            size={0.15}
            height={0.01}
            letterSpacing={0.02}
            quaternion={camera.quaternion}
            font="/Ultra_Regular.json"
            position={[0.26, 0.8, 0]}
          >
            VIVID
            <meshStandardMaterial color="black" />
          </Text3D>
          <Text3D
            size={0.15}
            height={0.01}
            letterSpacing={0.02}
            quaternion={camera.quaternion}
            font="/Ultra_Regular.json"
            position={[0.26, 0.6, 0]}
          >
            MIND
            <meshStandardMaterial color="black" />
          </Text3D>
          <Text3D
            size={0.5}
            height={0.01}
            quaternion={camera.quaternion}
            font="/BebasNeue.json"
            position={[0, 0.06, 0]}
          >
            SCAPE
            <meshStandardMaterial color="black" />
          </Text3D>
        </Center>
      </group>
    </>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef<RapierRigidBody>(null)
  useFrame(({ pointer, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)
    )
  })

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <CuboidCollider args={[0.1, 0.1, 10]} />
    </RigidBody>
  )
}

function Model() {
  const { scene } = useGLTF("/model.gltf")
  // const [population, setPopulation] = useState(0.5)
  // usePerformanceMonitor({
  //   // onIncline: () => {},
  //   // onDecline: () => {},
  //   onChange: ({ factor }) => {
  //     setPopulation(factor)
  //   },
  // })

  const [play1] = useSound("/sound-1.wav", { volume: 0.4 })
  const [play2] = useSound("/sound-2.wav", { volume: 0.4 })
  const [play3] = useSound("/sound-3.wav", { volume: 0.4 })
  const [play4] = useSound("/sound-4.wav", { volume: 0.4 })

  const play = () => {
    // randomly play from 1,2,3,4
    const random = Math.floor(Math.random() * 4) + 1
    if (random === 1) play1()
    if (random === 2) play2()
    if (random === 3) play3()
    if (random === 4) play4()
  }

  /*--- refraction start ---*/
  const envMap = useEnvironment({
    files: "/hdri.jpg",
  })
  /*--- refraction end ---*/

  const processedScene = useMemo(() => {
    scene.traverse((child) => {
      if (child.name.includes("pink")) {
        // @ts-ignore
        child.material = materialPink
        // @ts-ignore
        child.material.side = THREE.DoubleSide
      }
      if (child.name.includes("yellow")) {
        // @ts-ignore
        child.material = materialYellow
        // @ts-ignore
        child.material.side = THREE.DoubleSide
      }
      if (child.name.includes("orange")) {
        // @ts-ignore
        child.material = materialOrange
        // @ts-ignore
        child.material.side = THREE.DoubleSide
      }
      if (child.name.includes("blue")) {
        // @ts-ignore
        child.material = materialBlue
        // @ts-ignore
        child.material.side = THREE.DoubleSide
      }
    })

    return scene
  }, [scene])

  // const optimizedScene = useMemo(() => {
  //   const newScene = processedScene.clone()
  //   newScene.children = newScene.children.slice(0, newScene.children.length * (population / 1))
  //   return newScene
  // }, [processedScene, population])

  // return (
  //   <>
  //     <Environment map={envMap} />

  //     <group scale={2} position={[-4.2, -3.2, 7.3]}>
  //       {scene.children.map((child, index) => {
  //         if (index > 50) {
  //           return <></>
  //         }

  //         return (
  //           <RigidMesh key={child.uuid} position={child.position} playAudio={play}>
  //             <mesh
  //               // @ts-ignore
  //               geometry={child.children[0].geometry}
  //               position={child.children[0].position}
  //               rotation={child.rotation}
  //               scale={child.children[0].scale}
  //             >
  //               <meshPhysicalMaterial
  //                 side={THREE.DoubleSide}
  //                 {...(child.children[0].name.includes("pink")
  //                   ? { ...configPink }
  //                   : child.children[0].name.includes("yellow")
  //                   ? { ...configYellow }
  //                   : child.children[0].name.includes("orange")
  //                   ? { ...configOrange }
  //                   : { ...configBlue })}
  //               />
  //               {/* <MeshTransmissionMaterial
  //           // samples={10}
  //           // side={THREE.DoubleSide}
  //           backside={true}
  //           resolution={32}
  //           backsideResolution={32}
  //           {...(child.children[0].name.includes("pink")
  //             ? { ...configPink }
  //             : child.children[0].name.includes("yellow")
  //             ? { ...configYellow }
  //             : child.children[0].name.includes("orange")
  //             ? { ...configOrange }
  //             : { ...configBlue })}
  //         /> */}
  //             </mesh>
  //           </RigidMesh>
  //         )
  //       })}
  //     </group>
  //   </>
  // )

  return (
    <>
      <Environment map={envMap} />

      <group scale={2} position={[-4.2, -3.2, 7.3]}>
        {/* <InstancedBox />
        <InstancedSphere />
        <InstancedTorus />
        <InstancedCylinder /> */}
        {processedScene.children.map((child) => {
          return (
            <RigidMesh key={child.uuid} position={child.position} playAudio={play}>
              <primitive
                object={child.children[0]}
                quarternion={child.quaternion}
                rotation={child.rotation}
              />
            </RigidMesh>
          )
        })}
      </group>
    </>
  )
}

// function InstancedBox() {
//   const positions = useMemo(
//     () =>
//       Array.from({ length: 30 }, (r = 10) => ({
//         random: Math.random(),
//         scale: Math.random(),
//         position: randomVector(r as number),
//         rotation: randomEuler(),
//       })),
//     []
//   )

//   return (
//     <Instances
//       limit={30} // Optional: max amount of items (for calculating buffer size)
//       range={10} // Optional: draw-range
//       material={materialYellow}
//       // @ts-ignore
//       geometry={box}
//     >
//       {positions.map((props, index) => {
//         return (
//           // @ts-ignore
//           <group key={index} {...props}>
//             <Instance />
//           </group>
//         )
//       })}
//     </Instances>
//   )
// }
// function InstancedTorus() {
//   const positions = useMemo(
//     () =>
//       Array.from({ length: 30 }, (r = 10) => ({
//         random: Math.random(),
//         scale: Math.random(),
//         position: randomVector(r as number),
//         rotation: randomEuler(),
//       })),
//     []
//   )

//   return (
//     <Instances
//       limit={30} // Optional: max amount of items (for calculating buffer size)
//       range={10} // Optional: draw-range
//       material={materialBlue}
//       // @ts-ignore
//       geometry={torus}
//     >
//       {positions.map((props, index) => {
//         return (
//           // @ts-ignore
//           <group key={index} {...props}>
//             <Instance />
//           </group>
//         )
//       })}
//     </Instances>
//   )
// }
// function InstancedSphere() {
//   const positions = useMemo(
//     () =>
//       Array.from({ length: 30 }, (r = 10) => ({
//         random: Math.random(),
//         scale: Math.random(),
//         position: randomVector(r as number),
//         rotation: randomEuler(),
//       })),
//     []
//   )

//   return (
//     <Instances
//       limit={30} // Optional: max amount of items (for calculating buffer size)
//       range={10} // Optional: draw-range
//       material={materialOrange}
//       // @ts-ignore
//       geometry={sphere}
//     >
//       {positions.map((props, index) => {
//         return (
//           // @ts-ignore
//           <group key={index} {...props}>
//             <Instance />
//           </group>
//         )
//       })}
//     </Instances>
//   )
// }
// function InstancedCylinder() {
//   const positions = useMemo(
//     () =>
//       Array.from({ length: 30 }, (r = 10) => ({
//         random: Math.random(),
//         scale: Math.random(),
//         position: randomVector(r as number),
//         rotation: randomEuler(),
//       })),
//     []
//   )

//   return (
//     <Instances
//       limit={30} // Optional: max amount of items (for calculating buffer size)
//       range={10} // Optional: draw-range
//       // material={materialPink}
//       // @ts-ignore
//       geometry={cylinder}
//     >
//       <meshPhysicalMaterial side={THREE.DoubleSide} {...configPink} />
//       {positions.map((props, index) => {
//         return (
//           // @ts-ignore
//           <group key={index} {...props}>
//             <Instance />
//           </group>
//         )
//       })}
//     </Instances>
//   )
// }

const RigidMesh: FC<
  PropsWithChildren<{ position: ReactThreeFiber.Vector3; playAudio: () => void }>
> = ({ children, position, playAudio }) => {
  const api = useRef<RapierRigidBody>(null)
  const pos = useMemo(() => position, [position])

  return (
    <RigidBody
      ref={api}
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      colliders="ball"
      onCollisionEnter={() => {
        playAudio()
      }}
    >
      {children}
    </RigidBody>
  )
}

export default App
