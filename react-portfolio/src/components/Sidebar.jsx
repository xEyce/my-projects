import { CircleUserRound, UserRoundCog, FolderCode, Download, House, Moon, Sun } from "lucide-react";
import profilePic from "../assets/profile.jpg"
import resume from "../assets/Evangelio-Resume.pdf"
import { useEffect, useState } from "react";

function Sidebar() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, [])

  return (

    <aside className="flex flex-col bg-bg-light w-[20vw] bg-bg-primary m-6 rounded-3xl dark:bg-container-dark">
      <div className="flex flex-col w-full items-center mt-6 px-10">
        <img src={profilePic} className="rounded-full w-36 h-36"></img>
        <h2 className="mt-2">Adrian Clifford Evangelio</h2>
        <h2 className="">Web Developer</h2>
        <a href={resume} download="Clifford_Evangelio_CV.pdf"
          className="flex gap-2 w-full mt-3 rounded-lg bg-bg-dark text-text-muted p-2 shadow-md shadow-purple-400 cursor-pointer hover:text-purple-400 transition-all ease-in-out dark:bg-bg-light dark:text-text">
          <Download />Resume
        </a>
      </div>

      <div className="flex flex-col justify-between items-center flex-1 mt-6">
        <nav className="flex flex-col space-y-4 w-full">
          <a href="#" 
            className="flex items-center w-full gap-2 px-10 py-2 rounded-lg
            hover:bg-bg-dark hover:text-secondary dark:hover:bg-bg-light dark:hover:text-black">
            <House />Home
          </a>
          <a href="#" 
            className="flex items-center w-full gap-2 px-10 py-2 rounded-lg
            hover:bg-bg-dark hover:text-secondary dark:hover:bg-bg-light dark:hover:text-black">
            <CircleUserRound />About
          </a>
          <a href="#" 
            className="flex items-center w-full gap-2 px-10 py-2 rounded-lg
            hover:bg-bg-dark hover:text-secondary dark:hover:bg-bg-light dark:hover:text-black">
            <UserRoundCog />Skills
          </a>
          <a href="#" 
            className="flex items-center w-full gap-2 px-10 py-2 rounded-lg
            hover:bg-bg-dark hover:text-secondary dark:hover:bg-bg-light dark:hover:text-black">
            <FolderCode />Projects
          </a>
        </nav>
        
        <div className="flex flex-col items-center gap-2 mb-4 transition-all ease-in-out">
            <button
              onClick={toggleTheme}
              className="rounded-full bg-bg-dark text-text-muted p-2 shadow-md shadow-purple-400 cursor-pointer hover:text-purple-400 transition-all ease-in-out dark:bg-bg-light dark:text-text"
              >{theme === 'light' ? <Moon /> : <Sun />}
            </button>
          
          <span className="text-sm">
            {theme === 'light' ? "☀ Light Mode" : "🌙 Dark Mode"}
          </span>
        </div>
      </div>
        

      


    </aside>
  )
}

export default Sidebar