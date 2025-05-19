#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main(int argc, char *argv[]) {
    if (argc != 5) {
        fprintf(stderr, "Usage: %s x1 y1 x2 y2\n", argv[0]);
        return 1;
    }
    double x1 = atof(argv[1]);
    double y1 = atof(argv[2]);
    double x2 = atof(argv[3]);
    double y2 = atof(argv[4]);

    double dx = x1 - x2;
    double dy = y1 - y2;
    double dist = sqrt(dx*dx + dy*dy);

    printf("%f\n", dist);
    return 0;
}
