import { Office } from "./Office"
import { motion } from 'framer-motion-3d'
import { MeshDistortMaterial, Float, MeshWobbleMaterial } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { framerMotionConfig } from '../config';

export const Experience = (props) => {
  const { section, menuOpened } = props;
  const {viewport} = useThree()
  // useMotionValue()函数的作用是创建一个可响应式的动画值，你可以将其应用于组件属性中，
  // 并通过修改动画值来实现动画效果的变化。这使得创建复杂的交互式动画变得更加简单和灵活。
  const cameraPositionX = useMotionValue()
  const cameraLookAtX = useMotionValue()

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig
    })
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig
    })
  })
/**
 * 在React-three-fiber库的useFrame()函数中，回调函数的参数state对象具有以下属性：
1、camera：表示当前使用的相机对象。
2、clock：表示当前渲染的时钟对象，可以用于获取渲染的时间和帧速率等信息。
3、gl：表示当前的WebGL渲染上下文。
4、scene：表示当前的场景对象。
5、size：表示当前渲染画布的尺寸，包括宽度（size.width）和高度（size.height）属性。
6、viewport：表示当前相机的可视区域，包括左上角坐标（viewport.x和viewport.y）和宽度（viewport.width）和高度（viewport.height）属性。
7、`vr`：表示当前是否处于VR模式。
8、 `gl2`：表示当前的WebGL2渲染上下文（如果可用）。
9、 `performance`：表示当前性能信息，包括帧数（`performance.current`）和平均帧数（`performance.average`）属性。
10、 `raycaster`：表示当前的射线投射器，用于进行鼠标交互和碰撞检测。
开发者可以使用这些属性来实现各种动画效果、用户交互和实时更新的功能。比如，可以根据delta属性来实现平滑的动画效果，
根据mouse属性来实现与鼠标交互的功能，根据viewport属性来适应不同屏幕大小的布局等等。
 */
  useFrame((state) => {
    // console.log('state :>> ', state);
    state.camera.position.x = cameraPositionX.get()
    state.camera.lookAt(cameraLookAtX.get(), 0, 0)
  })
  return (
    <>
      <ambientLight intensity={1} />
      <motion.group
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        initial={{
          y: section === 0 ? 0 : -1
        }}
      >
        <Office section={section} />
      </motion.group>
      <motion.group position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5 
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]} >
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]} >
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color={"yellow"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]} >
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
        <group scale={[2, 2, 2]} position-y={-1.5}>
          <Avatar animation={section === 0 ? "Falling" : "Standing"}></Avatar>
        </group>
      </motion.group>
    </>
  );
};
