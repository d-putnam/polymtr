Polymtr is an in-browser polymetric, alogrithmic drum sequencer built using [Tone.Js](https://tonejs.github.io/) and [NexusUI](https://nexus-js.github.io/ui/).

All audio synthesis and processing happens in real-time in the browser -- no pre-rendered samples here.

Each track is assigned an array of 32 random values. Based on the sequencer length and threshold settings, this is translated to a note, accent, or rest for the corresponding step in the sequence. 

Future iterations will include modulators, MIDI support, and presets.

[check it out](https://dputnam.net/polymtr)
