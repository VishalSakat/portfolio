
/**
 * Topnav Component
 * A modern mega menu navigation with theme support
 */
class Topnav {
  constructor(options = {}) {
    this.options = {
      headerTitle: 'Loading...',
      logo: null,
      items: [],
      onStateChange: null,
      theme: 'light',
      onThemeChange: null,
      ...options,
    };

    this.currentTheme = this.options.theme;
    this.pageName = 'Loading...';
    this.megaMenuOpen = false;
    this.init();
  }

  init() {
    this.createElements();
    this.setupEventListeners();
    this.injectStyles();
    this.setPageName();
  }

  getCurrentPath() {
    // Remove query parameters and trailing slash
    const path = window.location.pathname.split('?')[0];
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  setPageName() {
    const currentItem = this.options.items.find(
      (item) => item.href === this.getCurrentPath(),
    );
    this.pageName = currentItem ? currentItem.text : 'Home';

    const pageNameElement = document.getElementById('page-name');
    if (pageNameElement) {
      pageNameElement.textContent = this.pageName;
    }
  }

  createElements() {
    // Create main navigation container
    this.topnav = document.createElement('div');
    this.topnav.className =
      'tp-header fixed top-0 left-0 right-0 bg-background border-b border-border z-50';

    // Create main header content
    this.topnav.innerHTML = `
      <div class="w-full mx-auto overflow-x-hidden">
        <div class="flex items-center px-4 h-16">
          <!-- Left section: Logo and Title -->
          <div class="flex items-center gap-4">
            <button id="tp-hamburger" class="p-2 md:hidden text-foreground hover:bg-muted rounded-lg transition-colors">
              <i class="ti ti-menu-2 text-xl"></i>
            </button>
            <div class="flex items-center gap-3 max-w-[200px]">
              ${
                this.options.logo
                  ? `<img src="${this.options.logo}" alt="Logo" class="h-8 w-8 rounded-lg border border-border flex-shrink-0"/>`
                  : ''
              }
              <h1 class="text-lg font-semibold text-foreground truncate" title="${
                this.options.headerTitle
              }">${this.options.headerTitle}</h1>
            </div>
          </div>

          <!-- Center section: Main Navigation -->
          <nav class="hidden md:flex items-center gap-1 ms-10">
            ${this.options.items
              .filter((item) => item.showInSideNav)
              .map((item) => {
                const isActive = this.getCurrentPath() === item.href;
                const hasChildren =
                  item.children &&
                  item.children.filter((child) => child.showInSideNav).length >
                    0;
                return `
                  <div class="tp-nav-item group relative">
                    <a href="${item.href}" 
                       class="flex items-center px-3 py-2 rounded-lg hover:bg-muted transition-colors ${
                         isActive ? 'text-primary' : 'text-foreground'
                       }"
                    >
                      <span class="flex items-center text-sm gap-2">
                        <i class="${item.icon}"></i>
                        ${item.text}
                        ${
                          hasChildren
                            ? '<i class="ti ti-chevron-down text-sm opacity-60 transition-transform group-hover:rotate-180"></i>'
                            : ''
                        }
                      </span>
                    </a>
                    ${
                      hasChildren
                        ? `
                        <div class="tp-mega-menu invisible opacity-0 absolute top-[calc(100%+4px)] left-0 w-screen max-w-md bg-background shadow-lg rounded-lg border border-border transition-all duration-200 transform -translate-y-2">
                          <div class="absolute h-4 -top-4 left-0 right-0"></div>
                          <div class="p-4">
                            <div class="grid grid-cols-2 gap-4">
                              ${item.children
                                .filter((child) => child.showInSideNav)
                                .map(
                                  (child) => `
                                <a href="${
                                  child.href
                                }" class="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                                  <i class="${
                                    child.icon || 'ti ti-arrow-right'
                                  } mt-1"></i>
                                  <div>
                                    <div class="font-medium text-foreground text-sm">${
                                      child.text
                                    }</div>
                                    ${
                                      child.description
                                        ? `<div class="text-xs text-muted-foreground">${child.description}</div>`
                                        : ''
                                    }
                                  </div>
                                </a>
                              `,
                                )
                                .join('')}
                            </div>
                          </div>
                        </div>
                        `
                        : ''
                    }
                  </div>
                `;
              })
              .join('')}
          </nav>

          <!-- Right section: User Profile -->
          <div id="tp-user-container" class="ms-auto me-0 relative">
            <!-- User profile content will be injected here -->
          </div>
        </div>
      </div>
    `;

    // Create mobile overlay and menu
    this.overlay = document.createElement('div');
    this.overlay.className =
      'tp-overlay fixed inset-0 bg-foreground/50 z-40 hidden opacity-0 transition-opacity duration-200';

    this.mobileMenu = document.createElement('div');
    this.mobileMenu.className =
      'tp-mobile-menu fixed top-0 left-0 bottom-0 w-64 bg-background border-r border-border transform -translate-x-full transition-transform duration-200 z-50';

    // Mobile menu content
    this.mobileMenu.innerHTML = `
      <div class="flex flex-col h-full">
        <div class="p-4 border-b border-border">
          <div class="flex items-center gap-3">
            ${
              this.options.logo
                ? `<img src="${this.options.logo}" alt="Logo" class="h-8 w-8 rounded-lg border border-border flex-shrink-0"/>`
                : ''
            }
            <h1 class="text-lg font-semibold text-foreground truncate">${
              this.options.headerTitle
            }</h1>
          </div>
        </div>
        <nav class="flex-1 overflow-y-auto p-4">
          ${this.options.items
            .filter((item) => item.showInSideNav)
            .map((item, index) => {
              const isActive = this.getCurrentPath() === item.href;
              const hasChildren =
                item.children &&
                item.children.filter((child) => child.showInSideNav).length > 0;
              return `
                <div class="tp-mobile-nav-item mb-1">
                  <div class="flex items-center">
                    <a href="${item.href}" 
                       class="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors ${
                         isActive ? 'text-primary' : 'text-foreground'
                       }"
                    >
                      <i class="${item.icon}"></i>
                      <span>${item.text}</span>
                    </a>
                    ${
                      hasChildren
                        ? `
                        <button class="tp-mobile-dropdown-toggle p-2 hover:bg-muted rounded-lg transition-colors" data-index="${index}">
                          <i class="ti ti-chevron-down text-sm opacity-60 transition-transform"></i>
                        </button>
                        `
                        : ''
                    }
                  </div>
                  ${
                    hasChildren
                      ? `
                      <div class="tp-mobile-children hidden ps-6 mt-1 space-y-1">
                        ${item.children
                          .filter((child) => child.showInSideNav)
                          .map(
                            (child) => `
                          <a href="${child.href}" 
                             class="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                          >
                            <i class="${
                              child.icon || 'ti ti-arrow-right'
                            } mt-1"></i>
                            <div>
                              <div class="text-sm text-foreground">${
                                child.text
                              }</div>
                              ${
                                child.description
                                  ? `<div class="text-xs text-muted-foreground">${child.description}</div>`
                                  : ''
                              }
                            </div>
                          </a>
                        `,
                          )
                          .join('')}
                      </div>
                      `
                      : ''
                  }
                </div>
              `;
            })
            .join('')}
        </nav>
      </div>
    `;

    // Create content wrapper
    this.contentWrapper = document.createElement('div');
    this.contentWrapper.className = 'tp-content-wrapper';

    // Move existing body content to wrapper
    while (document.body.firstChild) {
      if (
        document.body.firstChild !== this.topnav &&
        document.body.firstChild !== this.overlay &&
        document.body.firstChild !== this.mobileMenu
      ) {
        this.contentWrapper.appendChild(document.body.firstChild);
      } else {
        document.body.removeChild(document.body.firstChild);
      }
    }

    // Append elements to body
    new Banner('topnav');
    document.body.appendChild(this.topnav);
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.mobileMenu);
    document.body.appendChild(this.contentWrapper);
  }

  setupEventListeners() {
    // Mobile menu toggle with overlay fade
    const hamburger = document.getElementById('tp-hamburger');
    hamburger?.addEventListener('click', () => {
      this.mobileMenu.classList.toggle('-translate-x-full');
      this.overlay.classList.toggle('hidden');
      // Small delay to ensure the overlay is visible before fading in
      requestAnimationFrame(() => {
        this.overlay.classList.toggle('opacity-0');
      });
    });

    // Close mobile menu with overlay fade
    this.overlay.addEventListener('click', () => {
      this.overlay.classList.add('opacity-0');
      this.mobileMenu.classList.add('-translate-x-full');
      // Wait for fade out before hiding
      setTimeout(() => {
        this.overlay.classList.add('hidden');
      }, 200);
    });

    // Close mega menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.tp-nav-item')) {
        this.closeMegaMenus();
      }
    });

    // Mobile dropdown toggles
    const dropdownToggles = document.querySelectorAll(
      '.tp-mobile-dropdown-toggle',
    );
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = toggle.querySelector('i');
        const childrenContainer = toggle
          .closest('.tp-mobile-nav-item')
          .querySelector('.tp-mobile-children');

        // Toggle rotation and visibility
        icon.style.transform =
          icon.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
        childrenContainer.classList.toggle('hidden');
      });
    });
  }

  closeMegaMenus() {
    const megaMenus = document.querySelectorAll('.tp-mega-menu');
    megaMenus.forEach((menu) => {
      menu.classList.add('invisible', 'opacity-0');
    });
  }

  updateThemeToggleButton() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      const text = themeToggle.querySelector('span');
      icon.className =
        this.currentTheme === 'light' ? 'ti ti-moon' : 'ti ti-sun';
      text.textContent =
        this.currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    }
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .tp-header {
        backdrop-filter: blur(8px);
        background-color: var(--color-background);
      }
      
      .tp-nav-item {
        position: relative;
      }

      /* Overlay styles */
      .tp-overlay {
        backdrop-filter: blur(4px);
      }

      /* Desktop mega menu styles */
      @media (min-width: 768px) {
        .tp-nav-item:hover .tp-mega-menu,
        .tp-mega-menu:hover {
          visibility: visible !important;
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: auto !important;
        }

        .tp-mega-menu {
          pointer-events: none;
          transform-origin: top;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }

      /* Mobile menu styles */
      .tp-mobile-children {
        overflow: hidden;
        transition: all 0.2s ease-in-out;
      }

      .tp-mobile-dropdown-toggle i {
        display: inline-block;
        transition: transform 0.2s ease-in-out;
      }

      @media (max-width: 768px) {
        .tp-content-wrapper {
          padding-top: 1rem;
        }
        
        .tp-mobile-menu {
          overflow-y: auto;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

export default Topnav;
