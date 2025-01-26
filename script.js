let prompt= document.querySelector("#prompt")
let btn=document.querySelector("#button")
let chat=document.querySelector(".chat")
let chatCon=document.querySelector(".chat-con")
let api="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB98QpV90z4m9nv8OGtLUYLGrFPNu4s-dc"
let userMsg=null;
function createChatBox(html,className){
     let div=document.createElement("div")
     div.classList.add(className)
     div.innerHTML=html
     return div
}
async function getApi(aiBox){
    let text =aiBox.querySelector(".text")
    try{
        let response= await fetch(api,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                contents: [{
                    "parts":[{text:userMsg}]
                    }]
            })
        })
    let data=await response.json();
    let apiResponse=data?.candidates[0].content.parts[0].text;
    text.innerText=apiResponse
    }
    catch(error){
       console.log(error)
    }
    finally{
        aiBox.querySelector(".loading").style.display="none"
    }
}
function loading(){
    let html=`<div class="img">
                <img src="chatbot-4736275_1280.png" alt="ai" width="50px">
            </div>
            <p class="text"></p>
            <img class="loading" src="load-32_256.gif" alt="loading" width="90px">`
            let aiBox=createChatBox(html,"ai")
            chatCon.appendChild(aiBox)
            getApi(aiBox)

}

btn.addEventListener("click",()=>{
    userMsg=prompt.value
    if(userMsg==""){
        chat.style.display="flex"
    }{
        chat.style.display="none"
    }
    if(!userMsg) return;
    let html =`<div class="img">
                <img src="user-307993_1280.png" alt="user" width="50px">
            </div>
            <p class="text"></p>`;
    let userBox=createChatBox(html,"user")
    userBox.querySelector(".text").innerText=userMsg
    chatCon.appendChild(userBox)
    prompt.value=""
    setTimeout(loading,500)
})
