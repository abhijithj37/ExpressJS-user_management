var express = require('express');
var session = require('express-session');
var router = express.Router();
const userHelpers=require('../helpers/user-helpers');


 
router.get('/', function(req, res,) {
  let user=req.session.user;
  
  var vehicle=[

    {
      img:"https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331cqgv2Z7d%25i02uCaY3MuO2kOHUtWPfbYfvGdi10tLhu1XzWVo7puMLWFmdkAj5DOPiIpBZ8XgY1nTNIowJ4HO3zkyXq%25sGM8snGhMQSk%2508Xc9Vo74gY8TNF1VgxNJ0%25lJ2oub5imC2yRCzXeTt%25ViPRKVZVYV2GWh1DMztzOUeqVYDafHoTjmztYRSJd167aftxdTQfw1RSfWQlO%25%25VxdSeZsg3uzWQdjc0XN3aeZQ6KAnkXRjcZwBO5xrx6Kc%252yGd4WwBKupC81Fe%252B3iELjIjup2XHNaMv63iprJ8yYGwXHi4TPFR9%25rJHFlMILou4TJIsDTgL3FlTv0YxryXIslGAtHCCrv0s9Ofd6E4GA0ogS6qNF9OALUd1%25kIogOybQuunvLUgChOE15GybUEqgbF89ChbNmU7IPoEqhk7b1DMLNmqn1hUFDyk7m5VqQTYCn178zm9dtE5V1PaZ3dfN8zVMRcp9SkPazDxMBDdnua2lKWzL1AHRu672mnVt0YgMHNp",
      name:"BMW 2 Series Gran Coupe",
      conf:"Sporty Progressive Interior Design 4 cylinder 190-hp-engine ",
      perfo:"Uncompromising,Performance-Oriented aiesthetics",
      fuel:"Fuel Economy in KM:18.64"
      
    },
    {
      img:"https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331cqgv2Z7d%25i02uCaY3MuO2kOHUtWPfbYf0jD110tLhu1XzWVo7puMLWFmdkAj5DOPMIpsZ8XgY1nTNIowJ4HO3zkyXq%25sGM8snGhMQSk%2508Xc9Vo74giU2NF1VgxNJ0%25ls2oub5imC2yRCzXeTt%25ViPRKVZVYF0VWh1DMztzr5eqVYDafHJ9jmztYRSaPP67aftxdRyxw1RSfWQvbm%25VxdSeZfFLuzWQdjcybj3aeZQ6KCHyXRjcZwBLv5rx6Kc%252y5b4WwBKupC3PFe%252B3in2ZIjup2XH5Azv63iprJyDKGwXHi4TCze9%25rJHFlERLou4TJIsIefL3FlTv0VeHyXIslGAzQdCrv0s9OD%25DE4GA0ogsuyNF9OALUPRXkIogOybMx8nvLUgChDS85GybUEqCrN89RbfKYmUrOpQhRVAf09gk2NHCL%25S",
      name:"BMW-X1",
      conf:"Seven Speed-Steptronic Sport Transmission with Double-Clutch",
      perfo:"Central information Display With 16.6 Cm Screen",
      fuel:"Fuel Economy in KM:14.24"

    },
    { 
      img:"https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331cqgv2Z7d%25i02uCaY3MuO2kOHUtWPfbYf7t8l10tLhu1XzWVo7puMLWFmdkAj5DOPFtp8Z8XgY1nTNIowJ4HO3zkyXq%25sGM8snGhMQSk%2508Xc9Vo74giZ5NF1VgxNJ0%25ls2oub5imC2yRCzXeTt%25ViPRKVZVYVyqWh1DMztIVCeqVYDafHRAjmztYRSJdw67aftxdTlkw1RSfWQlUY%25VxdSeZs3EuzWQdjc0kN3aeZQ6KokgXRjcZwBLnWrx6Kc%252yu84WwBKupC31Fe%252B3iE2TIjup2XHNy6v63iprJ8yaGwXHi4TPFR9%25rJHFlMaxou4TJIsDRzL3FlTv0YiyyXIslGAt5VCrv0s9OfCTE4GA0ogSxZNF9OALUdnqkIogOybQ55nvLUgChZS15GybUEqcdx89ChbNmU2PPoEqhk7bSEMLNmqn1hdmDyk7m5VqQpYCn178zm9MtE5V1PaZlqfN8zVMRcvySkPazDxKBsdnMRaYWB4cQ5DxRte2FNZ8YWxfjpwucPteWS6i9vKMfjedwHsNBDS6jQ%25J0p2Ydw6ZuQhpptvwsbT365emO%25v4WsxtjKqc1QSE0",
      name:"BMW-3Series Gran Limousine",
      conf:"Bwest in Class Comfort",
      perfo:"BMW-TwinpowerTurbo 2.0 litre 4-cylinder 258-HP Petrol Engine",
      fuel:"Fuel Economy in KM:14.24"
       
    },
    { 
      img:"https://www.bmw.in/content/dam/bmw/marketIN/bmw_in/Images/all-models/BMW%20Series/BMW%20Z4%20series/Z4_roadster.png",
      name:"BMW Z4 Roadster",
      conf:"Acceleration 0–100 km/h in s:6.6 and sports mode",
      perfo:"Engine power in kW (hp) at 1/min:145 (197)/4,500",
      fuel:"Fuel Economy in KM:11.7"
       
    },
    
    
    
      
  ];
 
  
  res.render('user/index',{vehicle,user,show: true});
  

});
 


router.get('/signup',function(req,res){
  if(req.session.userSignedIn){
    res.redirect('/')
  }else{ 
  res.render('user/signup',{'SignupErr':req.session.SignupErr});
  req.session.SignupErr=false
  }
})

router.post('/signup',function(req,res){
 userHelpers.doSignup(req.body).then((response)=>{

  if(response.status){
    req.session.userSignedIn=true;
    req.session.user=response.user
    res.redirect('/');
  }else{
    req.session.SignupErr=true;
    res.redirect('/signup')

  }
 
})

})

router.get('/login',function(req,res){
  if(req.session.userLoggedIn||req.session.userSignedIn){
   res.redirect('/')
  }else{
  res.render('user/login',{'loginErr':req.session.loginErr});
  req.session.loginErr=false
  }
})

router.post('/login',function(req,res){
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.user=response.user
      req.session.userLoggedIn=true;
      res.redirect('/')
    }else{
      req.session.loginErr=true;
      res.redirect('/login')
    }  
  })
})



router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/')
})

                                 
      
  

module.exports = router;
