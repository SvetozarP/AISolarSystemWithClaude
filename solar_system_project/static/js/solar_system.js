/**
 * Solar System 3D Visualization
 * Stage 3: Complete solar system with planets and orbits
 */

class SolarSystem {
    constructor() {
        // Three.js core objects
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        // Scene objects
        this.sun = null;
        this.planets = [];
        this.asteroidBelt = null;
        this.starField = null;
        this.orbitLines = [];

        // Animation
        this.animationId = null;
        this.time = 0;

        // Planet data with realistic orbital periods (scaled for visibility)
        this.planetData = [
            {
                name: 'Mercury',
                radius: 1.2,
                distance: 25,
                orbitSpeed: 0.02,
                rotationSpeed: 0.01,
                color: 0x8c7853,
                data: {
                    diameter: '4,879 km',
                    mass: '3.3011 × 10²³ kg',
                    distanceFromSun: '57.9 million km',
                    orbitalPeriod: '88 Earth days',
                    dayLength: '58.6 Earth days',
                    composition: 'Iron core, silicate mantle',
                    temperature: '167°C (day), -173°C (night)'
                }
            },
            {
                name: 'Venus',
                radius: 1.8,
                distance: 35,
                orbitSpeed: 0.015,
                rotationSpeed: -0.005,
                color: 0xffc649,
                data: {
                    diameter: '12,104 km',
                    mass: '4.8675 × 10²⁴ kg',
                    distanceFromSun: '108.2 million km',
                    orbitalPeriod: '225 Earth days',
                    dayLength: '243 Earth days (retrograde)',
                    composition: 'Iron core, rocky mantle, thick atmosphere',
                    temperature: '462°C (hottest planet)'
                }
            },
            {
                name: 'Earth',
                radius: 2.0,
                distance: 50,
                orbitSpeed: 0.01,
                rotationSpeed: 0.02,
                color: 0x6b93d6,
                data: {
                    diameter: '12,756 km',
                    mass: '5.9724 × 10²⁴ kg',
                    distanceFromSun: '149.6 million km',
                    orbitalPeriod: '365.25 days',
                    dayLength: '24 hours',
                    composition: 'Iron core, silicate mantle, 71% water surface',
                    temperature: '15°C average'
                }
            },
            {
                name: 'Mars',
                radius: 1.6,
                distance: 70,
                orbitSpeed: 0.008,
                rotationSpeed: 0.018,
                color: 0xcd5c5c,
                data: {
                    diameter: '6,792 km',
                    mass: '6.4171 × 10²³ kg',
                    distanceFromSun: '227.9 million km',
                    orbitalPeriod: '687 Earth days',
                    dayLength: '24.6 hours',
                    composition: 'Iron core, basaltic mantle, iron oxide surface',
                    temperature: '-65°C average'
                }
            },
            {
                name: 'Jupiter',
                radius: 8.0,
                distance: 120,
                orbitSpeed: 0.005,
                rotationSpeed: 0.04,
                color: 0xd8ca9d,
                data: {
                    diameter: '142,984 km',
                    mass: '1.8982 × 10²⁷ kg',
                    distanceFromSun: '778.5 million km',
                    orbitalPeriod: '11.9 Earth years',
                    dayLength: '9.9 hours',
                    composition: '89% hydrogen, 10% helium, 1% other',
                    temperature: '-110°C average'
                }
            },
            {
                name: 'Saturn',
                radius: 7.0,
                distance: 180,
                orbitSpeed: 0.003,
                rotationSpeed: 0.038,
                color: 0xfad5a5,
                data: {
                    diameter: '120,536 km',
                    mass: '5.6834 × 10²⁶ kg',
                    distanceFromSun: '1.43 billion km',
                    orbitalPeriod: '29.4 Earth years',
                    dayLength: '10.7 hours',
                    composition: '96% hydrogen, 3% helium, 1% other',
                    temperature: '-140°C average'
                }
            },
            {
                name: 'Uranus',
                radius: 4.0,
                distance: 240,
                orbitSpeed: 0.002,
                rotationSpeed: 0.03,
                color: 0x4fd0e7,
                data: {
                    diameter: '51,118 km',
                    mass: '8.6810 × 10²⁵ kg',
                    distanceFromSun: '2.87 billion km',
                    orbitalPeriod: '84 Earth years',
                    dayLength: '17.2 hours',
                    composition: 'Water, methane, ammonia ices',
                    temperature: '-195°C average'
                }
            },
            {
                name: 'Neptune',
                radius: 3.8,
                distance: 300,
                orbitSpeed: 0.001,
                rotationSpeed: 0.032,
                color: 0x4b70dd,
                data: {
                    diameter: '49,528 km',
                    mass: '1.0243 × 10²⁶ kg',
                    distanceFromSun: '4.50 billion km',
                    orbitalPeriod: '165 Earth years',
                    dayLength: '16.1 hours',
                    composition: 'Water, methane, ammonia ices',
                    temperature: '-200°C average'
                }
            },
            {
                name: 'Pluto',
                radius: 0.8,
                distance: 380,
                orbitSpeed: 0.0008,
                rotationSpeed: 0.008,
                color: 0x967117,
                data: {
                    diameter: '2,376 km',
                    mass: '1.303 × 10²² kg',
                    distanceFromSun: '5.91 billion km',
                    orbitalPeriod: '248 Earth years',
                    dayLength: '6.4 Earth days',
                    composition: 'Rock and ice',
                    temperature: '-375°C average'
                }
            }
        ];

        // Initialize the application
        this.init();
    }

