import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const VerificationProgressBar = () => {
  const controls = useAnimation();

  // Use controls.start() to trigger the animation
  const startAnimation = () => {
    controls.start({ width: "100%" });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div className="relative ml-[3.5rem] mt-4 w-[14rem] h-[0.5rem] bg-slate-200 rounded-full">
      <motion.div
        initial={{ width: "1%" }}
        animate={controls}
        transition={{ duration: 15 }}
        className="absolute h-full bg-primary rounded-full"
      ></motion.div>
    </div>
  );
};

export default VerificationProgressBar;
