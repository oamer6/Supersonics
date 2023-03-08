import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public players: Player[];
  constructor(private playerService: PlayerService){}

  ngOnInit() {
    this.getPlayers();
  }

  public getPlayers(): void {
    this.playerService.getPlayers().subscribe(
      (response: Player[]) => {
        this.players = response;
        console.log(this.players);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
