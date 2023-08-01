redis-cli
set name ghosty
get name
lpush characters "luigi:super mario world"
lrange characters 0 -1
lrange characters 0 0
lrem characters 0 "samus:metroid"
del characters