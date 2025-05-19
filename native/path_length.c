#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <csv_file>\n", argv[0]);
        return 1;
    }

    FILE *f = fopen(argv[1], "r");
    if (!f) {
        perror("fopen");
        return 1;
    }

    char line[256];
    double prev_x = 0, prev_y = 0;
    double total = 0;
    int first = 1;
    while (fgets(line, sizeof(line), f)) {
        // Skip empty lines
        if (line[0] == '\0' || line[0] == '\n') {
            continue;
        }
        // Parse "x,y" pair
        char *token1 = strtok(line, ",");
        char *token2 = strtok(NULL, ",\n\r");
        if (!token1 || !token2) {
            continue;
        }
        double x = atof(token1);
        double y = atof(token2);
        if (!first) {
            double dx = x - prev_x;
            double dy = y - prev_y;
            total += sqrt(dx * dx + dy * dy);
        }
        prev_x = x;
        prev_y = y;
        first = 0;
    }

    fclose(f);
    printf("%f\n", total);
    return 0;
}
