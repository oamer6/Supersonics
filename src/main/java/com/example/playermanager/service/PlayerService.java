package com.example.playermanager.service;

import com.example.playermanager.exception.UserNotFoundException;
import com.example.playermanager.model.Player;
import com.example.playermanager.repo.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PlayerService {
    private final PlayerRepo playerRepo;

    @Autowired
    public PlayerService(PlayerRepo playerRepo) {
        this.playerRepo = playerRepo;
    }

    public Player addPlayer(Player player) {
        player.setPlayerCode(UUID.randomUUID().toString());
        return playerRepo.save(player);
    }

    public List<Player> findAllPlayers() {
        return playerRepo.findAll();
    }

    public Player savePlayer(Player player) {
        return playerRepo.save(player);
    }

    public Player findPlayerById(Long id) {
        return playerRepo.findPlayerById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deletePlayer(Long id) {
        playerRepo.deletePlayerById(id);
    }

    public Player updatePlayer(Player player) {
        return playerRepo.save(player);
    }
}
