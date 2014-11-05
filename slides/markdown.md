class: center, middle

# Dive into Stream

![Dive](dive_into_stream.png)

---

# Stream

- Stream1 (before node 0.10)
- Stream2 (before node 0.11)
- Stream3 (0.11)

--

## Why should I care?

--

- NO YOU DON'T (in 95% case)

--

- Stream consumers: give you a clue when undesired things happen
- Stream implementators: backward-compatibility

---

class: middle

# Stream1

- behave exactly like the word "stream"
- just an `EventEmitter` with special methods like `.pipe()`
- no buffer, no internal state management
- `.pause` is just advisory
- **start to puke immediately**

.right[![Stream1](stream1.jpg)]

---

class: middle

## [Through](https://github.com/dominictarr/through), the savior module
- hide the detail of implementing a Transform stream for u
    - state management
    - buffer management
- [evidence](https://github.com/dominictarr/through/blob/master/index.js)

---

# Stream2

- new mode: "non-flowing mode" (default)
```javascript
    stream.on('readable', function () {
        // handle it
        var data = this.read();
    });
```
- compatibility mode: "flowing mode"
```javascript
    stream.on('data', function (data) {
        // handle it
    });
```
- it's a **one way switch**

---

# Stream2

## Behave like...

![Part1](stream2_1.jpg)
--
![Part2](stream2_2.jpg)
--
![Part3](stream2_3.jpg)

---

# Stream2

- Built-in state management & buffer management
- Implement your own stream is easier

```javascript
var Transform = require('stream').Transform;
var util = require('util');

// Declare constructor
function MyTransform () {
    Transform.call(this);
}

// Inherits methods
util.inherits(MyTransform, Transform);

// Implement functions like _transform, _read or _write
MyTransform.prototype._transform = function () {};
```

---

# Coding time!

---

# Stream3
- same API
- flur the edge between two modes (no more switching)
- [Issue #5860](https://github.com/joyent/node/issues/5860)
- it's like...

--

![Stream3](stream3.jpg)

---

# Conclusion

## Go native

- [readable-stream](https://github.com/isaacs/readable-stream)
    - mirror to Stream2 & Stream3 node-core
    - freeze the version 
    - use stream2 in ancient node ( < 0.10 )

## Save your time

- [through](https://github.com/dominictarr/through)
- [through2](https://github.com/rvagg/through2)

---

# Reference
- http://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html
- http://www.joyent.com/blog/streams-in-node
- https://github.com/joyent/node/issues/5860

