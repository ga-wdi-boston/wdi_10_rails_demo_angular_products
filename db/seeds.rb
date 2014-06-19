Product.delete_all
5.times do |i|
  Product.create(name: "Product #{i}", description: "This is product #{i}", price: (rand(100).to_f + (rand(100)/100.00)) )
end
