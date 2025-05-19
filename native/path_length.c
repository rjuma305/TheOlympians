#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <csv_file>\n", argv[0]);
        return 1;
    }

    FILE *fp = fopen(argv[1], "r");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }

    char line[256];
    double prev_x, prev_y;
    double total = 0.0;
    int has_prev = 0;

    while (fgets(line, sizeof(line), fp)) {
        // Skip empty lines
        if (line[0] == '\n' || line[0] == '\0')
            continue;
        double x, y;
        if (sscanf(line, "%lf,%lf", &x, &y) != 2) {
            fprintf(stderr, "Invalid line: %s", line);
            fclose(fp);
            return 1;
        }
        if (has_prev) {
            double dx = x - prev_x;
            double dy = y - prev_y;
            total += sqrt(dx*dx + dy*dy);
        } else {
            has_prev = 1;
        }
        prev_x = x;
        prev_y = y;
    }

    fclose(fp);
    printf("%f\n", total);
    return 0;
}
