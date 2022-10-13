var n,s,f,a1,b3,cv,a,p,d
var lid = [];
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
function formatPMPM(date) {
  var hours = date.charAt(0)+date.charAt(1);
  var minutes = date.charAt(3)+date.charAt(4);
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm.toUpperCase();
  return strTime;
}

function gather_info_hs(){
    n = document.getElementById("bus_num").value;
    s = document.getElementById("bus_nam").value;
    f = document.getElementById("bus_j_nam").value;
}
function gather_info(){
    a = document.getElementById('name').value;
    p = document.getElementById("Num").value;
    d = document.getElementById("Add").value;
}

function Go(){
    gather_info()
    firebase
    .database()
    .ref("Fathers/"+a+"/")
    .set({
       'Phone Number':p,
       'Address':d
    });
    document.getElementById("f").innerHTML = "Father: "+a;
    document.getElementById("p").innerHTML = "Phone Number: "+p;
    document.getElementById("a").innerHTML = "Address: "+d;
    document.getElementById("clo").click()
}

function Show_All(){
   firebase
   .database()
   .ref("Fathers/")
   .on("value",(snap)=>{
    a1 = snap.val();
    let c1 = Object.keys(a1)
    document.getElementById("m-body").innerHTML =   c1;
   })
} 
function o(msgh){
   return JSON.stringify(msgh)
}
// function Search(){
//     firebase
//     .database()
//     .ref("Fathers/")
//     .on("value",(snap)=>{
//      a1 = snap.val();
//      let search = document.getElementById("SRCH").value.toUpperCase();
//      let len = Object.keys(a1).length;
//      for(let i=0; i<len; i++){
//        let kk = Object.keys(a1)[i]
//        let jj = kk.toUpperCase();
//        if(jj.indexOf(search) > -1){
//         document.getElementById("opn").click();
//         document.getElementById('m1-body').innerHTML = Object.keys(a1)[i]+": "+JSON.stringify(a1[ Object.keys(a1)[i]]);
//        }
       
//      }
     
//     });

 
// }
function next(){
  location.replace("bus.html")
}
function warn(msg){
alert(msg)
}
function Go_student(){
    gather_info_hs()
    firebase
    .database()
    .ref("Fathers/")
    .on("value",(snap)=>{
     a1 = snap.val();
     let search = f.toUpperCase();
     let len = Object.keys(a1).length;
     for(let i=0; i<len; i++){
       let kk = Object.keys(a1)[i]
       let jj = kk.toUpperCase();
       if(jj.indexOf(search) > -1){
        agree()
        break
       }
       
     }
     
    });
    function agree(){
        firebase
    .database()
    .ref("Students/"+s+"/")
    .set({
       'FatherName':f,
       'BusNo':n
    });
    document.getElementById("f").innerHTML = "Student Name: "+s;
    document.getElementById("p").innerHTML = "Fathers Name: "+f;
    document.getElementById("a").innerHTML = "Bus Number: "+n;
    document.getElementById("clo").click()
    }
}

