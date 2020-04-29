# frozen_string_literal: true

class NotificationsController < ApplicationController
  def create
    # クライアントからのPOSTリクエストのボディからデータを送信先を取得
    id = paramas[:id]
    # 送信先に対応するストリームを指定
    ActionCable.server.broadcast("notification_channel_#{id}", "POST message to #{id}!")
  end
end
