
if (!localStorage.getItem("token")) {
  window.location.href = "login.html"
}

const token = localStorage.getItem("token")
const AP = "https://dashqr-backend.onrender.com/api"

const qrTable = document.getElementById("qrTable")
const qrPreviewBox = document.getElementById("qrPreviewBox")
const qrPreviewUrl = document.getElementById("qrPreviewUrl")

let qrList = []

// ================= STATS =================
async function loadStats() {
  const res = await fetch(`${AP}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()

  document.getElementById("totalQrs").innerText = data.totalQRCodes
  document.getElementById("activeQrs").innerText = data.activeQRCodes
  document.getElementById("pausedQrs").innerText = data.pausedQRCodes
  document.getElementById("totalScan").innerText = data.totalScan
}

// ================= QR LIST =================
let qrList = []

async function loadQrs() {
  const res = await fetch(`${AP}/qr`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  const data = await res.json()   // ✅ data is defined here

  if (!Array.isArray(data)) {
    console.error("Expected array, got:", data)
    return
  }

  qrList = data
  qrTable.innerHTML = ""

  data.forEach((qr, index) => {
    qrTable.innerHTML += `
      <tr>
        <td>${qr.shortCode}</td>
        <td>${qr.status}</td>
        <td>${qr.totalScans}</td>
        <td class="d-flex gap-1">
          <button class="btn btn-info btn-sm"
            onclick="previewQR(${index})">
            Preview
          </button>

          ${
            qr.status === "active"
              ? `<button class="btn btn-warning btn-sm" onclick="pauseQR('${qr._id}')">Pause</button>`
              : `<button class="btn btn-success btn-sm" onclick="resumeQR('${qr._id}')">Resume</button>`
          }

          <button class="btn btn-danger btn-sm"
            onclick="deleteQR('${qr._id}')">
            Delete
          </button>
        </td>
      </tr>
    `
  })
}

// ================= PREVIEW QR =================
function previewQR(index) {
  const qr = qrList[index]
  if (!qr || !qrPreviewBox) return

  qrPreviewBox.innerHTML = ""

  const design = qr.design || {}
  const qrUrl = `http://192.168.1.4:5000/q/${qr.shortCode}`

  let dotsOptions = {
    type: design.dotStyle || "square",
    color: design.color || "#000000"
  }

  if (design.gradient && design.gradient.length === 2) {
    dotsOptions = {
      type: design.dotStyle || "square",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: design.gradient[0] },
          { offset: 1, color: design.gradient[1] }
        ]
      }
    }
  }

  const qrCode = new QRCodeStyling({
    width: 220,
    height: 220,
    data: qrUrl,
    dotsOptions,
    cornersSquareOptions: {
      type: design.cornerSquareStyle || "square",
      color: design.color || "#000000"
    },
    cornersDotOptions: {
      type: design.cornerDotStyle || "square",
      color: design.color || "#000000"
    },
    backgroundOptions: {
      color: design.bg || "#ffffff"
    }
  })

  qrCode.append(qrPreviewBox)
  qrPreviewUrl.innerText = qrUrl

  new bootstrap.Modal(
    document.getElementById("qrPreviewModal")
  ).show()
}


// ================= ACTIONS =================
async function pauseQR(id) {
  await fetch(`${AP}/qr/${id}/pause`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  })
  loadStats()
  loadQrs()
}

async function resumeQR(id) {
  await fetch(`${AP}/qr/${id}/resume`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  })
  loadStats()
  loadQrs()
}

async function deleteQR(id) {
  const confirmDelete = confirm("Are you sure you want to delete this QR?")
  if (!confirmDelete) return

  await fetch(`${AP}/qr/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })

  loadStats()
  loadQrs()
}

// ================= INIT =================
loadStats()
loadQrs()
