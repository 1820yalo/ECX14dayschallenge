    // Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Contact form feedback
    document.querySelector('.contact form').addEventListener('submit', function(e) {
      e.preventDefault();
      this.innerHTML = "<p style='color:var(--highlight);font-size:1.2rem;text-align:center;'>Thank you for your message!</p>";
    });

    // Project card click effect
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', function() {
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      });
    });

    // Project preview interactivity
    document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        document.querySelectorAll('.project-preview').forEach(preview => preview.style.display = 'none');
        const previewId = this.getAttribute('data-preview');
        document.getElementById(previewId).style.display = 'block';
    });
    });
    // Optionally, show the first preview again when mouse leaves the grid
    document.querySelector('.projects-grid').addEventListener('mouseleave', function() {
    document.querySelectorAll('.project-preview').forEach(preview => preview.style.display = 'none');
    document.getElementById('preview1').style.display = 'block';
    });

    
    // Project preview interactivity: show preview only on hover
    document.querySelectorAll('.project-card').forEach(card => {
    const previewId = card.getAttribute('data-preview');
    const preview = document.getElementById(previewId);

    card.addEventListener('mouseenter', function() {
        preview.style.display = 'block';
    });
    card.addEventListener('mouseleave', function() {
        preview.style.display = 'none';
    });
    });

    // Hide all previews initially
    document.querySelectorAll('.project-preview').forEach(preview => preview.style.display = 'none');


    // Dark mode toggle (optional)
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.title = 'Toggle dark mode';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.top = '1rem';
    darkModeToggle.style.right = '1rem';
    darkModeToggle.style.padding = '0.5rem 1rem';
    darkModeToggle.style.backgroundColor = 'var(--highlight)';
    darkModeToggle.style.color = 'var(--main-color)';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '6px';
    darkModeToggle.style.fontSize = '1.5rem';
    document.body.appendChild(darkModeToggle);

 
    darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        document.documentElement.style.setProperty('--main-color', '#121212');
        document.documentElement.style.setProperty('--accent', '#e0e0e0');
        document.documentElement.style.setProperty('--highlight', '#bb86fc');
        document.documentElement.style.setProperty('--white', '#ffffff');
        darkModeToggle.textContent = '☀️';
        darkModeToggle.title = 'Switch to light mode';
    } else {
        document.documentElement.style.setProperty('--main-color', '#22223b');
        document.documentElement.style.setProperty('--accent', '#f2e9e4');
        document.documentElement.style.setProperty('--highlight', '#c9ada7');
        document.documentElement.style.setProperty('--white', '#ffffff');
        darkModeToggle.textContent = '🌙';
        darkModeToggle.title = 'Switch to dark mode';
    }
    });