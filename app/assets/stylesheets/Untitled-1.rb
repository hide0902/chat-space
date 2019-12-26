puts "二桁の整数を入力してください"
input = gets.to_s
x = input

puts "#{x % 10 + x % 100} " + "#{x % 10 * x % 100}"