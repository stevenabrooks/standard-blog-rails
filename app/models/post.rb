class Post < ActiveRecord::Base
  attr_accessible :content, :name, :title

  has_many :comments
end
