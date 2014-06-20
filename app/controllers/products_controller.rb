class ProductsController < ApplicationController
  respond_to :json

  def index
    @products = Product.all
    respond_with(@products) do |format|
      format.json { render :json => @products, :root => false }
    end
  end

  def show
    @product = Product.find(params[:id])
    respond_with(@product) do |format|
      format.json { render :json => @product}
    end
  end

end
