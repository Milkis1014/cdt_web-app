import React from 'react'; // 👈 Add this line
import { useEffect, useState } from "react";

function UnityLoader({ onUnityLoaded }) {
  //const [isUnityLoaded, setIsUnityLoaded] = useState(false);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadUnity = async () => {
      if (typeof window !== "undefined") {
        try {
          //await loadScript("/Build/ExternalPlugin.js");
          await loadScript("/Build/build08.loader.js");

          await createUnityInstance(document.querySelector("#unity-canvas"), {
            arguments: [],
            dataUrl: "/Build/build08.data.unityweb",
            frameworkUrl: "/Build/build08.framework.js.unityweb",
            codeUrl: "/Build/build08.wasm.unityweb",
            streamingAssetsUrl: "/StreamingAssets",
            companyName: "DefaultCompany",
            productName: "main_dt",
            productVersion: "0.1.0",
          });

         // setIsUnityLoaded(true);
          onUnityLoaded(true); // Notify parent component
        } catch (error) {
          console.error("Failed to load Unity scripts:", error);
        }
      }
    };

    loadUnity();
  }, [onUnityLoaded]);

  return <canvas id="unity-canvas"></canvas>;
}

export default UnityLoader;
