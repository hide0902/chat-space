FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/1/E55A7E9A-4896-4FB3-B0C6-DF30D6A3B369.jpeg")}
    user
    group
  end
end