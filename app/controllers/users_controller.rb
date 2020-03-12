class UsersController < ApplicationController
  before_action :authorize_request, except: [:create, :index]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user, include: :products
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  # GET /cart
  def cart
    @products = @current_user.products
    render json: @products
  end 

  # POST /cart/product_id
  def cartadd 
    puts params
    @product = Product.find(params[:product_id])
    if @current_user.products.push(@product)
      render json: {message: 'Product added'}
    else
      render json: {message: @current_user.errors}
    end
  end

  # DELETE /cart/product_id
  def cartremove 
    @product = Product.find(params[:product_id])
    if @current_user.products.delete(@product)
      render json: {message: 'Product deleted'}
    else
      render json: {message: @current_user.errors}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end