
const forgotPasswordLink = document.getElementById('forgot-pw');

forgotPasswordLink.addEventListener('click', function(event) {
    event.preventDefault();

    let email = prompt("Vui lòng nhập Email của bạn để lấy lại mật khẩu:");

    if (email) {
        if (email.includes("@")) {
            alert("Hệ thống đã gửi link lấy lại mật khẩu đến: " + email);
        } else {
            alert("Email không hợp lệ, vui lòng thử lại!");
        }
    }
});

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

isAdminAccount();
isProviderAccount();


