# SmartDEX API

The backend API for the SmartDEX decentralized Exchange

## Requirements

- Install Node.js (v9+)
- Install AdonisJS
- Install PostgressSQL (and create local 'smartdex' database)


## Setup
 - `npm install`
 - Start up PostgressSQL
 - `adonis migration:run` - create db tables via Migrations
 - `adonis serve --dev` - start local server


## Debugging in VS Code

1. Set up following config in your launch.json file
   ```
   "configurations": [
           {
               "type": "node",
               "request": "attach",
               "name": "Attach to Process",
               "port": 9229,
               "sourceMaps": false
           }
       ]
   ```
2. `adonis serve --dev --debug` -- start the app in debug mode
3. Launch the VS Code debugger with aforementioned config
