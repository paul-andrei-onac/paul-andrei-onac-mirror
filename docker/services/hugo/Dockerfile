# 1) Build stage: Compile Hugo Extended from source
FROM golang:1.24.3 AS hugo-builder

ARG HUGO_VERSION=latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    gcc \
    g++ \
    libc6-dev \
    && rm -rf /var/lib/apt/lists/*

RUN if [ "${HUGO_VERSION}" = "latest" ]; then \
        go install -tags extended github.com/gohugoio/hugo@latest; \
    else \
        go install -tags extended github.com/gohugoio/hugo@v${HUGO_VERSION}; \
    fi

# 2) Final stage: Use node:22
FROM node:22

RUN ARCH=$(uname -m) \
    && case ${ARCH} in \
         "x86_64")  FIXUID_ARCH="amd64" ;; \
         "aarch64") FIXUID_ARCH="arm64" ;; \
         "arm64")   FIXUID_ARCH="arm64" ;; \
         *)         echo "Unsupported architecture: ${ARCH}" && exit 1 ;; \
       esac \
    && curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.6.0/fixuid-0.6.0-linux-${FIXUID_ARCH}.tar.gz | tar -C /usr/local/bin -xzf - \
    && chown root:root /usr/local/bin/fixuid \
    && chmod 4755 /usr/local/bin/fixuid \
    && mkdir -p /etc/fixuid \
    && printf "user: node\ngroup: node\n" > /etc/fixuid/config.yml

WORKDIR /work

RUN git config --global --add safe.directory /work

ARG DART_SASS_VERSION=1.83.1

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    bash \
    && rm -rf /var/lib/apt/lists/* \
    && ARCH=$(uname -m) \
    && case ${ARCH} in \
         "x86_64")  DART_SASS_ARCH="x64" ;; \
         "aarch64") DART_SASS_ARCH="arm64" ;; \
         *)         echo "Unsupported architecture: ${ARCH}" && exit 1 ;; \
       esac \
    && curl -L https://github.com/sass/dart-sass/releases/download/${DART_SASS_VERSION}/dart-sass-${DART_SASS_VERSION}-linux-${DART_SASS_ARCH}.tar.gz \
       | tar -xz -C /usr/local/bin/ \
    && mv /usr/local/bin/dart-sass/* /usr/local/bin/ \
    && rmdir /usr/local/bin/dart-sass

COPY --from=hugo-builder /go/bin/hugo /usr/local/bin/hugo

# Use fixuid as entrypoint to handle UID/GID mapping
ENTRYPOINT ["fixuid"]

CMD ["bash"]
