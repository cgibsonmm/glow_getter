# frozen_string_literal: true

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
