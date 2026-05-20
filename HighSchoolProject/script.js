document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const loginBtn = document.querySelector('.login-btn');
  const ctaBtn = document.querySelector('.cta-btn');

  // Toggle mobile menu
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuBtn.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !navLinks.contains(event.target)) {
      navLinks.classList.remove('show');
      menuBtn.textContent = '☰';
    }
  });

  // Login button functionality
  loginBtn.addEventListener('click', () => {
    alert('Login functionality would open here!');
    window.location.href = "login.html";
    // In a real app, this would open a login modal or redirect to login page
  });

  // Get Started button functionality
  ctaBtn.addEventListener('click', () => {
    alert('Getting started! Redirecting to registration...');
    window.location.href = "register.html";
    // In a real app, this would redirect to registration or main dashboard
  });

  // Close menu when clicking on a link (for mobile)
  const navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      menuBtn.textContent = '☰';
    });
  });
});
// About Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.mv-card, .feature-card, .team-member, .stat-item, .contact-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  const initAnimations = () => {
    const animatedElements = document.querySelectorAll('.mv-card, .feature-card, .team-member, .stat-item, .contact-item');
    
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initial check
    animateOnScroll();
  };

  // Initialize animations
  initAnimations();
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);

  // Stats counter animation
  const statsSection = document.querySelector('.stats');
  const statNumbers = document.querySelectorAll('.stat-item h3');
  let animated = false;

  const animateStats = () => {
    const statsPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (statsPosition < screenPosition && !animated) {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
        }, 30);
      });
      animated = true;
    }
  };

  // Listen for scroll for stats animation
  window.addEventListener('scroll', animateStats);
  // Initial check for stats
  animateStats();

  // Team member hover effect
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
      const emoji = member.querySelector('.member-photo');
      const emojis = ['👩‍🏫', '👨‍💻', '👩‍💼', '👨‍🏫', '👩‍🎓', '👨‍🎓', '👩‍🔬', '👨‍🔬'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      // Store original emoji if not already stored
      if (!member.dataset.originalEmoji) {
        member.dataset.originalEmoji = emoji.textContent;
      }
      
      emoji.textContent = randomEmoji;
    });
    
    member.addEventListener('mouseleave', () => {
      const emoji = member.querySelector('.member-photo');
      if (member.dataset.originalEmoji) {
        emoji.textContent = member.dataset.originalEmoji;
      }
    });
  });



  // Update navigation active state
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (linkPage === 'about.html' && currentPage === 'about')) {
      link.classList.add('active');
    }
  });
});

