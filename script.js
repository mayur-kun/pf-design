document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project');
    const contactToggle = document.getElementById('contact-toggle');
    const contactCard = document.getElementById('contact-card');
    // const contactDetails = document.getElementById('contact-details');
    
    projects.forEach(project => {
        const color = project.getAttribute('data-color');
        project.querySelector('.project-header').style.backgroundColor = color;
        
        project.addEventListener('click', () => {
            project.classList.toggle('expanded');
            const arrow = project.querySelector('.arrow');
            arrow.textContent = project.classList.contains('expanded') ? 'collapse' : 'read more...';
            
            // Get the project content element
            const projectContent = project.querySelector('.project-content');
            
            // Add a small delay to ensure the transition has started
            setTimeout(() => {
                if (project.classList.contains('expanded')) {
                    // If expanding, scroll to the project content with offset
                    const offset = 5; // Adjust this value as needed
                    const elementPosition = projectContent.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // If collapsing, scroll to the project card with offset
                    const offset = 5; // Adjust this value as needed
                    const elementPosition = project.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 50); // Small delay to ensure smooth transition
        });
    });

    
    contactToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const isVisible = contactCard.classList.contains('visible');

        contactCard.classList.toggle('visible');
        contactToggle.textContent = contactCard.classList.contains('visible') ? '← close' : 'contact me →';

        if (!isVisible) {
        // Use requestAnimationFrame to ensure the DOM has updated before scrolling
        requestAnimationFrame(() => {
            contactCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }


    // function downloadResume(e) {
    //     e.preventDefault();
        
    //     const resumePath = "Mayur_Parab.pdf";
        
    //     const link = document.createElement('a');
    //     link.href = resumePath;
    //     link.download = 'Mayur_Parab_Resume.pdf';
        
    //     document.body.appendChild(link);
    //     link.click();
        
    //     document.body.removeChild(link);
    // }

    //download resume button    
    
    const resumeButton = document.getElementById('intro-resume-button');
     
    // Add click handler if the button exists
    if (resumeButton) {
        resumeButton.addEventListener('click', function() {
            const button = this;
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Downloading...';
            button.disabled = true;
            
            // Create and click download link
            const link = document.createElement('a');
            link.href = 'img\Mayur_Parab.pdf'; // Make sure this file exists in your root directory
            link.download = 'Mayur_Parab_Resume.pdf';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Reset button state after a short delay
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }

    //contact toggle
    contactToggle.addEventListener('click', function(e) {
        e.preventDefault();
        contactCard.classList.toggle('visible');
        contactToggle.textContent = contactCard.classList.contains('visible') ? '← close' : 'contact me →';
    });
    
    // Update time and weather initially and then every minute
    updateTimeAndWeather();
    setInterval(updateTimeAndWeather, 60000);

    // Intersection Observer setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in-left, .fade-in-right').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});

function updateTimeAndWeather() {
    const locationInfo = document.getElementById('location-info');
    
    // Update time
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });

    // Fetch weather data
    const apiKey = config.WEATHER_API_KEY;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=19.07&lon=72.87&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.main.temp);
            const weatherIcon = getWeatherIcon(data.weather[0].icon);
            locationInfo.innerHTML = `Mumbai • ${timeString} • ${weatherIcon} ${temp}°C`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationInfo.innerHTML = `Mumbai • ${timeString}`;
        });
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌡️';
}
});