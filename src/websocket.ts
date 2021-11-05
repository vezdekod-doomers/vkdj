class WSBase {
  ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('wss://wss.alesharik.com/');
    setInterval(() => this.ws.send('!ping'), 1000);
  }

  join(id: string) {
    this.ws.send('join:dj_' + id);
  }

  broadcast(message: string) {
    this.ws.send('bcast:' + message);
  }
}

export class DJWS extends WSBase {
  rhythm: boolean[] = [false, false, false, false, false, false, false, false];
  tick: number = 0;

  constructor() {
    super();
    setInterval(() => {
      const data = this.rhythm[this.tick];
      this.tick++;
      if (this.tick === 8) {
        this.tick = 0;
      }
      this.broadcast('pulse/' + data);
    }, 1000);
  }

  sendRhythm(data: boolean[]) {
    this.rhythm = data;
    this.tick = 0;
    this.broadcast('pulse/' + data[0]);
  }
}

export class FollowerWS extends WSBase {
  onPulse: (pulse: boolean) => void = () => {};
  constructor() {
    super();
    this.ws.onmessage = ev => {
      if (ev.data.startsWith('pulse/')) {
        const bool = ev.data === 'pulse/true';
        this.onPulse(bool);
      }
    }
  }
}
