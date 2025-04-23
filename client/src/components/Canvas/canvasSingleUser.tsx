'use client';
import { useDraw } from "@/hooks/useDraw";
import { useShape } from "@/hooks/useShape";
import { ChromePicker } from "react-color";
import { useEffect, useState, useCallback } from "react";
import { drawLine, drawCircle, drawRectangle } from "@/utils/drawShapes";
import socket from "@/services/socket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMenu } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRotateRight, faFileUpload, faCloudDownloadAlt, 
  faPencilAlt, faTimes, faSquare, faCircle, faSave, faShareAlt 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, faTwitter, faInstagram, faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';

// Define types
type Point = { x: number; y: number };
type Draw = { ctx: CanvasRenderingContext2D; currentPoint: Point; prevPoint: Point | null };
type DrawLineProp = { currentPoint: Point; prevPoint: Point | null; color: string };
type ShapeType = "freehand" | "rectangle" | "circle" | "line";

interface CanvasProps {
  params: {
    room?: string;
  };
}

export default function Canvas({ params }: CanvasProps) {
  const [color, setColor] = useState<string>('#FFFFFF');
  const [room, setRoom] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<ShapeType>("freehand");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Initialize window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: document.documentElement.clientWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Canvas hooks
  // Handle shape drawing
  const drawShape = useCallback(({ ctx, startPoint, endPoint }: { 
    ctx: CanvasRenderingContext2D; 
    startPoint: Point; 
    endPoint: Point 
  }) => {
    if (selectedShape === "rectangle") {
      drawRectangle({ ctx, startPoint, endPoint, color });
      socket.emit('draw-rectangle', { startPoint, endPoint, color, room });
    } else if (selectedShape === "circle") {
      drawCircle({ ctx, centerPoint: startPoint, endPoint, color });
      socket.emit('draw-circle', { startPoint, endPoint, color, room });
    }
  }, [color, room, selectedShape]);

  // Handle freehand drawing
  function createLine({ ctx, currentPoint, prevPoint }: Draw) {
    if (selectedShape === 'freehand') {
      drawLine({ ctx, currentPoint, prevPoint, color });
      socket.emit('draw-line', { currentPoint, prevPoint, color, room });
    }
  }
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const { canvasRef: shapeCanvasRef } = useShape(drawShape);

  // Room handling
  useEffect(() => {
    if (params?.room) {
      setRoom(params.room);
      handleJoinRoom(params.room);
    }
  }, [params?.room]);

  const handleJoinRoom = useCallback((roomId: string) => {
    if (roomId.trim()) {
      socket.emit('join-room', roomId);
      socket.emit('client-ready', roomId);
      toast.success(`Successfully joined room - ${roomId}`, {
        position: "top-right",
      });
    }
  }, []);

  // Socket event handlers
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const handleCanvasState = () => {
      if (!canvasRef.current?.toDataURL()) return;
      socket.emit('canvas-state', { room, state: canvasRef.current.toDataURL() });
    };

    const handleCanvasStateFromServer = (state: string) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    };

    const handleDrawLine = ({ currentPoint, prevPoint, color }: DrawLineProp) => {
      drawLine({ ctx, currentPoint, prevPoint, color });
    };

    const handleDrawCircle = ({ startPoint, endPoint, color }: { 
      startPoint: Point; 
      endPoint: Point; 
      color: string 
    }) => {
      drawCircle({ ctx, centerPoint: startPoint, endPoint, color });
    };

    const handleDrawRectangle = ({ startPoint, endPoint, color }: { 
      startPoint: Point; 
      endPoint: Point; 
      color: string 
    }) => {
      drawRectangle({ ctx, startPoint, endPoint, color });
    };

    const handleClearAll = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };

    socket.on('get-canvas-state', handleCanvasState);
    socket.on('canvas-state-from-server', handleCanvasStateFromServer);
    socket.on('draw-line', handleDrawLine);
    socket.on('draw-circle', handleDrawCircle);
    socket.on('draw-rectangle', handleDrawRectangle);
    socket.on('clear-all-from-server', handleClearAll);

    return () => {
      socket.off('get-canvas-state', handleCanvasState);
      socket.off('canvas-state-from-server', handleCanvasStateFromServer);
      socket.off('draw-line', handleDrawLine);
      socket.off('draw-circle', handleDrawCircle);
      socket.off('draw-rectangle', handleDrawRectangle);
      socket.off('clear-all-from-server', handleClearAll);
    };
  }, [canvasRef, room]);

  // Update canvas color when color changes
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 5;
    }
  }, [color, canvasRef]);

  const handleClear = useCallback(() => {
    clear();
    socket.emit('clear-all', room);
  }, [clear, room]);

  const handleShapeChange = useCallback((shape: ShapeType) => {
    setSelectedShape(shape);
  }, []);

  const handleShareCanvas = useCallback(() => {
    const canvas = selectedShape === "freehand" ? canvasRef.current : shapeCanvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL("image/png");
    
    if (navigator.share) {
      navigator.share({
        title: "Check out my drawing!",
        text: "Here's my latest canvas art.",
        url: imageData,
      }).catch(console.error);
    } else {
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "drawing.png";
      link.click();
      toast.info("Image downloaded. Share it manually!");
    }
  }, [canvasRef, shapeCanvasRef, selectedShape]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-5/6 ml-1 rounded-lg overflow-y-auto w-64 z-20 bg-gray-900 text-white p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: '12.5%' }}
      >
        {/* ... (keep your existing sidebar JSX) ... */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="space-y-6">
            {/* Color Picker */}
            <button
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              className="w-full text-left py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 mb-4 transition-all"
            >
              {colorPickerOpen ? "Close Color Picker" : "Choose Color"}
            </button>
            {colorPickerOpen && (
              <div className="relative">
                <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
              </div>
            )}
      
            {/* Shape Selection */}
            <div className="mt-0 space-y-2">
              <h2 className="text-lg font-semibold">Select Shape</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleShapeChange("freehand")}
                  className={`${
                    selectedShape === "freehand" ? "bg-blue-600" : "bg-gray-600"
                  } px-4 py-2 rounded shadow hover:bg-blue-700`}
                >
                  <FontAwesomeIcon icon={faPencilAlt} className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShapeChange("rectangle")}
                  className={`${
                    selectedShape === "rectangle" ? "bg-blue-600" : "bg-gray-600"
                  } px-4 py-2 rounded shadow hover:bg-blue-700`}
                >
                  <FontAwesomeIcon icon={faSquare} className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShapeChange("circle")}
                  className={`${
                    selectedShape === "circle" ? "bg-blue-600" : "bg-gray-600"
                  } px-4 py-2 rounded shadow hover:bg-blue-700`}
                >
                  <FontAwesomeIcon icon={faCircle} className="w-5 h-5" />
                </button>
              </div>
            </div>
      
            {/* File Handling */}
            <div className="mt-3 space-y-2">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700">
                <FontAwesomeIcon icon={faFileUpload} />
                <span>Upload File</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700">
                <FontAwesomeIcon icon={faCloudDownloadAlt} />
                <span>Export</span>
              </button>
      
              {/* <canvas ref={canvasRef} /> */}
              <button
                // onClick={handleSaveCanvas}
                className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700 "
              >
                <FontAwesomeIcon icon={faSave} />
                <span>Save</span>
              </button>
      
              {/* Fetch Saved Image Button */}
              <button
                // onClick={handleFetchCanvasImages}
                className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faCloudDownloadAlt} />
                <span>Fetch Image</span>
              </button>
      
              {/* Fetch Saved Image Button */}
              <button
                onClick={handleShareCanvas}
                className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faShareAlt} />
                <span>Share</span>
              </button>
      
              <button
                onClick={handleClear}
                className="flex items-center space-x-2 text-gray-400 hover:text-white w-full rounded-lg hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faRotateRight} />
                <span>Reset Canvas</span>
              </button>
            </div>
      
            {/* Divider */}
            <hr className="border-gray-700" />
      
            {/* Social Media Links */}
            <div className="space-y-2">
              <a href="#" className="flex justify-center  text-gray-400 hover:text-white">
                <span>Drawing App</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faFacebookF} />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} />
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faLinkedinIn} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
      </div>
      
      {/* Display the fetched image
      {savedImage && (
        <div className="mt-4">
          <h3>Fetched Canvas Image:</h3>
          <img src={savedImage} alt="Fetched Canvas" className="w-full" />
        </div>
      )} */}
      </div>

      {/* Sidebar Toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Canvas */}
      <div className="flex justify-center items-center h-screen w-screen">
        <canvas
          width={windowSize.width}
          height={windowSize.height}
          ref={selectedShape === "freehand" ? canvasRef : shapeCanvasRef}
          onMouseDown={selectedShape === "freehand" ? onMouseDown : undefined}
          className="border border-white rounded-md shadow-lg bg-gray-100"
        />
      </div>

      <ToastContainer />
    </div>
  );
}