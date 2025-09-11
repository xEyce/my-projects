import Connect from "./Connect"
import TechStack from "./TechStack"

function RightPanel() {
  return (
    <>
      <div className="flex flex-col w-[20vw]">
        <TechStack />
        <Connect />
      </div>
      
    </>
  )
}

export default RightPanel
