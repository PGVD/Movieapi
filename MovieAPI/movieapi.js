const readline = require('readline');

// Movie class represents a movie with its details
class Movie {
  constructor(title, genre, releaseYear, isAvailable = true) {
    this.title = title;
    this.genre = genre;
    this.releaseYear = releaseYear;
    this.isAvailable = isAvailable;
  }
}

// MovieStore class manages the movie inventory and rental transactions
class MovieStore {
  constructor() {
    this.inventory = [];
    this.rentedMovies = [];
  }

  addMovie(movie) {
    this.inventory.push(movie);
  }

  displayInventory() {
    console.log("Movie Inventory:");
    this.inventory.forEach(movie => {
      console.log(`${movie.title} (${movie.releaseYear}) - ${movie.genre} (${movie.isAvailable ? 'Available' : 'Rented'})`);
    });
  }

  rentMovie(title) {
    const movieIndex = this.inventory.findIndex(movie => movie.title === title);

    if (movieIndex !== -1) {
      const movie = this.inventory[movieIndex];

      if (movie.isAvailable) {
        movie.isAvailable = false;
        this.rentedMovies.push(movie);
        console.log(`${movie.title} has been rented successfully.`);
      } else {
        console.log(`${movie.title} is currently not available for rent.`);
      }
    } else {
      console.log(`Movie with title ${title} not found in the inventory.`);
    }
  }

  returnMovie(title) {
    const rentedMovieIndex = this.rentedMovies.findIndex(movie => movie.title === title);

    if (rentedMovieIndex !== -1) {
      const rentedMovie = this.rentedMovies[rentedMovieIndex];
      rentedMovie.isAvailable = true;
      this.rentedMovies.splice(rentedMovieIndex, 1);
      console.log(`${rentedMovie.title} has been returned successfully.`);
    } else {
      console.log(`Movie with title ${title} not found in the rented movies list.`);
    }
  }
}

// Function to take user input and perform actions
function takeUserInput() {
  const movieStore = new MovieStore();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askQuestion(question) {
    return new Promise(resolve => {
      rl.question(question, answer => {
        resolve(answer);
      });
    });
  }

  async function start() {
    while (true) {
      console.log("\nOptions:");
      console.log("1. Add Movie");
      console.log("2. Display Inventory");
      console.log("3. Rent Movie");
      console.log("4. Return Movie");
      console.log("5. Exit");

      const choice = await askQuestion("Enter your choice (1-5): ");

      switch (choice) {
        case "1":
          const title = await askQuestion("Enter movie title: ");
          const genre = await askQuestion("Enter movie genre: ");
          const releaseYear = await askQuestion("Enter release year: ");
          const movie = new Movie(title, genre, releaseYear);
          movieStore.addMovie(movie);
          console.log(`${title} has been added to the inventory.`);
          break;
        case "2":
          movieStore.displayInventory();
          break;
        case "3":
          const rentTitle = await askQuestion("Enter the title of the movie to rent: ");
          movieStore.rentMovie(rentTitle);
          break;
        case "4":
          const returnTitle = await askQuestion("Enter the title of the movie to return: ");
          movieStore.returnMovie(returnTitle);
          break;
        case "5":
          console.log("Exiting the Movie Rental App. Goodbye!");
          rl.close();
          return;
        default:
          console.log("Invalid choice. Please enter a number between 1 and 5.");
      }
    }
  }

  start();
}

// Start the movie rental app
takeUserInput();
