const downloadBtn = document.getElementById("downloadBtn");
const videoURL = document.getElementById("videoURL");

downloadBtn.addEventListener("click", async () => {
  const url = videoURL.value.trim();
  if (!url) {
    alert("Please enter a valid YouTube video URL!");
    return;
  }

  // Sending request to the backend
  try {
    downloadBtn.innerText = "Downloading...";
    const response = await fetch(`/download?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error("Failed to download the video!");
    }

    // Creating a temporary download link
    const blob = await response.blob();
    const tempUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = tempUrl;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(tempUrl);

    downloadBtn.innerText = "Download Video";
  } catch (error) {
    alert("Error: Unable to download the video!");
    console.error(error);
    downloadBtn.innerText = "Download Video";
  }
});