function Show_All_Student(){
    firebase
    .database()
    .ref("Students/")
    .on("value",(snap)=>{
     a1 = snap.val();
     let c1 = Object.keys(a1)
     document.getElementById("m-body").innerHTML =   c1;
    })
}
function search_s3(){
    firebase
    .database()
    .ref("Students/")
    .on("value",(snap)=>{
     a1 = snap.val();
     let search = document.getElementById("SRCH").value.toUpperCase();
     let len = Object.keys(a1).length;
     for(let i=0; i<len; i++){
       let kk = Object.keys(a1)[i]
       let jj = kk.toUpperCase();
       if(jj.indexOf(search) > -1){
        agree()
        break
       }
       function agree(){
        firebase
        .database()
        .ref("Students/"+kk+"/")
        .on('value',(snap)=>{
            console.log(snap.val().FatherName)
            cv = snap.val().FatherName;
            firebase
            .database()
            .ref('Fathers/'+cv+"/")
            .on('value',(snap)=>{
            b3 = snap.val()
            document.getElementById('opn').click()
            document.getElementById("m1-body").innerHTML = cv+": "+JSON.stringify(b3);
            console.log(b3)
            })
        })
       }
     }
     
    });

 
}
function home(){
  location.replace('index.html')
}
function get_list(){
   lid = [];
   document.getElementById("myUL").innerHTML = ''
    let no = document.getElementById("NO").value;
    firebase
    .database()
    .ref("Students/")
    .on("value",(snap)=>{
        let d6 = snap.val();
        let jj = Object.keys(d6)
        let mm = jj.length
        lid = []
        document.getElementById('myUL').innerHTML = ''
        for(let i = 0; i<mm; i++){
            console.log('starting')
            firebase
            .database()
            .ref('Students/'+jj[i]+"/")
            .on('value',(snap)=>{
              let bus_n  = snap.val().BusNo;
              console.log(bus_n,no)
              if(bus_n != no){
                console.log('Worng')
              }else{
            lid.push(jj[i])
             console.log(lid)
             
              }
            })
            console.log('ending')
        }
        lid.forEach(function(item) {
            var li = document.createElement("li");
            var text = document.createTextNode(item);
            li.appendChild(text);
            let k = text
            li.onclick = ()=>{
            document.getElementById("clt").click()
            localStorage.setItem('ID',item)
            console.log(k)
           
            }
            li.style.color = 'Black'
            li.style.textDecoration = 'UnderLine'
            li.className = 'pointer'
            document.getElementById("myUL").appendChild(li);
          });
          
    })
}

function Set_On(){
  let time = document.getElementById('tim').value;
  let arr_dep = document.getElementById("select").value
  console.log(arr_dep,time)
  let RT = formatPMPM(time)
  console.log(RT)
  if(arr_dep == 'Arrival'){
    firebase
    .database()
    .ref('Students/'+localStorage.getItem("ID")+'/')
    .update({
     'Arrival':RT
    })
  }else{
    firebase
    .database()
    .ref('Students/'+localStorage.getItem("ID")+'/')
    .update({
      'Departure':RT
    })
  }if(arr_dep =='Absent'){
    firebase
    .database()
    .ref('Students/'+localStorage.getItem("ID")+'/')
    .update({
      'Arrival':'Absent',
      'Departure':'Absent'
    })
  }

}

function search_s4(){
  firebase
  .database()
  .ref("Students/")
  .on("value",(snap)=>{
   a1 = snap.val();
   let search = document.getElementById("SRCH2").value.toUpperCase();
   let len = Object.keys(a1).length;
   for(let i=0; i<len; i++){
     let kk = Object.keys(a1)[i]
     let jj = kk.toUpperCase();
     if(jj.indexOf(search) > -1){
      agree()
      break
     }
     function agree(){
      let arri,depa
      firebase
      .database()
      .ref("Students/"+kk+"/")
      .on('value',(snap)=>{
          let arr = snap.val().Arrival
          let dep = snap.val().Departure
         
          if(arr){
            arri = arr
          }else{
            arri = 'Data Not Set'
          }

          if(dep){
            depa = dep
          }else{
            depa = 'Data Not Set'
          }
      })
      document.getElementById("name").innerHTML = kk
      document.getElementById("arr").innerHTML = arri
      document.getElementById("dep").innerHTML = depa
     }
   }
   
  });
}
function reset(){
  firebase
  .database()
  .ref("Students/")
  .on("value",(snap)=>{
    let b612 = snap.val()
    console.log(b612)
    let key = Object.keys(b612)
    let lent = Object.keys(b612).length
    for(let i = 0; i<lent; i++){
      let keyed = Object.keys(b612)[i]
      firebase
      .database()
      .ref('Students/'+keyed+"/"+'Arrival')
      .remove()
    }
    for(let i = 0; i<lent; i++){
      let keyed = Object.keys(b612)[i]
      firebase
      .database()
      .ref('Students/'+keyed+"/"+'Departure')
      .remove()
    }
  })
}