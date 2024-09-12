package com.app.lovemusic.entity;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MusicianGenreId implements Serializable {
    private Integer musicianId;
    private Integer genreId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MusicianGenreId that = (MusicianGenreId) o;
        return Objects.equals(musicianId, that.musicianId) && Objects.equals(genreId, that.genreId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(musicianId, genreId);
    }
}
