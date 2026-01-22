// --------- 🔴 Course Management -------------
// const picture = "../img/kh-laptirnh.png";

// const listcourses = [
//     { 
//         id: 1, 
//         thumbnails: {
//             picture: picture, 
//             nameCourse: "Khóa học lập trình JavaScript", 
//         },
//         Cashier: 500, 
//         quantityStu: 30, 
//         status: "active",
//         CreateDate: "27-12-2025"
//     },
// ];

function renderListCourse() {
    const tableBody = document.getElementById('table-body-render-CMP');
    
    if (!tableBody){
        console.error("Không tìm thấy thẻ có ID: table-body-render-CMP");
        return;
    }; 

    const dataToRender = JSON.parse(localStorage.getItem('myCourses')) || listcourses;

    const html = dataToRender.map((item, index) => {
        const name = item.thumbnails?.nameCourse || item.title || "Chưa đặt tên";
        const price = item.Cashier || item.basePrice || 0;
        const thumb = item.thumbnails?.picture || 'https://via.placeholder.com/160x100?text=Edupress';
        const date = item.CreateDate || item.date || '---';
        const status = item.status || 'pending';
 
        
        return `
        <div class="table-list__body">${index + 1}</div>

        <div class="table-list__body" style="display: flex; align-items: center; gap: 10px;">
            <img src="${thumb}" alt="Thumb" style="width: 120px; height: 70px; object-fit: cover; border-radius: 4px;">
            <p style="font-weight: 500; text-align: left;">${name}</p>
        </div>        

        <div class="table-list__body" style="font-weight: bold; color: #2563EB;">
            ${Number(price).toLocaleString()}đ
        </div>

        <div class="table-list__body">${item.quantityStu || 0}</div>
        <div class="table-list__body">
            <span class="status-badge status-${status === 'Đang chờ duyệt' ? 'pending' : status}">
                    ${status === 'pending' || status === 'Đang chờ duyệt' ? 'Chờ duyệt' : 
                      status === 'active' ? 'Đã xuất bản' : 
                      status === 'rejected' ? 'Bị từ chối' : 'Bản nháp'}
            </span>
        </div>

        <div class="table-list__body">${item.CreateDate || item.date}</div>

        <div class="table-list__body">
                <button class="btn-action edit" onclick="editCourse(${item.id})" title="Sửa">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-action delete" onclick="deleteCourse(${item.id})" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
        </div>

        `;
       
    }).join('');

    tableBody.innerHTML = html;
}
// document.addEventListener('DOMContentLoaded', renderListCourse);
renderListCourse();

// Xoa khoa hoc
function deleteCourse(id) {
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
        let courses = JSON.parse(localStorage.getItem('myCourses')) || [];
        // Lọc bỏ item có id trùng
        courses = courses.filter(item => item.id !== id);
        // Lưu lại vào kho
        localStorage.setItem('myCourses', JSON.stringify(courses));
        // Vẽ lại bảng ngay lập tức
        renderListCourse();
    }
}

function addCourse(){
    window.location.href = "./CourseCreate&EditPage/ccep.html"
}


// Di chuyen den trang mong muon Provider 


function goToPageProvider(address) {
    if (address) {
        window.location.href = address;
    }
}