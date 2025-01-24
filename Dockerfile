# Use a minimal base image (e.g., alpine)
FROM ubuntu:jammy

# Set the working directory

# Copy the native executable into the container
COPY target/EduPlanner /EduPlanner

# Expose the application port
EXPOSE 8080

# Set the entry point to run the native executable
ENTRYPOINT ["/EduPlanner"]