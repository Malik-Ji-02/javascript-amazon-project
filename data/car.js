class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }
    
    displayInfo(){
        console.log(`Brand: ${this.#brand}, Model: ${this.#model}, Speed: ${this.speed}, Trunk: ${(this.isTrunkOpen)?'Opened':'Closed'}`);
    }

    go(){
        if(!this.isTrunkOpen){
            if(this.speed < 200){
                this.speed += 5;
            } else{
                this.speed = 200;
            }
        }
    }

    brake(){
        if(this.speed > 0){
            this.speed -= 5;
        } else{
            this.speed = 0;
        }
    }

    openTrunk(){
        if(!this.speed){
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        if(this.speed < 300){
            this.speed += this.acceleration;
        }
    }

    brake(){
        if(speed > 0){
            this.speed -= 5;
        }
    }

    openTrunk(){}
    closeTrunk(){}
}

const car1 = new Car({brand: 'Toyota', model:'Corolla'});
const car2 = new Car({brand:'Tesla', model: 'Model 3'});
const car3 = new RaceCar({brand:'McLaren', model: 'F1', acceleration: 20});
car1.openTrunk();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.closeTrunk();
car1.go();
car1.openTrunk();
car2.openTrunk();

car1.model = 'McLaren';
car1.speed = 200;

car3.go();
car3.go();

car1.displayInfo();
car2.displayInfo();
car3.displayInfo();