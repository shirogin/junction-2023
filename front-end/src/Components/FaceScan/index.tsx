import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceScan = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };

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

    const detectFaces = async () => {
      if (videoRef.current) {
        const video = videoRef.current;
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        console.log(detections);
      }
    };

    loadModels().then(() => {
      startCamera();
    });

    const intervalId = setInterval(() => {
      detectFaces();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="ml-10 w-[20rem] h-[20rem] relative flex items-center justify-center">
      <img
        className="absolute w-full h-full"
        src="/bermuda-371 1.png"
        alt="imagecapture"
      />
      <div id="canvas-parent" className="w-[86%] h-[86%]">
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
