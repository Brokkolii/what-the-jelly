import { config } from '../config'

export class JellyfinApi {
  private baseUrl = config.jellyfin.baseUrl

  async authenticateUserByName(username: string, password: string) {
    console.log(username, password)
    const response = await fetch(`${this.baseUrl}/Users/AuthenticateByName`, {
      method: 'POST',
      // TODO: proper deviceId and Version also add Token="xxx" for auth to Auth header
      headers: { 'Content-Type': 'application/json', 'Authorization': 'MediaBrowser Client="WhatTheJelly", Device="Electron", DeviceId="unique-id-123", Version="0.1.0"' },
      body: JSON.stringify({ Username: username, Pw: password })
    })
    console.log(response)
    return response.json()
  }
}

export const jellyfinApi = new JellyfinApi()