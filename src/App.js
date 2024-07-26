import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { useState,useEffect } from "react";
import DoJob from "./components/DoJob";
function App() {
// dark mode 
const [dark,setDark]=useState(true)
function handleDark(){
    setDark(prevMood=>!prevMood)
}

const [arrOfJobs,setArrOfJobs]=useState([])
const [copiedData,setCopiedData]=useState([])
const [currentId,setCurrentId]=useState(0)
const [remainingJob,setRemainingJob]=useState(arrOfJobs.length)
const [arrOfProgress,setArrOfProgress]=useState([arrOfJobs.progress])
useEffect(()=>{
  setArrOfProgress(arrOfJobs.map(j=>j.progress))
},[arrOfJobs])
useEffect(()=>{
  const incompleteJobs=arrOfProgress.filter(jo=>jo===false).length
  setRemainingJob(incompleteJobs)
},[arrOfProgress])
useEffect(()=>{
  setCopiedData([...arrOfJobs])
},[])
// console.log(copiedData)


const [formData,setFormData]=useState({
  job:"",
  doing:false,
})

// handle the input type and keep tracking of them
function handleChange(event){
  const {name,value,checked,type}=event.target;
  setFormData(prevData=>{
    return{
      ...prevData,
      [name]:type==="checkbox"?checked:value
    }
  })
}
// to prevent creating an empty job
let condition
if(formData.job.length>0){
  condition=true
}
else{
  condition=false
}
// enter jobs to the list and add id for each job
function enterDataToArr(){
  if(!formData.doing&&condition){
    setArrOfJobs(prevData=>[
      ...prevData,
      {id:currentId,job:formData.job,progress:false}
    ])
    setCurrentId(prevId=>prevId + 1)
    setCopiedData(prevData=>[
      ...prevData,
      {id:currentId,job:formData.job,progress:false}
    ])
    
  }
  console.log(arrOfJobs)
  // console.log(currentId)
}
function deleting(id){
  setArrOfJobs(prevJob=>prevJob.filter(job=>job.id!==id ))
  setCopiedData(prevJob=>prevJob.filter(job=>job.id!==id ))
}
// handle the specific job that is clicked using its id 
function handleJobProgress(id){
  setArrOfJobs(prevJobs=>
    prevJobs.map(job=>
      job.id===id?{...job,progress:!job.progress}:job,
    )
  )
  setCopiedData(prevJobs=>
    prevJobs.map(job=>
      job.id===id?{...job,progress:!job.progress}:job,
    )
  )
  
  
}
const styleDelete={
  color:dark?"black":"gray",
}
const dataOfArr = arrOfJobs.map(j => {
  let colorValueForDarkTheme;
  if(dark){
    colorValueForDarkTheme="black"
  }else{
    colorValueForDarkTheme="white"

  }
  
  const doneStyle = {
    color: j.progress ? "gray" : `${colorValueForDarkTheme}` ,
    textDecoration: j.progress ? "line-through" : "none"
  };
  return (
    <div key={j.id} className="written-jobs">
      <input
        type="checkbox"
        onChange={() => handleJobProgress(j.id)}
        checked={j.progress}
      />
      <p style={doneStyle} className="job-name">{j.job}</p>
      <p style={styleDelete} onClick={()=>deleting(j.id)} className="delete">X</p>
    </div>
  );
});
const styleInput={
  color:dark?"black":"white",
  boxShadow:dark?"1px 1px 2px 2px hsl(0, 0%, 98%)":"1px 1px 2px 2px black",
  background:dark?"hsl(0, 0%, 98%)": "hsl(235, 24%, 19%)"
}

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
function showAll(){
  setArrOfJobs(copiedData)
}
function showComplete(){
  const completedJobs=copiedData.filter(job=>job.progress===true)
  setArrOfJobs(completedJobs)
}
function showActive(){

  const remainingJob=copiedData.filter(job=>job.progress===false)
  setArrOfJobs(remainingJob)
}
function clearCompleted() {
  const remainingJobs = copiedData.filter(job => job.progress === false);
  setArrOfJobs(remainingJobs);
  setCopiedData(remainingJobs);
}

  return (
  <>
    <Navbar
      dark={dark}
      handleDark={handleDark}
      formData={formData}
      handleChange={handleChange}
      enterDataToArray={enterDataToArr}
      />
    <div style={styleInput} className="do-container">
        {dataOfArr}
        <div className="container">
          <p className="leftItems">{`${remainingJob} items left`}</p>
          <div className="whatToShow">
            <p onClick={showAll} >All</p>
            <p onClick={showActive} >Active</p>
            <p  onClick={showComplete} >Completed</p>
          </div>
          <p className="clearComplete" onClick={clearCompleted}>Clear Completed</p>
        </div>
    </div>
    
    <Main
      dark={dark}
      handleDark={handleDark}
      arrOfJobsLength={arrOfJobs.length}
      // dataForm={dataForm}
      // handleChange={handleChange}
    />
    
  </>
  );
}

export default App;
