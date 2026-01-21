function renderAdminReview() {
    const area = document.getElementById('table-body-render-coursesPending-cm-pending');
    if (!area) return; // Bảo vệ nếu không tìm thấy thẻ HTML

    const courses = JSON.parse(localStorage.getItem('myCourses')) || [];

    // Lọc cả 'pending' và 'Đang chờ duyệt' để tránh sót dữ liệu
    const pendingCourses = courses.filter(c => c.status === "pending" || c.status === "Đang chờ duyệt");

    if (pendingCourses.length === 0) {
        area.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 20px;">Không có khóa học nào chờ duyệt.</div>';
        return;
    }

    area.innerHTML = pendingCourses.map((course, index) => `
        <div class="table-body-render-courses-cm">${index + 1}</div>        
        <div class="table-body-render-courses-cm" style="font-weight: 500;">${course.title}</div>
        <div class="table-body-render-courses-cm">Provider A</div>
        <div class="table-body-render-courses-cm">${Number(course.basePrice).toLocaleString()}đ</div>
        <div class="table-body-render-courses-cm">
            <button class="btn-approve" onclick="updateStatus('${course.id}', 'active')">
                <i class="fa-solid fa-check"></i> Duyệt
            </button>
            <button class="btn-reject" onclick="updateStatus('${course.id}', 'rejected')">
                <i class="fa-solid fa-xmark"></i> Từ chối
            </button>
        </div>
    `).join('');
}

function updateStatus(id, newStatus) {
    let courses = JSON.parse(localStorage.getItem('myCourses')) || [];
    
    // Ép kiểu ID về String để so sánh chính xác nhất
    const updatedCourses = courses.map(c => 
        String(c.id) === String(id) ? { ...c, status: newStatus } : c
    );

    localStorage.setItem('myCourses', JSON.stringify(updatedCourses));
    
    const message = newStatus === 'active' ? "Đã phê duyệt khóa học!" : "Đã từ chối khóa học!";
    alert(message);
    
    renderAdminReview(); // Cập nhật lại giao diện ngay lập tức
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

    const htmlcm = courses.map((item, index) => {
        // Sửa lỗi chính tả 'thumdnails' -> 'thumbnails.picture'
        const thumb = item.thumbnails?.picture || 'https://via.placeholder.com/100';
        
        // Xử lý hiển thị status chuyên nghiệp hơn
        let statusText = '';
        let statusClass = item.status;
        
        switch(item.status) {
            case 'active': statusText = 'Đã duyệt'; break;
            case 'pending': statusText = 'Chờ duyệt'; break;
            case 'rejected': statusText = 'Bị từ chối'; break;
            default: statusText = 'Bản nháp';
        }

        return `
        <div class="table-list__body-cm">${index + 1}</div>
        <div class="table-list__body-cm">
            <img src="${thumb}" alt="Thumb" style="width: 80px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #eee;">
        </div>
        <div class="table-list__body-cm"><strong>${item.title}</strong></div>
        <div class="table-list__body-cm">${item.instructor || 'Provider A'}</div> 
        <div class="table-list__body-cm" style="font-weight: bold; color: #2ecc71;">
            ${Number(item.basePrice).toLocaleString()}đ
        </div>
        <div class="table-list__body-cm">${item.category}</div>
        <div class="table-list__body-cm">
            <span class="badge badge--${statusClass}">${statusText}</span>
        </div>
        <div class="table-list__body-cm">
            <button class="btn-icon" title="Xem chi tiết" onclick="viewCourseDetail('${item.id}')">👁️</button>
            <button class="btn-icon" title="Sửa thông tin" onclick="editinfo('${item.id}')">📝</button>
            <button class="btn-icon" title="Ẩn/Khóa" onclick="toggleCourseStatus('${item.id}')">🚫</button>
        </div>
        `;
    }).join('');

    tableBodycm.innerHTML = htmlcm;
}


renderCourses();
renderAdminReview()