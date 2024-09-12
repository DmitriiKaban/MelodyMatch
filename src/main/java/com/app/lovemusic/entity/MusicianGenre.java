package com.app.lovemusic.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "musician_genres")
@Getter
@Setter
public class MusicianGenre {
    @EmbeddedId
    private MusicianGenreId id = new MusicianGenreId();

    @ManyToOne
    @MapsId("musicianId")
    @JoinColumn(name = "musician_id")
    private User musician;

    @ManyToOne
    @MapsId("genreId")
    @JoinColumn(name = "genre_id")
    private MusicGenre genre;
}

