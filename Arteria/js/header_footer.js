// Cargar header
fetch('/Arteria/html/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
  });

// Cargar footer
fetch('/Arteria/html/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
  });