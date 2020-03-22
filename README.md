# Steps to deploy

- `touch ./glow_getter_app/Procfile.dev` add this code in this file

```
web: PORT=3000 yarn --cwd client start
api: PORT=3001 bundle exec rails s
```

- `touch ./glow_getter_app/Procfile` add this code

```
web: bundle exec rails s
release: bin/rake db:migrate
```

- `touch ./glow_getter_app/package.json`

```
{
  "name": "handOFF",
  "license": "MIT",
  "engines": {
    "node": "10.15.3",
    "yarn": "1.15.2"
  },
  "scripts": {
    "build": "yarn --cwd client install && yarn --cwd client build",
    "deploy": "cp -a client/build/. public/",
    "heroku-postbuild": "yarn build && yarn deploy"
  }
}
```

- Need to modify you application controller to look like this

```Ruby
class ApplicationController < ActionController::API

  def fallback_index_html
    render file: 'public/index.html'
  end

  SECRET_KEY = Rails.application.secrets.secret_key_base.to_s

  def encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      puts ''
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
```

- modify your rails routes file to look like this

```Ruby
Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  get '/cart' => 'users#cart'
  post '/cart/:product_id' => 'users#cartadd'
  delete '/cart/:product_id' => 'users#cartremove'

  resources :users
  resources :products

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
```

- In the `./glow_getter_app/client/package.json` you need to add the proxy

