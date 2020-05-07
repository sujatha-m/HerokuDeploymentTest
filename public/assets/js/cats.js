// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.querySelectorAll('.change-sleep').forEach(button => {
  button.addEventListener('click', function (event) {
    const id = this.getAttribute('data-id')
    const newsleep = this.getAttribute('data-newsleep')

    fetch(`/api/cats/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sleepy: newsleep })
    }).then(response => {
      if (response.ok) location.reload()
      console.log(response)
    })
  })
})

document.getElementById('create-form').addEventListener('submit', event => {
  event.preventDefault()

  const newCat = {
    name: document.getElementById('catname').value.trim(),
    sleepy: document.querySelector('[name=sleepy]:checked').value.trim()
  }

  fetch(`/api/cats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCat)
  }).then(response => {
    console.log(response)
    if (response.ok) location.reload()
  })
})
