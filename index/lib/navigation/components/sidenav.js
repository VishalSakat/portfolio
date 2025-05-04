
/**
 * Sidenav Component
 * A responsive navigation sidebar with theme support
 */
class Sidenav {
  constructor(options = {}) {
    this.options = {
      // Default options
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
    this.pageName = this.options?.items?.filter(
      (item) => item.href === this.getCurrentPath(),
    )[0]?.text;

    const pageNameElement = document.getElementById('page-name');
    if (pageNameElement) {
      pageNameElement.textContent = this.pageName;
    }
  }

  createElements() {
    // Create header
    this.header = document.createElement('div');
    this.header.className =
      'sp-header bg-background border-b border-border md:border-none';
    this.header.innerHTML = `
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2 md:hidden">
          <button id="sp-hamburger" class="p-2 md:hidden text-foreground hover:bg-muted rounded-lg transition-colors w-fit">
            <i class="ti ti-menu-2 text-xl"></i>
          </button>
          ${
            this.options.logo
              ? `<img src="${this.options.logo}" alt="Logo" class="h-8 w-auto rounded-lg border border-border"/>`
              : ''
          }
          <h1 class="text-md md:text-lg font-semibold text-foreground truncate">${
            this.options.headerTitle
          }</h1>
        </div>
        <h2 id="page-name" class="text-md md:text-lg font-semibold text-foreground truncate hidden md:block">${
          this.pageName
        }</h2>
        <div id="sp-user-container" class="ms-auto"></div>
      </div>
    `;

    // Modified sidenav creation with nested menu support
    this.sidenav = document.createElement('div');
    this.sidenav.className = 'sp-sidenav bg-background p-1.5';

    const currentPath = this.getCurrentPath();

    this.sidenav.innerHTML = `
      <nav class="sp-nav-container rounded-lg border border-transparent md:border-gray-200 md:bg-gray-50">
        <a href="/index.html" class="sp-nav-link hover:bg-muted transition-colors truncate !pt-0.5 !p-1 !pb-3 border-b border-border !rounded-none">
          ${
            this.options?.logo
              ? `<img src="${this.options.logo}" alt="Logo" class="h-6 w-auto rounded-lg border border-border"/>`
              : ''
          }
          <span class="sp-nav-text font-semibold text-sm truncate ms-2">${
            this.options.headerTitle
          }</span>
        </a>
         
        ${this.options.items
          .filter((item) => item.showInSideNav)
          .map((item, index) => {
            const itemPath = item.href.endsWith('/')
              ? item.href.slice(0, -1)
              : item.href;
            const isActive = currentPath === itemPath;
            const hasChildren =
              item.children &&
              item.children.filter((child) => child.showInSideNav).length > 0;

            return `
              <div class="sp-nav-item group">
                <div class="flex items-center w-full">
                  <a href="${item.href}" 
                     class="sp-nav-link flex-1 hover:bg-muted transition-colors truncate ${
                       isActive ? 'active' : ''
                     }"
                  >
                    <i class="${item.icon} ${
                      isActive ? 'text-foreground' : ''
                    }"></i>
                    <span class="sp-nav-text">${item.text}</span>
                    <span class="sp-nav-tooltip">${item.text}</span>
                  </a>
                  ${
                    hasChildren
                      ? `
                      <button class="sp-nav-toggle p-2 hover:bg-muted rounded-lg transition-colors expanded-only" data-index="${index}">
                        <i class="ti ti-chevron-down text-sm opacity-60 transition-transform"></i>
                      </button>
                      `
                      : ''
                  }
                </div>

