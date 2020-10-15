import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  actorsDB: any[]=[];
  section = 1;
  title: string = "";
  year: number = 0;
  movieId: string = "";
  actorId: string ="";
  delyear=0;
  bYear=0;
  fullName="";
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Delete Actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  onDeleteMovieBefore(delyear){
    this.dbService.deleteMovieBefore(delyear).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Add Movie to Actor
  onSelectActor(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onSelectMovie(item){
    this.title = item.name;
    this.year = item.year;
    this.movieId = item._id;
  }
  onAddMovieActor(){
    let obj = {name: this.fullName , bYear:this.bYear};
    this.dbService.addMovieActor(this.movieId,this.actorId,obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
    this.delyear=0;
    this.actorId="";
  }

}

