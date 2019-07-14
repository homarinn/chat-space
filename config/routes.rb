Rails.application.routes.draw do
  devise_for :users
  root to: "shared#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
end