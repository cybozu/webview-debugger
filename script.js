const clickAdd = () => {
  const params = new URLSearchParams(window.location.search);
  const queries = Object.fromEntries(params.entries());
  if ("history" in queries) {
    window.location.href = `?history=${parseInt(queries.history) + 1}`;
  } else {
    window.location.href = "?history=1";
  }
};

const clickShowAlert = () => {
  window.alert("Alert Test");
};

const clickShowConfirm = () => {
  const result = window.confirm("Confirm Test");
  window.alert(`Result: ${result ? "OK" : "Cancel"}`);
};

const clickShowPrompt = () => {
  const result = window.prompt("Prompt Test", "Placeholder");
  window.alert(`Result: ${result}`);
};

const clickCheckUserAgent = () => {
  const userAgent = window.navigator.userAgent;
  window.alert(userAgent);
};

const clickCustomScheme = (element) => {
  window.location = element.innerText;
};

const selectFile = (event) => {
  const file = event.target.files[0];
  const blobURL = URL.createObjectURL(file);
  const img = document.createElement("img");
  img.onload = function () {
    window.alert(`width: ${img.width}\nheight: ${img.height}`);
  };
  img.src = blobURL;
};

const errorHandler = (error) => {
  window.alert(`Error(${error.name}): ${error.message}`);
};

const clickSavePhotoLibrary = () => {
  if (typeof window.navigator.share !== "function") {
    window.alert("Error: navigator.share() is not implemented.");
    return;
  }

  const img = document.getElementById("sample");

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const context = canvas.getContext("2d");
  context.drawImage(img, 0, 0);

  canvas.toBlob((blob) => {
    const file = new File([blob], "sample.png");
    const data = {
      files: [file],
    };
    window.navigator.share(data).catch(errorHandler);
  }, "image/png");
};

const clickDeviceLocation = () => {
  const successHandler = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    window.alert(`Latitude: ${latitude}\nLongitude: ${longitude}`);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0,
  };

  window.navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
};

const clickCameraMicrophone = () => {
  const video = document.querySelector("video");

  const constraints = {
    audio: true,
    video: {
      width: 400,
      height: 300,
      facingMode: {
        exact: "environment",
      },
    },
  };

  window.navigator.mediaDevices
    .getUserMedia(constraints)
    .then((mediaStream) => {
      video.srcObject = mediaStream;
    })
    .catch(errorHandler);

  video.play();
};

(() => {
  window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const queries = Object.fromEntries(params.entries());
    if ("history" in queries) {
      document.getElementById("history").innerText = queries.history;
    }
  };
})();
