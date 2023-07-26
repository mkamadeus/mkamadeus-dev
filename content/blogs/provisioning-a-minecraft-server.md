---
blog: true
title: Provisioning a Minecraft Server
description: Personal guide and thought process on creating and provisinoing a Minecraft server.
author: mkamadeus
date: 2022-11-21
duration: 5
---

::TableOfContents
::

## Introduction

As an avid computer enjoyer, I enjoy playing Minecraft from time to time.
Minecraft is an open game; not just in what can you do in game, it's also on how you want to play the game.
In this short writing, it's on how to provision the server quickly so that I can play with friends or alone in my server (sounds dumb though).

Back in the days where my knowledge on containers and VMs (also my resources) are limited, I used Minecraft official JARs to create a server.
It's working fine, but it's really a pain to customize.
Not to mention not having a personal VM would be a pain for me and others to join.

> This was back when I was on middle school (no money), don't judge me 😜

I learned a lot during my years in university and work, especially on programming and scripting.
Why don't I automate the process of provisioning a Minecraft server with configurations I commonly use?
So I've implemented things that I commonly used and automated them.
The development process, however, was not as smooth as I thought (skill issue).

> Check out the repository [here](https://github.com/mkamadeus/minecraft-server)!

## Implementation Process

### Initial Implementation

> See [this](https://github.com/mkamadeus/minecraft-server/tree/v0.2.0-1.18.2) for more context. This refers to what the project used to look like.

In the early days of using Docker, I stumbled upon [itzg's Dockerized Minecraft Server](https://github.com/itzg/docker-minecraft-server).
It's filled with features and wrapped in a way that's easy to use.
Being a Docker/containerization fanboy back then, I'm the image for my project and I didn't regret my choice.

```yml
version: "3.7"
services:
  mcserver:
    image: itzg/minecraft-server
    container_name: mcserver
    ports:
      - "25565:25565"
    volumes:
      - "./data:/data"
    environment:
      EULA: "TRUE"
      TYPE: "FABRIC"
      ENABLE_AUTOPAUSE: "TRUE"
      OVERRIDE_SERVER_PROPERTIES: "TRUE"
      MAX_TICK_TIME: "-1"
      ONLINE_MODE: "FALSE"
      MOTD: "Anjayy"
      USE_AIKAR_FLAGS: "true"
      SEED: "-5256854541870744071"
      OPS: "Myx"
```

The image is supplied with options to set the server type, which is useful for my scenario.
I'm an enjoyer for Vanilla+ Survival Minecraft with a bit of TMC/Technical Minecraft sprinkled in; this feature is a big win for me because I can use Fabric Servers and mount mods easily.
However, I was still running the image manually by copying the `docker-compose.yml` into my server and running it.

What came into my mind first was to provision the resources using Terraform (I just learned Terraform back then).
Realized it was dumb, so I scrapped that idea.
At the same time, I also learned about Ansible, and betting this would be the perfect tool to be used.

I created an Ansible role to do certain tasks towards the server.
Task that I commonly use are to configure the server, starting the server, stopping the server, and deleting the data on the server (since I frequently move server, on tight budget 😔).
I eventually added more tasks to the role, such as backing up the world data (copying it from remote to local).

It looks good at the time, so I published the repository.
Some improvements can be done though.

### Improved Implementation

> See [this](https://github.com/mkamadeus/minecraft-server/tree/v0.3.0-1.19.2) for more context. This refers to the improved implementation.

I soon realized putting JARs in in `git` was a bad idea.
It's getting to difficult to maintain mods that way.
Not to mention I also have some datapacks to improve the Vanilla experience.

I also discovered `packwiz` at that time.
It allows me to make my own modpacks for client or server.
Turns out the image also has the CLI installed after reading through the documentation!
So I migrated some of the JAR files to `packwiz` and create an internal modpack specifically for the server.
Testing and adding mods became much easier this way.

Some mods aren't able to be added to the modpack using `packwiz` because of the mod owners disabling access to it.
I opted with a hybrid approach where I also mounted the JARs that I want to add separately for now.

Datapacks are also stored in ZIP format, which is not very easy to manage.
The image also has support for VanillaTweaks Datapacks which most of my datapacks are!
I specified my used datapacks in such format:

```json
{
  "type": "datapacks",
  "version": "1.19",
  "packs": {
    "survival": ["unlock all recipes", "afk display"],
    "hermitcraft": ["wandering trades"],
    "mobs": ["more mob heads"],
    "items": ["player head drops"]
  }
}
```

I'm stingy with my money (basically the theme of this post), so I don't play as often since I have no server to play with my friends.
A solution that came to mind was to do port-forwarding, but I rarely got access to routers when travelling.
I opted to use Ngrok which is a famous tunneling tool and implemented it in another `docker-compose.yml` file for use in certain cases.

```yml
version: "3.7"
services:
  ## truncated
  proxy:
    image: wernight/ngrok
    container_name: proxy
    env_file: .env
    environment:
      - NGROK_PROTOCOL=TCP
      - NGROK_PORT=mcserver:${PORT}
    networks:
      - internal
networks:
  internal:
    driver: bridge
```

Other than what I listed here, some small improvements have been made for developer and player experience.
