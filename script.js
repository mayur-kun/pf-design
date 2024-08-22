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

    // Update time and weather initially and then every minute
    updateTimeAndWeather();
    setInterval(updateTimeAndWeather, 60000);
});

// function updateTimeAndWeather() {
//     const locationInfo = document.getElementById('location-info');
    
//     // Update time
//     const now = new Date();
//     const timeString = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });

//     // Fetch weather data
//     const apiKey = 'WEATHER_API_KEY';
//     // const city = 'Mumbai';

//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=19.07&lon=72.87&appid=${apiKey}`)
//         .then(response => response.json())
//         .then(data => {
//             const temp = Math.round(data.main.temp);
//             const weatherIcon = getWeatherIcon(data.weather[0].icon);
//             locationInfo.innerHTML = `Mumbai • ${timeString}`;
//         })
//         .catch(error => {
//             console.error('Error fetching weather data:', error);
//             locationInfo.innerHTML = `Mumbai • ${timeString}`;
//         });
// }


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

// Intersection Observer for animations
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