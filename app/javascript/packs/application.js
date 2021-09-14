// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
// import "./chat"
Rails.start()
Turbolinks.start()
ActiveStorage.start()

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".chat")) {
    window.chat = new Chat();
  }
});

  Rails.ajax({
    url: "/tokens",
    type: "POST",
    success: function(data) {
        
      Twilio.Chat.Client
        .create(data.token)
        .then(function(chatClient) {
          chatClient.getChannelByUniqueName("general")
            .then(function(channel){
              // general channel exists
            })
            .catch(function(){
              // general channel does not exist
            })

            .catch(function(){
                chatClient.createChannel({
                    uniqueName: "general",
                    friendlyName: "General Chat Channel"
                }).then(function(channel) {
                    if (channel.state.status !== "joined") {
                        channel.join().then(function(channel) {
                          console.log("Joined General Channel");
                        })
                    }
                });
            });
        });
    }
  });

  