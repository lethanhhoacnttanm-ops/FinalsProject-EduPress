
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

function renderProviders() {
    const tableBody = document.getElementById('table-body-render');
    
    if (!tableBody) return; 

    const html = providers.map((item, index) => `
        <div class="table-list__body">${index + 1}</div>
        <div class="table-list__body"><strong>${item.name}</strong></div>
        <div class="table-list__body">${item.contact}</div>
        <div class="table-list__body">${item.date}</div>
        <div class="table-list__body">${item.field}</div>
        <div class="table-list__body">
            <span class="badge badge--${item.status}">${item.status === 'active' ? 'Hoạt động' : 'Chờ duyệt'}</span>
        </div>
        <div class="table-list__body">
            <button onclick="editProvider(${item.id})">📝</button>
            <button onclick="toggleProvider(${item.id})">🔒</button>
        </div>
    `).join('');

    tableBody.innerHTML = html;
}

renderProviders()