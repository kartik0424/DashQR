// 🔐 Protect page
if (!localStorage.getItem("token")) {
  window.location.href = "login.html"
}

const token = localStorage.getItem("token")
const qrPreview = document.getElementById("qrPreview")

// 🧱 Initial QR
let qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "https://www.example.com",
  dotsOptions: {
    color: "#000",
    type: "square"
  },
  cornersSquareOptions: {
    type: "square",
    color: "#000"
  },
  cornersDotOptions: {
    type: "square",
    color: "#000"
  },
  backgroundOptions: {
    color: "#fff"
  }
})

qrCode.append(qrPreview)

// 🎯 Generate QR
document.getElementById("generateBtn").onclick = async () => {
  const url = document.getElementById("urlInput").value
  const color = document.getElementById("colorInput").value
  const bg = document.getElementById("bgInput").value

  const dotStyle = document.getElementById("dotStyle").value
  const cornerSquareStyle = document.getElementById("cornerSquareStyle").value
  const cornerDotStyle = document.getElementById("cornerDotStyle").value

  const useGradient = document.getElementById("useGradient").checked
  const gradColor1 = document.getElementById("gradColor1").value
  const gradColor2 = document.getElementById("gradColor2").value

  if (!url) {
    alert("Please enter URL!")
    return
  }

  // 🧠 Build dots options
  let dotsOptions = {
    type: dotStyle,
    color
  }

  if (useGradient) {
    dotsOptions = {
      type: dotStyle,
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: gradColor1 },
          { offset: 1, color: gradColor2 }
        ]
      }
    }
  }

  // 🔗 Create QR in backend
  const res = await fetch(`https://dashqr-backend.onrender.com/api/qr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      originalUrl: url,
      design: {
        dotStyle,
        cornerSquareStyle,
        cornerDotStyle,
        color,
        bg,
        gradient: useGradient ? [gradColor1, gradColor2] : null
      }
    })
  })

  const data = await res.json()

  // 🌐 Gateway URL (PC IP for phone scanning)
  const qrUrl = fetch(`https://dashqr-backend.onrender.com/q/${data.shortCode}`)

  // 🎨 Update QR Preview
  qrCode.update({
    data: qrUrl,

    dotsOptions,

    cornersSquareOptions: {
      type: cornerSquareStyle,
      color
    },

    cornersDotOptions: {
      type: cornerDotStyle,
      color
    },

    backgroundOptions: {
      color: bg
    }
  })
}

// ⬇️ Download
document.getElementById("downloadPng").onclick = () => {
  qrCode.download({ name: "dashqr", extension: "png" })
}

document.getElementById("downloadJpg").onclick = () => {
  qrCode.download({ name: "dashqr", extension: "jpg" })
}
