Rails.application.routes.draw do
  namespace :api do
    
    post "register", to: "teachers#register"
    post "login", to: "teachers#login"

    resources :students, only: [:index, :create, :update, :destroy]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
