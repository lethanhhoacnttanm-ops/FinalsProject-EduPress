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

    const dataToRender = JSON.parse(localStorage.getItem('myCourses')) || [];

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

// Xoa khoa hoc - CMP
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

function previewPicture(input) {
    const file = input.files[0];
    const pictureShow = document.getElementById('pictureshow');
    const overlay = document.querySelector('.uploadoverlay');

    if (file) {
        // 1. Kiểm tra định dạng (phải là image/)
        if (!file.type.startsWith('image/')) {
            alert("Vui lòng chọn định dạng ảnh (jpg, png)!");
            return;
        }

        // 2. Sử dụng FileReader để đọc file thành chuỗi Base64
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const base64Data = e.target.result; // Đây là chuỗi dài chứa toàn bộ dữ liệu ảnh
            
            // Hiển thị ảnh lên khung preview
            pictureShow.src = base64Data;
            pictureShow.style.display = 'block';
            if (overlay) overlay.style.opacity = '0';
            
            // MẸO: Lưu chuỗi này vào một thuộc tính ẩn hoặc biến toàn cục 
            // để khi nhấn "Send Request" bạn có dữ liệu để lưu.
            pictureShow.dataset.base64 = base64Data; 
        };

        reader.readAsDataURL(file);
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




// 🎉 This place is addind all infomation to send request to admin 

document.getElementById('btn-submit-course').addEventListener('click', function() {
    // 1. Thu thập dữ liệu từ các thẻ input
    // Lưu ý: Đối với File (Ảnh/Video), ta nên lưu tên file hoặc chuỗi Base64. 
    // Ở đây ta lưu thông tin cơ bản để Admin nhận diện.
    
    const idCourse = document.getElementById('ID-COURSE-CCEP').value;
    const nameCourse = document.getElementById('NAME-COURSE-CCEP').value;
    const shortDes = document.getElementById('SHORT-DES-CCEP').value;
    const detailDes = document.getElementById('DETAIL-DES-CCEP').value;
    const courseTarget = document.getElementById('seleted-category-target').value;
    const price = document.getElementById('Category_prices-root').value;

    const picturePreview = document.getElementById('pictureshow');
    
    // Lấy file thực tế thay vì chỉ lấy .value (đường dẫn giả)
    const pictureFile = document.getElementById('choosepic').files[0];
    const videoFile = document.getElementById('video-upload').files[0];

    // 2. Kiểm tra dữ liệu (Validation) cơ bản
    if (!nameCourse || !price || !pictureFile) {
        alert("Vui lòng điền tên khóa học, giá và chọn ảnh đại diện!");
        return;
    }

    // 3. Tạo đối tượng khóa học mới
    const newCourse = {
        id: idCourse || Date.now(), // Nếu không có ID thì tự tạo bằng timestamp
        title: nameCourse,
        shortDescription: shortDes,
        description: detailDes,
        category: courseTarget,
        basePrice: price,
        thumbnails: {
            // Lấy chuỗi Base64 đã lưu, nếu không có thì để trống
            picture: picturePreview.dataset.base64 || "", 
            video: document.getElementById('video-upload').files[0]?.name || ""
        },
        status: 'pending', // Trạng thái mặc định khi gửi cho Admin
        createDate: new Date().toLocaleDateString('vi-VN'),
        quantityStu: 0
    };

    // 4. Lưu vào localStorage
    // Lấy danh sách cũ ra trước (nếu có), sau đó thêm cái mới vào
    let existingCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
    existingCourses.push(newCourse);
    
    localStorage.setItem('myCourses', JSON.stringify(existingCourses));

    // 5. Hiển thị thông báo và chuyển hướng hoặc reset
    alert("Gửi yêu cầu thành công! Khóa học đang chờ Admin phê duyệt.");
    
    // Tùy chọn: Chuyển hướng về trang danh sách
    // window.location.href = "list-course.html";
});



