type Point = {x : number , y : number};

type Draw = {
    ctx : CanvasRenderingContext2D,
    currentPoint : Point,
    prevPoint : Point | null
    
}

type DrawLineprops = Draw & {
    color : string 
}

type DrawLineProp = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}

interface PostPageProps {
  params?: {
    currRoom?: string;
  };
}

type DrawRectangleProps = {
  ctx :CanvasRenderingContext2D,
  startPoint : Point,
  endPoint : Point,
  color : string 
}

interface DrawCircleProps {
  ctx: CanvasRenderingContext2D;
  centerPoint: Point;
  endPoint: Point;
  color: string;
}

type DrawShapeProps = {
  ctx :CanvasRenderingContext2D,
  startPoint : Point,
  endPoint : Point,
}
interface ChatIconProps {
  name?: string; 
  room : string;
}
interface CanvasIconProps {
  room : string;
}
