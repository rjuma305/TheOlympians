#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s path.csv\n", argv[0]);
        return 1;
    }
    FILE *f = fopen(argv[1], "r");
    if (!f) {
        perror("fopen");
        return 1;
    }
    double last_x, last_y;
    double x, y;
    int have_last = 0;
    char line[256];
    double total = 0.0;
    while (fgets(line, sizeof(line), f)) {
        if (sscanf(line, "%lf,%lf", &x, &y) != 2) {
            continue; // ignore malformed lines
        }
        if (have_last) {
            double dx = x - last_x;
            double dy = y - last_y;
            total += sqrt(dx*dx + dy*dy);
        }
        last_x = x;
        last_y = y;
        have_last = 1;
    }
    fclose(f);
    printf("%f\n", total);
    return 0;
}
