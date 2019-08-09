json.array! @messages do |message|
  json.id message.id
  json.content message.content
  json.image message.image
  json.created_at message.created_at.strftime("%Y/%m/%d(#{%w(日 月 火 水 木 金 土)[message.created_at.wday]}) %H:%M:%S")
  json.user_name message.user.name
  json.group_id message.group.id
end