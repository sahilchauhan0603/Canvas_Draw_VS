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

export const drawRectangle = ({ctx , startPoint , endPoint , color} : DrawRectangleProps ) => {

    const x1 = startPoint.x;
    const y1 = startPoint.y;
    const x2 = endPoint.x;
    const y2 = endPoint.y;

    const width = x2 - x1;
    const length = y2 - y1;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.strokeRect(x1, y1 , width , length);

}

export const drawCircle = ({ ctx, centerPoint, endPoint, color }: DrawCircleProps) => {

  const radius = Math.sqrt((endPoint.x - centerPoint.x) ** 2 + (endPoint.y - centerPoint.y) ** 2);

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  
};