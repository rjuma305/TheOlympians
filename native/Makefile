CC=gcc
CFLAGS=-O2 -Wall -pedantic
TARGET=distance

all: $(TARGET)

$(TARGET): distance.c
	$(CC) $(CFLAGS) -o $(TARGET) distance.c -lm

clean:
	rm -f $(TARGET)
