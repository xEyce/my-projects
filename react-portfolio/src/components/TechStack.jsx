import bootstrapLogo from "../assets/logos/Bootstrap.svg";
import cssLogo from "../assets/logos/CSS3.svg";
import djangoLogo from "../assets/logos/Django.svg";
import githubLogo from "../assets/logos/Github.svg";
import htmlLogo from "../assets/logos/HTML5.svg";
import javascriptLogo from "../assets/logos/JavaScript.svg";
import laravelLogo from "../assets/logos/Laravel.svg";
import mysqlLogo from "../assets/logos/MySQL.svg";
import phpLogo from "../assets/logos/PHP.svg";
import reactLogo from "../assets/logos/React.svg";
import sqliteLogo from "../assets/logos/SQLite.svg";
import tailwindLogo from "../assets/logos/TailwindCSS.svg";
import vscodeLogo from "../assets/logos/VSCode.svg";

function TechStack() {
    const techStack = [
        { name: "HTML5", logo: htmlLogo },
        { name: "CSS3", logo: cssLogo },
        { name: "JavaScript", logo: javascriptLogo },
        { name: "PHP", logo: phpLogo },
        { name: "Laravel", logo: laravelLogo },
        { name: "ReactJS", logo: reactLogo },
        { name: "Django", logo: djangoLogo },
        { name: "MySQL", logo: mysqlLogo },
        { name: "SQLite", logo: sqliteLogo },
        { name: "TailwindCSS", logo: tailwindLogo },
        { name: "Bootstrap", logo: bootstrapLogo },
        { name: "VSCode", logo: vscodeLogo },
        { name: "Github", logo: githubLogo },
     
    ];
    
    return (
        <div className="relative overflow-hidden bg-bg-light dark:bg-bg-dark m-6 py-4 rounded-3xl">
            {/* Track */}
            <div className="flex animate-marquee">
                {techStack.concat(techStack).map((tech, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center min-w-[150px] mx-6"
                >
                    <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-16 h-16 object-contain"
                    />
                    
                </div>
                ))}
            </div>
        </div>
    );
}

export default TechStack;
