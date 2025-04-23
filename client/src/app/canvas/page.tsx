'use client';
import Canvas from "@/components/Canvas/canvasSingleUser";
import ProfileIcons from "@/components/Canvas/ProfileIcons";
import HelpIcon from './../../components/Canvas/HelpIcon';

export default function Page() {
  // Provide default params if needed
  const canvasParams = {
    room: 'single-user-session' // or any default value you need
  };

  return (
    <div>
      <ProfileIcons/>
      <Canvas params={canvasParams}/>
      <HelpIcon/>
    </div>
  );
}