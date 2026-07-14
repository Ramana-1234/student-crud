async function getData(){
    let res= await fetch("http://localhost:3000/student");
    let data=await res.json()
    showData(data)
}
async  function showData(data){
let div=document.createElement("div")
data.forEach(student => {
    let div1=document.createElement("div")
    div1.innerHTML=`
    <h3>ID : ${student.id}</h3>
    <p>NAME : ${student.name}</p>
    <img src="${student.image}" width="100px" height="100px"><br>
    <button id="edit${student.id}">Edit</button>
    <button id="delete${student.id}">Delete</button>`;

    div.appendChild(div1)
    
});
    document.body.appendChild(div)


    data.forEach(student=>{
        let deletebtn=document.getElementById(`delete${student.id}`)
        let editbtn=document.getElementById(`edit${student.id}`)

        deletebtn.onclick=()=>{
            deleteData(student.id)
        }
        editbtn.onclick=()=>{
            editData(student.id)
        }
    })
}

async function deleteData(id){
    let res=await fetch(`http://localhost:3000/student/${id}`,{"method":"DELETE"})
    try{
        if(!res.ok){
            throw new Error("Data Not Deleted")
        }
        alert("data Deleted")
    }
catch(error){
console.log(error)
}
}
async function editData(id){
    let studentId=document.getElementById("id")
    let studentName=document.getElementById("name")
    let image=document.getElementById("image")

    let res=await fetch(`http://localhost:3000/student/${id}`)
    try{
        if(!res.ok){
            throw new Error("Data not Getting")
        }
        let data=await res.json();
        studentId.value=data.id;
        studentName.value=data.name;
        image.value=data.image

    }catch(error){
        console.log(error)

    }
}

async function saveData(){
    let studentId=document.getElementById("id").value
    let studentName=document.getElementById("name").value
    let image=document.getElementById("image").value

    let obj={
      
        "name":studentName,
        "image":image
    }
    

    let studentMethod=studentId?"PUT":"POST"

    const Url=studentId?`http://localhost:3000/student/${studentId}`:"http://localhost:3000/student"
    let res=await fetch(Url,{
        "method":studentMethod,
        "headers":{
            "Content-Type":"application/json"
        },
        "body":JSON.stringify(obj)
    })
    try{
        if(!res.ok){
            throw new Error("Data Not Saved")
        }
        alert("Data Saved")
    }catch(error){
        console.log(error)
    }

}


addEventListener("DOMContentLoaded",getData)