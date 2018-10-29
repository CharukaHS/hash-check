# Hash-Check
>Compare given checksum with a selected file

```sh
$ checksum m <filename> <checksum>
```
### How to use
1. yarn link
2. open the folder that you need
3. open cmd on that folder
4. type `checksum m <filename> <checksum>`

>Tip: Use a random value at checksum inputting to generate hash of the file

<!--### Discoverd bugs -->


### Changelog
0.2.0
* Detect algorithm automatically, no need to pass algorithm now
* More visual data with chalk
* Fixed a bug displaying checksums doesn't match when hash is capitalized

0.1.1
* Now works globally. Open cmd anywhere and use
* Typos


eg:   `checksum m movie.mp4 4185cfc0d88a8cf8b7a1f780e53e072a`