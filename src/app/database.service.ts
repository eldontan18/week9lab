import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  getMovies(){
    return this.http.get("/movies");
  }
  createMovie(data) {
    return this.http.post("/movies", data, httpOptions);
  }
  deleteMovie(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieBefore(delyear){
    let url= "/deletemovies/"+ delyear;
    return this.http.delete(url, httpOptions);
  }
  addMovieActor(mid,aid,data){
    let url="/movies/actors/"+mid+"/"+aid;
    return this.http.post(url,data,httpOptions);
  }
  getActorAfter(){
    let url="/actorsafter/"+2000;
    return this.http.get(url);
  }
}
