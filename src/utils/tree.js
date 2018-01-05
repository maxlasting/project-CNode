let maxBranch = 3, firstGrow = true;

function Tree(ctx, startX, startY, length, angle, depth, branchWidth){
  const endX = startX + length * Math.cos(angle);
  const endY = startY + length * Math.sin(angle);
  
  const color = (depth--) <= maxBranch - 1 ? `rgb(0, ${rp([128, 192])}, 0)` : `rgb(68, 50, 25)`;
  
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineWidth = branchWidth;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
  
  if(!depth) return;
  
  const subBranches = rp([firstGrow ? 2 : 1, maxBranch]);
  firstGrow = false;
  branchWidth *= 0.72;
  
  for(var i=0; i<subBranches; i++){
    const newAngle = angle + rp([-Math.PI/5, Math.PI/5], true);
    const newLength = length * rp([0.7, 1], true);
    setTimeout(Tree, 10, ctx, endX, endY, newLength, newAngle, depth, branchWidth);
  }
};

function rp(arr, uint){
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const ret = Math.random() * (max - min) + min;
  return uint ? ret : Math.round(ret);
}

export default Tree