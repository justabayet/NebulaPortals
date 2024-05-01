var Y=Object.defineProperty;var H=(r,t,e)=>t in r?Y(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var B=(r,t,e)=>(H(r,typeof t!="symbol"?t+"":t,e),e);import{O as q,P as J,M as N,R as K,r as a,a as Z,b as W,u as k,W as _,L as A,H as ee,D as te,F as I,S as re,c as ne,d as ae,_ as oe,e as L,f as se,g as S,U as ie,h as le,i as ue,B as ce,j,k as fe,l as O,N as y,V as X}from"./index-CpvXJVl3.js";class D{constructor(t){B(this,"camera",new q(-1,1,1,-1,0,1));B(this,"geometry",new J(2,2));B(this,"mesh");this.mesh=new N(this.geometry,t)}get material(){return this.mesh.material}set material(t){this.mesh.material=t}dispose(){this.mesh.geometry.dispose()}render(t){t.render(this.mesh,this.camera)}}const ve=()=>parseInt(K.replace(/\D+/g,"")),Q=ve();function me(r){const t=a.useRef(null),e=a.useRef(!1),v=a.useRef(!1),u=a.useRef(r);return a.useLayoutEffect(()=>void(u.current=r),[r]),a.useEffect(()=>{const s=t.current;if(s){const o=Z(()=>(e.current=!1,!0)),l=s.onBeforeRender;s.onBeforeRender=()=>e.current=!0;const c=W(()=>(e.current!==v.current&&(u.current==null||u.current(v.current=e.current)),!0));return()=>{s.onBeforeRender=l,o(),c()}}},[]),t}function V(r,t,e){const v=k(i=>i.size),u=k(i=>i.viewport),s=typeof r=="number"?r:v.width*u.dpr,o=typeof t=="number"?t:v.height*u.dpr,l=(typeof r=="number"?e:r)||{},{samples:c=0,depth:f,...R}=l,n=a.useMemo(()=>{const i=new _(s,o,{minFilter:A,magFilter:A,type:ee,...R});return f&&(i.depthTexture=new te(s,o,I)),i.samples=c,i},[]);return a.useLayoutEffect(()=>{n.setSize(s,o),c&&(n.samples=c)},[c,n,s,o]),a.useEffect(()=>()=>n.dispose(),[]),n}const de=a.forwardRef(({children:r,compute:t,width:e,height:v,samples:u=8,renderPriority:s=0,eventPriority:o=0,frames:l=1/0,stencilBuffer:c=!1,depthBuffer:f=!0,generateMipmaps:R=!1,...n},i)=>{const{size:b,viewport:U}=k(),d=V((e||b.width)*U.dpr,(v||b.height)*U.dpr,{samples:u,stencilBuffer:c,depthBuffer:f,generateMipmaps:R}),[M]=a.useState(()=>new re),h=a.useCallback((F,x,g)=>{var w,C;let m=(w=d.texture)==null?void 0:w.__r3f.parent;for(;m&&!(m instanceof ne);)m=m.__r3f.parent;if(!m)return!1;g.raycaster.camera||g.events.compute(F,g,(C=g.previousRoot)==null?void 0:C.getState());const[p]=g.raycaster.intersectObject(m);if(!p)return!1;const T=p.uv;if(!T)return!1;x.raycaster.setFromCamera(x.pointer.set(T.x*2-1,T.y*2-1),x.camera)},[]);return a.useImperativeHandle(i,()=>d.texture,[d]),a.createElement(a.Fragment,null,ae(a.createElement(ge,{renderPriority:s,frames:l,fbo:d},r,a.createElement("group",{onPointerOver:()=>null})),M,{events:{compute:t||h,priority:o}}),a.createElement("primitive",oe({object:d.texture},n)))});function ge({frames:r,renderPriority:t,children:e,fbo:v}){let u=0,s,o;return L(l=>{(r===1/0||u<r)&&(s=l.gl.autoClear,o=l.gl.xr.enabled,l.gl.autoClear=!0,l.gl.xr.enabled=!1,l.gl.setRenderTarget(v),l.gl.render(l.scene,l.camera),l.gl.setRenderTarget(null),l.gl.autoClear=s,l.gl.xr.enabled=o,u++)},t),a.createElement(a.Fragment,null,e)}function pe(r,t,e,v){const u=class extends S{constructor(o={}){const l=Object.entries(r);super({uniforms:l.reduce((c,[f,R])=>{const n=ie.clone({[f]:{value:R}});return{...c,...n}},{}),vertexShader:t,fragmentShader:e}),this.key="",l.forEach(([c])=>Object.defineProperty(this,c,{get:()=>this.uniforms[c].value,set:f=>this.uniforms[c].value=f})),Object.assign(this,o),v&&v(this)}};return u.key=se.generateUUID(),u}const xe=pe({blur:0,map:null,sdf:null,blend:0,size:0,resolution:new X},`varying vec2 vUv;
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
     #include <${Q>=154?"colorspace_fragment":"encodings_fragment"}>
   }`),Fe=a.forwardRef(({children:r,events:t=void 0,blur:e=0,eventPriority:v=0,renderPriority:u=0,worldUnits:s=!1,resolution:o=512,...l},c)=>{le({PortalMaterialImpl:xe});const f=a.useRef(null),{scene:R,gl:n,size:i,viewport:b,setEvents:U}=k(),d=V(o,o),[M,h]=a.useState(0);L(()=>{const m=f.current.blend>0?Math.max(1,u):0;M!==m&&h(m)}),a.useEffect(()=>{t!==void 0&&U({enabled:!t})},[t]);const[F,x]=a.useState(!1),g=a.useCallback(m=>{x(m)},[]),w=me(g);a.useLayoutEffect(()=>{var m;w.current=(m=f.current)==null?void 0:m.__r3f.parent},[]),a.useLayoutEffect(()=>{if(w.current&&e&&f.current.sdf===null){const m=new N(w.current.geometry,new ue),p=new ce().setFromBufferAttribute(m.geometry.attributes.position),T=new q(p.min.x*(1+2/o),p.max.x*(1+2/o),p.max.y*(1+2/o),p.min.y*(1+2/o),.1,1e3);T.position.set(0,0,1),T.lookAt(0,0,0),n.setRenderTarget(d),n.render(m,T);const $=be(o,o,n)(d.texture),P=new Float32Array(o*o);n.readRenderTargetPixels($,0,0,o,o,P);let E=1/0;for(let z=0;z<P.length;z++)P[z]<E&&(E=P[z]);E=-E,f.current.size=E,f.current.sdf=$.texture,n.setRenderTarget(null)}},[o,e]),a.useImperativeHandle(c,()=>f.current);const C=a.useCallback((m,p)=>{var T;if(!w.current)return!1;if(p.pointer.set(m.offsetX/p.size.width*2-1,-(m.offsetY/p.size.height)*2+1),p.raycaster.setFromCamera(p.pointer,p.camera),((T=f.current)==null?void 0:T.blend)===0){const[G]=p.raycaster.intersectObject(w.current);if(!G)return p.raycaster.camera=void 0,!1}},[]);return j.jsx("portalMaterialImpl",{ref:f,blur:e,blend:0,resolution:[i.width*b.dpr,i.height*b.dpr],attach:"material",...l,children:j.jsxs(de,{attach:"map",frames:F?1/0:0,eventPriority:v,renderPriority:u,compute:C,children:[r,j.jsx(ye,{events:t,rootScene:R,priority:M,material:f,worldUnits:s})]})})});function ye({events:r=void 0,rootScene:t,material:e,priority:v,worldUnits:u}){const s=k(n=>n.scene),o=k(n=>n.setEvents),l=V(),c=V();a.useLayoutEffect(()=>{s.matrixAutoUpdate=!1},[]),a.useEffect(()=>{r!==void 0&&o({enabled:r})},[r]);const[f,R]=a.useMemo(()=>{const n={value:0};return[new D(new S({uniforms:{a:{value:l.texture},b:{value:c.texture},blend:n},vertexShader:`
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
            #include <${Q>=154?"colorspace_fragment":"encodings_fragment"}>
          }`})),n]},[]);return L(n=>{var b,U,d,M,h;const i=(b=e==null?void 0:e.current)==null?void 0:b.__r3f.parent;i&&(u?s.matrixWorld.identity():(v&&((U=e.current)==null?void 0:U.blend)===1&&i.updateWorldMatrix(!0,!1),s.matrixWorld.copy(i.matrixWorld)),v&&(((d=e.current)==null?void 0:d.blend)>0&&((M=e.current)==null?void 0:M.blend)<1?(R.value=e.current.blend,n.gl.setRenderTarget(l),n.gl.render(s,n.camera),n.gl.setRenderTarget(c),n.gl.render(t,n.camera),n.gl.setRenderTarget(null),f.render(n.gl)):((h=e.current)==null?void 0:h.blend)===1&&n.gl.render(s,n.camera)))},v),j.jsx(j.Fragment,{})}const be=(r,t,e)=>{const v=new _(r,t,{minFilter:fe,magFilter:A,type:I,format:O,generateMipmaps:!0}),u=new _(r,t,{minFilter:y,magFilter:y}),s=new _(r,t,{minFilter:y,magFilter:y}),o=new _(r,t,{minFilter:y,magFilter:y}),l=new _(r,t,{minFilter:y,magFilter:y}),c=new _(r,t,{minFilter:y,magFilter:y,type:I,format:O}),f=new _(r,t,{minFilter:y,magFilter:y,type:I,format:O}),R=new D(new S({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),n=new D(new S({uniforms:{tex:{value:null}},vertexShader:`
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
        }`})),i=new D(new S({uniforms:{tex:{value:null},offset:{value:0},level:{value:0},maxSteps:{value:0}},vertexShader:`
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
        }`})),b=new D(new S({uniforms:{tex:{value:null},size:{value:new X(r,t)}},vertexShader:`
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
        }`})),U=new D(new S({uniforms:{inside:{value:f.texture},outside:{value:c.texture},tex:{value:null}},vertexShader:`
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
        }`}));return d=>{const M=v;d.minFilter=y,d.magFilter=y,R.material.uniforms.tex.value=d,e.setRenderTarget(u),R.render(e);const h=Math.ceil(Math.log(Math.max(r,t))/Math.log(2));let F=u,x=null;for(let g=0;g<h;g++){const w=Math.pow(2,h-g-1);x=F===u?o:u,i.material.uniforms.level.value=g,i.material.uniforms.maxSteps.value=h,i.material.uniforms.offset.value=w,i.material.uniforms.tex.value=F.texture,e.setRenderTarget(x),i.render(e),F=x}e.setRenderTarget(c),b.material.uniforms.tex.value=x.texture,b.render(e),n.material.uniforms.tex.value=d,e.setRenderTarget(s),n.render(e),F=s;for(let g=0;g<h;g++){const w=Math.pow(2,h-g-1);x=F===s?l:s,i.material.uniforms.level.value=g,i.material.uniforms.maxSteps.value=h,i.material.uniforms.offset.value=w,i.material.uniforms.tex.value=F.texture,e.setRenderTarget(x),i.render(e),F=x}return e.setRenderTarget(f),b.material.uniforms.tex.value=x.texture,b.render(e),e.setRenderTarget(M),U.material.uniforms.tex.value=d,U.render(e),e.setRenderTarget(null),M}};export{Fe as default};
