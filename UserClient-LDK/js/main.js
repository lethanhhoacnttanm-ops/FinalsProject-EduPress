
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

// courses.html user-menu component handling -> show user info if logged in
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
        </div>
        <button id="logoutBtn" class="btn-logout">Logout</button>
        `;

        const userInfo = userMenu.querySelector('.user-info');
        const logoutBtn = document.getElementById("logoutBtn");

        // Toggle logout button visibility on user info click
        userInfo.addEventListener('click', function () {
            logoutBtn.classList.toggle('show');
        });

        // Close logout button when clicking outside
        document.addEventListener('click', function (event) {
            if (!userMenu.contains(event.target)) {
                logoutBtn.classList.remove('show');
            }
        });

        // Logout handling
        logoutBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            localStorage.removeItem("currentUser");
            alert("Bạn đã đăng xuất.");
            window.location.href = "login.html";
        });
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
        level: "Beginner",
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
                <a href="course-detail.html?id=${course.id}" target="_blank" class="btn-view">View More</a>
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

// ===== Filter courses =====

const allFilterCheckboxes = document.querySelectorAll(".filter-checkbox");
allFilterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilters);
});

function applyFilters() {
    // Debug
    // console.log("Checkbox thay đổi");

    let selectedCategories = [];
    let selectedInstructors = [];
    let selectedPrices = [];
    let selectedLevels = [];

    allFilterCheckboxes.forEach((cb) => {
        if (cb.checked) {
            const value = cb.value;
            if (
                value === "Business" ||
                value === "Design" ||
                value === "Programming" ||
                value === "Marketing"
            ) {
                selectedCategories.push(value);
            } else if (
                value === "Jane Smith" ||
                value === "John Doe" ||
                value === "Mike Wilson" ||
                value === "Sarah Lee"
            ) {
                selectedInstructors.push(value);
            } else if (value === "Free" || value === "Paid") {
                selectedPrices.push(value);
            } else if (
                value === "Beginner" ||
                value === "Intermediate" ||
                value === "Advanced" ||
                value === "All"
            ) {
                selectedLevels.push(value);
            }
        }
    });

    let filtered = coursesData;

    if (selectedCategories.length > 0) {
        filtered = filtered.filter((course) =>
            selectedCategories.includes(course.category)
        );
    }

    if (selectedInstructors.length > 0) {
        filtered = filtered.filter((course) =>
            selectedInstructors.includes(course.instructor)
        );
    }

    if (selectedPrices.length > 0) {
        filtered = filtered.filter((course) => {
            if (selectedPrices.includes("Free") && course.price === "Free")
                return true;
            if (selectedPrices.includes("Paid") && course.price !== "Free")
                return true;
            return false;
        });
    }

    if (selectedLevels.length > 0) {
        filtered = filtered.filter((course) =>
            selectedLevels.includes(course.level)
        );
    }

    const searchTerm =
        document.getElementById("searchInput")?.value.toLowerCase().trim() ||
        "";

    if (searchTerm) {
        filtered = filtered.filter((course) =>
            course.title.toLowerCase().includes(searchTerm)
        );
    }

    displayCourses(filtered);

    // Debug
    // console.log(
    //     selectedCategories,
    //     selectedPrices,
    //     selectedLevels
    // );
    // console.log("Kết quả lọc:", filtered.length, "khóa học");
}

if (document.getElementById("searchInput")) {
    document
        .getElementById("searchInput")
        .addEventListener("input", applyFilters);
}

// Course detail page
const urlParams = new URLSearchParams(window.location.search);
const courseId = parseInt(urlParams.get("id"));

if (courseId && document.getElementById("courseTitle")) {
    const course = coursesData.find((c) => c.id === courseId);

    if (course) {
        document.getElementById("courseTitle").textContent = course.title;

        document.getElementById("courseCategory").innerHTML =
            "<strong>Danh mục:</strong> " + course.category;
        document.getElementById("courseInstructor").innerHTML =
            "<strong>Giảng viên:</strong> " + course.instructor;
        document.getElementById("courseLevel").innerHTML =
            "<strong>Level:</strong> " + course.level;
        document.getElementById("coursePrice").innerHTML =
            "<strong>Giá:</strong> " + course.price;
        document.getElementById("courseDuration").innerHTML =
            "<strong>Thời lượng:</strong> " + course.duration;
        document.getElementById("courseStudents").innerHTML =
            "<strong>Học viên:</strong> " + course.students;
        document.getElementById("courseLessons").innerHTML =
            "<strong>Bài học:</strong> " + course.lessons;

        document.getElementById("courseImage").src = course.image;

        document.getElementById("courseDescription").textContent =
            course.description ||
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident sunt quae nobis iusto consequatur libero, laboriosam facilis, sit aut quo dicta iste sed, doloremque assumenda error exercitationem eaque debitis magni consectetur voluptatum! Odit voluptatem cupiditate repellat quis aspernatur libero minus, ipsam deleniti quidem quasi odio, maxime ratione magni incidunt saepe voluptatum natus culpa vero recusandae earum ab temporibus quo ut omnis? Veritatis, dolores! Quidem, beatae placeat accusantium adipisci fugiat, alias at totam tempora ipsa optio in. Ipsam dolore, obcaecati in excepturi doloribus sint sequi fugiat a dolores dolorem sit architecto minus illo reprehenderit at repellendus rerum eveniet amet? Pariatur, impedit.";

        const lessonsList = document.getElementById("lessonsList");
        lessonsList.innerHTML = "";
        for (let i = 1; i <= course.lessons; i++) {
            lessonsList.innerHTML += `<li>Lesson ${i}: Bài học mẫu ${i}</li>`;
        }
    } else {
        document.getElementById("courseTitle").textContent =
            "Không tìm thấy khóa học";
    }
}

// Enroll button handling
const enrollBtn = document.getElementById("enrollBtn");

if (enrollBtn && courseId) {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        // Chưa login → chuyển sang login
        enrollBtn.textContent = "Đăng nhập để đăng ký";
        enrollBtn.addEventListener("click", function () {
            window.location.href = "login.html";
        });
    } else {
        // Đã login → lấy user
        const user = JSON.parse(currentUser);

        if (!user.enrolledCourses) {
            user.enrolledCourses = [];
        }

        // Kiểm tra đã enroll khóa chưa
        const isEnrolled = user.enrolledCourses.includes(courseId);

        if (isEnrolled) {
            enrollBtn.textContent = "Đã đăng ký";
            enrollBtn.classList.add("btn-enrolled");
            enrollBtn.disabled = true;
        } else {
            enrollBtn.addEventListener("click", function () {
                // confirm dialog box
                const courseTitle =
                    document.getElementById("courseTitle").textContent;
                const confirmMsg = `Bạn có chắc chắn muốn đăng ký khóa học "${courseTitle}" không?\n\nSau khi đăng ký, bạn sẽ có thể truy cập nội dung đầy đủ.`;

                if (confirm(confirmMsg)) {
                    user.enrolledCourses.push(courseId);
                    localStorage.setItem("currentUser", JSON.stringify(user));

                    enrollBtn.textContent = "Đã đăng ký";
                    enrollBtn.classList.add("btn-enrolled");
                    enrollBtn.disabled = true;

                    alert(
                        "Đăng ký khóa học thành công!\nBạn có thể xem trong phần My Courses."
                    );
                } else {
                    alert("Đã hủy đăng ký.");
                }
            });
        }
    }
}

// My Courses page
const myCoursesList = document.getElementById("myCoursesList");

if (myCoursesList) {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        myCoursesList.innerHTML =
            '<p class="no-courses">Vui lòng đăng nhập để xem khóa học của bạn.</p>';
    } else {
        const user = JSON.parse(currentUser);

        // Nếu chưa có khóa học
        if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
            myCoursesList.innerHTML =
                '<p class="no-courses">Bạn chưa đăng ký khóa học nào. <a href="courses.html">Khám phá ngay!</a></p>';
        } else {
            myCoursesList.innerHTML = ""; // Xóa dòng loading

            // Lọc các khóa học đã đăng ký
            const enrolledCourses = coursesData.filter((course) =>
                user.enrolledCourses.includes(course.id)
            );

            if (enrolledCourses.length === 0) {
                myCoursesList.innerHTML =
                    '<p class="no-courses">Không tìm thấy khóa học đã đăng ký.</p>';
            } else {
                enrolledCourses.forEach((course) => {
                    const card = `
                        <div class="my-course-card">
                            <img src="${course.image}" alt="${course.title}">
                            <div class="content">
                                <span class="category">${course.category}</span>
                                <h3>${course.title}</h3>
                                <p class="instructor">by ${course.instructor}</p>
                                <p class="meta">${course.duration} • ${course.students} Students • ${course.lessons} Lessons </p>
                                <p class="meta level">Level: <strong>${course.level}</strong></p>
                                <p class="price">${course.price}</p>
                                <a href="course-detail.html?id=${course.id}" target="blank" class="btn-view">Tiếp tục học</a>
                            </div>
                        </div>
                        `;
                    myCoursesList.innerHTML += card;
                });
            }
        }
    }
}

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOverlay = document.getElementById('menuOverlay');

    // Create overlay if it doesn't exist
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.id = 'menuOverlay';
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function () {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });

        // Close menu when clicking on overlay
        menuOverlay.addEventListener('click', function () {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });

        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        });
    }
});