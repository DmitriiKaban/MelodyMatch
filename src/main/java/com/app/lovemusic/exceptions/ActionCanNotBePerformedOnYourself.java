package com.app.lovemusic.exceptions;

public class ActionCanNotBePerformedOnYourself extends RuntimeException {
    public ActionCanNotBePerformedOnYourself(String message) {
        super(message);
    }
}
