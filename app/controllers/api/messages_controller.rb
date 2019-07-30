class Api::MessagesController < ApplicationController
  def index
    message = Message.find(params[:message_id])
    @messages = Message.where("id > ? and group_id = ?", message.id, message.group_id)
  end
end