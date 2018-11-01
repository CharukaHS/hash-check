# Hash-Check
>Compare given checksum or create checksum with a selected file

### Compare

```sh
$ checksum m <filename> <checksum>
```

eg:   `checksum m movie.mp4 4185cfc0d88a8cf8b7a1f780e53e072a`

### Create
```sh
$ checksum c <filename> [algorithm]
```
```sh
checksum c movie.mp4 md5
```
```sh
checksum c movie.mp4
#output hash in all algorithms
```



### How to use
1. yarn link
2. open the folder that you need
3. open cmd on that folder
4. type `checksum m <filename> <checksum>`

<!--### Discoverd bugs -->


### Changelog
0.2.1
* Added create-hash option 
`checksum c filename algorithm(optional)`

0.2.0
* Detect algorithm automatically, no need to pass algorithm now
* More visual data with chalk
* Fixed a bug displaying checksums doesn't match when hash is capitalized

0.1.1
* Now works globally. Open cmd anywhere and use
