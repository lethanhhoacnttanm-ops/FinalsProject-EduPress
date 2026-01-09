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