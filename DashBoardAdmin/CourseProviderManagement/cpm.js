
// --------- 🔴 Course Provider Management -------------
const providers = [
    { 
        id: 1, 
        name: "Lê Thanh Hòa", 
        contact: "hoahum118@gmail.com", 
        date: "2004-26-01", 
        field: "Lập trình", 
        status: "active" 
    },
    
    { 
        id: 2, 
        name: "Lương Diệu kiệt", 
        contact: "0911222333 - info@edu.vn", 
        date: "2024-03-22", 
        field: "Tiếng Anh", 
        status: "pending" }
];

function renderProvider() {
    const tableBodycm = document.getElementById('table-body-render');
    
    if (!tableBodycm) return;
    const courses = JSON.parse(localStorage.getItem('myListProvider')) || providers;

    const htmlcm = courses.map((item, index) => {
        
        
                    
        return `
            <div class="table-list__body-cpm">${index + 1}</div>
            <div class="table-list__body-cpm">${item.id}</div>
            <div class="table-list__body-cpm">${item.name}</div>
            <div class="table-list__body-cpm">${item.email}</div> 
            <div class="table-list__body-cpm">${item.timestamp}</div> 
            <div class="table-list__body-cpm">
                <span class="badge badge--${item.status}">
                    ${item.status === 'active' ? 'Approved' : 'Pending approval'}
                </span>
            </div>
            <div class="table-list__body-cpm">
                <button title="detail" onclick="viewCourseDetail('${item.id}')">👁️</button>
                <button title="edit" onclick="editinfo('${item.id}')">📝</button>
                <button title="disable" onclick="toggleCourseStatus('${item.id}')">🚫</button>
            </div>
    `}).join('');

    tableBodycm.innerHTML = htmlcm;
}

renderProvider()