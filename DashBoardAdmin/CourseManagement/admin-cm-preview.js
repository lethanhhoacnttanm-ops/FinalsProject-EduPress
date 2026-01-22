function renderAdminReview() {
    const area = document.getElementById('table-body-render-coursesPending-cm-pending');
    if (!area) return;

    const courses = JSON.parse(localStorage.getItem('myCourses')) || [];

    const pendingCourses = courses.filter(c => c.status === "Đang chờ duyệt" || c.status === "pending");

    if (pendingCourses.length === 0) {
        area.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 20px;">Hiện không có khóa học nào chờ duyệt.</div>';
        return;
    }

    area.innerHTML = pendingCourses.map((course, index) => {
        const displayPrice = Number(course.basePrice).toLocaleString();
        
        return `
            <div class="table-body-render-courses-cm">${index + 1}</div>        
            <div class="table-body-render-courses-cm" style="font-weight: 500;">${course.title}</div>
            <div class="table-body-render-courses-cm">${course.name}</div>
            <div class="table-body-render-courses-cm">${displayPrice}đ</div>
            <div class="table-body-render-courses-cm">
                <button class="btn-approve" onclick="updateStatus('${course.id}', 'active')">Duyệt</button>
                <button class="btn-reject" onclick="updateStatus('${course.id}', 'rejected')">Từ chối</button>
            </div>
        `;
    }).join('');
}


function updateStatus(id, newStatus) {
    let courses = JSON.parse(localStorage.getItem('myCourses')) || [];
    
    
    courses = courses.map(c => {
        if (c.id === id) {
            return { ...c, status: newStatus };
        }
        return c;
    });
    
    localStorage.setItem('myCourses', JSON.stringify(courses));
    
    alert(newStatus === 'active' ? "Đã phê duyệt khóa học!" : "Đã từ chối khóa học!");
    renderAdminReview(); 
}

function viewCourseDetail(id) {
    const courses = JSON.parse(localStorage.getItem('myCourses')) || [];
    const course = courses.find(c => String(c.id) === String(id));

    if (course) {
        alert(`
            CHI TIẾT KHÓA HỌC:
            - Tên: ${course.title}
            - Giá: ${Number(course.basePrice).toLocaleString()}đ
            - Ngày tạo: ${course.createDate}
            - Mô tả: ${course.shortDescription}
        `);
    }
}


function editinfo(id) {
    
    window.location.href = `../../DashBoardProvider/CourseManagementPage/CourseCreate&EditPage/ccep.html?id=${id}`;
}


function toggleCourseStatus(id) {
    let courses = JSON.parse(localStorage.getItem('myCourses')) || [];
    const index = courses.findIndex(c => String(c.id) === String(id));

    if (index !== -1) {
        const currentStatus = courses[index].status;
        courses[index].status = (currentStatus === 'active') ? 'disabled' : 'active';

        localStorage.setItem('myCourses', JSON.stringify(courses));
        
        const statusText = courses[index].status === 'active' ? "hiển thị" : "ẩn";
        alert(`Đã ${statusText} khóa học thành công!`);
        
        renderCourses(); 
    }
}




function renderCourses() {
    const tableBodycm = document.getElementById('table-body-render-courses-cm');
    
    if (!tableBodycm) return;
    const courses = JSON.parse(localStorage.getItem('myCourses')) || [];

    const htmlcm = courses.map((item, index) => {
        
        const thumbImg = (item.thumbnails && item.thumbnails.picture) 
                         ? item.thumbnails.picture 
                         : 'https://via.placeholder.com/100x100?text=No+Image';
        
        const author = item.name;
                    
        return `
            <div class="table-list__body-cm">${index + 1}</div>
            <div class="table-list__body-cm">
                <img src="${thumbImg}" alt="Thumb" style="width: 120px; height: 60px; object-fit: cover; border-radius: 4px;">
            </div>
            <div class="table-list__body-cm"><strong>${item.title || 'Không tiêu đề'}</strong></div>
            <div class="table-list__body-cm">${author}</div> 
            <div class="table-list__body-cm" style="font-weight: bold; color: #2ecc71;">
                ${Number(item.basePrice).toLocaleString()}đ
            </div>
            <div class="table-list__body-cm">${item.category || 'N/A'}</div>
            <div class="table-list__body-cm">
                <span class="badge badge--${item.status}">
                    ${item.status === 'active' ? 'Approved' : 'Pending approval'}
                </span>
            </div>
            <div class="table-list__body-cm">
                <button title="detail" onclick="viewCourseDetail('${item.id}')">👁️</button>
                <button title="edit" onclick="editinfo('${item.id}')">📝</button>
                <button title="disable" onclick="toggleCourseStatus('${item.id}')">🚫</button>
            </div>
    `}).join('');

    tableBodycm.innerHTML = htmlcm;
}

renderCourses()

renderAdminReview();