class PortfolioHeader extends HTMLElement
{
    constructor()
    {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #fdffcd;
                    width: 100%;
                    padding: 20px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
                    text-align: center;
                    box-sizing: border-box;
                }

                .header-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .profile-image {
                    border-radius: 50%;
                    width: 120px;
                    height: 120px;
                    object-fit: cover;
                    margin-bottom: 15px;
                }

                .name {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 0;
                }

                .description {
                    font-size: 16px;
                    color: #555;
                    margin-top: 5px;
                }
            </style>

            <div class="header-content"> 
                <img class="profile-image" src="${this.getAttribute('image-src') || 'default-image.jpg'}" alt="Profile Picture">
                <h1 class="name">${this.getAttribute('name') || 'Your Name'}</h1>
                <p class="description">${this.getAttribute('description') || 'A short description about yourself.'}</p>
            </div> 
        `
    }
}

customElements.define('portfolio-header', PortfolioHeader);

class ProjectLinks extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Define the style and structure for the project links
        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 20px;
                }

                ul {
                    list-style-type: none;
                    padding-left: 0;
                }

                li {
                    margin-bottom: 5px;
                }

                a {
                    text-decoration: none;
                    color: #007bff;
                    font-size: 16px;
                    transition: color 0.3s ease;
                }

                a:hover {
                    color: darkblue;
                }
            </style>
            <ul id="link-list">
                <!-- Links will be inserted here -->
            </ul>
        `;
    }

    connectedCallback() {
        const linkList = this.shadowRoot.getElementById('link-list');

        // Retrieve the links passed as JSON in the `data-links` attribute
        const links = JSON.parse(this.getAttribute('data-links'));

        // Create list items for each link
        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.target = "_blank";
            a.textContent = link.name;
            li.appendChild(a);
            linkList.appendChild(li);
        });
    }
}


class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 2px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    background-color: #fdffcd;
                }

                .card-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
            </style>
            <div class="card-header">${this.getAttribute('title') || 'Project Links'}</div>
            <slot></slot>
        `;
    }
}

class ProjectGrid extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }

                @media (max-width: 600px) {
                    .grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            <div class="grid">
                <slot></slot>
            </div>
        `;
    }
}

class ProjectItem extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s;
                }

                :host(:hover) {
                    transform: scale(1.02);
                }

                .project-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 16px;
                }

                .project-image {
                    width: 100%;
                    height: auto;
                    max-height: 200px;
                    object-fit: cover;
                    margin-bottom: 16px;
                }

                .project-name {
                    font-size: 20px;
                    font-weight: bold;
                    margin: 0;
                    margin-bottom: 8px;
                }

                .project-description {
                    font-size: 14px;
                    color: #666;
                    text-align: center;
                    margin: 0;
                    margin-bottom: 16px;
                }

                .project-link {
                    font-size: 16px;
                    color: #007bff;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .project-link:hover {
                    color: darkblue;
                }
            </style>
            <div class="project-container">
                <img class="project-image" src="${this.getAttribute('image-src') || 'default-image.jpg'}" alt="Project Image">
                <h3 class="project-name">${this.getAttribute('name') || 'Project Name'}</h3>
                <p class="project-description">${this.getAttribute('description') || 'Project description goes here.'}</p>
                <a class="project-link" href="${this.getAttribute('link') || '#'}" target="_blank">View Project</a>
            </div>
        `;
    }
}

customElements.define('project-item', ProjectItem);
customElements.define('project-grid', ProjectGrid);
customElements.define('project-links', ProjectLinks);
customElements.define('project-card', ProjectCard);
customElements.define('portfolio-header', PortfolioHeader)