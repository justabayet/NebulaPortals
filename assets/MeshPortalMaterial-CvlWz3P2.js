var Z=Object.defineProperty;var W=(r,t,e)=>t in r?Z(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var V=(r,t,e)=>(W(r,typeof t!="symbol"?t+"":t,e),e);import{O as Y,P as ee,M as H,R as te,r as a,a as re,b as ne,u as z,W as S,L as $,H as ae,D as oe,F as A,S as se,c as ie,d as le,_ as ue,e as q,f as ce,g as D,U as fe,h as me,i as ve,B as de,j as O,k as ge,l as G,N as w,V as J}from"./index-DMRhTRoM.js";class j{constructor(t){V(this,"camera",new Y(-1,1,1,-1,0,1));V(this,"geometry",new ee(2,2));V(this,"mesh");this.mesh=new H(this.geometry,t)}get material(){return this.mesh.material}set material(t){this.mesh.material=t}dispose(){this.mesh.geometry.dispose()}render(t){t.render(this.mesh,this.camera)}}const pe=()=>parseInt(te.replace(/\D+/g,"")),K=pe();function xe(r){const t=a.useRef(null),e=a.useRef(!1),u=a.useRef(!1),l=a.useRef(r);return a.useLayoutEffect(()=>void(l.current=r),[r]),a.useEffect(()=>{const o=t.current;if(o){const f=re(()=>(e.current=!1,!0)),n=o.onBeforeRender;o.onBeforeRender=()=>e.current=!0;const c=ne(()=>(e.current!==u.current&&(l.current==null||l.current(u.current=e.current)),!0));return()=>{o.onBeforeRender=n,f(),c()}}},[]),t}function L(r,t,e){const u=z(s=>s.size),l=z(s=>s.viewport),o=typeof r=="number"?r:u.width*l.dpr,f=typeof t=="number"?t:u.height*l.dpr,n=(typeof r=="number"?e:r)||{},{samples:c=0,depth:y,...i}=n,p=a.useMemo(()=>{const s=new S(o,f,{minFilter:$,magFilter:$,type:ae,...i});return y&&(s.depthTexture=new oe(o,f,A)),s.samples=c,s},[]);return a.useLayoutEffect(()=>{p.setSize(o,f),c&&(p.samples=c)},[c,p,o,f]),a.useEffect(()=>()=>p.dispose(),[]),p}const ye=a.forwardRef(({children:r,compute:t,width:e,height:u,samples:l=8,renderPriority:o=0,eventPriority:f=0,frames:n=1/0,stencilBuffer:c=!1,depthBuffer:y=!0,generateMipmaps:i=!1,...p},s)=>{const{size:h,viewport:m}=z(),d=L((e||h.width)*m.dpr,(u||h.height)*m.dpr,{samples:l,stencilBuffer:c,depthBuffer:y,generateMipmaps:i}),[T]=a.useState(()=>new se),b=a.useCallback((R,g,v)=>{var U,M;let _=(U=d.texture)==null?void 0:U.__r3f.parent;for(;_&&!(_ instanceof ie);)_=_.__r3f.parent;if(!_)return!1;v.raycaster.camera||v.events.compute(R,v,(M=v.previousRoot)==null?void 0:M.getState());const[P]=v.raycaster.intersectObject(_);if(!P)return!1;const k=P.uv;if(!k)return!1;g.raycaster.setFromCamera(g.pointer.set(k.x*2-1,k.y*2-1),g.camera)},[]);return a.useImperativeHandle(s,()=>d.texture,[d]),a.createElement(a.Fragment,null,le(a.createElement(he,{renderPriority:o,frames:n,fbo:d},r,a.createElement("group",{onPointerOver:()=>null})),T,{events:{compute:t||b,priority:f}}),a.createElement("primitive",ue({object:d.texture},p)))});function he({frames:r,renderPriority:t,children:e,fbo:u}){let l=0,o,f;return q(n=>{(r===1/0||l<r)&&(o=n.gl.autoClear,f=n.gl.xr.enabled,n.gl.autoClear=!0,n.gl.xr.enabled=!1,n.gl.setRenderTarget(u),n.gl.render(n.scene,n.camera),n.gl.setRenderTarget(null),n.gl.autoClear=o,n.gl.xr.enabled=f,l++)},t),a.createElement(a.Fragment,null,e)}function be(r,t,e,u){const l=class extends D{constructor(f={}){const n=Object.entries(r);super({uniforms:n.reduce((c,[y,i])=>{const p=fe.clone({[y]:{value:i}});return{...c,...p}},{}),vertexShader:t,fragmentShader:e}),this.key="",n.forEach(([c])=>Object.defineProperty(this,c,{get:()=>this.uniforms[c].value,set:y=>this.uniforms[c].value=y})),Object.assign(this,f),u&&u(this)}};return l.key=ce.generateUUID(),l}const Re=be({blur:0,map:null,sdf:null,blend:0,size:0,resolution:new J,uTime:0},`varying vec2 vUv;
   varying vec2 uOffset;
   uniform float uTime;
   void main() {
     float yOffset = sin((position.y + uTime * 0.5) * 10.0);
     float xOffset = sin((position.x + uTime * 0.5) * 3.0);
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     vUv = uv;
     uOffset = (vec2(xOffset, yOffset) + 1.0) / 1000.0; // [0;0.002]
   }`,`uniform sampler2D sdf;
   uniform sampler2D map;
   uniform float blur;
   uniform float size;
   uniform float time;
   uniform vec2 resolution;
   varying vec2 vUv;
   varying vec2 uOffset;
   #include <packing>
   void main() {
     vec2 uv = gl_FragCoord.xy / resolution.xy;
     uv += uOffset;
     vec4 t = texture2D(map, uv);
     float k = blur;
     float d = texture2D(sdf, vUv).r/size;
     float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d/k + 1.0, 0.0, 1.0));
     gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);
     #include <tonemapping_fragment>
     #include <${K>=154?"colorspace_fragment":"encodings_fragment"}>
   }`),_e=a.forwardRef(({children:r,events:t=void 0,isVisible:e=!0,blur:u=0,eventPriority:l=0,renderPriority:o=0,worldUnits:f=!1,resolution:n=512,...c},y)=>{me({PortalMaterialImpl:Re});const i=a.useRef(null),{scene:p,gl:s,size:h,viewport:m,setEvents:d}=z(),T=L(n,n),[b,R]=a.useState(0);q(({clock:F})=>{i.current&&i.current.uniforms&&(i.current.uniforms.uTime.value=F.elapsedTime);const x=i.current.blend>0?Math.max(1,o):0;b!==x&&R(x)}),a.useEffect(()=>{t!==void 0&&d({enabled:!t})},[t]);const[g,v]=a.useState(!1),U=a.useCallback(F=>{v(F)},[]),M=xe(U);a.useLayoutEffect(()=>{var F;M.current=(F=i.current)==null?void 0:F.__r3f.parent},[]),a.useLayoutEffect(()=>{if(M.current&&u&&i.current.sdf===null){const F=new H(M.current.geometry,new ve),x=new de().setFromBufferAttribute(F.geometry.attributes.position),E=new Y(x.min.x*(1+2/n),x.max.x*(1+2/n),x.max.y*(1+2/n),x.min.y*(1+2/n),.1,1e3);E.position.set(0,0,1),E.lookAt(0,0,0),s.setRenderTarget(T),s.render(F,E);const Q=Fe(n,n,s)(T.texture),B=new Float32Array(n*n);s.readRenderTargetPixels(Q,0,0,n,n,B);let C=1/0;for(let I=0;I<B.length;I++)B[I]<C&&(C=B[I]);C=-C,i.current.size=C,i.current.sdf=Q.texture,s.setRenderTarget(null)}},[n,u]),a.useImperativeHandle(y,()=>i.current);const _=a.useCallback((F,x)=>{var E;if(!M.current)return!1;if(x.pointer.set(F.offsetX/x.size.width*2-1,-(F.offsetY/x.size.height)*2+1),x.raycaster.setFromCamera(x.pointer,x.camera),((E=i.current)==null?void 0:E.blend)===0){const[X]=x.raycaster.intersectObject(M.current);if(!X)return x.raycaster.camera=void 0,!1}},[]),P=.5,k=h.width*m.dpr,N=h.height*m.dpr;return O.jsx("portalMaterialImpl",{ref:i,blur:u,blend:0,resolution:[k,N],attach:"material",...c,children:O.jsxs(ye,{attach:"map",frames:g&&e?1/0:1,eventPriority:l,renderPriority:o,width:k*P,height:N*P,compute:_,children:[r,O.jsx(we,{events:t,rootScene:p,priority:b,material:i,worldUnits:f})]})})});function we({events:r=void 0,rootScene:t,material:e,priority:u,worldUnits:l}){const{scene:o,camera:f,gl:n,setEvents:c}=z(),y=L(),i=L();a.useLayoutEffect(()=>{o.matrixAutoUpdate=!1},[]),a.useEffect(()=>{n.compile(o,f)},[f,n,o]),a.useEffect(()=>{r!==void 0&&c({enabled:r})},[r]);const[p,s]=a.useMemo(()=>{const h={value:0};return[new j(new D({uniforms:{a:{value:y.texture},b:{value:i.texture},blend:h},vertexShader:`
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
            #include <${K>=154?"colorspace_fragment":"encodings_fragment"}>
          }`})),h]},[]);return q(function(m){var T,b,R,g,v;const d=(T=e==null?void 0:e.current)==null?void 0:T.__r3f.parent;d&&(l?o.matrixWorld.identity():(u&&((b=e.current)==null?void 0:b.blend)===1&&d.updateWorldMatrix(!0,!1),o.matrixWorld.copy(d.matrixWorld)),u&&(((R=e.current)==null?void 0:R.blend)>0&&((g=e.current)==null?void 0:g.blend)<1?(s.value=e.current.blend,m.gl.setRenderTarget(y),m.gl.render(o,m.camera),m.gl.setRenderTarget(i),m.gl.render(t,m.camera),m.gl.setRenderTarget(null),p.render(m.gl)):((v=e.current)==null?void 0:v.blend)===1&&m.gl.render(o,m.camera)))},u),O.jsx(O.Fragment,{})}const Fe=(r,t,e)=>{const u=new S(r,t,{minFilter:ge,magFilter:$,type:A,format:G,generateMipmaps:!0}),l=new S(r,t,{minFilter:w,magFilter:w}),o=new S(r,t,{minFilter:w,magFilter:w}),f=new S(r,t,{minFilter:w,magFilter:w}),n=new S(r,t,{minFilter:w,magFilter:w}),c=new S(r,t,{minFilter:w,magFilter:w,type:A,format:G}),y=new S(r,t,{minFilter:w,magFilter:w,type:A,format:G}),i=new j(new D({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),p=new j(new D({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),s=new j(new D({uniforms:{tex:{value:null},offset:{value:0},level:{value:0},maxSteps:{value:0}},vertexShader:`
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
        }`})),h=new j(new D({uniforms:{tex:{value:null},size:{value:new J(r,t)}},vertexShader:`
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
        }`})),m=new j(new D({uniforms:{inside:{value:y.texture},outside:{value:c.texture},tex:{value:null}},vertexShader:`
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
        }`}));return d=>{const T=u;d.minFilter=w,d.magFilter=w,i.material.uniforms.tex.value=d,e.setRenderTarget(l),i.render(e);const b=Math.ceil(Math.log(Math.max(r,t))/Math.log(2));let R=l,g=null;for(let v=0;v<b;v++){const U=Math.pow(2,b-v-1);g=R===l?f:l,s.material.uniforms.level.value=v,s.material.uniforms.maxSteps.value=b,s.material.uniforms.offset.value=U,s.material.uniforms.tex.value=R.texture,e.setRenderTarget(g),s.render(e),R=g}e.setRenderTarget(c),h.material.uniforms.tex.value=g.texture,h.render(e),p.material.uniforms.tex.value=d,e.setRenderTarget(o),p.render(e),R=o;for(let v=0;v<b;v++){const U=Math.pow(2,b-v-1);g=R===o?n:o,s.material.uniforms.level.value=v,s.material.uniforms.maxSteps.value=b,s.material.uniforms.offset.value=U,s.material.uniforms.tex.value=R.texture,e.setRenderTarget(g),s.render(e),R=g}return e.setRenderTarget(y),h.material.uniforms.tex.value=g.texture,h.render(e),e.setRenderTarget(T),m.material.uniforms.tex.value=d,m.render(e),e.setRenderTarget(null),T}};export{_e as default};
