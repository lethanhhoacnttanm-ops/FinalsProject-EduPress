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

            window.location.href = "courses.html";
        } else {
            alert("Email/Username hoặc mật khẩu không đúng. Vui lòng thử lại!");
        }
    });
}

// courses.html user-menu component handling
document.addEventListener("DOMContentLoaded", function () {
    const userMenu = document.getElementById("user-menu");
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
        const user = JSON.parse(currentUser);
        const firstLetter = user.username.charAt(0).toUpperCase();

        userMenu.innerHTML = `
        <div class="user-info">
        <div class="user-avatar">${firstLetter}</div>
        <span class="user-name">${user.username}</span>
        </div>`;
    } else {
        userMenu.innerHTML = `<a class="btn-login" href="login.html">Login</a>`;
    }
});

//data courses
const coursesData = [
    {
        id: 1,
        title: "Create An LMS Website With LearnPress",
        category: "Programming",
        instructor: "Jane Smith",
        duration: "2 Weeks",
        students: 156,
        lessons: 20,
        level: "All levels",
        price: "Free",
        image: "https://t4.ftcdn.net/jpg/05/86/69/47/360_F_586694705_4WWYJnGlQUb7YwXm8kXCUxMkGzuOsi38.jpg",
    },
    {
        id: 2,
        title: "Photography Masterclass",
        category: "Marketing",
        instructor: "John Doe",
        duration: "4 Weeks",
        students: 200,
        lessons: 15,
        level: "Intermediate",
        price: "$29.0",
        image: "https://img.freepik.com/free-psd/photography-concept-banner-template_23-2148640900.jpg",
    },
    {
        id: 3,
        title: "Web Design Fundamentals",
        category: "Design",
        instructor: "Jane Smith",
        duration: "6 Weeks",
        students: 320,
        lessons: 25,
        level: "Beginner",
        price: "$49.0",
        image: "https://img.freepik.com/premium-vector/free-online-live-class-thumbnail-social-media-web-banner-post-design-template_673898-331.jpg",
    },
    {
        id: 4,
        title: "Python for Beginners",
        category: "Business",
        instructor: "Mike Wilson",
        duration: "8 Weeks",
        students: 450,
        lessons: 30,
        level: "Beginner",
        price: "Free",
        image: "https://goedu.ac/wp-content/uploads/2024/02/GoEdu-course-thumbnail-1-3.webp",
    },
    {
        id: 5,
        title: "Advanced JavaScript Mastery",
        category: "Programming",
        instructor: "Sarah Lee",
        duration: "5 Weeks",
        students: 280,
        lessons: 18,
        level: "Advanced",
        price: "$59.0",
        image: "https://data-flair.training/wp-content/uploads/2023/06/free-python-project-certification-course-thumbnail.webp",
    },
    {
        id: 6,
        title: "Digital Marketing Essentials",
        category: "Marketing",
        instructor: "Sarah Lee",
        duration: "4 Weeks",
        students: 220,
        lessons: 12,
        level: "Intermediate",
        price: "$39.0",
        image: "https://img.freepik.com/free-psd/digital-marketing-agency-corporate-web-banner-template_106176-2332.jpg",
    },
    {
        id: 7,
        title: "Become a business analyst",
        category: "Business",
        instructor: "Sarah Lee",
        duration: "4 Weeks",
        students: 220,
        lessons: 12,
        level: "Intermediate",
        price: "$39.0",
        image: "https://img.freepik.com/free-psd/digital-marketing-agency-corporate-web-banner-template_106176-2332.jpg",
    },
    {
        id: 8,
        title: "Design like soul",
        category: "Design",
        instructor: "Sarah Lee",
        duration: "4 Weeks",
        students: 220,
        lessons: 12,
        level: "Intermediate",
        price: "$39.0",
        image: "https://img.freepik.com/free-psd/digital-marketing-agency-corporate-web-banner-template_106176-2332.jpg",
    },
];

//function to create courses card
function createCourseCard(course) {
    return `
    <div class="course-card">
        <img src="${course.image}" alt="${course.title}">
        <div class="content">
            <span class="category">${course.category}</span>
            <h3>${course.title}</h3>
            <p class="instructor">by ${course.instructor}</p>
            <p class="meta"> ${course.duration} • ${course.students} Students • ${course.lessons} Lessons </p>
            <p class="meta level">Level: <strong>${course.level}</strong></p>
            <div class="price-view-row">
                <p class="price">${course.price}</p>
                <a href="course-detail.html?id=${course.id}" class="btn-view">View More</a>
            </div>
        </div>
    </div>
`;
}

//function to display courses
function displayCourses(filteredCourses) {
    const coursesList = document.getElementById("coursesList");
    if (!coursesList) return;

    coursesList.innerHTML = ""; // Xóa cũ

    if (filteredCourses.length === 0) {
        coursesList.innerHTML =
            '<p class="loading-message">Không tìm thấy khóa học nào!</p>';
        return;
    }

    filteredCourses.forEach((course) => {
        coursesList.innerHTML += createCourseCard(course);
    });
}

displayCourses(coursesData);

//function to handle real time search
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase().trim();

        const filtered = coursesData.filter(
            (course) =>
                course.title.toLowerCase().includes(searchTerm) ||
                course.category.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm)
        );

        displayCourses(filtered);
    });
}

//function to handle layout toggle
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");
const coursesGrid = document.querySelector(".courses-grid");

if (gridBtn && listBtn && coursesGrid) {
    gridBtn.addEventListener("click", () => {
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
        coursesGrid.classList.remove("list-view");
    });

    listBtn.addEventListener("click", () => {
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
        coursesGrid.classList.add("list-view");
    });
}
