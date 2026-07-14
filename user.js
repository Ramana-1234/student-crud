async function getData(){
    let res=await fetch("https://student-crud-9h6y.onrender.com/student")
    let data=await res.json();
    showData(data)
}
async function showData(data){
    let div=document.createElement("div")
data.forEach(student => {
    let div1=document.createElement("div")
    div1.innerHTML=`
    <h3>ID : ${student.id}</h3>
    <p>NAME : ${student.name}</p>
    <img src="${student.image}" width="100px" height="100px"><br>`;

    div.appendChild(div1)
});
   document.body.appendChild(div)
}
getData();