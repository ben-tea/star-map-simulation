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

- geometry.setAttribute(...) uploads an array of numbers to the GPU for rendering
    - BufferGeometry is just a collection of arrays stored in GPU-friendly format
    - Float32Array(arr) converts CPU arrays (normal arrays) into GPU data

    - ShaderMaterial gives the GPU custom data for rendering
        - the properties it takes are apart of GLSL, which a GPU language.
        - setAttribute(...) imports custom variables to use for processing the shader (used by 'attribute' variables)

        - uniform variables are passed through material.uniforms.selectedIndex.value = ...
            - the uniforms: {...} variable for ShaderMaterial is used to upload any uniform variables inside it so the GPU can use it
            - GPU reads "uniform float selectedIndex" and now every pixel can access the variable
            - selectedIndex is needed as a uniform variable so it can be used to compare each star without changing

        - 3 parts (for now)
            - uniforms: global inputs 
            - vertexShader: generates data on a per-point (or per star) basis, deciding position, size, etc.
            - fragmentShader: generates data on a per-pixel basis; we use this to calculate stuff lke color, brightness, transparency, of each star.

        - each frame, void main() runs per vertex and per pixel to refresh the graphics

        - syntax:
            - "attribute" float brightness: attribute is a variable that may change per vertex
            - "uniform" float brightness: a variable that is the same for each vertex generated
            - "varying" float vBrightness: is a variable that is generated on the vertex level. then the GPU interpolates a value per pixel and smooths it out
            - gl_Position/gl_PointSize is a built-in variable that defines position
                - the math for gl_Position don't need to worry

        
            



