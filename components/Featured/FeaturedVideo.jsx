"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const GlassArtformCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId;
    let renderer, scene, camera, torusKnot, pmremGenerator;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    // PMREM Environment Map
    try {
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const envScene = new RoomEnvironment(renderer);
      scene.environment = pmremGenerator.fromScene(envScene, 0.04).texture;
      envScene.dispose();
    } catch (e) {
      console.warn("RoomEnvironment fallback:", e);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const accentLight1 = new THREE.PointLight(0x0066ff, 4, 15);
    accentLight1.position.set(-3, 2, 3);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xa855f7, 3, 15);
    accentLight2.position.set(3, -2, 2);
    scene.add(accentLight2);

    // TorusKnot Glass Geometry & Material
    const geometry = new THREE.TorusKnotGeometry(1.0, 0.32, 220, 36, 2, 3);
    
    const materialConfig = {
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 1.2,
      ior: 1.48,
      reflectivity: 0.9,
      envMapIntensity: 1.8,
      transparent: true,
      opacity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    };

    if ('dispersion' in THREE.MeshPhysicalMaterial.prototype) {
      materialConfig.dispersion = 4;
    }

    const material = new THREE.MeshPhysicalMaterial(materialConfig);
    torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Pointer Interaction
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.targetX = x * 0.8;
      pointer.targetY = y * 0.8;
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Animation Loop
    const clock = new THREE.Clock();
    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      if (torusKnot) {
        torusKnot.rotation.x = elapsedTime * 0.3 + pointer.y * 0.5;
        torusKnot.rotation.y = elapsedTime * 0.4 + pointer.x * 0.5;
        torusKnot.rotation.z = Math.sin(elapsedTime * 0.2) * 0.15;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    render();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      if (pmremGenerator) pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-transparent flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto"
    >
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
};

const FeaturedVideo = ({ refForward, ...props }) => {
  const ref = useRef(null);

  const variants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: { scale: 1.05, x: 0, y: 0 },
  };

  const { scrollYProgress } = useScroll({
    target: refForward,
    layoutEffect: false,
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={progress > 0.5 ? "animate" : "initial"}
      className="relative md:absolute mx-auto md:mx-0 mt-8 md:mt-0 md:top-[26vh] md:right-8 lg:right-16 md:left-auto md:translate-x-0 md:translate-y-0 z-30 w-[82vw] md:w-[42vw] max-w-[22rem] md:max-w-[540px] aspect-[3/4] md:aspect-[856/1024] bg-transparent outline-none"
      {...props}
    >
      <GlassArtformCanvas />
    </motion.div>
  );
};

export default FeaturedVideo;
