const playerInstance = jwplayer("player").setup({
    controls: true,
    sharing: true,
    displaytitle: true,
    displaydescription: true,
    abouttext: "",
    aboutlink: "",
  
    skin: {
      name: "netflix"
    },
  
    logo: {
      file:
        "",
      link: ""
    },
  
    captions: {
      color: "#FFF",
      fontSize: 14,
      backgroundOpacity: 0,
      edgeStyle: "raised"
    },
  
    playlist: [
      {
        title: "The Social Dilemma",
        description: "You're Watching",
        image: "./pic.jpg",
        sources: [
          {
            file:
              "https://pixeldrain.com/api/file//xVW22ZX8",
            label: "720p",
            default: true,
            type: "video/mp4"
          },
        ],
        captions: [
          {
            file:
              "./sub/eng.srt",
            label: "English",
            kind: "captions"
          },
          {
            file:"./sub/sin.srt",
            label: "Sinhala",
            kind: "captions"
          },
        
        ],
      }
    ],
  });
  
  playerInstance.on("ready", function () {
    const buttonId = "download-video-button";
    const iconPath =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTMgMTloMTh2Mkgzdi0yem0xMC01LjgyOEwxOS4wNzEgNy4xbDEuNDE0IDEuNDE0TDEyIDE3IDMuNTE1IDguNTE1IDQuOTI5IDcuMSAxMSAxMy4xN1YyaDJ2MTEuMTcyeiIgZmlsbD0icmdiYSgyNDcsMjQ3LDI0NywxKSIvPjwvc3ZnPg==";
    const tooltipText = "Download Video";
  
    // Call the player's `addButton` API method to add the custom button
    playerInstance.addButton(iconPath, tooltipText, buttonClickAction, buttonId);
  
    // This function is executed when the button is clicked
    function buttonClickAction() {
      const playlistItem = playerInstance.getPlaylistItem();
      const anchor = document.createElement("a");
      const fileUrl = playlistItem.file;
      anchor.setAttribute("href", fileUrl);
      const downloadName = playlistItem.file.split("/").pop();
      anchor.setAttribute("download", downloadName);
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  
    // Move the timeslider in-line with other controls
    const playerContainer = playerInstance.getContainer();
    const buttonContainer = playerContainer.querySelector(".jw-button-container");
    const spacer = buttonContainer.querySelector(".jw-spacer");
    const timeSlider = playerContainer.querySelector(".jw-slider-time");
    buttonContainer.replaceChild(timeSlider, spacer);
  
    // Detect adblock
    playerInstance.on("adBlock", () => {
      const modal = document.querySelector("div.modal");
      modal.style.display = "flex";
  
      document
        .getElementById("close")
        .addEventListener("click", () => location.reload());
    });
  
    // Forward 10 seconds
    const rewindContainer = playerContainer.querySelector(
      ".jw-display-icon-rewind"
    );
    const forwardContainer = rewindContainer.cloneNode(true);
    const forwardDisplayButton = forwardContainer.querySelector(
      ".jw-icon-rewind"
    );
    forwardDisplayButton.style.transform = "scaleX(-1)";
    forwardDisplayButton.ariaLabel = "Forward 10 Seconds";
    const nextContainer = playerContainer.querySelector(".jw-display-icon-next");
    nextContainer.parentNode.insertBefore(forwardContainer, nextContainer);
  
    // control bar icon
    playerContainer.querySelector(".jw-display-icon-next").style.display = "none"; // hide next button
    const rewindControlBarButton = buttonContainer.querySelector(
      ".jw-icon-rewind"
    );
    const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
    forwardControlBarButton.style.transform = "scaleX(-1)";
    forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
    rewindControlBarButton.parentNode.insertBefore(
      forwardControlBarButton,
      rewindControlBarButton.nextElementSibling
    );
  
    // add onclick handlers
    [forwardDisplayButton, forwardControlBarButton].forEach((button) => {
      button.onclick = () => {
        playerInstance.seek(playerInstance.getPosition() + 10);
      };
    });
  });
  
