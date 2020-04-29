# frozen_string_literal: true

class NotificationsController < ApplicationController
  def create
    # クライアントからのPOSTリクエストのボディからデータを送信先を取得
    to = params[:to]
    # 送信先に対応するストリームを指定
    ActionCable.server.broadcast("notification_channel_#{to}", "POST message to #{to}!")

    render json: { to: to }
  end
end
