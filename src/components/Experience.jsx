import { Office } from "./Office"
import {motion} from 'framer-motion-3d'

export const Experience = (props) => {
  const { section, menuOpened } = props;
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
    </>
  );
};