                ${
                  hasChildren
                    ? `
                    <!-- Expanded state children (shown on click when expanded) -->
                    <div class="sp-nav-children hidden expanded-only">
                      <div class="ps-4 py-1 space-y-1">
                        ${item.children
                          .filter((child) => child.showInSideNav)
                          .map((child) => {
                            const childPath = child.href.endsWith('/')
                              ? child.href.slice(0, -1)
                              : child.href;
                            const isChildActive = currentPath === childPath;
                            return `
                              <a href="${child.href}" 
                                 class="sp-nav-child-link flex items-start gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors ${
                                   isChildActive
                                     ? 'text-primary'
                                     : 'text-muted-foreground'
                                 }"
                              >
                                <i class="${
                                  child.icon || 'ti ti-arrow-right'
                                } text-sm mt-0.5"></i>
                                <div>
                                  <div class="text-sm font-medium">${
                                    child.text
                                  }</div>
                                  ${
                                    child.description
                                      ? `<div class="text-xs text-muted-foreground">${child.description}</div>`
                                      : ''
                                  }
                                </div>
                              </a>
                            `;
                          })
                          .join('')}
                      </div>
                    </div>

                    <!-- Collapsed state popover (shown on hover when collapsed) -->
                    <div class="sp-nav-popover invisible opacity-0 fixed left-full top-0 ml-2 bg-background rounded-lg shadow-lg border border-border p-2 min-w-[200px] collapsed-only">
                      <div class="font-medium px-2 py-1.5 text-sm border-b border-border mb-1">${
                        item.text
                      }</div>
                      <div class="space-y-1 max-h-[calc(100vh-100px)] overflow-y-auto">
                        ${item.children
                          .filter((child) => child.showInSideNav)
                          .map((child) => {
                            const childPath = child.href.endsWith('/')
                              ? child.href.slice(0, -1)
                              : child.href;
                            const isChildActive = currentPath === childPath;
                            return `
                              <a href="${child.href}" 
                                 class="sp-nav-child-link flex items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors ${
                                   isChildActive
                                     ? 'text-primary'
                                     : 'text-muted-foreground'
                                 }"
                              >
                                <i class="${
                                  child.icon || 'ti ti-arrow-right'
                                } text-sm mt-0.5"></i>
                                <div class="flex-1 min-w-0">
                                  <div class="text-sm font-medium truncate">${
                                    child.text
                                  }</div>
                                  ${
                                    child.description
                                      ? `<div class="text-xs text-muted-foreground truncate">${child.description}</div>`
                                      : ''
                                  }
                                </div>
                              </a>
                            `;
                          })
                          .join('')}
                      </div>
                    </div>
                    `
                    : ''
                }
              </div>
            `;
          })
          .join('')}
        <div class="sp-theme-switch hidden md:block">
          <button id="sp-hamburger" class="p-2 hidden md:flex gap-2 items-center justify-start text-foreground hover:bg-muted rounded-lg transition-colors w-full truncate">
            <i id="sp-hamburger-icon" class="ti ti-layout-sidebar-left-expand text-xl"></i>
            <span id="sp-hamburger-text" class="hidden md:block">Collapse Menu</span>
          </button>
          <button class="sp-nav-link !hidden w-full hover:bg-muted transition-colors truncate" id="theme-toggle">
            <i class="${
              this.currentTheme === 'light' ? 'ti ti-moon' : 'ti ti-sun'
            }"></i>
            <span class="sp-nav-text">${
              this.currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'
            }</span>
            <span class="sp-nav-tooltip">${
              this.currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'
            }</span>
          </button>
        </div>
      </nav>
    `;

    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'sp-overlay bg-foreground/50';

    // Create content wrapper
    this.contentWrapper = document.createElement('div');
    this.contentWrapper.className = 'sp-content-wrapper';

    // Move existing body content to wrapper
    while (document.body.firstChild) {
      if (
        document.body.firstChild !== this.header &&
        document.body.firstChild !== this.sidenav &&
        document.body.firstChild !== this.overlay
      ) {
        this.contentWrapper.appendChild(document.body.firstChild);
      } else {
        document.body.removeChild(document.body.firstChild);
      }
    }

    // Append elements to body
    new Banner('sidenav');
    document.body.appendChild(this.header);
    document.body.appendChild(this.sidenav);
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.contentWrapper);
  }

  setupEventListeners() {
    const hamburgers = document.querySelectorAll('#sp-hamburger');

    hamburgers.forEach((hamburger) => {
      hamburger.addEventListener('click', () => {
        if (window.innerWidth >= 768) {
          // Desktop behavior
          this.sidenav.classList.toggle('expanded');
          this.contentWrapper.classList.toggle('expanded');
        } else {
          // Mobile behavior
          this.sidenav.classList.toggle('active');
          this.overlay.classList.toggle('active');
        }

        if (this.options.onStateChange) {
          this.options.onStateChange(
            this.sidenav.classList.contains('expanded'),
          );
        }

        // Update hamburger icon
        const hamburgerIcon = document.getElementById('sp-hamburger-icon');
        const isExpanded = this.sidenav.classList.contains('expanded');
        const hamburgerText = document.getElementById('sp-hamburger-text');
        if (isExpanded) {
          hamburgerIcon.classList.remove('ti-layout-sidebar-left-expand');
          hamburgerIcon.classList.add('ti-layout-sidebar-left-collapse');

          if (window.innerWidth >= 768) {
            this.header.style.left = 'var(--sidenav-width-expanded)';

            if (hamburgerText) {
              hamburgerText.classList.toggle('hidden');
            }
          }
        } else {
          hamburgerIcon.classList.remove('ti-layout-sidebar-left-collapse');
          hamburgerIcon.classList.add('ti-layout-sidebar-left-expand');

          if (window.innerWidth >= 768) {
            this.header.style.left = 'var(--sidenav-width-collapsed)';

            if (hamburgerText) {
              hamburgerText.classList.toggle('hidden');
            }
          }
        }
      });
    });

    this.overlay.addEventListener('click', () => {
      this.sidenav.classList.remove('active');
      this.overlay.classList.remove('active');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.overlay.classList.remove('active');
        this.sidenav.classList.remove('active');
      }
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';

      // Update button content
      const icon = themeToggle.querySelector('i');
      const text = themeToggle.querySelector('.sp-nav-text');
      const tooltip = themeToggle.querySelector('.sp-nav-tooltip');

      icon.className =
        this.currentTheme === 'light' ? 'ti ti-moon' : 'ti ti-sun';
      text.textContent =
        this.currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
      tooltip.textContent =
        this.currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';

      // Call theme change callback
      if (this.options.onThemeChange) {
        this.options.onThemeChange(this.currentTheme);
      }
    });

    // Nested menu toggles - Click behavior for expanded state
    const navToggles = document.querySelectorAll('.sp-nav-toggle');
    navToggles.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Only handle click when sidenav is expanded
        if (!this.sidenav.classList.contains('expanded')) return;

        const icon = toggle.querySelector('i');
        const navItem = toggle.closest('.sp-nav-item');
        const childrenContainer = navItem.querySelector('.sp-nav-children');

        // Close other open menus
        document.querySelectorAll('.sp-nav-children').forEach((container) => {
          if (
            container !== childrenContainer &&
            !container.classList.contains('hidden')
          ) {
            const parentIcon = container
              .closest('.sp-nav-item')
              .querySelector('.sp-nav-toggle i');
            container.classList.add('hidden');
            parentIcon.style.transform = '';
          }
        });

        // Toggle current menu
        icon.style.transform =
          icon.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
        childrenContainer.classList.toggle('hidden');
      });
    });

    // Update hover behavior for collapsed state
    const navItems = document.querySelectorAll('.sp-nav-item');
    navItems.forEach((item) => {
      const popover = item.querySelector('.sp-nav-popover');
      if (!popover) return;

      const showPopover = () => {
        if (this.sidenav.classList.contains('expanded')) return;

        // Position the popover
        const itemRect = item.getBoundingClientRect();
        const sidenavRect = this.sidenav.getBoundingClientRect();

        popover.style.top = `${itemRect.top}px`;
        popover.style.left = `${sidenavRect.right + 8}px`; // 8px margin

        // Ensure popover doesn't go below viewport
        const popoverHeight = popover.offsetHeight;
        const viewportHeight = window.innerHeight;
        if (itemRect.top + popoverHeight > viewportHeight) {
          popover.style.top = `${viewportHeight - popoverHeight - 16}px`; // 16px margin from bottom
        }

        // Show the popover
        requestAnimationFrame(() => {
          popover.classList.remove('invisible', 'opacity-0');
          popover.classList.add('opacity-100');
        });
      };

      const hidePopover = () => {
        if (this.sidenav.classList.contains('expanded')) return;
        popover.classList.remove('opacity-100');
        popover.classList.add('invisible', 'opacity-0');
      };

      let isOverItem = false;
      let isOverPopover = false;
      let hideTimeout;

      const clearHideTimeout = () => {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
      };

      const checkShouldHide = () => {
        clearHideTimeout();
        hideTimeout = setTimeout(() => {
          if (!isOverItem && !isOverPopover) {
            hidePopover();
          }
        }, 100);
      };

      // Mouse events for nav item
      item.addEventListener('mouseenter', () => {
        isOverItem = true;
        clearHideTimeout();
        showPopover();
      });

      item.addEventListener('mouseleave', () => {
        isOverItem = false;
        checkShouldHide();
      });

      // Mouse events for popover
      popover.addEventListener('mouseenter', () => {
        isOverPopover = true;
        clearHideTimeout();
      });

      popover.addEventListener('mouseleave', () => {
        isOverPopover = false;
        checkShouldHide();
      });
    });

    // Update visibility of elements based on sidenav state
    const updateVisibility = () => {
      const isExpanded = this.sidenav.classList.contains('expanded');

      // Handle expanded-only elements
      document.querySelectorAll('.expanded-only').forEach((el) => {
        el.style.display = isExpanded ? '' : 'none';
      });

      // Handle collapsed-only elements
      document.querySelectorAll('.collapsed-only').forEach((el) => {
        el.style.display = isExpanded ? 'none' : 'block';
      });

      // Reset all popovers when expanding
      if (isExpanded) {
        document.querySelectorAll('.sp-nav-popover').forEach((popover) => {
          popover.classList.add('invisible', 'opacity-0');
          popover.classList.remove('opacity-100');
        });
      }
    };

    // Call initially and on sidenav state change
    updateVisibility();
    hamburgers.forEach((hamburger) => {
      hamburger.addEventListener('click', () => {
        // Small delay to ensure transition is complete
        setTimeout(updateVisibility, 50);
      });
    });
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .sp-nav-children {
        transition: all 0.2s ease-in-out;
      }

      .sp-nav-child-link {
        opacity: 0.8;
        transition: all 0.2s ease-in-out;
      }

      .sp-nav-child-link:hover {
        opacity: 1;
      }

      .sp-nav-toggle {
        opacity: 0.6;
        transition: all 0.2s ease-in-out;
      }

      .sp-nav-toggle:hover {
        opacity: 1;
      }

      .sp-nav-toggle i {
        display: inline-block;
        transition: transform 0.2s ease-in-out;
      }

      .sp-nav-item {
        position: relative;
      }

      /* Subtle line connector for child items */
      .sp-nav-children {
        position: relative;
      }

      .sp-nav-children::before {
        content: '';
        position: absolute;
        left: 1.25rem;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: var(--border);
        opacity: 0.5;
      }

      /* Popover styles */
      .sp-nav-popover {
        transition: all 0.15s ease-in-out;
        pointer-events: none;
        transform: translateX(-8px);
        z-index: 60;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      }

      .sp-nav-popover.opacity-100 {
        pointer-events: auto;
        transform: translateX(0);
      }

      /* Ensure popovers are visible and interactive in collapsed state */
      .sp-sidenav:not(.expanded) .sp-nav-popover {
        display: block;
        pointer-events: auto;
      }

      /* Create a safe hover zone between nav item and popover */
      .sp-nav-item:not(.expanded)::after {
        content: '';
        position: absolute;
        top: 0;
        right: -8px; /* Match margin of popover */
        width: 8px;
        height: 100%;
        pointer-events: auto;
      }
    `;
    document.head.appendChild(style);
  }

  createUserButton(userInfo) {
    const userContainer = document.getElementById('sp-user-container');
    if (!userContainer) return;

    const userButton = document.createElement('div');
    userButton.className = 'relative';
    userButton.innerHTML = `
      <button 
        id="sp-user-button"
        class="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-all duration-200"
      >
        ${
          userInfo.photoURL
            ? `<img src="${userInfo.photoURL}" alt="" class="w-8 h-8 rounded-full object-cover"/>`
            : `<div class="w-8 h-8 rounded-full bg-gray-700 text-gray-100 flex items-center justify-center font-medium">
                 ${userInfo.initial}
               </div>`
        }
        <span class="hidden md:block text-sm font-medium pr-2">${
          userInfo.displayName
        }</span>
      </button>

      <!-- Popover -->
      <div 
        id="sp-user-popover" 
        class="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-background shadow-lg opacity-0 invisible transform scale-95 transition-all duration-200"
      >
        <div class="p-2">
          <button 
            id="sp-signout-button"
            class="w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-left text-red-500 hover:text-red-600"
          >
            <i class="ti ti-logout text-red-500"></i>
            Sign out
          </button>
        </div>
      </div>
    `;

    userContainer.appendChild(userButton);
    this.setupUserButtonEvents();
  }

  setupUserButtonEvents() {
    const userButton = document.getElementById('sp-user-button');
    const popover = document.getElementById('sp-user-popover');
    const signOutButton = document.getElementById('sp-signout-button');

    userButton?.addEventListener('click', () => {
      const isVisible = !popover.classList.contains('invisible');
      if (isVisible) {
        this.hidePopover(popover);
      } else {
        this.showPopover(popover);
      }
    });

    // Close popover when clicking outside
    document.addEventListener('click', (e) => {
      if (!userButton?.contains(e.target) && !popover?.contains(e.target)) {
        this.hidePopover(popover);
      }
    });

    // Handle sign out
    signOutButton?.addEventListener('click', () => {
      signOut(auth).then(() => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        window.location.href = 'auth.html';
      });
    });
  }

  showPopover(popover) {
    popover.classList.remove('invisible', 'opacity-0', 'scale-95');
    popover.classList.add('opacity-100', 'scale-100');
  }

  hidePopover(popover) {
    popover.classList.remove('opacity-100', 'scale-100');
    popover.classList.add('invisible', 'opacity-0', 'scale-95');
  }
}

// Export as ES module
export default Sidenav;
