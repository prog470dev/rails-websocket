# frozen_string_literal: true

class NotificationChannel < ApplicationCable::Channel
  def subscribed
    # クライアントの購読を確立させるときに指定されたパラメータからストリームを作成
    stream_from "notification_channel_#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
