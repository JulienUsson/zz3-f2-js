---
layout: exercise
title: Traduire du vieux code
duration: 12
difficulty: 3
goal: Relire tout ce qu'on vient de voir, dans les deux syntaxes.
---

Réécrire ce code ES5 en ES6+ : `class`, `extends`, `super`, `static`.

```javascript {monaco-run} {height:'320px', autorun:false}
function Vehicle(brand, speed) {
  this.brand = brand
  this.speed = speed
}
Vehicle.prototype.accelerate = function (value) { this.speed += value }
Vehicle.prototype.describe = function () {
  return this.brand + " is going at " + this.speed + " km/h"
}
Vehicle.isVehicle = function (obj) { return obj instanceof Vehicle }

function Car(brand, speed, doors) {
  Vehicle.call(this, brand, speed)
  this.doors = doors
}
Car.prototype = Object.create(Vehicle.prototype)
Car.prototype.constructor = Car
Car.prototype.describe = function () {
  return this.brand + " car with " + this.doors + " doors going at " + this.speed + " km/h"
}
```

Vérifiez que `Vehicle.isVehicle(new Car("Renault", 90, 5))` vaut toujours `true`.
