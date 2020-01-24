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


## Configuration

### Discord API Key
You may pass your discord api key in `.env` file according to the setup. This key is important and should never be allowed to display publicly. 

### MongoDB
You may also wish to enter your MongoDB URL in `.env` file. In case you have no idea how to configure your mongoDB, you can try MongoDB Atlas for free (https://www.mongodb.com/cloud/atlas)

The URL might looks something like this `mongodb://localhost/test`. Where test is our database name running locally. 

### Web Dashboard

If you wish to visually manage your bot, don't worry. You can run 
``` bash
$ npm run web
```

This command will start and build the web dashboard interface. Go to `localhost:3001` to see this in action! (You will need your discord api key in order to gain access)

## Running the bot
Execute one of these commands to run the bot:

This command automatically restart the bot when file changes in the directory are detected (Highly recommended). **Just be aware of abusing the API, discord might ask you to change your API key if the bot keeps restarting multipe times in a short period. 

```bash
$ npm run serve
```

You will need to run this command again if you makes changes to the bot (Not recommended)

```bash
$ npm start
```

## Documentation
 