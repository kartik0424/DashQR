if (!localStorage.getItem("token")) {
  window.location.href = "login.html"
}

const token = localStorage.getItem("token")
const AP = "https://dashqr-backend.onrender.com/api"

const qrTable = document.getElementById("qrTable")
const qrPreviewBox = document.getElementById("qrPreviewBox")
const qrPreviewUrl = document.getElementById("qrPreviewUrl")

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
async function loadQrs() {
  const res = await fetch(`${AP}/qr`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const qrs = await res.json()

  qrTable.innerHTML = ""

  qrs.forEach(qr => {
    qrTable.innerHTML += `
      <tr>
        <td>${qr.shortCode}</td>
        <td>${qr.status}</td>
        <td>${qr.totalScan}</td>
        <td class="d-flex gap-2">
          <button class="btn btn-info btn-sm"
            onclick="previewQR('${qr.shortCode}', '${qr.originalUrl}')">
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
function previewQR(shortCode, originalUrl) {
  if (!qrPreviewBox) {
    console.error("qrPreviewBox not found in DOM")
    return
  }

  qrPreviewBox.innerHTML = ""

  const qrUrl = `${AP}/q/${shortCode}`

  const qrCode = new QRCodeStyling({
    width: 220,
    height: 220,
    data: qrUrl
  })

  qrCode.append(qrPreviewBox)
  qrPreviewUrl.innerText = qrUrl

  const modal = new bootstrap.Modal(
    document.getElementById("qrPreviewModal")
  )
  modal.show()
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
