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



// Upload picture in CCEP - AVATAR COURSE 🔴

function previewPicture(input){
    const file = input.files[0]; 
    const pictureShow = document.getElementById('pictureshow');
    const overlay = document.querySelector('.uploadoverlay');

    if (file) {
        // 1. Kiểm tra định dạng có phải pictuer không
        if (!file.type.startsWith('image/')) {
            alert("Vui lòng chọn một định dạng video hợp lệ!");
            return;
        }

        // 3. Tạo URL tạm thời để xem trước pic
        const fileURL = URL.createObjectURL(file);

        pictureShow.src = fileURL; 
        pictureShow.style.display = 'block';

        pictureShow.onload = function() {
            pictureShow.style.display = 'block'; // Hiện ảnh lên
            if(overlay) overlay.style.opacity = '0'; // Ẩn overlay đi để lộ ảnh
        }
    }
}

function deletePic() {
    const input = document.getElementById('choosepic');
    const pictureShow = document.getElementById('pictureshow');

    input.value = ""; 
    pictureShow.src = ""; 
    pictureShow.style.display = 'none';
}

// Upload video in CCEP - INTRODUCE VIDEO COURSE 🔴

function previewVideo(input) {
    const file = input.files[0];
    const videoShow = document.getElementById('video-show');
    const videoSource = document.getElementById('video-source');

    if (file) {
        // 1. Kiểm tra định dạng có phải video không
        if (!file.type.startsWith('video/')) {
            alert("Vui lòng chọn một định dạng video hợp lệ!");
            return;
        }

        // 2. Tạo URL tạm thời để xem trước video
        const fileURL = URL.createObjectURL(file);
        videoSource.src = fileURL;
        
        // 3. Load lại và phát video
        videoShow.load(); 
        videoShow.style.display = 'block';
    }
}

function resetVideo() {
    const input = document.getElementById('video-upload');
    const videoShow = document.getElementById('video-show');
    const videoSource = document.getElementById('video-source');

    input.value = ""; // Reset input
    videoSource.src = ""; // Xóa nguồn video
    videoShow.load();
}



// Di chuyen den trang mong muon Provider 


function goToPageProvider(address) {
    if (address) {
        window.location.href = address;
    }
}