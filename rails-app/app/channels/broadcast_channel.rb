# frozen_string_literal: true

class BroadcastChannel < ApplicationCable::Channel
  # クライアントの購読が確立したときに呼ばれるメソッド
  def subscribed
    # クライアントとストリームの紐付け
    stream_from 'broadcast_channel'
  end

  # クライアントから指定されるメソッド
  def speak(data)
    ActionCable.server.broadcast('broadcast_channel', data['message'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
