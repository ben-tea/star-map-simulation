6/8/26
- three.js is a render library
    - needs 3 main components, scene, camera, and renderer
    - all three are objects (instantiated in the beg. of main)
    - camera has 4 features:
        - field of view
        - size of camera
        - min and max rendering (for resource management)

- window is part of the browser and has built-in features

- document is JS way to access all the HTML (the DOM)
    - body represents the body section of the HTML (rmb body and head)
    - domElement is the HTML <canvas> element that Three.js creates internally
    - document.body.appendChild(renderer.domElement); basically takes the <canvas> element created by Three.js and adds it to the HTML body of the website

- requestAnimationFrame tells program to animate the next frame after the frame is done (basically creating a loop)

- window.addEventListener("resize", function) says when window is resized, run following function
    - () => {...} is an arrow function (simplier syntax)
    - projection matrix is the math that converts 3D into 2D
        - its called because by changing the camera.aspect, you are changing one of the variables that projectionMatrix calculates off of


6/11/26
- const t = ((mag - minMag)/(maxMag - minMag)) is called normalization, taking the "mag" and putting it on a scale of 0 to 1, with the boundaries being minMag and maxMag

- Math.min(Math.max(t,0),1); is called clamping. Basically once normalization occurs, if the og mag is bigger than the boundaries, the number outputted will be outside the range [0,1], so clamping caps it at 0 or 1

- BufferAttribute can take a simplified, or "GPU Ready" array  for the GPU to process. It can split the array into sets of numbers. 
- a Float32Array is created because its more process-friendly (?)


- ShaderMaterial: the properties it takes are apart of GLSL, which is a language for shaders. Im lowk not gonna understand ts

