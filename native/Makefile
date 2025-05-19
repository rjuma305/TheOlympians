CC=gcc
CFLAGS=-O2 -Wall -pedantic
TARGETS=distance path_length

all: $(TARGETS)

distance: distance.c
	$(CC) $(CFLAGS) -o distance distance.c -lm

path_length: path_length.c
	$(CC) $(CFLAGS) -o path_length path_length.c -lm

clean:
	rm -f $(TARGETS)
