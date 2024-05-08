var H=Object.defineProperty;var J=(r,t,e)=>t in r?H(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var I=(r,t,e)=>(J(r,typeof t!="symbol"?t+"":t,e),e);import{O as N,P as K,M as X,R as Z,r as a,a as W,b as ee,u as C,W as S,L,H as te,D as re,F as V,S as ne,c as ae,d as oe,_ as se,e as G,f as ie,g as D,U as le,h as ue,i as ce,B as fe,j as P,k as me,l as A,N as F,V as Q}from"./index-CmcNxfTM.js";class E{constructor(t){I(this,"camera",new N(-1,1,1,-1,0,1));I(this,"geometry",new K(2,2));I(this,"mesh");this.mesh=new X(this.geometry,t)}get material(){return this.mesh.material}set material(t){this.mesh.material=t}dispose(){this.mesh.geometry.dispose()}render(t){t.render(this.mesh,this.camera)}}const ve=()=>parseInt(Z.replace(/\D+/g,"")),Y=ve();function de(r){const t=a.useRef(null),e=a.useRef(!1),l=a.useRef(!1),i=a.useRef(r);return a.useLayoutEffect(()=>void(i.current=r),[r]),a.useEffect(()=>{const o=t.current;if(o){const f=W(()=>(e.current=!1,!0)),n=o.onBeforeRender;o.onBeforeRender=()=>e.current=!0;const u=ee(()=>(e.current!==l.current&&(i.current==null||i.current(l.current=e.current)),!0));return()=>{o.onBeforeRender=n,f(),u()}}},[]),t}function O(r,t,e){const l=C(s=>s.size),i=C(s=>s.viewport),o=typeof r=="number"?r:l.width*i.dpr,f=typeof t=="number"?t:l.height*i.dpr,n=(typeof r=="number"?e:r)||{},{samples:u=0,depth:b,...c}=n,x=a.useMemo(()=>{const s=new S(o,f,{minFilter:L,magFilter:L,type:te,...c});return b&&(s.depthTexture=new re(o,f,V)),s.samples=u,s},[]);return a.useLayoutEffect(()=>{x.setSize(o,f),u&&(x.samples=u)},[u,x,o,f]),a.useEffect(()=>()=>x.dispose(),[]),x}const ge=a.forwardRef(({children:r,compute:t,width:e,height:l,samples:i=8,renderPriority:o=0,eventPriority:f=0,frames:n=1/0,stencilBuffer:u=!1,depthBuffer:b=!0,generateMipmaps:c=!1,...x},s)=>{const{size:h,viewport:m}=C(),d=O((e||h.width)*m.dpr,(l||h.height)*m.dpr,{samples:i,stencilBuffer:u,depthBuffer:b,generateMipmaps:c}),[U]=a.useState(()=>new ne),R=a.useCallback((w,g,v)=>{var M,T;let _=(M=d.texture)==null?void 0:M.__r3f.parent;for(;_&&!(_ instanceof ae);)_=_.__r3f.parent;if(!_)return!1;v.raycaster.camera||v.events.compute(w,v,(T=v.previousRoot)==null?void 0:T.getState());const[y]=v.raycaster.intersectObject(_);if(!y)return!1;const p=y.uv;if(!p)return!1;g.raycaster.setFromCamera(g.pointer.set(p.x*2-1,p.y*2-1),g.camera)},[]);return a.useImperativeHandle(s,()=>d.texture,[d]),a.createElement(a.Fragment,null,oe(a.createElement(pe,{renderPriority:o,frames:n,fbo:d},r,a.createElement("group",{onPointerOver:()=>null})),U,{events:{compute:t||R,priority:f}}),a.createElement("primitive",se({object:d.texture},x)))});function pe({frames:r,renderPriority:t,children:e,fbo:l}){let i=0,o,f;return G(n=>{(r===1/0||i<r)&&(o=n.gl.autoClear,f=n.gl.xr.enabled,n.gl.autoClear=!0,n.gl.xr.enabled=!1,n.gl.setRenderTarget(l),n.gl.render(n.scene,n.camera),n.gl.setRenderTarget(null),n.gl.autoClear=o,n.gl.xr.enabled=f,i++)},t),a.createElement(a.Fragment,null,e)}function xe(r,t,e,l){const i=class extends D{constructor(f={}){const n=Object.entries(r);super({uniforms:n.reduce((u,[b,c])=>{const x=le.clone({[b]:{value:c}});return{...u,...x}},{}),vertexShader:t,fragmentShader:e}),this.key="",n.forEach(([u])=>Object.defineProperty(this,u,{get:()=>this.uniforms[u].value,set:b=>this.uniforms[u].value=b})),Object.assign(this,f),l&&l(this)}};return i.key=ie.generateUUID(),i}const ye=xe({blur:0,map:null,sdf:null,blend:0,size:0,resolution:new Q},`varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     vUv = uv;
   }`,`uniform sampler2D sdf;
   uniform sampler2D map;
   uniform float blur;
   uniform float size;
   uniform float time;
   uniform vec2 resolution;
   varying vec2 vUv;
   #include <packing>
   void main() {
     vec2 uv = gl_FragCoord.xy / resolution.xy;
     vec4 t = texture2D(map, uv);
     float k = blur;
     float d = texture2D(sdf, vUv).r/size;
     float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d/k + 1.0, 0.0, 1.0));
     gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);
     #include <tonemapping_fragment>
     #include <${Y>=154?"colorspace_fragment":"encodings_fragment"}>
   }`),Ue=a.forwardRef(({children:r,events:t=void 0,isVisible:e=!0,blur:l=0,eventPriority:i=0,renderPriority:o=0,worldUnits:f=!1,resolution:n=512,...u},b)=>{ue({PortalMaterialImpl:ye});const c=a.useRef(null),{scene:x,gl:s,size:h,viewport:m,setEvents:d}=C(),U=O(n,n),[R,w]=a.useState(0);G(()=>{const y=c.current.blend>0?Math.max(1,o):0;R!==y&&w(y)}),a.useEffect(()=>{t!==void 0&&d({enabled:!t})},[t]);const[g,v]=a.useState(!1),M=a.useCallback(y=>{v(y)},[]),T=de(M);a.useLayoutEffect(()=>{var y;T.current=(y=c.current)==null?void 0:y.__r3f.parent},[]),a.useLayoutEffect(()=>{if(T.current&&l&&c.current.sdf===null){const y=new X(T.current.geometry,new ce),p=new fe().setFromBufferAttribute(y.geometry.attributes.position),k=new N(p.min.x*(1+2/n),p.max.x*(1+2/n),p.max.y*(1+2/n),p.min.y*(1+2/n),.1,1e3);k.position.set(0,0,1),k.lookAt(0,0,0),s.setRenderTarget(U),s.render(y,k);const q=he(n,n,s)(U.texture),z=new Float32Array(n*n);s.readRenderTargetPixels(q,0,0,n,n,z);let j=1/0;for(let B=0;B<z.length;B++)z[B]<j&&(j=z[B]);j=-j,c.current.size=j,c.current.sdf=q.texture,s.setRenderTarget(null)}},[n,l]),a.useImperativeHandle(b,()=>c.current);const _=a.useCallback((y,p)=>{var k;if(!T.current)return!1;if(p.pointer.set(y.offsetX/p.size.width*2-1,-(y.offsetY/p.size.height)*2+1),p.raycaster.setFromCamera(p.pointer,p.camera),((k=c.current)==null?void 0:k.blend)===0){const[$]=p.raycaster.intersectObject(T.current);if(!$)return p.raycaster.camera=void 0,!1}},[]);return P.jsx("portalMaterialImpl",{ref:c,blur:l,blend:0,resolution:[h.width*m.dpr,h.height*m.dpr],attach:"material",...u,children:P.jsxs(ge,{attach:"map",frames:g&&e?1/0:1,eventPriority:i,renderPriority:o,compute:_,children:[r,P.jsx(be,{events:t,rootScene:x,priority:R,material:c,worldUnits:f})]})})});function be({events:r=void 0,rootScene:t,material:e,priority:l,worldUnits:i}){const{scene:o,camera:f,gl:n,setEvents:u}=C(),b=O(),c=O();a.useLayoutEffect(()=>{o.matrixAutoUpdate=!1},[]),a.useEffect(()=>{n.compile(o,f)},[f,n,o]),a.useEffect(()=>{r!==void 0&&u({enabled:r})},[r]);const[x,s]=a.useMemo(()=>{const h={value:0};return[new E(new D({uniforms:{a:{value:b.texture},b:{value:c.texture},blend:h},vertexShader:`
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
            #include <${Y>=154?"colorspace_fragment":"encodings_fragment"}>
          }`})),h]},[]);return G(function(m){var U,R,w,g,v;const d=(U=e==null?void 0:e.current)==null?void 0:U.__r3f.parent;d&&(i?o.matrixWorld.identity():(l&&((R=e.current)==null?void 0:R.blend)===1&&d.updateWorldMatrix(!0,!1),o.matrixWorld.copy(d.matrixWorld)),l&&(((w=e.current)==null?void 0:w.blend)>0&&((g=e.current)==null?void 0:g.blend)<1?(s.value=e.current.blend,m.gl.setRenderTarget(b),m.gl.render(o,m.camera),m.gl.setRenderTarget(c),m.gl.render(t,m.camera),m.gl.setRenderTarget(null),x.render(m.gl)):((v=e.current)==null?void 0:v.blend)===1&&m.gl.render(o,m.camera)))},l),P.jsx(P.Fragment,{})}const he=(r,t,e)=>{const l=new S(r,t,{minFilter:me,magFilter:L,type:V,format:A,generateMipmaps:!0}),i=new S(r,t,{minFilter:F,magFilter:F}),o=new S(r,t,{minFilter:F,magFilter:F}),f=new S(r,t,{minFilter:F,magFilter:F}),n=new S(r,t,{minFilter:F,magFilter:F}),u=new S(r,t,{minFilter:F,magFilter:F,type:V,format:A}),b=new S(r,t,{minFilter:F,magFilter:F,type:V,format:A}),c=new E(new D({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),x=new E(new D({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),h=new E(new D({uniforms:{tex:{value:null},size:{value:new Q(r,t)}},vertexShader:`
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
        }`})),m=new E(new D({uniforms:{inside:{value:b.texture},outside:{value:u.texture},tex:{value:null}},vertexShader:`
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
        }`}));return d=>{const U=l;d.minFilter=F,d.magFilter=F,c.material.uniforms.tex.value=d,e.setRenderTarget(i),c.render(e);const R=Math.ceil(Math.log(Math.max(r,t))/Math.log(2));let w=i,g=null;for(let v=0;v<R;v++){const M=Math.pow(2,R-v-1);g=w===i?f:i,s.material.uniforms.level.value=v,s.material.uniforms.maxSteps.value=R,s.material.uniforms.offset.value=M,s.material.uniforms.tex.value=w.texture,e.setRenderTarget(g),s.render(e),w=g}e.setRenderTarget(u),h.material.uniforms.tex.value=g.texture,h.render(e),x.material.uniforms.tex.value=d,e.setRenderTarget(o),x.render(e),w=o;for(let v=0;v<R;v++){const M=Math.pow(2,R-v-1);g=w===o?n:o,s.material.uniforms.level.value=v,s.material.uniforms.maxSteps.value=R,s.material.uniforms.offset.value=M,s.material.uniforms.tex.value=w.texture,e.setRenderTarget(g),s.render(e),w=g}return e.setRenderTarget(b),h.material.uniforms.tex.value=g.texture,h.render(e),e.setRenderTarget(U),m.material.uniforms.tex.value=d,m.render(e),e.setRenderTarget(null),U}};export{Ue as default};
