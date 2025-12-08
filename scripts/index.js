// --- DATA ---
const skills = [
    {name: "Vue", icon: "code-2"},
    {name: "Node.js", icon: "server"},
    {name: "Python", icon: "code-2"},
    {name: "TypeScript", icon: "code-2"},
    {name: "CSS", icon: "layout"},
    {name: "SQL", icon: "database"},
    {name: "NoSQL", icon: "database"},
    {name: "Docker", icon: "container"},
    {name: "AWS", icon: "cloud"},
    {name: "Java", icon: "code-2"},
    {name: "Rust", icon: "code-2"},
    {name: "GoLang", icon: "code-2"},
    {name: "Scala", icon: "code-2"},
    {name: "Kotlin", icon: "code-2"},
    {name: "C", icon: "code-2"},
    {name: "Javascript", icon: "code-2"},
    {name: "C#", icon: "code-2"},
    {name: "Cuda", icon: "container"},
    {name: "Git", icon: "cloud"},
    {name: "Svelte", icon: "code-2"}
];

const projects = [
    {
        title: "HPC University project",
        desc: "Project done at the end of the HPC course in university.",
        tags: ["C", "OpenMP", "MPI", "Cuda"],
        link: "https://github.com/NickGhignatti/hpc-project",
        github: "https://github.com/NickGhignatti/hpc-project"
    },
    {
        title: "Stakeshare",
        desc: "A web3 application to manage event shares on ICP blockchain.",
        tags: ["Rust", "ICP", "Web3"],
        link: "https://github.com/NickGhignatti/stakeshare",
        github: "https://github.com/NickGhignatti/stakeshare"
    },
    {
        title: "Akka Agar.IO",
        desc: "Implementation of the notorious game Agar.IO using Akka actors.",
        tags: ["Scala", "Akka"],
        link: "https://github.com/NickGhignatti/akka-agar.io",
        github: "https://github.com/NickGhignatti/akka-agar.io"
    },
    {
        title: "Casimo",
        desc: "A casinò simulator.",
        tags: ["Scala", "Scala.JS", "tdd", "fp"],
        link: "https://github.com/NickGhignatti/casimo",
        github: "https://github.com/NickGhignatti/casimo"
    },
    {
        title: "Akka distributed boids",
        desc: "A boids simulation implementation using Akka actors.",
        tags: ["Scala", "Akka"],
        link: "https://github.com/NickGhignatti/akka-distributed-boids",
        github: "https://github.com/NickGhignatti/akka-distributed-boids"
    },
    {
        title: "Pixformer",
        desc: "Super Mario inspired game implementation using Java.",
        tags: ["Java", "Gradle", "oop"],
        link: "https://github.com/iamgio/OOP22-pixformer",
        github: "https://github.com/iamgio/OOP22-pixformer"
    },
    {
        title: "Phaint",
        desc: "Collaborative drawing app.",
        tags: ["Go", "Svelte", "Firebase"],
        link: "https://github.com/drptms/phaint",
        github: "https://github.com/drptms/phaint"
    },
    {
        title: "The Rustbook",
        desc: "Contribution to the Rustbook.",
        tags: ["Rust"],
        link: "https://github.com/QMHTMY/RustBook",
        github: "https://github.com/QMHTMY/RustBook"
    },
    {
        title: "Glyphit",
        desc: "Git commit with emoji tool.",
        tags: ["Rust", "tdd", "fp"],
        link: "https://github.com/NickGhignatti/glyphit",
        github: "https://github.com/NickGhignatti/glyphit"
    },
    {
        title: "Rusterer 3d",
        desc: "A basic 3d renderer in Rust.",
        tags: ["Rust", "fp", "hpc"],
        link: "https://github.com/NickGhignatti/Rusterer3d",
        github: "https://github.com/NickGhignatti/Rusterer3d"
    }
];

const blogPosts = [];

const navItems = [
    {
        id: 'home',
        label: 'Home',
        icon: 'user'
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: 'terminal'
    },
    {
        id: 'blog',
        label: 'Blog',
        icon: 'book-open'
    },
    {
        id: 'resume',
        label: 'CV',
        icon: 'file-text'
    }
];

// --- THEME TOGGLE LOGIC ---
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

