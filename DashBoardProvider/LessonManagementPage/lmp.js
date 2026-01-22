const imageInput = document.getElementById('course-image');
const imagePreview = document.getElementById('image-preview');
const cameraIcon = document.getElementById('camera-icon');
const btnDelete = document.getElementById('btn-delete');

// 1. Xử lý khi chọn ảnh
imageInput.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
           
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            cameraIcon.style.display = 'none';
            
            btnDelete.disabled = false;
        }

        reader.readAsDataURL(file);
    }
});

// 2. Xử lý khi nhấn nút Xóa
btnDelete.addEventListener('click', function() {
    
    imageInput.value = "";
    
  
    imagePreview.src = "";
    imagePreview.style.display = 'none';
    cameraIcon.style.display = 'block';
    
    
    btnDelete.disabled = true;
});



// Upload file content
const fileInput = document.getElementById('lesson-document');
const fileNameDisplay = document.getElementById('attachment-item__file-name-display');
const fileIcon = document.getElementById('file-icon');
const btnDeleteFile = document.getElementById('btn-delete-file');

fileInput.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        
        fileNameDisplay.innerText = "Đã chọn: " + file.name;
        fileNameDisplay.style.display = 'block';
        fileIcon.style.display = 'none';
        
        
        btnDeleteFile.disabled = false;
    }
});

btnDeleteFile.addEventListener('click', function() {
    fileInput.value = "";
    fileNameDisplay.style.display = 'none';
    fileIcon.style.display = 'block';
    this.disabled = true;
});



// 🎀

document.getElementById('btn-submit-course').addEventListener('click', function() {
    const courseData = {
        id: Date.now(),
        title: document.getElementById('course-title').value, 
        category: document.getElementById('course-category').value, 
        basePrice: document.getElementById('base-price').value, 
        status: "Đang chờ duyệt", 
        date: new Date().toLocaleDateString()
    };

    let courses = JSON.parse(localStorage.getItem('myCourses')) || [];
    
  
    courses.push(courseData);
    

    localStorage.setItem('myCourses', JSON.stringify(courses));

    alert("🎉 GỬI DUYỆT THÀNH CÔNG!");
    
    
    window.location.href = "../CourseManagementPage/cmp.html"; 
});



// This is the button trans to the basic info & the lesson all

function transToPage(id){

    let allTabsBasic = document.querySelectorAll('.showpage')
    let getid = document.getElementById(id)

    let isPageAlreadyOpen = (getid.style.display === 'block')

    allTabsBasic.forEach(p => {
        p.style.display = "none";
    })

    if(!isPageAlreadyOpen){
        getid.style.display = "block";
    }

}


// Upload file cho PAGE LCEP - Attachment Document

function handleFileSelect(input) {
    const previewBlock = document.getElementById('file-preview-block');
    const fileNameSpan = document.getElementById('file-name');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
      
        if (file.type !== "application/pdf") {
            alert("Vui lòng chỉ chọn định dạng file PDF!");
            input.value = "";
            return;
        }

        
        fileNameSpan.textContent = file.name;
        previewBlock.style.display = 'block';
    }
}

function removeFile() {
    const input = document.getElementById('file-upload');
    const previewBlock = document.getElementById('file-preview-block');
    
    input.value = ""; 
    previewBlock.style.display = 'none'; 
}



// Upload video cho PAGE LCEP - Area Media
function previewVideo(input) {
    const file = input.files[0];
    const videoPlayer = document.getElementById('video-player');
    const videoSource = document.getElementById('video-source');
    const videoInfo = document.getElementById('video-info');
    const fileNameDisplay = document.getElementById('video-file-name');

    if (file) {
        // 1. Kiểm tra định dạng có phải video không
        if (!file.type.startsWith('video/')) {
            alert("Vui lòng chọn một định dạng video hợp lệ!");
            return;
        }

        // 2. Hiển thị tên file
        fileNameDisplay.textContent = file.name;
        videoInfo.style.display = 'flex';

        // 3. Tạo URL tạm thời để xem trước video
        const fileURL = URL.createObjectURL(file);
        videoSource.src = fileURL;
        
        // 4. Load lại và phát video
        videoPlayer.load(); 
        videoPlayer.style.display = 'block';
    }
}

function resetVideo() {
    const input = document.getElementById('video-upload');
    const videoPlayer = document.getElementById('video-player');
    const videoSource = document.getElementById('video-source');
    const videoInfo = document.getElementById('video-info');

    input.value = ""; 
    videoSource.src = ""; 
    videoPlayer.load();
    videoInfo.style.display = 'none';
}








function goToPage(address){
    window.location.href = address;
}