// Settings Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Navigation between settings sections
  const navItems = document.querySelectorAll('.nav-item');
  const settingsSections = document.querySelectorAll('.settings-section');
  const settingsTitle = document.getElementById('settings-title');
  const settingsSubtitle = document.getElementById('settings-subtitle');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-section');
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Show selected section
      settingsSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
          section.classList.add('active');
          
          // Update title and subtitle
          const titleText = item.textContent.trim();
          const iconText = item.querySelector('i').className;
          
          settingsTitle.innerHTML = `<i class="${iconText}"></i> ${titleText}`;
          settingsSubtitle.textContent = getSectionSubtitle(sectionId);
        }
      });
    });
  });
  
  // Helper function to get section subtitles
  function getSectionSubtitle(sectionId) {
    const subtitles = {
      'account': 'Manage your account information and settings',
      'notifications': 'Control how and when you receive notifications',
      'privacy': 'Manage your privacy settings and security options',
      'appearance': 'Customize how the portal looks and feels',
      'preferences': 'Set your personal preferences and defaults',
      'connected': 'Manage apps and services connected to your account',
      'billing': 'View and manage your billing information',
      'help': 'Get help and support for using the portal'
    };
    return subtitles[sectionId] || 'Manage your settings';
  }
  
  // Toggle password visibility
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      const icon = btn.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.className = 'fas fa-eye-slash';
      } else {
        passwordInput.type = 'password';
        icon.className = 'fas fa-eye';
      }
    });
  });
  
  // Password strength checker
  const newPasswordInput = document.getElementById('new-password');
  const strengthBar = document.querySelector('.strength-bar');
  const strengthText = document.querySelector('.strength-text');
  const passwordRequirements = document.querySelectorAll('.password-requirements li i');
  
  if (newPasswordInput) {
    newPasswordInput.addEventListener('input', () => {
      const password = newPasswordInput.value;
      let strength = 0;
      
      // Check password requirements
      const hasMinLength = password.length >= 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
      // Update requirement icons
      passwordRequirements[0].className = hasMinLength ? 'fas fa-check-circle' : 'fas fa-times-circle';
      passwordRequirements[1].className = hasUppercase ? 'fas fa-check-circle' : 'fas fa-times-circle';
      passwordRequirements[2].className = hasNumber ? 'fas fa-check-circle' : 'fas fa-times-circle';
      passwordRequirements[3].className = hasSpecial ? 'fas fa-check-circle' : 'fas fa-times-circle';
      
      // Calculate strength
      if (hasMinLength) strength++;
      if (hasUppercase) strength++;
      if (hasNumber) strength++;
      if (hasSpecial) strength++;
      
      // Update strength meter
      if (strength === 0) {
        strengthBar.className = 'strength-bar weak';
        strengthBar.style.width = '30%';
        strengthText.textContent = 'Password strength: Weak';
      } else if (strength <= 2) {
        strengthBar.className = 'strength-bar weak';
        strengthBar.style.width = '30%';
        strengthText.textContent = 'Password strength: Weak';
      } else if (strength === 3) {
        strengthBar.className = 'strength-bar medium';
        strengthBar.style.width = '60%';
        strengthText.textContent = 'Password strength: Medium';
      } else {
        strengthBar.className = 'strength-bar strong';
        strengthBar.style.width = '100%';
        strengthText.textContent = 'Password strength: Strong';
      }
    });
  }
  
  // Theme selection
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    const radioBtn = option.querySelector('input[type="radio"]');
    
    option.addEventListener('click', () => {
      themeOptions.forEach(opt => {
        opt.querySelector('input[type="radio"]').checked = false;
      });
      radioBtn.checked = true;
      
      // Apply theme (in a real app, this would save to localStorage and apply globally)
      const theme = option.getAttribute('data-theme');
      applyTheme(theme);
    });
  });
  
  function applyTheme(theme) {
    // This is a simplified example. In a real app, you would:
    // 1. Save the theme preference to localStorage
    // 2. Apply the theme to the entire application
    
    console.log(`Theme changed to: ${theme}`);
    
    // For demonstration, just show an alert
    if (theme === 'dark') {
      alert('Dark theme selected. In a real application, this would change the entire interface.');
    } else if (theme === 'light') {
      alert('Light theme selected. In a real application, this would change the entire interface.');
    } else {
      alert('Auto theme selected. The portal will follow your system preference.');
    }
  }
  
  // Color selection
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      const color = option.getAttribute('data-color');
      
      // Remove selected class from all options
      colorOptions.forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('i').style.display = 'none';
      });
      
      // Add selected class to clicked option
      option.classList.add('selected');
      option.querySelector('i').style.display = 'block';
      
      // Apply color (in a real app, this would update CSS variables)
      applyAccentColor(color);
    });
  });
  
  function applyAccentColor(color) {
    // This would update CSS variables in a real application
    document.documentElement.style.setProperty('--primary-color', color);
    
    // Update any elements that use the accent color
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
      btn.style.backgroundColor = color;
    });
    
    console.log(`Accent color changed to: ${color}`);
  }
  
  // Font size selection
  const fontSizeOptions = document.querySelectorAll('.font-size-option');
  fontSizeOptions.forEach(option => {
    const radioBtn = option.querySelector('input[type="radio"]');
    
    option.addEventListener('click', () => {
      fontSizeOptions.forEach(opt => {
        opt.querySelector('input[type="radio"]').checked = false;
      });
      radioBtn.checked = true;
      
      const size = option.getAttribute('data-size');
      applyFontSize(size);
    });
  });
  
  function applyFontSize(size) {
    // In a real app, this would update the font size globally
    const sizes = {
      'small': '14px',
      'medium': '16px',
      'large': '18px'
    };
    
    console.log(`Font size changed to: ${size} (${sizes[size]})`);
    alert(`Font size changed to ${size}. In a real application, this would update all text.`);
  }
  
  // Form submissions
  const forms = document.querySelectorAll('.settings-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // In a real app, this would submit to a server
      // For now, just show a success message
      showNotification('Settings saved successfully!', 'success');
    });
  });
  
  // Danger zone actions
  const deleteAccountBtn = document.querySelector('.btn-danger');
  const deactivateAccountBtn = document.querySelector('.btn-danger-outline');
  
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        showNotification('Account deletion requested. You will receive a confirmation email.', 'warning');
      }
    });
  }
  
  if (deactivateAccountBtn) {
    deactivateAccountBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to deactivate your account? You can reactivate it later by logging in.')) {
        showNotification('Account deactivation requested.', 'warning');
      }
    });
  }
  
  // Logout button
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to log out?')) {
        // In a real app, this would redirect to logout endpoint
        window.location.href = 'index.html';
      }
    });
  }
  
  // Notification function
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .notification-success { background-color: #2ecc71; }
      .notification-warning { background-color: #f39c12; }
      .notification-error { background-color: #e74c3c; }
      .notification-info { background-color: #3498db; }
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close notification on button click
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
  
  // Initialize first section as active
  if (navItems.length > 0) {
    const firstNavItem = navItems[0];
    const firstSectionId = firstNavItem.getAttribute('data-section');
    const firstSection = document.getElementById(firstSectionId);
    
    if (firstSection) {
      firstSection.classList.add('active');
    }
    
    // Set default accent color
    const defaultColorOption = document.querySelector('.color-option[data-color="#f90"]');
    if (defaultColorOption) {
      defaultColorOption.classList.add('selected');
      defaultColorOption.querySelector('i').style.display = 'block';
    }
  }
});

//registration
