function renderAdminReview() {
    const area = document.getElementById('table-body-render-coursesPending-cm-pending');
    const courses = JSON.parse(localStorage.getItem('myCourses')) || [];

    // Chỉ lọc những khóa học đang chờ duyệt
    const pendingCourses = courses.filter(c => c.status === "Đang chờ duyệt");

    area.innerHTML = pendingCourses.map((course,index) => `
        <div class="table-body-render-courses-cm">${index + 1}</div>        
        <div class="table-body-render-courses-cm">${course.title}</div>
        <div class="table-body-render-courses-cm">Provider A</div>
        <div class="table-body-render-courses-cm">${course.basePrice}đ</div>
        <div class="table-body-render-courses-cm">
            <button class="btn-approve" onclick="updateStatus(${course.id}, 'active')">Duyệt</button>
            <button class="btn-reject" onclick="updateStatus(${course.id}, 'rejected')">Từ chối</button>
        </div>
    `).join('');
}

// Hàm thay đổi trạng thái khóa học
function updateStatus(id, newStatus) {
    let courses = JSON.parse(localStorage.getItem('myCourses')) || [];
    
    // Tìm và cập nhật status cho khóa học đúng ID
    courses = courses.map(c => {
        if (c.id === id) {
            return { ...c, status: newStatus };
        }
        return c;
    });

    // Lưu lại vào kho chung
    localStorage.setItem('myCourses', JSON.stringify(courses));
    
    alert(newStatus === 'active' ? "Đã phê duyệt khóa học!" : "Đã từ chối khóa học!");
    renderAdminReview(); // Vẽ lại bảng Admin
}




// ----------- 🔴1 Course Management ----------
// const courses = [
//     { 
//         id: "C001", 
//         thumbnail: "https://picsum.photos/200/120", 
//         title: "Lập trình ReactJS", 
//         instructor: "Lê Thanh Hòa", 
//         price: "799.000đ", 
//         date: "2024-03-20", 
//         category: "Lập trình", 
//         status: "active" 
//     },

//     { 
//         id: "C002", 
//         thumbnail: "https://picsum.photos/200/120", 
//         title: "Tiếng Anh công sở", 
//         instructor: "Trung tâm EduPro", 
//         price: "450.000đ", 
//         date: "2024-03-22", 
//         category: "Ngoại ngữ", 
//         status: "pending" 
//     }
// ];

function renderCourses() {
    const tableBodycm = document.getElementById('table-body-render-courses-cm');
    
    if (!tableBodycm) return;
    const courses = JSON.parse(localStorage.getItem('myCourses')) || [];

    const htmlcm = courses.map((item, index) => `
        <div class="table-list__body-cm">${index + 1}</div>
        <div class="table-list__body-cm">
            <img src="${item.thumdnails}" alt="Thumb" style="width: 100px; height: 100px; object-fit: cover; border-radius: 4px;">
        </div>
        <div class="table-list__body-cm"><strong>${item.title}</strong></div>
        <div class="table-list__body-cm">${item.instructor}</div> 
        <div class="table-list__body-cm" style="font-weight: bold; color: #2ecc71;">${item.basePrice}</div>
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

renderCourses()

renderAdminReview();