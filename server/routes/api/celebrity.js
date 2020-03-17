class Celebrity {
  constructor(name, age, followers) {
    this.name = name;
    this.age = age;
    this.followers = followers;
  }

  greeting() {
    console.log(`My name is ${this.name}, I am ${this.age}, and I have`,
  `${this.followers} followers.`);
  }
}

module.exports = Celebrity;
