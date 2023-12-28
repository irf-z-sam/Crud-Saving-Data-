let form=document.querySelector("form");
let main=document.querySelector(".main");
let call=document.querySelector("#cAll");
form.addEventListener("submit",(event)=>{
let name=event.target.uname.value;
let email=event.target.email.value;
let phone=event.target.phone.value;
event.preventDefault();
let checkStatus=0;//To restrict duplicate

let userData=JSON.parse(localStorage.getItem("userDetails")) ?? [];
for(let v of userData){
    if(v.email==email || v.phone==phone){
        checkStatus=1;
        break;
    }
}
if(checkStatus==1){
    alert("Email or Phone already exists..!")
}
else{
   userData.push({
          'name':name,
          'email':email,
          'phone':phone
})
console.log(userData);
axios.post("https://crudcrud.com/api/1c22455e2b344306aa734eb647d193c9",userData).then((response)=>{
console.log(response);
})
.catch((err)=>{
    console.log(err);
})
 event.target.reset(); //To reset the form
}
 displayData(); //To print data immediately,called function here.
})
let displayData=()=>{
    let userData=JSON.parse(localStorage.getItem("userDetails")) ?? []; 
   // console.log(userData);
   let finalData='';
   userData.forEach((element,i) => {
   // console.log(element);
    finalData+=`<div class="items">
    <span onclick='removeData(${i})'>&times;</span>
    <h5>Name</h5>
    <div>${element.name}</div>

    <h5>Email</h5>
    <div>${element.email}</div>

    <h5>Phone</h5>
    <div>${element.phone}</div>
</div>`
   });
  // console.log(finalData);
  main.innerHTML = finalData;
}
//displayData();          /*if we call the function here it will not show data on the browser immediately.To show data we have to refresh the page.To get data immediately we have to call the function */

let removeData=(index)=>{
   // alert(index);
   let userData=JSON.parse(localStorage.getItem("userDetails")) ?? [];
   // console.log(userData);
   userData.splice(index,1);
   localStorage.setItem("userDetails",JSON.stringify(userData));
   displayData();
}
call.addEventListener("click",()=>{
    localStorage.clear("userDetails");
    displayData();
})

displayData();