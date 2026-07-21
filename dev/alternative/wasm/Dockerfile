# Lightweight Debian image with apt
FROM debian:bookworm-slim

# Tells Debian's package installation tools not to ask interactive questions during apt-get install
ENV DEBIAN_FRONTEND=noninteractive

# Install Dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        emscripten \
        libfftw3-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Sets the current working directory for all subsequent Dockerfile instructions
WORKDIR /workspace

# Copies build context to the workdir. First '.' = build context on host. Second '.' = Current directory inside container.
COPY . .

# Give execute permission to build script
RUN chmod +x ./build.sh

# Run build script
CMD ["./build.sh"]