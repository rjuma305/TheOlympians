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
    double total = 0.0;
    double last_x = 0.0, last_y = 0.0;
    double x, y;
    int have_last = 0;

    while (fgets(line, sizeof(line), f)) {
        // Skip empty or malformed lines
        if (line[0] == '\0' || line[0] == '\n') continue;

        // Parse using strtok and fallback to sscanf if needed
        char *token1 = strtok(line, ",");
        char *token2 = strtok(NULL, ",\n\r");
        if (!token1 || !token2) continue;

        x = atof(token1);
        y = atof(token2);

        if (have_last) {
            double dx = x - last_x;
            double dy = y - last_y;
            total += sqrt(dx * dx + dy * dy);
        }

        last_x = x;
        last_y = y;
        have_last = 1;
    }

    fclose(f);
    printf("%f\n", total);
    return 0;
}
