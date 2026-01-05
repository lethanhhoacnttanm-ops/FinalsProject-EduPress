function toggleSubMenu(panelId) {
    // 1. Lấy tất cả các bảng nội dung đang có
    let allPanels = document.querySelectorAll('.sub-panel');
    let currentPanel = document.getElementById(panelId);

    // 2. Kiểm tra trạng thái của bảng hiện tại TRƯỚC khi đóng hết
    let isAlreadyOpen = (currentPanel.style.display === "block");

    // 3. Đóng TẤT CẢ các bảng lại (Xóa bỏ tình trạng đè nhau)
    allPanels.forEach(p => {
        p.style.display = "none";
    });

    // 4. Nếu bảng vừa bấm lúc nãy đang đóng, thì bây giờ mở nó ra
    // Nếu nó đang mở rồi thì thôi (vì lệnh ở bước 3 đã đóng nó rồi - tạo hiệu ứng toggle)
    if (!isAlreadyOpen) {
        currentPanel.style.display = "block";
    }
}

//Hàm go đến trang đó dùng chung 
function goToPage(targetPath, params = {}) {
    // 1. Lấy URL hiện tại để làm "đường về"
    const currentUrl = window.location.href;
    
    // 2. Thêm currentUrl vào đối tượng params
    params.returnUrl = encodeURIComponent(currentUrl);
    
    // 3. Tạo Query String từ params
    const queryString = new URLSearchParams(params).toString();
    
    // 4. Chuyển trang
    window.location.href = `${targetPath}?${queryString}`;
}


// Hàm back trở về [previous-page] dùng chung
function goBack(fallbackUrl = 'index.html', forceFallback = false) {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('returnUrl');

    // 1. Nếu có tham số returnUrl trên thanh địa chỉ, luôn ưu tiên nó nhất
    if (returnUrl) {
        window.location.href = decodeURIComponent(returnUrl);
        return;
    }

    // 2. Nếu muốn ép buộc về một trang cụ thể (không dùng lịch sử trình duyệt)
    if (forceFallback) {
        window.location.href = fallbackUrl;
        return;
    }

    // 3. Nếu có lịch sử duyệt web (User đi từ trang khác tới)
    if (window.history.length > 1 && document.referrer !== "") {
        window.history.back();
    } 
    else {
        // 4. Trường hợp cuối: về trang mặc định được truyền vào
        window.location.href = fallbackUrl;
    }
}

// --------- 🔴 Course Provider Management -------------
const providers = [
    { 
        id: 1, 
        name: "Lê Thanh Hòa", 
        contact: "hoahum118@gmail.com", 
        date: "2004-26-01", 
        field: "Lập trình", 
        status: "active" 
    },
    
    { 
        id: 2, 
        name: "Lương Diệu kiệt", 
        contact: "0911222333 - info@edu.vn", 
        date: "2024-03-22", 
        field: "Tiếng Anh", 
        status: "pending" }
];

function renderProviders() {
    const tableBody = document.getElementById('table-body-render');
    
    if (!tableBody) return; 

    const html = providers.map((item, index) => `
        <div class="table-list__body">${index + 1}</div>
        <div class="table-list__body"><strong>${item.name}</strong></div>
        <div class="table-list__body">${item.contact}</div>
        <div class="table-list__body">${item.date}</div>
        <div class="table-list__body">${item.field}</div>
        <div class="table-list__body">
            <span class="badge badge--${item.status}">${item.status === 'active' ? 'Hoạt động' : 'Chờ duyệt'}</span>
        </div>
        <div class="table-list__body">
            <button onclick="editProvider(${item.id})">📝</button>
            <button onclick="toggleProvider(${item.id})">🔒</button>
        </div>
    `).join('');

    tableBody.innerHTML = html;
}

// ----------- 🔴1 Course Management ----------
const courses = [
    { 
        id: "C001", 
        thumbnail: "https://picsum.photos/200/120", 
        title: "Lập trình ReactJS", 
        instructor: "Lê Thanh Hòa", 
        price: "799.000đ", 
        date: "2024-03-20", 
        category: "Lập trình", 
        status: "active" 
    },

    { 
        id: "C002", 
        thumbnail: "https://picsum.photos/200/120", 
        title: "Tiếng Anh công sở", 
        instructor: "Trung tâm EduPro", 
        price: "450.000đ", 
        date: "2024-03-22", 
        category: "Ngoại ngữ", 
        status: "pending" 
    }
];

function renderCourses() {
    const tableBodycm = document.getElementById('table-body-render-courses-cm');
    
    if (!tableBodycm) return;

    const htmlcm = courses.map((item, index) => `
        <div class="table-list__body-cm">${index + 1}</div>
        <div class="table-list__body-cm">
            <img src="${item.thumbnail}" alt="Thumb" style="width: 60px; height: 35px; object-fit: cover; border-radius: 4px;">
        </div>
        <div class="table-list__body-cm"><strong>${item.title}</strong></div>
        <div class="table-list__body-cm">${item.instructor}</div>
        <div class="table-list__body-cm" style="font-weight: bold; color: #2ecc71;">${item.price}</div>
        <div class="table-list__body-cm">${item.category}</div>
        <div class="table-list__body-cm">
            <span class="badge badge--${item.status}">${item.status === 'active' ? 'Đã duyệt' : 'Chờ duyệt'}</span>
        </div>
        <div class="table-list__body-cm">
            <button title="Xem chi tiết" onclick="viewCourseDetail('${item.id}')">👁️</button>
            <button title="Sửa thông tin" onclick="editinfo('${item.id}')">📝</button>
            <button title="Ẩn/Khóa" onclick="toggleCourseStatus('${item.id}')">🚫</button>
        </div>
    `).join('');

    tableBodycm.innerHTML = htmlcm;
}


// ----------- 🔴2. Course Management page pending ----------

const coursesPending = [
    { 
        id: "1", 
        theme: "Add themes", 
        author: "Park Jisung", 
    },

    { 
        id: "2", 
        theme: "Add themes", 
        author: "Ronaldo",
    }
];

function renderCoursesPending() {
    const tableBodyCoursePending = document.getElementById('table-body-render-coursesPending-cm');
    
    if (!tableBodyCoursePending) return;

    const pendingCourse = coursesPending.map((item, index) => `
    <div class="table-list__body-coursePending-cm">${index + 1}</div>
    
    <div class="table-list__body-coursePending-cm">
        <div class="theme-container">
            <img src="${item.theme}" alt="Thumb" class="theme-img">
            <button class="btn-view-detail" onclick="viewCourseDetail('${item.id}')">
                🔍 Xem nội dung
            </button>
            <button class="btn-browsed" onclick="BrowseCourseDetail('${item.id}')">
                ✅ Duyệt
            </button>
            <button class="btn-rejected" onclick="RejectCourseDetail('${item.id}')">
                ❎ Từ chối
            </button>
        </div>
    </div>
    
    <div class="table-list__body-coursePending-cm">
        <span>${item.author}</span>
    </div>
`).join('');

    tableBodyCoursePending.innerHTML = pendingCourse;
}



renderProviders();
renderCourses();
renderCoursesPending();






