export const drawLine = ({ctx , currentPoint , prevPoint , color} : DrawLineprops) => {
    const {x,y} = currentPoint;
    const lineColor = color
    const lineWidth = 5;

    const startPoint = prevPoint ?? currentPoint 
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x , startPoint.y)
    ctx.lineTo(x,y);
    ctx.stroke();

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x , startPoint.y , 2 , 0 ,2* Math.PI)
    ctx.fill()
}