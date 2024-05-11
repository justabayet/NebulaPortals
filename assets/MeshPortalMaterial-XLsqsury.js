var Z=Object.defineProperty;var W=(r,t,e)=>t in r?Z(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var O=(r,t,e)=>(W(r,typeof t!="symbol"?t+"":t,e),e);import{O as Y,P as ee,M as H,R as te,r as a,a as re,b as ne,u as B,W as S,L as $,H as ae,D as oe,F as A,S as se,c as ie,d as le,_ as ue,e as q,f as ce,g as D,U as fe,h as me,i as ve,B as de,j as z,k as ge,l as G,N as R,V as J}from"./index-DmTIwAtW.js";class j{constructor(t){O(this,"camera",new Y(-1,1,1,-1,0,1));O(this,"geometry",new ee(2,2));O(this,"mesh");this.mesh=new H(this.geometry,t)}get material(){return this.mesh.material}set material(t){this.mesh.material=t}dispose(){this.mesh.geometry.dispose()}render(t){t.render(this.mesh,this.camera)}}const pe=()=>parseInt(te.replace(/\D+/g,"")),K=pe();function xe(r){const t=a.useRef(null),e=a.useRef(!1),l=a.useRef(!1),i=a.useRef(r);return a.useLayoutEffect(()=>void(i.current=r),[r]),a.useEffect(()=>{const o=t.current;if(o){const f=re(()=>(e.current=!1,!0)),n=o.onBeforeRender;o.onBeforeRender=()=>e.current=!0;const u=ne(()=>(e.current!==l.current&&(i.current==null||i.current(l.current=e.current)),!0));return()=>{o.onBeforeRender=n,f(),u()}}},[]),t}function L(r,t,e){const l=B(s=>s.size),i=B(s=>s.viewport),o=typeof r=="number"?r:l.width*i.dpr,f=typeof t=="number"?t:l.height*i.dpr,n=(typeof r=="number"?e:r)||{},{samples:u=0,depth:x,...c}=n,p=a.useMemo(()=>{const s=new S(o,f,{minFilter:$,magFilter:$,type:ae,...c});return x&&(s.depthTexture=new oe(o,f,A)),s.samples=u,s},[]);return a.useLayoutEffect(()=>{p.setSize(o,f),u&&(p.samples=u)},[u,p,o,f]),a.useEffect(()=>()=>p.dispose(),[]),p}const ye=a.forwardRef(({children:r,compute:t,width:e,height:l,samples:i=8,renderPriority:o=0,eventPriority:f=0,frames:n=1/0,stencilBuffer:u=!1,depthBuffer:x=!0,generateMipmaps:c=!1,...p},s)=>{const{size:y,viewport:m}=B(),d=L((e||y.width)*m.dpr,(l||y.height)*m.dpr,{samples:i,stencilBuffer:u,depthBuffer:x,generateMipmaps:c}),[U]=a.useState(()=>new se),h=a.useCallback((b,g,v)=>{var M,T;let _=(M=d.texture)==null?void 0:M.__r3f.parent;for(;_&&!(_ instanceof ie);)_=_.__r3f.parent;if(!_)return!1;v.raycaster.camera||v.events.compute(b,v,(T=v.previousRoot)==null?void 0:T.getState());const[P]=v.raycaster.intersectObject(_);if(!P)return!1;const k=P.uv;if(!k)return!1;g.raycaster.setFromCamera(g.pointer.set(k.x*2-1,k.y*2-1),g.camera)},[]);return a.useImperativeHandle(s,()=>d.texture,[d]),a.createElement(a.Fragment,null,le(a.createElement(he,{renderPriority:o,frames:n,fbo:d},r,a.createElement("group",{onPointerOver:()=>null})),U,{events:{compute:t||h,priority:f}}),a.createElement("primitive",ue({object:d.texture},p)))});function he({frames:r,renderPriority:t,children:e,fbo:l}){let i=0,o,f;return q(n=>{(r===1/0||i<r)&&(o=n.gl.autoClear,f=n.gl.xr.enabled,n.gl.autoClear=!0,n.gl.xr.enabled=!1,n.gl.setRenderTarget(l),n.gl.render(n.scene,n.camera),n.gl.setRenderTarget(null),n.gl.autoClear=o,n.gl.xr.enabled=f,i++)},t),a.createElement(a.Fragment,null,e)}function be(r,t,e,l){const i=class extends D{constructor(f={}){const n=Object.entries(r);super({uniforms:n.reduce((u,[x,c])=>{const p=fe.clone({[x]:{value:c}});return{...u,...p}},{}),vertexShader:t,fragmentShader:e}),this.key="",n.forEach(([u])=>Object.defineProperty(this,u,{get:()=>this.uniforms[u].value,set:x=>this.uniforms[u].value=x})),Object.assign(this,f),l&&l(this)}};return i.key=ce.generateUUID(),i}const Re=be({blur:0,map:null,sdf:null,blend:0,size:0,resolution:new J},`varying vec2 vUv;
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
     #include <${K>=154?"colorspace_fragment":"encodings_fragment"}>
   }`),_e=a.forwardRef(({children:r,events:t=void 0,isVisible:e=!0,blur:l=0,eventPriority:i=0,renderPriority:o=0,worldUnits:f=!1,resolution:n=512,...u},x)=>{me({PortalMaterialImpl:Re});const c=a.useRef(null),{scene:p,gl:s,size:y,viewport:m,setEvents:d}=B(),U=L(n,n),[h,b]=a.useState(0);q(()=>{const w=c.current.blend>0?Math.max(1,o):0;h!==w&&b(w)}),a.useEffect(()=>{t!==void 0&&d({enabled:!t})},[t]);const[g,v]=a.useState(!1),M=a.useCallback(w=>{v(w)},[]),T=xe(M);a.useLayoutEffect(()=>{var w;T.current=(w=c.current)==null?void 0:w.__r3f.parent},[]),a.useLayoutEffect(()=>{if(T.current&&l&&c.current.sdf===null){const w=new H(T.current.geometry,new ve),F=new de().setFromBufferAttribute(w.geometry.attributes.position),E=new Y(F.min.x*(1+2/n),F.max.x*(1+2/n),F.max.y*(1+2/n),F.min.y*(1+2/n),.1,1e3);E.position.set(0,0,1),E.lookAt(0,0,0),s.setRenderTarget(U),s.render(w,E);const Q=Fe(n,n,s)(U.texture),I=new Float32Array(n*n);s.readRenderTargetPixels(Q,0,0,n,n,I);let C=1/0;for(let V=0;V<I.length;V++)I[V]<C&&(C=I[V]);C=-C,c.current.size=C,c.current.sdf=Q.texture,s.setRenderTarget(null)}},[n,l]),a.useImperativeHandle(x,()=>c.current);const _=a.useCallback((w,F)=>{var E;if(!T.current)return!1;if(F.pointer.set(w.offsetX/F.size.width*2-1,-(w.offsetY/F.size.height)*2+1),F.raycaster.setFromCamera(F.pointer,F.camera),((E=c.current)==null?void 0:E.blend)===0){const[X]=F.raycaster.intersectObject(T.current);if(!X)return F.raycaster.camera=void 0,!1}},[]),P=.5,k=y.width*m.dpr,N=y.height*m.dpr;return z.jsx("portalMaterialImpl",{ref:c,blur:l,blend:0,resolution:[k,N],attach:"material",...u,children:z.jsxs(ye,{attach:"map",frames:g&&e?1/0:1,eventPriority:i,renderPriority:o,width:k*P,height:N*P,compute:_,children:[r,z.jsx(we,{events:t,rootScene:p,priority:h,material:c,worldUnits:f})]})})});function we({events:r=void 0,rootScene:t,material:e,priority:l,worldUnits:i}){const{scene:o,camera:f,gl:n,setEvents:u}=B(),x=L(),c=L();a.useLayoutEffect(()=>{o.matrixAutoUpdate=!1},[]),a.useEffect(()=>{n.compile(o,f)},[f,n,o]),a.useEffect(()=>{r!==void 0&&u({enabled:r})},[r]);const[p,s]=a.useMemo(()=>{const y={value:0};return[new j(new D({uniforms:{a:{value:x.texture},b:{value:c.texture},blend:y},vertexShader:`
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
          }`})),y]},[]);return q(function(m){var U,h,b,g,v;const d=(U=e==null?void 0:e.current)==null?void 0:U.__r3f.parent;d&&(i?o.matrixWorld.identity():(l&&((h=e.current)==null?void 0:h.blend)===1&&d.updateWorldMatrix(!0,!1),o.matrixWorld.copy(d.matrixWorld)),l&&(((b=e.current)==null?void 0:b.blend)>0&&((g=e.current)==null?void 0:g.blend)<1?(s.value=e.current.blend,m.gl.setRenderTarget(x),m.gl.render(o,m.camera),m.gl.setRenderTarget(c),m.gl.render(t,m.camera),m.gl.setRenderTarget(null),p.render(m.gl)):((v=e.current)==null?void 0:v.blend)===1&&m.gl.render(o,m.camera)))},l),z.jsx(z.Fragment,{})}const Fe=(r,t,e)=>{const l=new S(r,t,{minFilter:ge,magFilter:$,type:A,format:G,generateMipmaps:!0}),i=new S(r,t,{minFilter:R,magFilter:R}),o=new S(r,t,{minFilter:R,magFilter:R}),f=new S(r,t,{minFilter:R,magFilter:R}),n=new S(r,t,{minFilter:R,magFilter:R}),u=new S(r,t,{minFilter:R,magFilter:R,type:A,format:G}),x=new S(r,t,{minFilter:R,magFilter:R,type:A,format:G}),c=new j(new D({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),y=new j(new D({uniforms:{tex:{value:null},size:{value:new J(r,t)}},vertexShader:`
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
        }`})),m=new j(new D({uniforms:{inside:{value:x.texture},outside:{value:u.texture},tex:{value:null}},vertexShader:`
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
        }`}));return d=>{const U=l;d.minFilter=R,d.magFilter=R,c.material.uniforms.tex.value=d,e.setRenderTarget(i),c.render(e);const h=Math.ceil(Math.log(Math.max(r,t))/Math.log(2));let b=i,g=null;for(let v=0;v<h;v++){const M=Math.pow(2,h-v-1);g=b===i?f:i,s.material.uniforms.level.value=v,s.material.uniforms.maxSteps.value=h,s.material.uniforms.offset.value=M,s.material.uniforms.tex.value=b.texture,e.setRenderTarget(g),s.render(e),b=g}e.setRenderTarget(u),y.material.uniforms.tex.value=g.texture,y.render(e),p.material.uniforms.tex.value=d,e.setRenderTarget(o),p.render(e),b=o;for(let v=0;v<h;v++){const M=Math.pow(2,h-v-1);g=b===o?n:o,s.material.uniforms.level.value=v,s.material.uniforms.maxSteps.value=h,s.material.uniforms.offset.value=M,s.material.uniforms.tex.value=b.texture,e.setRenderTarget(g),s.render(e),b=g}return e.setRenderTarget(x),y.material.uniforms.tex.value=g.texture,y.render(e),e.setRenderTarget(U),m.material.uniforms.tex.value=d,m.render(e),e.setRenderTarget(null),U}};export{_e as default};
