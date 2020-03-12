Rails.application.routes.draw do
  namespace :api do

  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'

  get '/cart' => 'users#cart'
  post '/cart/:product_id' => 'users#cartadd'
  delete '/cart/:product_id' => 'users#cartremove'
  
  resources :users
  resources :products

  end
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end