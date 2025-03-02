document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value;
    const useGoogle = document.getElementById('use-google').checked;

    if (useGoogle) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    } else {
        window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    }
});

document.getElementById('search-bar').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});
