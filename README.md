# GQL server wrapper to access game-tracker

## Setup

#### Get dependencies 
    yarn
    
#### Setup your environment
    
Copy `.env.sample` to `.env` and edit its contents appropriately

    cp .env.sample .env
    
*OR*

Configure the values in .env.sample as server environment variables.
    
    
    
npx run.env createdb game-tracker    
npx run.env knex migrate:latest
    