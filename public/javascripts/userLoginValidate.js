
    var emailerror=document.getElementById('email-error');
    var passworderror=document.getElementById('passwordError');
    

    function validateEmail(){
        var emails=document.getElementById('contact-email').value;
    
        if(emails.length==""){
    
            emailerror.innerHTML=" this field is required";
            return false;
    
    
        }
         if(!emails.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
          emailerror.innerHTML="invalid";
          return false;
        }
    
        emailerror.innerHTML='';
        return true;
    
    
    }
    function validatepassword(){
 let password=document.getElementById("loginpassword").value;

  if(password.length==0){
     passworderror.innerHTML=" This Field is Required !";
     return false;
  }
  if(password.length<6){
     passworderror.innerHTML=" Minimum 6 characters required  !";
     return false;
  }

 if(!password.match( /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ )){
     passworderror.innerHTML="password must contain atleast 1 special character and number !";
     return false;

  }
   
  
  passworderror.innerHTML='';
  return true;
 }
  
 function validateForm(){
 if( !validateEmail()||!validatepassword()){
      
     return false;


 }
  }
