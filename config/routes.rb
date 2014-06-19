Rails.application.routes.draw do
  
  get 'main/index'

  root to: 'main#index'

  resources :products, only: [:index, :show, :create]
  
end
