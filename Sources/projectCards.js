// DOM Elements
const projectContainer = document.querySelector('.project-container');
const portfolioBtns = document.querySelectorAll('.portfolio-btns ul li');
const tagFilters = document.querySelectorAll('.tag-filter');

// State
let projects = [];
let currentFilter = 'all';

// Fetch projects data from JSON file
async function fetchProjects() {
  try {
    const response = await fetch('Sources/projects.json');
    const data = await response.json();
    projects = data.projects;
    renderProjects(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    projectContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
  }
}

// Create project card HTML
function createProjectCard(project, index) {
  if (project.hidden) return '';

  // Create data attributes for tags
  const tagAttributes = project.tags ?
    project.tags.map(tag => `data-tag-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}="true"`).join(' ') : '';

  return `
    <div class="p-card" data-item="${project.category}" ${tagAttributes}>
      <div class="p-card-img">
        <img src="${project.image}" alt="${project.title}" />
      </div>
      <div class="p-card-content">
        <h3 class="p-heading">
          <img src="${project.icon}" alt="${project.title} icon" style="width: 20px; height: 20px;">
          ${project.title}
        </h3>
        <div class="p-tech-stack">
          ${project.technologies.map(tech => `<span class="p-tech">${tech}</span>`).join('')}
        </div>
        <p class="p-description">
          ${project.description}
        </p>
        ${project.tags ? `
        <div class="p-tags">
          ${project.tags.map(tag => `<span class="p-tag">${tag}</span>`).join('')}
        </div>
        ` : ''}
        <div class="p-card-actions">
          <a href="${project.demoLink}" class="p-card-link" target="_blank">
            Visit Demo <img src="Sources/external-link.png" alt="" />
          </a>
          <div class="p-card-icons">
            <div class="p-icon" data-action="github" data-url="${project.githubLink}">
              <img src="Sources/github.svg" alt="GitHub" />
            </div>
            <div class="p-icon" data-action="share" data-title="${project.title}" data-url="${project.demoLink}">
              <img src="Sources/share.svg" alt="Share" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render projects based on filter
function renderProjects(projectsToRender) {
  if (!projectContainer) return;

  // Filter logic
  const filteredProjects = currentFilter === 'all'
    ? projectsToRender
    : projectsToRender.filter(project => {
        // Ensure project.category is treated as an array
        const categories = Array.isArray(project.category) ? project.category : [project.category];

        // Match against category or tags
        return categories.includes(currentFilter) || (project.tags && project.tags.includes(currentFilter));
      });

  // Render cards
  const projectsHTML = filteredProjects.map((project, index) => createProjectCard(project, index)).join('');
  projectContainer.innerHTML = projectsHTML || '<div class="no-projects">No projects found matching this filter.</div>';

  // Icon event listeners (GitHub/share)
  document.querySelectorAll('.p-icon').forEach(icon => {
    icon.addEventListener('click', function () {
      const action = this.getAttribute('data-action');
      const url = this.getAttribute('data-url');

      if (action === 'github' && url && url !== '#') {
        window.open(url, '_blank');
      } else if (action === 'share') {
        const title = this.getAttribute('data-title');
        const shareUrl = this.getAttribute('data-url');

        if (navigator.share) {
          navigator.share({ title, url: shareUrl }).catch(console.error);
        } else {
          const tempInput = document.createElement('input');
          document.body.appendChild(tempInput);
          tempInput.value = shareUrl;
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          alert(`URL copied to clipboard: ${shareUrl}`);
        }
      }
    });
  });
}


// Set up filter buttons
function setupFilterButtons() {
  if (!portfolioBtns.length) return;

  // Category filter buttons
  portfolioBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      portfolioBtns.forEach(b => b.classList.remove('active'));
      tagFilters.forEach(t => t.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      currentFilter = filterValue;

      // Re-render projects with new filter
      renderProjects(projects);
    });
  });

  // Tag filter buttons
  tagFilters.forEach(tag => {
    tag.addEventListener('click', function() {
      // Remove active class from all buttons
      portfolioBtns.forEach(b => b.classList.remove('active'));
      tagFilters.forEach(t => t.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      currentFilter = filterValue;

      // Re-render projects with new filter
      renderProjects(projects);
    });
  });

  // Add click event to tag elements in project cards
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('p-tag')) {
      const tagValue = e.target.textContent.toLowerCase();

      // Remove active class from all buttons
      portfolioBtns.forEach(b => b.classList.remove('active'));
      tagFilters.forEach(t => t.classList.remove('active'));

      // Add active class to matching tag filter if exists
      tagFilters.forEach(t => {
        if (t.getAttribute('data-filter') === tagValue) {
          t.classList.add('active');
        }
      });

      // Set filter and re-render
      currentFilter = tagValue;
      renderProjects(projects);
    }
  });
}

// Initialize the project section
function initProjects() {
  fetchProjects();
  setupFilterButtons();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjects);
