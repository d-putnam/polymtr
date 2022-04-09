Polymtr is an in-browser polymetric, alogrithmic drum sequencer, built in React using [Tone.JS](https://tonejs.github.io/) and [NexusUI](https://nexus-js.github.io/ui/).

All audio synthesis and processing happens in real-time in the browser -- no pre-rendered samples here.

Patterns are generated based on the euclidean algorithm, which attempts to equally space X notes ("Density") across Y quantized steps ("length"). Non-divisible pattern lengths will result in longer, more complicated phrases.

Planned features include modulators, MIDI support, and presets.

[check it out here](https://dputnam.net/polymtr)