    async init() {
        console.log('Initializing Solar System...');

        try {
            // Setup Three.js scene
            this.setupScene();
            this.setupCamera();
            this.setupRenderer();
            this.setupLighting();

            // Create scene objects
            await this.createStarField();
            this.createSun();
            this.createOrbitLines();
            this.createPlanets();
            this.createAsteroidBelt();

            // Setup controls and start animation
            this.setupControls();
            this.setupEventListeners();
            this.startAnimation();

            // Hide loading screen
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
                console.log('Solar System loaded successfully!');
            }, 800);

        } catch (error) {
            console.error('Error initializing Solar System:', error);
        }
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011); // Deep space color
    }

    setupCamera() {
        const container = document.getElementById('three-canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
        this.camera.position.set(0, 100, 200);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        const container = document.getElementById('three-canvas-container');

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.appendChild(this.renderer.domElement);
    }

    setupLighting() {
        // Ambient light for general scene illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);

        // Point light from the sun
        const sunLight = new THREE.PointLight(0xffffff, 3, 2000);
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 0.1;
        sunLight.shadow.camera.far = 1000;
        this.scene.add(sunLight);
    }

    async createStarField() {
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 10000;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        // Generate random star positions and colors
        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;

            // Random positions in a large sphere
            const radius = Math.random() * 4000 + 1000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i3 + 2] = radius * Math.cos(phi);

            // Random star colors (white, blue, yellow, red)
            const colorChoice = Math.random();
            if (colorChoice < 0.7) {
                // White stars
                starColors[i3] = 1;
                starColors[i3 + 1] = 1;
                starColors[i3 + 2] = 1;
            } else if (colorChoice < 0.85) {
                // Blue stars
                starColors[i3] = 0.7;
                starColors[i3 + 1] = 0.8;
                starColors[i3 + 2] = 1;
            } else if (colorChoice < 0.95) {
                // Yellow stars
                starColors[i3] = 1;
                starColors[i3 + 1] = 1;
                starColors[i3 + 2] = 0.7;
            } else {
                // Red stars
                starColors[i3] = 1;
                starColors[i3 + 1] = 0.7;
                starColors[i3 + 2] = 0.7;
            }
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.starField = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.starField);
    }

    createSun() {
        // Sun geometry
        const sunGeometry = new THREE.SphereGeometry(10, 32, 32);

        // Sun material with emissive properties
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            emissive: 0xff6600,
            emissiveIntensity: 0.6
        });

        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.position.set(0, 0, 0);
        this.sun.userData = {
            name: 'Sun',
            type: 'Star',
            diameter: '1,392,700 km',
            mass: '1.989 × 10³⁰ kg',
            temperature: '5,778 K (surface)',
            composition: '73% Hydrogen, 25% Helium, 2% Other',
            age: '4.6 billion years',
            luminosity: '3.828 × 10²⁶ watts'
        };

        this.scene.add(this.sun);

        // Add sun corona effect
        this.createSunCorona();
    }

    createSunCorona() {
        // Outer glow effect for the sun
        const coronaGeometry = new THREE.SphereGeometry(12, 32, 32);
        const coronaMaterial = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            transparent: true,
            opacity: 0.3,
            side: THREE.BackSide
        });

        const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
        this.sun.add(corona);

        // Add particle effect around sun
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const particlePositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const radius = 15 + Math.random() * 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            particlePositions[i3 + 2] = radius * Math.cos(phi);
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffaa00,
            size: 0.5,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const sunParticles = new THREE.Points(particleGeometry, particleMaterial);
        this.sun.add(sunParticles);
    }

    createOrbitLines() {
        this.planetData.forEach(planetInfo => {
            const orbitGeometry = new THREE.RingGeometry(planetInfo.distance - 0.1, planetInfo.distance + 0.1, 64);
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: 0x444444,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });

            const orbitLine = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbitLine.rotation.x = Math.PI / 2;
            this.orbitLines.push(orbitLine);
            this.scene.add(orbitLine);
        });
    }

    createPlanets() {
        this.planetData.forEach((planetInfo, index) => {
            const geometry = new THREE.SphereGeometry(planetInfo.radius, 32, 32);

            let material;
            if (planetInfo.name === 'Earth') {
                // Special material for Earth with continents
                material = new THREE.MeshPhongMaterial({
                    color: planetInfo.color,
                    shininess: 30,
                    specular: 0x111111
                });
            } else if (planetInfo.name === 'Saturn') {
                // Saturn with rings
                material = new THREE.MeshPhongMaterial({
                    color: planetInfo.color,
                    shininess: 10
                });
            } else {
                material = new THREE.MeshPhongMaterial({
                    color: planetInfo.color,
                    shininess: planetInfo.name === 'Venus' ? 100 : 30
                });
            }

            const planet = new THREE.Mesh(geometry, material);
            planet.castShadow = true;
            planet.receiveShadow = true;

            // Set initial position
            planet.position.x = planetInfo.distance;
            planet.position.y = 0;
            planet.position.z = 0;

            // Store planet data
            planet.userData = {
                name: planetInfo.name,
                type: 'Planet',
                ...planetInfo.data,
                orbitDistance: planetInfo.distance,
                orbitSpeed: planetInfo.orbitSpeed,
                rotationSpeed: planetInfo.rotationSpeed,
                angle: Math.random() * Math.PI * 2 // Random starting position
            };

            this.planets.push(planet);
            this.scene.add(planet);

            // Add special features for certain planets
            if (planetInfo.name === 'Saturn') {
                this.createSaturnRings(planet);
            } else if (planetInfo.name === 'Earth') {
                this.createEarthMoon(planet);
            }
        });
    }

    createSaturnRings(saturn) {
        const ringGeometry = new THREE.RingGeometry(saturn.geometry.parameters.radius * 1.5, saturn.geometry.parameters.radius * 2.5, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });

        const rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.x = Math.PI / 2;
        saturn.add(rings);
    }

    createEarthMoon(earth) {
        const moonGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const moonMaterial = new THREE.MeshPhongMaterial({
            color: 0x888888
        });

        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(4, 0, 0);
        moon.userData = {
            name: 'Moon',
            type: 'Natural Satellite',
            diameter: '3,474 km',
            distanceFromEarth: '384,400 km',
            orbitalPeriod: '27.3 Earth days',
            orbitSpeed: 0.1
        };

        earth.add(moon);
    }

    createAsteroidBelt() {
        const asteroidCount = 2000;
        const asteroidGeometry = new THREE.BufferGeometry();
        const asteroidPositions = new Float32Array(asteroidCount * 3);

        for (let i = 0; i < asteroidCount; i++) {
            const i3 = i * 3;

            // Random position in asteroid belt (between Mars and Jupiter)
            const distance = 85 + Math.random() * 25; // Between 85-110
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 3;

            asteroidPositions[i3] = Math.cos(angle) * distance;
            asteroidPositions[i3 + 1] = height;
            asteroidPositions[i3 + 2] = Math.sin(angle) * distance;
        }

        asteroidGeometry.setAttribute('position', new THREE.BufferAttribute(asteroidPositions, 3));

        const asteroidMaterial = new THREE.PointsMaterial({
            color: 0x8c7853,
            size: 0.5,
            transparent: true,
            opacity: 0.8
        });

        this.asteroidBelt = new THREE.Points(asteroidGeometry, asteroidMaterial);
        this.scene.add(this.asteroidBelt);
    }

    setupControls() {
        // Manual orbit controls implementation
        this.controls = {
            mouseDown: false,
            mouseX: 0,
            mouseY: 0,
            rotationSpeed: 0.005,
            zoomSpeed: 0.1,
            minDistance: 20,
            maxDistance: 800
        };

        const canvas = this.renderer.domElement;

        // Mouse down
        canvas.addEventListener('mousedown', (event) => {
            this.controls.mouseDown = true;
            this.controls.mouseX = event.clientX;
            this.controls.mouseY = event.clientY;
        });

        // Mouse up
        canvas.addEventListener('mouseup', () => {
            this.controls.mouseDown = false;
        });

        // Mouse move
        canvas.addEventListener('mousemove', (event) => {
            if (!this.controls.mouseDown) return;

            const deltaX = event.clientX - this.controls.mouseX;
            const deltaY = event.clientY - this.controls.mouseY;

            // Rotate camera around the center
            const spherical = new THREE.Spherical();
            spherical.setFromVector3(this.camera.position);

            spherical.theta -= deltaX * this.controls.rotationSpeed;
            spherical.phi += deltaY * this.controls.rotationSpeed;

            // Limit phi to prevent flipping
            spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

            this.camera.position.setFromSpherical(spherical);
            this.camera.lookAt(0, 0, 0);

            this.controls.mouseX = event.clientX;
            this.controls.mouseY = event.clientY;
        });

        // Mouse wheel for zoom
        canvas.addEventListener('wheel', (event) => {
            event.preventDefault();

            const distance = this.camera.position.length();
            const newDistance = distance + event.deltaY * this.controls.zoomSpeed;

            const clampedDistance = Math.max(
                this.controls.minDistance,
                Math.min(this.controls.maxDistance, newDistance)
            );

            this.camera.position.normalize().multiplyScalar(clampedDistance);
        });
    }

    setupEventListeners() {
        // Reset view button
        const resetBtn = document.getElementById('reset-view');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetCamera();
            });
        }

        // Close info panel button
        const closeBtn = document.getElementById('close-info');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                const infoPanel = document.getElementById('info-panel');
                if (infoPanel) {
                    infoPanel.classList.add('hidden');
                }
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        // Handle canvas clicks for object selection
        this.renderer.domElement.addEventListener('click', (event) => {
            this.onCanvasClick(event);
        });
    }

    resetCamera() {
        this.camera.position.set(0, 100, 200);
        this.camera.lookAt(0, 0, 0);
    }

    onWindowResize() {
        const container = document.getElementById('three-canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    onCanvasClick(event) {
        // Raycasting for object selection
        const rect = this.renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        const clickableObjects = [this.sun, ...this.planets];
        const intersects = raycaster.intersectObjects(clickableObjects);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            this.showObjectInfo(selectedObject);
        }
    }

    showObjectInfo(object) {
        const infoPanel = document.getElementById('info-panel');
        const planetInfo = document.getElementById('planet-info');

        if (object.userData && planetInfo) {
            const data = object.userData;
            let infoHTML = `
                <h3>${data.name}</h3>
                <div class="planet-details">
                    <p><strong>Type:</strong> ${data.type}</p>
                    <p><strong>Diameter:</strong> ${data.diameter}</p>
                    <p><strong>Mass:</strong> ${data.mass}</p>
            `;

            if (data.distanceFromSun) {
                infoHTML += `<p><strong>Distance from Sun:</strong> ${data.distanceFromSun}</p>`;
            }
            if (data.orbitalPeriod) {
                infoHTML += `<p><strong>Orbital Period:</strong> ${data.orbitalPeriod}</p>`;
            }
            if (data.dayLength) {
                infoHTML += `<p><strong>Day Length:</strong> ${data.dayLength}</p>`;
            }
            if (data.temperature) {
                infoHTML += `<p><strong>Temperature:</strong> ${data.temperature}</p>`;
            }
            if (data.composition) {
                infoHTML += `<p><strong>Composition:</strong> ${data.composition}</p>`;
            }
            if (data.age) {
                infoHTML += `<p><strong>Age:</strong> ${data.age}</p>`;
            }
            if (data.luminosity) {
                infoHTML += `<p><strong>Luminosity:</strong> ${data.luminosity}</p>`;
            }

            infoHTML += `</div>`;

            planetInfo.innerHTML = infoHTML;
            infoPanel.classList.remove('hidden');
        }
    }

    startAnimation() {
        this.animate();
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.time += 0.01;

        // Rotate the sun
        if (this.sun) {
            this.sun.rotation.y += 0.005;
        }

        // Animate planets
        this.planets.forEach(planet => {
            const userData = planet.userData;

            // Update orbital position
            userData.angle += userData.orbitSpeed;
            planet.position.x = Math.cos(userData.angle) * userData.orbitDistance;
            planet.position.z = Math.sin(userData.angle) * userData.orbitDistance;

            // Rotate planet
            planet.rotation.y += userData.rotationSpeed;

            // Special animation for Earth's moon
            if (userData.name === 'Earth' && planet.children.length > 0) {
                const moon = planet.children.find(child => child.userData.name === 'Moon');
                if (moon) {
                    moon.rotation.y += moon.userData.orbitSpeed;
                    const moonAngle = this.time * moon.userData.orbitSpeed;
                    moon.position.x = Math.cos(moonAngle) * 4;
                    moon.position.z = Math.sin(moonAngle) * 4;
                }
            }
        });

        // Subtle starfield rotation
        if (this.starField) {
            this.starField.rotation.y += 0.0001;
        }

        // Rotate asteroid belt
        if (this.asteroidBelt) {
            this.asteroidBelt.rotation.y += 0.0005;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    // Cleanup method
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting Solar System app...');
    window.solarSystem = new SolarSystem();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.solarSystem) {
        window.solarSystem.destroy();
    }
});