class MusicPlayer {
  constructor(muzikList) {
    this.muzikList = muzikList;
    this.index = 0;
  }
  getMuzik() {
    return this.muzikList[this.index];
  }
  next() {
    if (this.index + 1 < this.muzikList.length) {
      this.index++;
    } else {
      this.index = 0;
    }
  }
  prev() {
    if (this.index != 0) {
      this.index--;
    } else {
      this.index = this.muzikList.length - 1;
    }
  }
}
