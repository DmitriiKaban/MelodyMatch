package com.app.lovemusic.services;

import com.app.lovemusic.entity.SessionData;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;


@Component
public class SessionCache {
    private Map<String, SessionData> sessionDataMap;

    public SessionCache() {
        this.sessionDataMap= new HashMap<>();
    }

    public Map<String, SessionData> getSessionDataMap() {
        return sessionDataMap;
    }

    public void setSessionDataMap(Map<String, SessionData> sessionDataMap) {
        this.sessionDataMap = sessionDataMap;
    }
}
