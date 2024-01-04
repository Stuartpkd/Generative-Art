let planets = [];

function setup() {
    createCanvas(1920, 1080);

    // Create planets
    planets.push(new Planet(40, 200, 0.01));
    planets.push(new Planet(30, 150, 0.02));
    planets.push(new Planet(10, 60, 0.01));

    // Create moons
    planets[0].addMoon(new Moon(8, 30, 0.03));  // radius, orbitRadius, orbitSpeed
    planets[1].addMoon(new Moon(5, 20, 0.02));
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    // Draw each planet and its moons
    for (let i = 0; i < planets.length; i++) {
        planets[i].update();
        planets[i].display();
    }
}

class Planet {
    constructor(planetRadius, orbitRadius, orbitSpeed) {
        this.planetRadius = planetRadius;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = random(TWO_PI);
        this.moons = [];
    }

    update() {
        this.angle += this.orbitSpeed;

        // Update the position of each moon
        for (let i = 0; i < this.moons.length; i++) {
            this.moons[i].update();
        }
    }

    display() {
        // Draw orbit
        noFill();
        stroke(100);
        ellipse(0, 0, this.orbitRadius * 2, this.orbitRadius * 2);

        // Calculate planet position
        let x = this.orbitRadius * cos(this.angle);
        let y = this.orbitRadius * sin(this.angle);

        // Draw planet
        fill(255);
        stroke(200);
        strokeWeight(2);
        ellipse(x, y, this.planetRadius * 2, this.planetRadius * 2);

        // Draw moons
        for (let i = 0; i < this.moons.length; i++) {
            this.moons[i].display(x, y);
        }
    }

    addMoon(moon) {
        this.moons.push(moon);
    }
}

class Moon {
    constructor(moonRadius, orbitRadius, orbitSpeed) {
        this.moonRadius = moonRadius;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = random(TWO_PI);
    }

    update() {
        this.angle += this.orbitSpeed;
    }

    display(planetX, planetY) {
        // Calculate moon position relative to the planet
        let x = planetX + this.orbitRadius * cos(this.angle);
        let y = planetY + this.orbitRadius * sin(this.angle);

        // Draw moon
        fill(150);
        stroke(120);
        strokeWeight(1);
        ellipse(x, y, this.moonRadius * 2, this.moonRadius * 2);
    }
}
