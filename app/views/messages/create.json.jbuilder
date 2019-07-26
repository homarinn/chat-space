json.content  @message.content
json.image  @message.image
json.user_name  @message.user.name
json.daytime  @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")