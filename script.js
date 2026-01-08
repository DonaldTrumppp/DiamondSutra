document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('text-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');
    
    let pages = [];
    let currentPage = 0;
    const wordsPerPage = 1000; // Adjust as needed; 1000 words ≈ 2-3 screens on mobile
    
    // Fetch the text file
    fetch('text.txt')
        .then(response => response.text())
        .then(text => {
            // Split text into words
            const words = text.split(/\s+/);
            
            // Create pages
            for (let i = 0; i < words.length; i += wordsPerPage) {
                pages.push(words.slice(i, i + wordsPerPage).join(' '));
            }
            
            // Display first page
            displayPage(currentPage);
        })
        .catch(error => {
            textContainer.textContent = 'Error loading text: ' + error;
        });
    
    function displayPage(pageIndex) {
        textContainer.textContent = pages[pageIndex];
        pageInfo.textContent = `Page ${pageIndex + 1} of ${pages.length}`;
        
        prevBtn.disabled = pageIndex === 0;
        nextBtn.disabled = pageIndex === pages.length - 1;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayPage(currentPage);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            displayPage(currentPage);
        }
    });
});