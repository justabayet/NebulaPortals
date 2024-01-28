const Room1Shader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vNormal = normal;

      gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(position,1.0);
      vUv = uv;
    }
  `,

  fragmentShader: `
    varying vec2 vUv;
    
    void main()
    {
      vec2 uv = vUv;

      gl_FragColor = vec4(
        uv.x,  // R
        uv.y,  // G
        1.0,  // B
        1.0); // A
    }
  `,
}

export {
  Room1Shader
}