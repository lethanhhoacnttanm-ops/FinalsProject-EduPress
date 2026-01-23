
function renderListProvider() {
    const area = document.getElementById('table-body-render-coursesPending-bns-pending');
    if (!area) return;

    const courses = JSON.parse(localStorage.getItem('myListProvider')) || [];

    const pendingCourses = courses.filter(c => c.status === "Đang chờ duyệt" || c.status === "pending");

    if (pendingCourses.length === 0) {
        area.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 20px;">Hiện không có khóa học nào chờ duyệt.</div>';
        return;
    }

    area.innerHTML = pendingCourses.map((course, index) => {
        
        return `
            <div class="table-body-render-courses-bns">${index + 1}</div>
            <div class="table-body-render-courses-bns" style="font-weight: 500; color: red">${course.id}</div>
            <div class="table-body-render-courses-bns" style="font-weight: 500;">${course.title}</div>
            <div class="table-body-render-courses-bns">${course.name}</div>
            <div class="table-body-render-courses-bns" style="font-weight: 500; color: blue">${course.email}</div>
            <div class="table-body-render-courses-bns" style="font-weight: 500; color: blue" >${course.password}</div>
            <div class="table-body-render-courses-bns">${course.timestamp}</div>
            <div class="table-body-render-courses-bns">
                <button class="btn-approve" onclick="updateStatus('${course.id}', 'active')">Duyệt</button>
                <button class="btn-reject" onclick="updateStatus('${course.id}', 'rejected')">Từ chối</button>
            </div>
        `;
    }).join('');
}

function updateStatus(id, newStatus) {
    
    let courses = JSON.parse(localStorage.getItem('myListProvider')) || [];
    

    courses = courses.map(c => {
        if (c.id === id) {
            return { ...c, status: newStatus };
        }
        return c;
    });


    localStorage.setItem('myListProvider', JSON.stringify(courses));

    
    alert(newStatus === 'active' ? "Đã duyệt thành công!" : "Đã từ chối đơn!");
    renderListProvider(); 
}


renderListProvider();