# Load .env file if it exists
ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

# Makefile
.DEFAULT_GOAL := help
.PHONY: help

# Variables
DOCKER_COMPOSE = docker compose
PROJECT := $(notdir $(CURDIR))

# Colors
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
BLUE := \033[0;34m
NC := \033[0m # No Color

help: ## Show this help message
	@echo '${GREEN}Hugo - Available commands:${NC}'
	@echo ''
	@awk 'BEGIN {FS = ":.*##"; printf "\033[36m%-25s\033[0m %s\n", "Command", "Description"} /^[a-zA-Z_-]+:.*?##/ { printf "\033[36m%-25s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Docker Commands

up: ## Start in development mode
	@echo "${YELLOW}Starting Hugo...${NC}"
	@$(DOCKER_COMPOSE) up -d
	@echo "${GREEN}✓ Hugo is running at http://$(PROJECT_NAMESPACE).localhost${NC}"
	@echo "${YELLOW}Note: Make sure Traefik is running and $(PROJECT_NAMESPACE).localhost points to 127.0.0.1${NC}"

build: ## Build Docker containers
	@echo "${YELLOW}Building Docker containers...${NC}"
	@$(DOCKER_COMPOSE) build
	@echo "${GREEN}✓ Build completed successfully!${NC}"

restart: ## Restart
	@echo "${YELLOW}Restarting Hugo...${NC}"
	@$(DOCKER_COMPOSE) restart
	@echo "${GREEN}✓ Restarted successfully!${NC}"

stop: ## Stop Docker containers without removing them
	@echo "${YELLOW}Stopping Docker containers...${NC}"
	@$(DOCKER_COMPOSE) stop
	@echo "${GREEN}✓ Docker containers stopped successfully!${NC}"

down: ## Stop and remove Docker containers
	@echo "${YELLOW}Stopping and removing Docker containers...${NC}"
	@$(DOCKER_COMPOSE) down
	@echo "${GREEN}✓ Docker containers removed successfully!${NC}"

destroy: ## Destroy Docker containers and volumes
	@echo "${RED}WARNING: This will destroy all containers and volumes!${NC}"
	@echo "${YELLOW}Press Ctrl+C to cancel, or wait 5 seconds to continue...${NC}"
	@sleep 5
	@echo "${YELLOW}Destroying Docker containers and volumes...${NC}"
	@$(DOCKER_COMPOSE) down -v
	@echo "${GREEN}✓ Docker containers and volumes destroyed successfully!${NC}"
