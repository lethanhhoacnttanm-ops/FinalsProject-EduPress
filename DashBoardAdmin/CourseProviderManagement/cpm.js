
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


function editinfo(id) {

    const providers = JSON.parse(localStorage.getItem('myListProvider')) || [];
    const item = providers.find(p => p.id === id);

    if (item) {
        document.getElementById('edit-id').value = item.id;
        document.getElementById('display-id').innerText = item.id; 
        document.getElementById('edit-name').value = item.name;
        document.getElementById('edit-email').value = item.email;
        document.getElementById('modal-edit-provider').style.display = 'flex';
    }
}

function saveChanges() {
    const id = document.getElementById('edit-id').value;
    let providers = JSON.parse(localStorage.getItem('myListProvider')) || [];

    providers = providers.map(item => {
        if (item.id === id) {
            return {
                ...item,
                name: document.getElementById('edit-name').value,
                email: document.getElementById('edit-email').value,
            };
        }
        return item;
    });

    localStorage.setItem('myListProvider', JSON.stringify(providers));

    document.getElementById('modal-edit-provider').style.display = 'none';

    renderProvider(); 
    alert("Supplier information updated successfully!");
}

function toggleProviderStatus(id) {
    let courses = JSON.parse(localStorage.getItem('myListProvider')) || [];
    const index = courses.findIndex(c => String(c.id) === String(id));

    if (index !== -1) {
        const currentStatus = courses[index].status;
        courses[index].status = (currentStatus === 'active') ? 'disabled' : 'active';

        localStorage.setItem('myListProvider', JSON.stringify(courses));
        
        const statusText = courses[index].status === 'active' ? "displayed" : "hidden";
        alert(`Provider successfully ${statusText}!`);
        
        renderProvider();
    }
}

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
                <button title="edit" onclick="editinfo('${item.id}')">📝</button>
                <button title="disable" onclick="toggleProviderStatus('${item.id}')">🚫</button>
            </div>
    `}).join('');

    tableBodycm.innerHTML = htmlcm;
}

renderProvider()