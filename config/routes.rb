Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  get '/cart' => 'users#cart'
  post '/cart/:product_id' => 'users#cartadd'
  delete '/cart/:product_id' => 'users#cartremove'
  
  resources :users
  resources :products
  
end