// Hidden/show password functionality
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleIcon = input.parentElement.querySelector(".toggle-password"); // Lấy icon đúng

    if (input.type === "password") {
        input.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//     console.log("Trang đăng ký đã sẵn sàng!");
// });

// Resgister form handling
const form = document.getElementById("registerForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // console.log("Biểu mẫu đăng ký đã được gửi!");

        const email = form.querySelector('input[type="email"]').value.trim();
        const username = form.querySelector('input[type="text"]').value.trim();
        const password = form.querySelector("#password").value.trim();
        const confirmPassword = form
            .querySelector("#confirmPassword")
            .value.trim();

        // console.log("Email:", email);
        // console.log("Username:", username);
        // console.log("Password:", password);
        // console.log("Confirm Password:", confirmPassword);

        if (password !== confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp!");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Email không hợp lệ!");
            return;
        }

        if (
            email === "" ||
            username === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        //check if email existed
        if (users.some((user) => user.email === email)) {
            alert("Email đã được sử dụng! Vui lòng sử dụng email khác.");
            return;
        }

        // add new user
        const newUser = {
            email: email,
            username: username,
            password: password,
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Đăng ký thành công!");

        window.location.href = "login.html";
    });
}

// Login form handling
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const id = document.getElementById("loginID").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (id === "" || password === "") {
            alert("Vui lòng nhập đầy đủ Email/Username và mật khẩu!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find(
            (user) =>
                (user.email === id || user.username === id) &&
                user.password === password
        );

        if (foundUser) {
            localStorage.setItem("currentUser", JSON.stringify(foundUser));

            alert("Chào mừng " + foundUser.username + "!");

            // window.location.href = "courses.html";
        } else {
            alert("Email/Username hoặc mật khẩu không đúng. Vui lòng thử lại!");
        }
    });
}
