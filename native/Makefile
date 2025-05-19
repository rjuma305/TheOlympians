CC=gcc
CFLAGS=-O2 -Wall -pedantic
TARGETS=distance path_length

all: $(TARGETS)

# build distance
distance: distance.c
	$(CC) $(CFLAGS) -o $@ $< -lm

# build path_length
path_length: path_length.c
	$(CC) $(CFLAGS) -o $@ $< -lm

clean:
	rm -f $(TARGETS) *.o
