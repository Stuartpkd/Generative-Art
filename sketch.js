let planets = [];

function setup() {
    createCanvas(800, 800);

    // Create planets
    planets.push(new Planet(80, 300, 0.005));
    planets.push(new Planet(60, 200, 0.01));
    planets.push(new Planet(40, 100, 0.02));

    // Create moons
    planets[0].addMoon(new Moon(15, 50, 0.03, 50));  // radius, orbitRadius, orbitSpeed, orbitOffset
    planets[1].addMoon(new Moon(10, 30, 0.02, 30));
    planets[2].addMoon(new Moon(8, 20, 0.01, 20));
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
    constructor(moonRadius, orbitRadius, orbitSpeed, orbitOffset) {
        this.moonRadius = moonRadius;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.orbitOffset = orbitOffset; // Added offset for each moon
        this.angle = random(TWO_PI);
    }

    update() {
        this.angle += this.orbitSpeed;
    }

    display(planetX, planetY) {
        // Calculate moon position relative to the planet
        let x = planetX + this.orbitRadius * cos(this.angle + this.orbitOffset);
        let y = planetY + this.orbitRadius * sin(this.angle + this.orbitOffset);

        // Draw moon's orbit
        noFill();
        stroke(150);
        ellipse(planetX, planetY, this.orbitRadius * 5, this.orbitRadius * 5);

        // Draw moon
        fill(150);
        stroke(120);
        strokeWeight(1);
        ellipse(x, y, this.moonRadius * 2, this.moonRadius * 2);
    }
}
