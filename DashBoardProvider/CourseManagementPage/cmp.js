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
        // Chuẩn bị dữ liệu
        const thumb = item.thumbnails?.picture || 'https://via.placeholder.com/120x70?text=No+Image';
        const name = item.title || "Chưa đặt tên";
        const price = item.basePrice || 0;
        const quantity = item.quantityStu || 0;
        const status = item.status || 'pending';
        const createDate = item.createDate || item.date || '---'; // Lấy ngày tạo từ đối tượng
        const lessonCount = item.lessons ? item.lessons.length : 0;

        return `
        <div class="table-list__body">${index + 1}</div>

        <div class="table-list__body">
            <img src="${thumb}" alt="Thumb" style="width: 100px; height: 60px; object-fit: cover; border-radius: 4px;">
        </div>

        <div class="table-list__body" style="font-weight: 500; text-align: left;">${name}</div>

        <div class="table-list__body" style="font-weight: bold; color: #2563EB;">
            ${Number(price).toLocaleString()}đ
        </div>

        <div class="table-list__body">${quantity}</div>

        <div class="table-list__body">
            <span class="status-badge status-${status}">
                ${status === 'pending' ? 'Pending approval' : 
                //   status === 'lesson_pending' ? 'Bài mới chờ duyệt' :
                  status === 'active' ? 'Published' : 
                  status === 'rejected' ? 'Rejected' : 'Bản nháp'}
            </span>
        </div>

        <div class="table-list__body">${createDate}</div>

        <div class="table-list__body">
            <button class="btn-action lesson" 
                    onclick="window.location.href='../LessonManagementPage/lcep.html?id=${item.id}'" 
                    title="Quản lý bài giảng"
                    style="background: #10B981; color: white; padding: 6px 12px; border-radius: 4px; border: none; cursor: pointer;">
                <i class="fa-solid fa-book"></i> Lesson (${lessonCount})
            </button>
        </div>

        <div class="table-list__body">
                <button class="btn-action edit" onclick="editCourse('${item.id}')" title="Edit" style="margin-right: 5px;">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-action delete" onclick="deleteCourse('${item.id}')" title="Delete">
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

function editCourse(id) {
    // Chuyển hướng và đính kèm tham số id=...
    window.location.href = `./CourseCreate&EditPage/ccep.html?id=${id}`;
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

document.addEventListener('DOMContentLoaded', function() {
    // --- PHẦN 1: ĐỔ DỮ LIỆU CŨ VÀO FORM (NẾU LÀ EDIT) ---
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('id');

    if (editId) {
        const courses = JSON.parse(localStorage.getItem('myCourses')) || [];
        const course = courses.find(c => String(c.id) === String(editId));

        if (course) {
            // Điền dữ liệu vào các ô input
            document.getElementById('NAME-CCEP').value = course.name || "";
            document.getElementById('ID-COURSE-CCEP').value = course.id || "";
            document.getElementById('NAME-COURSE-CCEP').value = course.title || "";
            document.getElementById('SHORT-DES-CCEP').value = course.shortDescription || "";
            document.getElementById('DETAIL-DES-CCEP').value = course.description || "";
            document.getElementById('seleted-category-target').value = course.category || "";
            document.getElementById('Category_prices-root').value = course.basePrice || "";
            
            // Hiển thị ảnh bìa cũ
            if (course.thumbnails && course.thumbnails.picture) {
                const picturePreview = document.getElementById('pictureshow');
                picturePreview.src = course.thumbnails.picture;
                picturePreview.dataset.base64 = course.thumbnails.picture;
            }
            
            // Đổi tiêu đề nút bấm cho chuyên nghiệp
            document.getElementById('btn-submit-course').innerText = "Update Course";
        }
    }

    // --- PHẦN 2: XỬ LÝ SỰ KIỆN LƯU (SAVE/UPDATE) ---
    const btnSubmit = document.getElementById('btn-submit-course');
    if (btnSubmit) {
        btnSubmit.addEventListener('click', function() {
            const name = document.getElementById('NAME-CCEP').value;
            const idCourse = document.getElementById('ID-COURSE-CCEP').value;
            const nameCourse = document.getElementById('NAME-COURSE-CCEP').value;
            const shortDes = document.getElementById('SHORT-DES-CCEP').value;
            const detailDes = document.getElementById('DETAIL-DES-CCEP').value;
            const courseTarget = document.getElementById('seleted-category-target').value;
            const price = document.getElementById('Category_prices-root').value;
            const picturePreview = document.getElementById('pictureshow');

            // Kiểm tra dữ liệu (Validation)
            if (!nameCourse || !price || (!editId && !document.getElementById('choosepic').files[0]) || !name) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            let existingCourses = JSON.parse(localStorage.getItem('myCourses')) || [];

            if (editId) {
                // CHẾ ĐỘ CHỈNH SỬA
                const index = existingCourses.findIndex(c => String(c.id) === String(editId));
                if (index !== -1) {
                    existingCourses[index] = {
                        ...existingCourses[index],
                        name: name,
                        title: nameCourse,
                        shortDescription: shortDes,
                        description: detailDes,
                        category: courseTarget,
                        basePrice: price,
                        thumbnails: {
                            picture: picturePreview.dataset.base64 || existingCourses[index].thumbnails.picture,
                            video: document.getElementById('video-upload').files[0]?.name || existingCourses[index].thumbnails.video
                        },
                        status: 'pending' // Gửi lại cho Admin duyệt bản mới
                    };
                    alert("Cập nhật thành công!");
                }
            } else {
                // CHẾ ĐỘ TẠO MỚI
                const newCourse = {
                    name: name,
                    id: idCourse || Date.now(), 
                    title: nameCourse,
                    shortDescription: shortDes,
                    description: detailDes,
                    category: courseTarget,
                    basePrice: price,
                    thumbnails: {
                        picture: picturePreview.dataset.base64 || "", 
                        video: document.getElementById('video-upload').files[0]?.name || ""
                    },
                    status: 'pending', 
                    createDate: new Date().toLocaleDateString('vi-VN'),
                    quantityStu: 0
                };
                existingCourses.push(newCourse);
                alert("Gửi yêu cầu tạo mới thành công!");
            }

            localStorage.setItem('myCourses', JSON.stringify(existingCourses));
            window.location.href = "../cmp.html"// Chuyển về trang danh sách
        });
    }
});



