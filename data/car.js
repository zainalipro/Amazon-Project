class Car {
    // properties
    #brand;
    #model;
    speed = 0;
    #isTrunkOpen = false;

    // constructor
    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    // methods
    // display method
    displayInfo() {
        const trunkStatus = this.#isTrunkOpen ? 'open' : 'close';
        console.log(`${this.#brand} ${this.#model}, Speed:${this.speed} km/h , Trunk is: ${trunkStatus}`);
    }

    // speed method
    go() {
        if (!this.#isTrunkOpen) {
            const speedChecker = this.speed;
            if (speedChecker < 200) {
                if (speedChecker + 5 > 200) {
                    this.speed = 200;
                } else {
                    this.speed += 5; // increment speed by 5
                }
            }
        } else {
            console.log("Trunk is open, cannot go");
            return;
        }
    }

    brake() {
        const speedChecker = this.speed;
        if (speedChecker > 0) {
            if (speedChecker < 0) {
                this.speed = 0;
            } else {
                this.speed -= 5; // decrement speed by 5
            }
        }
    }

    // method for Trunk
    openTrunk() {
        if (this.speed === 0) {
            this.#isTrunkOpen = true;
        } else {
            console.log("Cannot open trunk while moving");
        }
    }

    closeTrunk() {
        this.#isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go() {
        const getAcceleration = this.acceleration;
        if (getAcceleration > 0) {
            if (getAcceleration > 0
                && this.speed + this.acceleration <= 300) {
                this.speed += this.acceleration;
            } else {
                this.speed = 300;
            }
        } else {
            console.log('Sorry, cannot go');

        }
    }


    // Override trunk methods to prevent access
    openTrunk() {
        console.log('Sorry , trunk is not accessible');
    }

    closeTrunk() {
        console.log('Race car did not have a trunk');
    }
}

const car1 = new Car({ brand: 'Toyota', model: 'Corolla' });
const f1 = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 20 });

f1.go();
f1.go();
f1.go();
f1.go();
f1.go();
f1.go();
f1.go();
f1.go();
f1.go();


car1.openTrunk();
car1.closeTrunk();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();



car1.displayInfo();
f1.displayInfo();