function initTheme() {
    // Check localStorage or System Preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Run immediately
initTheme();

// --- RENDER FUNCTIONS ---
function renderNav() {
    const desktopContainer = document.getElementById('desktop-menu');
    const mobileContainer = document.getElementById('mobile-menu');

    const createNavItem = (item, isMobile = false) => `<a href="#${item.id}" class="nav-link flex items-center gap-2 ${
        isMobile ? '' : 'px-4 py-2'} rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300"
        data-target="${item.id}"><i data-lucide="${item.icon}" class="w-[18px] h-[18px]"></i><span class="${
        isMobile ? '' : 'hidden md:inline'} font-medium">${item.label}</span></a>`;

    desktopContainer.innerHTML = navItems.map(item => createNavItem(item)).join('');
    mobileContainer.innerHTML = navItems.map(item => createNavItem(item, true)).join('');
}

function renderSkills() {
    const track = document.getElementById('skills-track');
    // Duplicate array 3 times for seamless infinite scroll
    const allSkills = [...skills, ...skills, ...skills];

    track.innerHTML = allSkills.map(skill => `
        <div class="flex flex-col items-center justify-center gap-4 mx-8 group min-w-[120px]">
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-teal-500/50 group-hover:bg-teal-50 dark:group-hover:bg-teal-500/10 transition-all duration-300 transform group-hover:-translate-y-2 shadow-md dark:shadow-lg">
        <i data-lucide="${skill.icon}"
        class="w-10 h-10 text-slate-500 dark:text-slate-400 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors"></i>
        </div>
        <span class="font-mono text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-300 font-medium tracking-wide">${skill.name}</span>
        </div>`).join('');
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = projects.map(project => `
        <div class="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 p-6 rounded-xl hover:border-teal-500/30 transition-all duration-300 hover:shadow-xl dark:hover:shadow-lg hover:-translate-y-1 flex flex-col h-full group shadow-sm dark:shadow-none">
        <div class="flex justify-between items-start mb-6">
        <div class="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 group-hover:border-teal-500/30 transition-colors">
        <i data-lucide="terminal" class="w-7 h-7 text-purple-500 dark:text-purple-400"></i>
        </div>
        <div class="flex gap-4">
        <a href="${project.github}" class="text-slate-400 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors transform hover:scale-110">
        <i data-lucide="github" class="w-5 h-5"></i>
        </a>
        <a href="${project.link}" class="text-slate-400 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors transform hover:scale-110">
        <i data-lucide="external-link" class="w-5 h-5"></i>
        </a>
        </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors">${project.title}</h3>
        <p class="text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed">${project.desc}</p>
        <div class="flex flex-wrap gap-2 mt-auto">${project.tags.map(tag => `
            <span class="text-sm font-mono text-teal-600 dark:text-teal-300 bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 px-3 py-1 rounded-full">
            ${tag}</span>`).join('')}</div></div>   `).join('');
}

function renderBlog() {
    const list = document.getElementById('blog-list');
    list.innerHTML = blogPosts.map(post => `<div onclick="openPost(${post.id})"
        class="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 p-6 rounded-xl hover:border-teal-500/30 transition-all duration-300 hover:shadow-xl dark:hover:shadow-lg hover:-translate-y-1 group cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-sm dark:shadow-none">
        <div class="md:flex md:justify-between md:items-center">
        <div class="flex-grow">
        <div class="flex items-center gap-4 mb-2">
        <span class="text-teal-600 dark:text-teal-400 text-sm font-mono">${post.date}</span>
        <span class="text-slate-400 dark:text-slate-600 text-xs">•</span>
        <span class="text-slate-500 text-xs uppercase tracking-wide">${post.readTime}</span>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors mb-3">
        ${post.title}</h3><p class="text-slate-600 dark:text-slate-400 max-w-3xl">${post.excerpt}</p>
        </div>
        <div class="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
        <div class="flex items-center text-teal-600 dark:text-teal-400 font-medium gap-2 group-hover:translate-x-2 transition-transform">
        Read Article <i data-lucide="chevron-right" class="w-4 h-4"></i>
        </div>
        </div>
        </div>
        </div>`).join('');
}

// --- INTERACTION FUNCTIONS ---

function openPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('blog-list').classList.add('hidden');
    const detail = document.getElementById('blog-detail');

    document.getElementById('post-meta').innerText = `${post.date} • ${post.readTime}`;
    document.getElementById('post-title').innerText = post.title;
    document.getElementById('post-content').innerText = post.content;

    detail.classList.remove('hidden');

    // Scroll to blog section top
    document.getElementById('blog').scrollIntoView({behavior: 'smooth'});
}

function closePost() {
    document.getElementById('blog-detail').classList.add('hidden');
    document.getElementById('blog-list').classList.remove('hidden');
}

// --- SCROLL SPY & INIT ---

function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = navItems.map(item => document.getElementById(item.id));

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Remove Active Classes
            link.classList.remove('bg-teal-500/20', 'bg-teal-50', 'text-teal-300', 'text-teal-600', 'border', 'border-teal-500/50', 'border-teal-200', 'shadow-[0_0_15px_rgba(20,184,166,0.3)]');
            // Add Default Classes
            link.classList.add('text-slate-500', 'dark:text-slate-400');

            if (link.getAttribute('data-target') === current) {
                link.classList.remove('text-slate-500', 'dark:text-slate-400');
                // Add Active Classes
                link.classList.add('bg-teal-50', 'dark:bg-teal-500/20', 'text-teal-600', 'dark:text-teal-300', 'border', 'border-teal-200', 'dark:border-teal-500/50', 'dark:shadow-[0_0_15px_rgba(20,184,166,0.3)]');
            }
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderSkills();
    renderProjects();
    renderBlog();
    lucide.createIcons(); // Initialize Icons
    initScrollSpy();
});