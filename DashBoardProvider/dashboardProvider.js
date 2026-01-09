function toggleSubMenuPro(panelId) {
    let allPanels = document.querySelectorAll('.sub-panel');
    let currentPanel = document.getElementById(panelId);

    let isAlreadyOpen = (currentPanel.style.display === "block");

    allPanels.forEach(p => {
        p.style.display = "none";
    });

   
    if (!isAlreadyOpen) {
        currentPanel.style.display = "block";
    }
}

function goToPageProvider(address) {
    if (address) {
        window.location.href = address;
    }
}