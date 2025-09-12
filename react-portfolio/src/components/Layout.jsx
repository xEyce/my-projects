import Sidebar from "./Sidebar"
import Content from "./Content"
import RightPanel from "./RightPanel"


export default function Layout() {
  return (
    <div className="bg-gray-200 flex h-screen w-screen overflow-hidden dark:bg-bg-dark">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Content />

      {/* Right Panel */}
      <RightPanel />
    </div>
  )
}