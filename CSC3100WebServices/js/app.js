//start Global variables
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const strBaseURL = "https://swollenhippo.com/DS3870/Characters/api/"
// End global variables

// check if already logged in
if(sessionStorage.getItem('SessionID')){
    document.querySelector('#frmLogin').style.display = 'none'
    document.querySelector('#divDashboard').style.display = 'block'
}
//end check if already logged in

// Start click handlers
// click event for btnSwapRegister to hide frmLogin and show frmRegister
document.querySelector('#btnSwapRegister').addEventListener('click', function(){
    document.querySelector('#frmLogin').style.display = 'none'
    document.querySelector('#frmRegister').style.display = 'block'
})
// click event for btnSwapLogin to hide frmRegister and show frmLogin
document.querySelector('#btnSwapLogin').addEventListener('click', function(){
    document.querySelector('#frmRegister').style.display = 'none'
    document.querySelector('#frmLogin').style.display = 'block'
})
// click event for btnLogin
document.querySelector('#btnLogin').addEventListener('click', function(){
    async function createSession(strUserEmail, strUserPassword){
        try {
            const objResponse = await fetch(strBaseURL + 'sessions.php',{
                method:"POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({Email:strUserEmail, Password:strUserPassword})
            })

            if(!objResponse.ok){
                throw new Error('HTTP Error Status: ${objResponse.status}')
            }        
            const objData = await objResponse.json()
            if(objData.SessionID){
                  //Sweet alert for succes
                swal.fire({
                    position: "top-mid",
                    icon: "success",
                    title: "Login successful",
                    showConfiguration: false,
                    timer: 1500
                })
                // save the session id to sessionStorage
                sessionStorage.setItem("SessionID", objData.SessionID)
               
                //Clear our form
                document.querySelector("#txtLoginUsername").value = ''
                document.querySelector("#txtLoginPassword").value = ''

                //Swap back to login
                document.querySelector('#frmLogin').style.display = 'none'
                document.querySelector('#divDashboard').style.display = 'block'
            
            } else {
                //Sweet alert for failure
            }
        } catch(objError){
            console.log(`Error fetching objData`, objError)
            //create a sweetalert for user indicating failure
        }
    }
   
    // Retrieve the values from your login form
    const strEmail = document.querySelector("#txtLoginUsername").value.trim().toLowerCase()
    const strPassword = document.querySelector("#txtLoginPassword").value
    // Validate the data
    let blnError = false
    let strMessage = ''
    if(!regEmail.test(strEmail)){
        blnError = true
        strMessage += "<p>Invalid email</p>"
    }
    if(strPassword.length < 6){
        blnError = true
        strMessage += "<p>Invalid Password</p>"
    }
    if(blnError == true){
        swal.fire({
            title:"look a little closer there may be errors",
            html:strMessage,
            icon:"error"
        })
    } else {
        createSession(strEmail,strPassword)
    }
    // Use a Fetch command to create an account

    // Evaluate the response to ensure it worked
    // Save session information to sessionStorage 
})



// click event for btnRegister
document.querySelector('#btnRegister').addEventListener('click', function(){
    // Define a function to create a user
    async function createUser(strUserEmail, strUserPassword, strUserFirstName, strUserLastName){
        try {
            const objResponse = await fetch(strBaseURL + 'users.php',{
                method:"POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({Email:strUserEmail ,FirstName:strUserFirstName ,LastName:strUserLastName, Password:strUserPassword})
            })

            if(!objResponse.ok){
                throw new Error('HTTP Error Status: ${objResponse.status}')
            }        
            const objData = await objResponse.json()
            if(objData.Outcome){
                  //Sweet alert for succes
                swal.fire({
                    position: "top-mid",
                    icon: "success",
                    title: "Registration successful",
                    showConfiguration: false,
                    timer: 1500
                })
              
                //Clear our form
                document.querySelector("#txtUsername").value = ''
                document.querySelector("#txtPassword").value = ''
                document.querySelector("#txtFirstName").value = ''
                document.querySelector("#txtLastName").value = ''
                //Swap back to login
                document.querySelector('#frmLogin').style.display = 'block'
                document.querySelector('#frmRegister').style.display = 'none'
            
            } else {
                //Sweet alert for failure
            }
        } catch(objError){
            console.log(`Error fetching objData`, objError)
            //create a sweetalert for user indicating failure
        }
    }
    // Retrieve the values from your registration form
    const strEmail = document.querySelector("#txtUsername").value.trim().toLowerCase()
    const strPassword = document.querySelector("#txtPassword").value
    const strFirstName = document.querySelector("#txtFirstName").value
    const strLastName = document.querySelector("#txtLastName").value

    // Validate the data
    let blnError = false
    let strMessage = ''

    if(!regEmail.test(strEmail)){
        blnError = true
        strMessage += "<p>Invalid email</p>"
    }

    if(strPassword.length < 6){
        blnError = true
        strMessage += "<p>Invalid Password</p>"
    }

    if(strFirstName.length < 1 || strLastName.length < 1){
        blnError = true
        strMessage += "<p>Invalid name</p>"
    }

    if(blnError == true){
        swal.fire({
            title:"look a little closer there may be errors",
            html:strMessage,
            icon:"error"
        })
    } else {
        createUser(strEmail, strPassword, strFirstName, strLastName)
    }

})

// click event for btnSearch
document.querySelector('#btnSearch').addEventListener('click', function(){
    // Retrieve the values from your txtAnimalName
    const strAnimalName = document.querySelector("#txtAnimalName").value.trim()
    // Validate data is there
    let blnError=false
    let strError = ""
    if(strAnimalName.length < 2){
        blnError = true
        strError += "<p>You must enter an animal name</p>"
    }

    if(blnError == true){
        swal.fire({
            title: "oops, something went wrong"
        })
    } else {
        async function queryAnimal(strQueryAnimalName){
            try {
                const strSessionID = sessionStorage.getItem("SessionID")
                const objResponse = await fetch(strBaseURL + `animals.php?SessionID=${strSessionID}&AnimalType=${strQueryAnimalName}`,{
                    method:"GET",
                    headers: {
                        'Content-Type':'application/json'
                    },
                })
    
                if(!objResponse.ok){
                    throw new Error('HTTP Error Status: ${objResponse.status}')
                }        
                const objData = await objResponse.json()
                if(objData.length > 0){
                     console.log(objData)
                } else {
                    //Sweet alert for failure
                    // else error animal not found
                }
            } catch(objError){
                console.log(`Error fetching objData`, objError)
                //create a sweetalert for user indicating failure
            }
        }
        queryAnimal(strAnimalName)
    }
    // Use a Fetch command to retrieve data

    // Evaluate the response to ensure it worked

    // Set the text of pData
})
// End click handlers