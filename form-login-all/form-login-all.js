
function isAdminAccount(){
    
    const adminAccount = {
        email: "admin@123gmail.com",
        password: "123456"
    }

    localStorage.setItem('AccountAdmin', JSON.stringify(adminAccount));

}

function isProviderAccount(){
    const providerAccount = {
        email: "lethanhhoa118@gmail.com",
        password: "686868"
    }

    localStorage.setItem('AccountProvider', JSON.stringify(providerAccount));
}

function transToPage(id){
    window.location.href = id 
}
 


function login(){
      const email = document.getElementById('1').value.trim();
      const password = document.getElementById('2').value.trim();

      const getDataAdmin = JSON.parse(localStorage.getItem('AccountAdmin'))
      const getDataProvider = JSON.parse(localStorage.getItem('AccountProvider'))   

      const isAdmin = (email === getDataAdmin.email);
      const isProvider = (email === getDataProvider.email);

      if(!isAdmin && !isProvider){
        alert("This account does not exist.");
        return;
      }
S
      if(isAdmin){
    
          if(password === getDataAdmin.password){
             alert('Success login with ADMIN Account')
             window.location.href = "../DashBoardAdmin/dashboard.html"
          }
          else{
            alert('You may have entered the wrong password 🥲')
          }
      }else if(isProvider){

        if(password === getDataProvider.password){
             alert('Success login with Provider Account')
             window.location.href = "../DashBoardProvider/dashboardProvider.html"
          }
          else{
            alert('You may have entered the wrong password 🥲') 
          }
      }
      



}

function registration() {
    
    const username = document.getElementById('1').value.trim();
    const email = document.getElementById('2').value.trim();
    const password = document.getElementById('3').value;
    const confirmPass = document.getElementById('4').value;

   
    if (password !== confirmPass) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

  
    const newProviderRequest = {
        id: "ID_" + Date.now(),      
        title: "Đăng ký Provider",     
        name: username,                
        email: email,             
        password: password,
        status: "pending",             
        timestamp: new Date().toLocaleString('vi-VN')
    };

    
    let list = JSON.parse(localStorage.getItem('myListProvider')) || [];
    list.push(newProviderRequest);
    localStorage.setItem('myListProvider', JSON.stringify(list));

    alert("Đơn đăng ký của bạn đã được gửi thành công!");

    window.location.href = "../form-login-all.html  "
}



isAdminAccount();
isProviderAccount();


