import{c as v,j as e,aG as m,aH as p,n as j,G as f,A as l,K as u,R as a,M as C,aI as b,N as w}from"./index-108ef3d0.js";const G=v(e.jsx("path",{d:"M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"}),"GitHub");function I(){var o,c;const{mutate:d,isError:x,error:t}=m(),{mutate:h,isError:g,error:r}=p(),{setUser:n}=j(),i=f();return e.jsxs(e.Fragment,{children:[x&&e.jsx(l,{severity:"error",children:(o=r==null?void 0:r.response)==null?void 0:o.data.message}),g&&e.jsx(l,{severity:"error",children:(c=t==null?void 0:t.response)==null?void 0:c.data.message}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx(u,{startIcon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48",width:"20px",height:"20px",children:[e.jsx("path",{fill:"#FFC107",d:"M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"}),e.jsx("path",{fill:"#FF3D00",d:"M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"}),e.jsx("path",{fill:"#4CAF50",d:"M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"}),e.jsx("path",{fill:"#1976D2",d:"M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"})]}),variant:"outlined",color:"google",disableElevation:!0,disabled:!0,onClick:()=>h(void 0,{onSuccess:s=>{n(s),i(a.root,{replace:!0})}}),children:"Google"}),e.jsx(u,{startIcon:e.jsx(G,{}),variant:"contained",color:"github",disableElevation:!0,disabled:!0,onClick:()=>d(void 0,{onSuccess:s=>{n(s),i(a.root,{replace:!0})}}),children:"Github"})]})]})}function S(){return e.jsxs("div",{className:"w-full max-w-md flex flex-col gap-3",children:[e.jsx("h5",{className:"text-3xl font-semibold text-center mb-5 text-foreground-primary",children:"Sign in to your Account"}),e.jsx(I,{}),e.jsx(C,{className:"my-2 text-foreground-secondary",children:"Or continue with"}),e.jsx(b,{}),e.jsxs("p",{className:"text-center text-foreground-primary",children:["Don't have an account?"," ",e.jsx(w,{to:a.auth.signUp,replace:!0,className:"text-primary-600 hover:underline hover:text-primary-800",children:"Create new account"})]})]})}function N(){return e.jsx(S,{})}export{N as default};
