import { useEffect, useRef } from "react";

const FaceScan = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    // Function to access the camera and start the video stream
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    startCamera();

    return () => {
      // Cleanup: stop the camera stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);
  return (
    <div className="ml-10 w-[20rem] h-[20rem] relative flex items-center justify-center">
      <img
        className="absolute w-full h-full"
        src="/bermuda-371 1.png"
        alt="imagecapture"
      />
      <div className="w-[86%] h-[86%]">
        <video
          className="object-cover w-full h-full"
          ref={videoRef}
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
};

export default FaceScan;
