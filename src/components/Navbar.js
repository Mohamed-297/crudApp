import sun from "../images/icon-sun.svg"
import moon from "../images/icon-moon.svg"
import lightDesk from "../images/bg-desktop-light.jpg"
import darkDesk from "../images/bg-desktop-dark.jpg"
import lightMob from"../images/bg-mobile-light.jpg"
import darkMob from"../images/bg-mobile-dark.jpg"
import { useEffect, useState } from "react"
export default function Navbar(props){
    
    
    //getting window size for checking on the right UI to display
    const [windowWidth,setWindowWidth]=useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const styleInput={
        color:props.dark?"black":"white",
        background:props.dark?"hsl(0, 0%, 98%)": "hsl(235, 24%, 19%)"
    }
    let img_url=lightDesk;
    //darkMode
    if(props.dark&&windowWidth>"368"){
        img_url=lightDesk
    }
    else if(props.dark&&windowWidth<"368"){
        img_url=lightMob

    }
    else if(!props.dark&&windowWidth<"368"){
        img_url=darkMob
        
    }
    else if(!props.dark&&windowWidth>"368"){
        img_url=darkDesk

    }
    //styling the navImage
    const styleImg={
        backgroundImage:`url(${img_url})`,
        backgroundSize:"100% 100%"
    }
    
    return(
        <nav style={styleImg}>
            <div className="nav-content">
                <div className="para-icon">
                    <p>TODO</p>
                    <img onClick={props.handleDark} src={props.dark? moon:sun} alt=""/>
                </div>
                <div className="inputsContainer">
                <input 
                    style={styleInput}
                    className="enter-todo"
                    type="text"
                    placeholder="Create a new Todo.."
                    name="job"
                    onChange={props.handleChange}
                    value={props.formData.job}
                    >
                </input>
                <input
                    type="checkbox"
                    className="checking"
                    name="doing"
                    onClick={props.enterDataToArray}
                    onChange={props.handleChange}
                    checked={props.formData.doing}
                    >
                </input>
                </div>
            </div>
        </nav>
    )
}