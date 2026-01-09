
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



function login() {
    const email = document.getElementById('1').value;
    const password = document.getElementById('2').value;

    if (email === "admin@gmail.com" && password === "123456") {
        alert("Đăng nhập thành công với quyền Admin!");
        window.location.href = "../DashBoardAdmin/dashboard.html";
    } 
    else if (email === "provider123@gmail.com" && password === "686868") {
        alert("Đăng nhập thành công với quyền Provider!");
        window.location.href = "../DashBoardProvider/dashboardProvider.html";
    } 
    else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}


