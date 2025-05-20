CC=gcc
CFLAGS=-O2 -Wall -pedantic
TARGETS=distance path_length

all: $(TARGETS)

# Build distance
distance: distance.c
	$(CC) $(CFLAGS) -o $@ $< -lm

# Build path_length
path_length: path_length.c
	$(CC) $(CFLAGS) -o $@ $< -lm

clean:
	rm -f $(TARGETS) *.o
