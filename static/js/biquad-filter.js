'use strict';
var biquadFilter = {
  init: function bf_init(url) {
    this.url = url;
    AudioSource.init();
    AudioSource.load(url);
    this.context = AudioSource.context;
    //this.setupGraph();
  },
  run: function bf_run() {
    (this.playing ? this.stop() : this.play());
    this.playing = !this.playing;
  },
  play: function bf_play() {
    this.source.start(0);
  },
  stop: function bf_stop() {
    this.source.stop(0);
  },
  changeFrequency: function bf_changeFrequency(val) {
    this.biquadFilter.frequency.value = val;
    document.getElementById("frequency").nextSibling.innerHTML = val;
  },
  changeDetune: function bf_changeDetune(val) {
    this.biquadFilter.detune.value = val;
    document.getElementById("detune").nextSibling.innerHTML = val + "%";
  },
  changeType: function bf_changeType(val) {
    this.biquadFilter.type = val;
  },
  changeGain: function bf_changeGain(val) {
    this.biquadFilter.gain.value = val;
    document.getElementById("gain").nextSibling.innerHTML = val;
  },
  changeQ: function bf_changeQ(val) {
    var input = Math.pow(10, val);
    this.biquadFilter.Q.value = input;
    document.getElementById("Q").nextSibling.innerHTML = input;
  },
  setupGraph: function bf_setupGraph() {
    this.source = this.context.createBufferSource();
    this.source.buffer = AudioSource.buffer[this.url];
    this.biquadFilter = this.context.createBiquadFilter();
    for(var i in this.biquadFilter.frequency) {
      console.log(i, ": ", this.biquadFilter.frequency[i]);
    }
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.biquadFilter);
    this.biquadFilter.connect(this.context.destination);
    //set all values as default
    //this.changeFrequency(this.biquadFilter.frequency.defaultValue);
    //this.changeDetune(this.biquadFilter.detune.defaultValue);
    //this.changeGain(this.biquadFilter.gain.defaultValue);
    //this.changeQ(0);
  }
};