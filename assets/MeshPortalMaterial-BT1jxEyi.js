var ee=Object.defineProperty;var te=(r,t,e)=>t in r?ee(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var I=(r,t,e)=>(te(r,typeof t!="symbol"?t+"":t,e),e);import{O as H,P as re,M as J,R as ne,r as a,a as ae,b as oe,u as V,W as _,L as q,H as se,D as ie,F as L,S as le,c as ue,d as ce,_ as fe,e as N,f as ve,g as D,U as me,T as de,h as pe,i as K,k as ge,l as xe,B as ye,j as O,m as he,n as $,N as R,V as Z}from"./index-DibnIrFU.js";class E{constructor(t){I(this,"camera",new H(-1,1,1,-1,0,1));I(this,"geometry",new re(2,2));I(this,"mesh");this.mesh=new J(this.geometry,t)}get material(){return this.mesh.material}set material(t){this.mesh.material=t}dispose(){this.mesh.geometry.dispose()}render(t){t.render(this.mesh,this.camera)}}const be=()=>parseInt(ne.replace(/\D+/g,"")),W=be();function we(r){const t=a.useRef(null),e=a.useRef(!1),u=a.useRef(!1),l=a.useRef(r);return a.useLayoutEffect(()=>void(l.current=r),[r]),a.useEffect(()=>{const o=t.current;if(o){const f=ae(()=>(e.current=!1,!0)),n=o.onBeforeRender;o.onBeforeRender=()=>e.current=!0;const c=oe(()=>(e.current!==u.current&&(l.current==null||l.current(u.current=e.current)),!0));return()=>{o.onBeforeRender=n,f(),c()}}},[]),t}function A(r,t,e){const u=V(s=>s.size),l=V(s=>s.viewport),o=typeof r=="number"?r:u.width*l.dpr,f=typeof t=="number"?t:u.height*l.dpr,n=(typeof r=="number"?e:r)||{},{samples:c=0,depth:y,...i}=n,g=a.useMemo(()=>{const s=new _(o,f,{minFilter:q,magFilter:q,type:se,...i});return y&&(s.depthTexture=new ie(o,f,L)),s.samples=c,s},[]);return a.useLayoutEffect(()=>{g.setSize(o,f),c&&(g.samples=c)},[c,g,o,f]),a.useEffect(()=>()=>g.dispose(),[]),g}const Re=a.forwardRef(({children:r,compute:t,width:e,height:u,samples:l=8,renderPriority:o=0,eventPriority:f=0,frames:n=1/0,stencilBuffer:c=!1,depthBuffer:y=!0,generateMipmaps:i=!1,...g},s)=>{const{size:h,viewport:v}=V(),d=A((e||h.width)*v.dpr,(u||h.height)*v.dpr,{samples:l,stencilBuffer:c,depthBuffer:y,generateMipmaps:i}),[T]=a.useState(()=>new le),b=a.useCallback((w,p,m)=>{var U,M;let S=(U=d.texture)==null?void 0:U.__r3f.parent;for(;S&&!(S instanceof ue);)S=S.__r3f.parent;if(!S)return!1;m.raycaster.camera||m.events.compute(w,m,(M=m.previousRoot)==null?void 0:M.getState());const[j]=m.raycaster.intersectObject(S);if(!j)return!1;const k=j.uv;if(!k)return!1;p.raycaster.setFromCamera(p.pointer.set(k.x*2-1,k.y*2-1),p.camera)},[]);return a.useImperativeHandle(s,()=>d.texture,[d]),a.createElement(a.Fragment,null,ce(a.createElement(Fe,{renderPriority:o,frames:n,fbo:d},r,a.createElement("group",{onPointerOver:()=>null})),T,{events:{compute:t||b,priority:f}}),a.createElement("primitive",fe({object:d.texture},g)))});function Fe({frames:r,renderPriority:t,children:e,fbo:u}){let l=0,o,f;return N(n=>{(r===1/0||l<r)&&(o=n.gl.autoClear,f=n.gl.xr.enabled,n.gl.autoClear=!0,n.gl.xr.enabled=!1,n.gl.setRenderTarget(u),n.gl.render(n.scene,n.camera),n.gl.setRenderTarget(null),n.gl.autoClear=o,n.gl.xr.enabled=f,l++)},t),a.createElement(a.Fragment,null,e)}function Te(r,t,e,u){const l=class extends D{constructor(f={}){const n=Object.entries(r);super({uniforms:n.reduce((c,[y,i])=>{const g=me.clone({[y]:{value:i}});return{...c,...g}},{}),vertexShader:t,fragmentShader:e}),this.key="",n.forEach(([c])=>Object.defineProperty(this,c,{get:()=>this.uniforms[c].value,set:y=>this.uniforms[c].value=y})),Object.assign(this,f),u&&u(this)}};return l.key=ve.generateUUID(),l}const Ue=new de,G=Ue.load("./perlin.png");G.colorSpace=pe;G.wrapS=K;G.wrapT=K;const Me=Te({blur:0,map:null,sdf:null,blend:0,size:0,resolution:new Z,uTime:0,uPerlinTexture:G},`
  varying vec2 vUv;
  varying vec2 vOffset;
  uniform float uTime;
  uniform sampler2D uPerlinTexture;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    float perlinValue = texture(uPerlinTexture, (vUv + uTime) / (20.0)).r; // [0;1]
    perlinValue = pow(perlinValue, 2.0) - 0.5; // [-0.5; 0.5]

    vOffset = vec2(
      perlinValue * 1.0,
      perlinValue * 3.0
    ); // ([-0.5, 0.5], [-1.5, 1.5])
    vOffset += vec2(0.45, 1.35);

    vOffset /= 70.0; // [-1; 1]
  }`,`
  uniform sampler2D sdf;
  uniform sampler2D map;
  uniform float blur;
  uniform float size;
  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;
  varying vec2 vOffset;
  #include <packing>
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv += vOffset;
    vec4 t = texture2D(map, uv);
    float k = blur;
    float d = texture2D(sdf, vUv).r/size;
    float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d/k + 1.0, 0.0, 1.0));
    gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);
    #include <tonemapping_fragment>
    #include <${W>=154?"colorspace_fragment":"encodings_fragment"}>
  }`),Ee=a.forwardRef(({children:r,events:t=void 0,isVisible:e=!0,blur:u=0,eventPriority:l=0,renderPriority:o=0,worldUnits:f=!1,resolution:n=512,...c},y)=>{ge({PortalMaterialImpl:Me});const i=a.useRef(null),{scene:g,gl:s,size:h,viewport:v,setEvents:d}=V(),T=A(n,n),[b,w]=a.useState(0);N(({clock:F})=>{i.current&&i.current.uniforms&&(i.current.uniforms.uTime.value=F.elapsedTime);const x=i.current.blend>0?Math.max(1,o):0;b!==x&&w(x)}),a.useEffect(()=>{t!==void 0&&d({enabled:!t})},[t]);const[p,m]=a.useState(!1),U=a.useCallback(F=>{m(F)},[]),M=we(U);a.useLayoutEffect(()=>{var F;M.current=(F=i.current)==null?void 0:F.__r3f.parent},[]),a.useLayoutEffect(()=>{if(M.current&&u&&i.current.sdf===null){const F=new J(M.current.geometry,new xe),x=new ye().setFromBufferAttribute(F.geometry.attributes.position),P=new H(x.min.x*(1+2/n),x.max.x*(1+2/n),x.max.y*(1+2/n),x.min.y*(1+2/n),.1,1e3);P.position.set(0,0,1),P.lookAt(0,0,0),s.setRenderTarget(T),s.render(F,P);const Y=_e(n,n,s)(T.texture),z=new Float32Array(n*n);s.readRenderTargetPixels(Y,0,0,n,n,z);let C=1/0;for(let B=0;B<z.length;B++)z[B]<C&&(C=z[B]);C=-C,i.current.size=C,i.current.sdf=Y.texture,s.setRenderTarget(null)}},[n,u]),a.useImperativeHandle(y,()=>i.current);const S=a.useCallback((F,x)=>{var P;if(!M.current)return!1;if(x.pointer.set(F.offsetX/x.size.width*2-1,-(F.offsetY/x.size.height)*2+1),x.raycaster.setFromCamera(x.pointer,x.camera),((P=i.current)==null?void 0:P.blend)===0){const[Q]=x.raycaster.intersectObject(M.current);if(!Q)return x.raycaster.camera=void 0,!1}},[]),j=.5,k=h.width*v.dpr,X=h.height*v.dpr;return O.jsx("portalMaterialImpl",{ref:i,blur:u,blend:0,resolution:[k,X],attach:"material",...c,children:O.jsxs(Re,{attach:"map",frames:p&&e?1/0:1,eventPriority:l,renderPriority:o,width:k*j,height:X*j,compute:S,children:[r,O.jsx(Se,{events:t,rootScene:g,priority:b,material:i,worldUnits:f})]})})});function Se({events:r=void 0,rootScene:t,material:e,priority:u,worldUnits:l}){const{scene:o,camera:f,gl:n,setEvents:c}=V(),y=A(),i=A();a.useLayoutEffect(()=>{o.matrixAutoUpdate=!1},[]),a.useEffect(()=>{n.compile(o,f)},[f,n,o]),a.useEffect(()=>{r!==void 0&&c({enabled:r})},[r]);const[g,s]=a.useMemo(()=>{const h={value:0};return[new E(new D({uniforms:{a:{value:y.texture},b:{value:i.texture},blend:h},vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`,fragmentShader:`
          uniform sampler2D a;
          uniform sampler2D b;
          uniform float blend;
          varying vec2 vUv;
          #include <packing>
          void main() {
            vec4 ta = texture2D(a, vUv);
            vec4 tb = texture2D(b, vUv);
            gl_FragColor = mix(tb, ta, blend);
            #include <tonemapping_fragment>
            #include <${W>=154?"colorspace_fragment":"encodings_fragment"}>
          }`})),h]},[]);return N(function(v){var T,b,w,p,m;const d=(T=e==null?void 0:e.current)==null?void 0:T.__r3f.parent;d&&(l?o.matrixWorld.identity():(u&&((b=e.current)==null?void 0:b.blend)===1&&d.updateWorldMatrix(!0,!1),o.matrixWorld.copy(d.matrixWorld)),u&&(((w=e.current)==null?void 0:w.blend)>0&&((p=e.current)==null?void 0:p.blend)<1?(s.value=e.current.blend,v.gl.setRenderTarget(y),v.gl.render(o,v.camera),v.gl.setRenderTarget(i),v.gl.render(t,v.camera),v.gl.setRenderTarget(null),g.render(v.gl)):((m=e.current)==null?void 0:m.blend)===1&&v.gl.render(o,v.camera)))},u),O.jsx(O.Fragment,{})}const _e=(r,t,e)=>{const u=new _(r,t,{minFilter:he,magFilter:q,type:L,format:$,generateMipmaps:!0}),l=new _(r,t,{minFilter:R,magFilter:R}),o=new _(r,t,{minFilter:R,magFilter:R}),f=new _(r,t,{minFilter:R,magFilter:R}),n=new _(r,t,{minFilter:R,magFilter:R}),c=new _(r,t,{minFilter:R,magFilter:R,type:L,format:$}),y=new _(r,t,{minFilter:R,magFilter:R,type:L,format:$}),i=new E(new D({uniforms:{tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        uniform sampler2D tex;
        varying vec2 vUv;
        #include <packing>
        void main() {
          gl_FragColor = pack2HalfToRGBA(vUv * (round(texture2D(tex, vUv).x)));
        }`})),g=new E(new D({uniforms:{tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        uniform sampler2D tex;
        varying vec2 vUv;
        #include <packing>
        void main() {
          gl_FragColor = pack2HalfToRGBA(vUv * (1.0 - round(texture2D(tex, vUv).x)));
        }`})),s=new E(new D({uniforms:{tex:{value:null},offset:{value:0},level:{value:0},maxSteps:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D tex;
        uniform float offset;
        uniform float level;
        uniform float maxSteps;
        #include <packing>
        void main() {
          float closestDist = 9999999.9;
          vec2 closestPos = vec2(0.0);
          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 voffset = vUv;
              voffset += vec2(x, y) * vec2(${1/r}, ${1/t}) * offset;
              vec2 pos = unpackRGBATo2Half(texture2D(tex, voffset));
              float dist = distance(pos.xy, vUv);
              if(pos.x != 0.0 && pos.y != 0.0 && dist < closestDist) {
                closestDist = dist;
                closestPos = pos;
              }
            }
          }
          gl_FragColor = pack2HalfToRGBA(closestPos);
        }`})),h=new E(new D({uniforms:{tex:{value:null},size:{value:new Z(r,t)}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D tex;
        uniform vec2 size;
        #include <packing>
        void main() {
          gl_FragColor = vec4(distance(size * unpackRGBATo2Half(texture2D(tex, vUv)), size * vUv), 0.0, 0.0, 0.0);
        }`})),v=new E(new D({uniforms:{inside:{value:y.texture},outside:{value:c.texture},tex:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D inside;
        uniform sampler2D outside;
        uniform sampler2D tex;
        #include <packing>
        void main() {
          float i = texture2D(inside, vUv).x;
          float o =texture2D(outside, vUv).x;
          if (texture2D(tex, vUv).x == 0.0) {
            gl_FragColor = vec4(o, 0.0, 0.0, 0.0);
          } else {
            gl_FragColor = vec4(-i, 0.0, 0.0, 0.0);
          }
        }`}));return d=>{const T=u;d.minFilter=R,d.magFilter=R,i.material.uniforms.tex.value=d,e.setRenderTarget(l),i.render(e);const b=Math.ceil(Math.log(Math.max(r,t))/Math.log(2));let w=l,p=null;for(let m=0;m<b;m++){const U=Math.pow(2,b-m-1);p=w===l?f:l,s.material.uniforms.level.value=m,s.material.uniforms.maxSteps.value=b,s.material.uniforms.offset.value=U,s.material.uniforms.tex.value=w.texture,e.setRenderTarget(p),s.render(e),w=p}e.setRenderTarget(c),h.material.uniforms.tex.value=p.texture,h.render(e),g.material.uniforms.tex.value=d,e.setRenderTarget(o),g.render(e),w=o;for(let m=0;m<b;m++){const U=Math.pow(2,b-m-1);p=w===o?n:o,s.material.uniforms.level.value=m,s.material.uniforms.maxSteps.value=b,s.material.uniforms.offset.value=U,s.material.uniforms.tex.value=w.texture,e.setRenderTarget(p),s.render(e),w=p}return e.setRenderTarget(y),h.material.uniforms.tex.value=p.texture,h.render(e),e.setRenderTarget(T),v.material.uniforms.tex.value=d,v.render(e),e.setRenderTarget(null),T}};export{Ee as default};
