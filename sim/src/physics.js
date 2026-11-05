// Exact Navier–Stokes solutions on T^3 = [0,2π)^3 and grid diagnostics.
(function(root){
const TWO_PI=2*Math.PI, PI3=Math.PI**3;
const MODES={
  abc:{ // Arnold–Beltrami–Childress: curl u = u, -Δu = u  => exact NS with p = -|u|²/2
    name:'ABC (Beltrami)',
    vel(x,y,z,t,nu,P){const g=Math.exp(-nu*t),{A,B,C}=P;return [(A*Math.sin(z)+C*Math.cos(y))*g,(B*Math.sin(x)+A*Math.cos(z))*g,(C*Math.sin(y)+B*Math.cos(x))*g];},
    vort(x,y,z,t,nu,P){return this.vel(x,y,z,t,nu,P);},
    analytic(t,nu,P){const S=P.A**2+P.B**2+P.C**2,E=4*PI3*S*Math.exp(-2*nu*t);return {E,Z:E,H:2*E,dEdt:-2*nu*E};}
  },
  tg:{ // 2D-in-3D Taylor–Green: exact NS with p = ¼(cos2x+cos2y)e^{-4νt}
    name:'Taylor–Green (2D-in-3D)',
    vel(x,y,z,t,nu){const g=Math.exp(-2*nu*t);return [Math.sin(x)*Math.cos(y)*g,-Math.cos(x)*Math.sin(y)*g,0];},
    vort(x,y,z,t,nu){return [0,0,2*Math.sin(x)*Math.sin(y)*Math.exp(-2*nu*t)];},
    analytic(t,nu){const E=2*PI3*Math.exp(-4*nu*t);return {E,Z:2*E,H:0,dEdt:-4*nu*E};}
  }
};
// E=½Σ|u|²ΔV, Z=½Σ|ω|²ΔV, H=Σu·ωΔV; ω, ∇·u by 6th-order periodic central differences
function gridDiag(mode,t,nu,P,N=24){
  const m=MODES[mode],h=TWO_PI/N,dV=h*h*h,U=new Float64Array(N*N*N*3);
  const w=i=>((i%N)+N)%N, id=(i,j,k)=>(w(i)*N+w(j))*N+w(k);
  for(let i=0;i<N;i++)for(let j=0;j<N;j++)for(let k=0;k<N;k++){const v=m.vel(i*h,j*h,k*h,t,nu,P),c=3*id(i,j,k);U[c]=v[0];U[c+1]=v[1];U[c+2]=v[2];}
  const D=(a,i,j,k,ax)=>{const o=[0,0,0],g=s=>{o[ax]=s;return U[3*id(i+o[0],j+o[1],k+o[2])+a];};
    return (45*(g(1)-g(-1))-9*(g(2)-g(-2))+(g(3)-g(-3)))/(60*h);};
  let E=0,Z=0,H=0,divMax=0,wMax=0;
  for(let i=0;i<N;i++)for(let j=0;j<N;j++)for(let k=0;k<N;k++){
    const c=3*id(i,j,k),u=[U[c],U[c+1],U[c+2]];
    const wx=D(2,i,j,k,1)-D(1,i,j,k,2),wy=D(0,i,j,k,2)-D(2,i,j,k,0),wz=D(1,i,j,k,0)-D(0,i,j,k,1);
    E+=0.5*(u[0]**2+u[1]**2+u[2]**2)*dV; const w2=wx*wx+wy*wy+wz*wz; Z+=0.5*w2*dV; H+=(u[0]*wx+u[1]*wy+u[2]*wz)*dV;
    wMax=Math.max(wMax,Math.sqrt(w2)); divMax=Math.max(divMax,Math.abs(D(0,i,j,k,0)+D(1,i,j,k,1)+D(2,i,j,k,2)));}
  return {E,Z,H,divMax,wMax,N};
}
function fullDiag(mode,t,nu,P,N=24){const dt=1e-3,d=gridDiag(mode,t,nu,P,N);
  d.dEdt=(gridDiag(mode,t+dt,nu,P,N).E-gridDiag(mode,t-dt,nu,P,N).E)/(2*dt);
  d.residual=d.dEdt+2*nu*d.Z; d.relResidual=Math.abs(d.residual)/Math.max(Math.abs(d.dEdt),1e-300); return d;}
function rk4(mode,pos,n,t,dt,nu,P){const m=MODES[mode];
  for(let i=0;i<n;i++){const x=pos[3*i],y=pos[3*i+1],z=pos[3*i+2];
    const a=m.vel(x,y,z,t,nu,P),b=m.vel(x+dt/2*a[0],y+dt/2*a[1],z+dt/2*a[2],t+dt/2,nu,P),
          c=m.vel(x+dt/2*b[0],y+dt/2*b[1],z+dt/2*b[2],t+dt/2,nu,P),d=m.vel(x+dt*c[0],y+dt*c[1],z+dt*c[2],t+dt,nu,P);
    for(let k=0;k<3;k++)pos[3*i+k]+=dt/6*(a[k]+2*b[k]+2*c[k]+d[k]);}}
function lattice(n=25){const out=[],R=Math.PI;for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++){
  const p=[i,j,k].map(q=>-R+2*R*q/(n-1));out.push(p[0]+R,p[1]+R,p[2]+R);}return new Float64Array(out);}
const api={MODES,gridDiag,fullDiag,rk4,lattice};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Physics=api;
})(this);
