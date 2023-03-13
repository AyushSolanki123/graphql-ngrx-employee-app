import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  TOKEN_PAIR: string = 'tokenPair';
  constructor() {}

  setTokenPair(tokenPair: string) {
    localStorage.setItem(this.TOKEN_PAIR, tokenPair);
  }

  getTokenPair(): { authToken: string; refreshToken: string } {
    return JSON.parse(<string>localStorage.getItem(this.TOKEN_PAIR));
  }

  removeTokenPair(): void {
    localStorage.removeItem(this.TOKEN_PAIR);
  }
}
