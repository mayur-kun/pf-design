document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project');

    
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

// Get the current year
 const currentYear = new Date().getFullYear();
  
// Update the year in the copyright notice
document.getElementById('current-year').textContent = currentYear;