```JSON
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:3001", // < -- this line
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "axios": "^0.19.2",
    "react": "^16.13.0",
    "react-dom": "^16.13.0",
    "react-hamburger-menu": "^1.1.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.0",
    "react-slideshow": "0.0.1",
    "react-slideshow-image": "^1.4.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

- need to modify `./glow_getter_app/client/src/apiConfig.jsx` base url

```JS
const baseUrl = "/";
```

---

# Time to deploy

- commit and push all changes

# Glow Getter Overview

## Project Description

The **Glow Getter** web application is an ecommerce website for 'mock' makeup and skincare products. I am building this application for the purpose of presenting a simple and intuitive ecomm website that could be used by real beauty companies.

Link: TBC

### Permissions

The digital assets used to create this project have full licensing and permission from [Shutterstock](https://www.shutterstock.com/home). All of the digital assets are stored locally and on [Imgur](https://imgur.com/).

## Wireframes

### Homepage

<a href="https://imgur.com/HCfJI1i"><img src="https://i.imgur.com/HCfJI1i.png" title="source: imgur.com" /></a>

### Sign up

<a href="https://imgur.com/rJJ5PC3"><img src="https://i.imgur.com/rJJ5PC3.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/N8iXsqf"><img src="https://i.imgur.com/N8iXsqf.png" title="source: imgur.com" /></a>

### Login

<a href="https://imgur.com/DbiIDNY"><img src="https://i.imgur.com/DbiIDNY.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/LCDgLgX"><img src="https://i.imgur.com/LCDgLgX.png" title="source: imgur.com" /></a>

### Shop

<a href="https://imgur.com/wrmgZsr"><img src="https://i.imgur.com/wrmgZsr.png" title="source: imgur.com" /></a>

### Cart

<a href="https://imgur.com/8ABVC0O"><img src="https://i.imgur.com/8ABVC0O.png" title="source: imgur.com" /></a>

## MVP

- A full-stack application with React on the front-end and Rails on the back-end - React app with the components listed in the React Component Hierarchy - React app using React Router - Rails server with RESTful JSON endpoints - Rails server with a user table, product table, and a join cart table
- A user authentication that permits a user to sign up and login
- A user experience that involves full CRUD - When the user visits the homepage for the first time, they can sign up for an account and browse products - Create = create an account - Read = browse products - When the user is logged in, they will be able to perform the following actions on their shopping cart - Update = add products to cart - Delete = delete products from cart - When the user is not logged in, they won't be able to perform the above actions on their shopping cart
- A responsvie design with a minimum of 2 views (desktop & mobile)

### MVP Client

- React on front-end

### MVP Server

- Rails on back-end

### MVP Libraries

`react-router-dom`, `reacts-slideshow`, `react-hamburger-menu`, `axios`, `pg`, `cors`, `rails`

## React Component Hierarchy

<a href="https://imgur.com/UJqxVyA"><img src="https://i.imgur.com/UJqxVyA.png" title="source: imgur.com" /></a>

### Component Breakdown

|     Component      | State | Description                                                                                                      |
| :----------------: | :---: | :--------------------------------------------------------------------------------------------------------------- |
|        App         |   Y   | The App will make an Axios call and contain all the routes for the app                                           |
|       Header       |   Y   | The Header will show the app title and contain the navigation                                                    |
|        Nav         |   Y   | The Nav will contain the navlinks for home, sign-up, login, shop, and view cart                                  |
|        Home        |   N   | The Home will show generic stylistic images on the homepage                                                      |
|       Login        |   Y   | The Login will enable a user to login to their account                                                           |
| Sign Up / Register |   Y   | The Sign Up / Register will enable a user to register for an account                                             |
|        Shop        |   Y   | The Shop will show all of the products in the database                                                           |
| Shop Product Card  |   Y   | The Shop Product Card will show information on the product from the database, and have an add to cart button     |
|    Add to Cart     |   Y   | The Add to Cart button will make an Axios call which will add a product to a users cart                          |
|        Cart        |   Y   | The Cart will show all of the products that a user has added to their cart                                       |
| Cart Product Card  |   Y   | The Cart Product Card will show information on the product from the database, and have a remove from cart botton |
|  Remove from Cart  |   Y   | The Remove from Cart button will make an Axios call which will remove a product from a users cart                |
|       Footer       |   N   | The Footer will show my name and additional copyright information                                                |

## ERD Model

<a href="https://imgur.com/urEWlDy"><img src="https://i.imgur.com/urEWlDy.png" title="source: imgur.com" /></a>

### Endpoints

- GET `/users` - Index route returning an array of all users
- GET `/users/:id` - Show route for a user requested by ID - Show all products associated with user ID
- POST `/users` - Create a new user
- PUT `/users/:id/` - Update a user by ID
- DELETE `/users/:id/` - Delete a user by ID
- GET `/products` - Index route returning an array of all products
- GET `/products/:id` - Show route for a product requested by ID - Show all users associated with product ID
- POST `/products` - Create a new product
- PUT `/products/:id/` - Update a user by ID
- DELETE `/products/:id/` - Delete a user by ID

## Planning

### Schedule

| Day      | Deliverables                                                          |
| -------- | --------------------------------------------------------------------- |
| Mar 5th  | Create project pitch for approval                                     |
| Mar 6th  | Create back-end with full CRUD on Rails                               |
| Mar 7th  | Create user auth on Rails                                             |
| Mar 8th  | R&R                                                                   |
| Mar 9th  | Create front-end with full CRUD on React                              |
| Mar 10th | Test user authentication & full CRUD functionality on Rails and React |
| Mar 11th | CSS styling and responsive design                                     |
| Mar 12th | MVP, begin post-MVP                                                   |
| Mar 13th | Final presentation                                                    |

### Timeframes

| Task                                   | Priority | Estimated Time | Actual Time |
| -------------------------------------- | :------: | :------------: | :---------: |
| Set Up Rails App                       |    H     |     2 hrs      |     TBD     |
| Create models and migrations           |    H     |      1 hr      |     TBD     |
| Create database with mock data         |    H     |     2 hrs      |     TBD     |
| Seed database with mock data           |    H     |      1 hr      |     TBD     |
| Create controllers                     |    H     |      1 hr      |     TBD     |
| Create routes                          |    H     |      1 hr      |     TBD     |
| Create user auth on back-end           |    H     |     6 hrs      |     TBD     |
| Test back-end CRUD functionality       |    H     |     2 hrs      |     TBD     |
| Set up React App                       |    H     |     2 hrs      |     TBD     |
| Create react router                    |    H     |      1 hr      |     TBD     |
| Create components                      |    H     |     4 hrs      |     TBD     |
| Create Axios call to back-end          |    H     |     4 hrs      |     TBD     |
| Pass state to stateful components      |    H     |     2 hrs      |     TBD     |
| Enable user auth on front-end          |    H     |     6 hrs      |     TBD     |
| Test front-end CRUD functionality      |    H     |     2 hrs      |     TBD     |
| CSS styling and responsive design      |    H     |     12 hrs     |     TBD     |
| Deploy application on Heroku           |    M     |     2 hrs      |     TBD     |
| Make necessary post-deployment changes |    L     |      1 hr      |     TBD     |
| TOTAL                                  |          |    52 hours    |     TBD     |

## Post-MVP

- Create admin access in user auth
- Create product page
- Additional CSS styling (react hamburger menu, react slideshow)
- Try out some SCSS for styling

## Project Change Log

- Adjusted ERD so Product Table has product_img = string

## Code Showcase

> Use this section to include a brief code snippet of functionality that you are proud of and a brief description.

## Code Issues & Resolutions

> Use this section to list of all major issues encountered and their resolution, if you'd like.
