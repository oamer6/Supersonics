import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { PlayerService } from './player.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'playermanagerapp';
  public players: Player[];
  public editPlayer: Player | undefined;
  public deletePlayer: Player | undefined;

  constructor(private playerService: PlayerService){}

  ngOnInit() {
    this.getPlayers();
  }

  // subscribe so we can be notified whenever some data comes back from the server (players or error )
  public getPlayers(): void {
    this.playerService.getPlayers().subscribe(
      {next: (response: Player[]) => {
        this.players = response;
        console.log(this.players);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }}
    );
  }

  public onAddPlayer(addForm: NgForm): void {
    document.getElementById('add-player-form').click();
    this.playerService.addPlayer(addForm.value).subscribe(
      {next: (response: Player) => {
        console.log(response);
        this.getPlayers();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }}
    );
  }

  public onUpdatePlayer(player: Player): void {
    this.playerService.updatePlayer(player).subscribe(
      {next: (response: Player) => {
        console.log(response);
        this.getPlayers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }}
    );
  }

  public onDeletePlayer(playerId: number): void {
    this.playerService.deletePlayer(playerId).subscribe(
      {next: (response: void) => {
        console.log(response);
        this.getPlayers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }}
    );
  }

  public searchPlayers(key: string): void {
    console.log(key);
    const results: Player[] = [];
    for (const player of this.players) {
      if (player.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || player.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || player.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || player.position.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(player);
      }
    }
    this.players = results;
    if (!key) {
      this.getPlayers();
    }
  }

  public onOpenModal(player: Player, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPlayerModal');
    }
    if (mode === 'edit') {
      this.editPlayer = player;
      button.setAttribute('data-target', '#updatePlayerModal');
    }
    if (mode === 'delete') {
      this.deletePlayer = player;
      button.setAttribute('data-target', '#deletePlayerModal');
    }
    container.appendChild(button);
    button.click();
  }
}
