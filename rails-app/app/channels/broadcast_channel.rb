# frozen_string_literal: true

class BroadcastChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'broadcast_channel'
  end

  def speak(data)
    ActionCable.server.broadcast('broadcast_channel', data['message'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
