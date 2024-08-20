document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const color = project.getAttribute('data-color');
        project.querySelector('.project-header').style.backgroundColor = color;
        
        project.addEventListener('click', () => {
            project.classList.toggle('expanded');
            const arrow = project.querySelector('.arrow');
            arrow.textContent = project.classList.contains('expanded') ? '↓' : '→';
        });
    });

    const contactToggle = document.getElementById('contact-toggle');
    const contactCard = document.getElementById('contact-card');

    contactToggle.addEventListener('click', function(e) {
        e.preventDefault();
        contactCard.classList.toggle('visible');
        contactToggle.textContent = contactCard.classList.contains('visible') ? '← close' : 'contact me →';
    });
});
