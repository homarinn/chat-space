FactoryBot.define do
  factory :message do
    content {Faker::Lorem.content}
    image   {File.open("#{Rails.root}/public/images/test_image.jpg")}
  end
end