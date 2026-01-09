function toggleSubMenu(Id) {
    
    let allPanels = document.querySelectorAll('.sub-panel');
    let currentPanel = document.getElementById(Id);

    
    let isAlreadyOpen = (currentPanel.style.display === "block");

    
    allPanels.forEach(p => {
        p.style.display = "none";
    });

    
    if (!isAlreadyOpen) {
        currentPanel.style.display = "block";
    }
}


function goToPage(address){
    window.location.href = address;
}









