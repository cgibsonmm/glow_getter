# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Users
user = User.new(
    username: 'swr127',
    email: 'samanthamktgemails@gmail.com',
    password_digest: 'password'
)

# Products
day_cream = Product.create(
    name: 'Daily Moisturizer',
    price: 48,
    img: 'https://i.imgur.com/Cmo8Wfu.jpg',
    in_stock: true
)
night_cream = Product.create(
    name: 'Night Time Moisturizer',
    price: 48,
    img: 'https://i.imgur.com/Cmo8Wfu.jpg',
    in_stock: true
)
eye_cream = Product.create(
    name: 'Eye Rescue Moisturizer',
    price: 38,
    img: 'https://i.imgur.com/Cmo8Wfu.jpg',
    in_stock: true
)
cleanser = Product.create(
    name: 'Clarifying Cleanser',
    price: 18,
    img: 'https://i.imgur.com/Cmo8Wfu.jpg',
    in_stock: true
)
toner = Product.create(
    name: 'Resurfacing Toner',
    price: 18,
    img: 'https://i.imgur.com/Cmo8Wfu.jpg',
    in_stock: true
)
serum = Product.create(
    name: 'Get Glowing Serum',
    price: 68,
    img: 'https://i.imgur.com/Cmo8Wfu.jpg',
    in_stock: true
)
essence = Product.create(
    name: 'Hydrating Essence',
    price: 58,
    img: 'https://i.imgur.com/Cmo8Wfu.jpg',
    in_stock: true
)
lotion = Product.create(
    name: 'Body Butter',
    price: 28,
    img: 'https://i.imgur.com/Cmo8Wfu.jpg',
    in_stock: true
)

user.products << day_cream
user.products << serum

user.save
