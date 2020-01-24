[![dependecies](https://img.shields.io/david/polowis/bot9?style=plastic)](/package.json) [![version](https://img.shields.io/github/package-json/v/polowis/bot9?style=plastic)](/package.json)


# Template to make Discord bot

## Requirement

1. Nodejs (https://nodejs.org/en/) *preferably v10 or above*
2. MongoDB (https://www.mongodb.com)
3. Discord API_KEY (You can get it from https://discordapp.com/developers/applications/)


## Installation

In order to work on this project on your machine, you can follow the instructions below

1. Fork this repository 
2. Open your terminal and `cd` to your `~/your_folder` folder
3. Clone your fork into the `~/your_folder` folder, by running the following command *replace your username into {your_username} slot*:
    ```bash
    git clone git@github.com:{your_username}/bot9 laravel
    ```
4. CD into the new directory you just created:
    ```bash
    cd bot9
    ```
5. Run the `setup.sh` bin script
    ```bash
    ./bin/setup.sh
    ```
    In case you encounter errors such as `command not found` or `permission denied` you may need to follow these steps to solve your problem:
    ```bash
    sudo chmod +x ./bin/setup.sh
    ./bin/setup.sh
    ```

## Documentation
 