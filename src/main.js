import './style.css'

const API_URL = 'https://kexsivbljgiclhkrampu.supabase.co/rest/v1/article'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtleHNpdmJsamdpY2xoa3JhbXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODQ0OTksImV4cCI6MjA5NTU2MDQ5OX0.WKmtvtFFfXASWZyUaDDQ0vQCH9AzRk57O94R8LxxJzY'

const articlesDiv = document.getElementById('articles')
const form = document.getElementById('articleForm')

const fetchArticles = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        apiKey: API_KEY,
      },
    })
    const data = await response.json()
    
    articlesDiv.innerHTML = data.map(a => `
      <div class="bg-white p-4 mb-4 rounded shadow">
        <h2 class="text-xl font-bold">${a.title}</h2>
        <h3 class="text-gray-600">${a.subtitle}</h3>
        <p class="text-sm text-gray-500">${a.author} • ${new Date(a.created_at).toLocaleDateString('pl-PL')}</p>
        <p class="mt-2">${a.content}</p>
      </div>
    `).join('')
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

const createNewArticle = async (article) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        apiKey: API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    })
    if (response.status !== 201) {
      throw new Error(`Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  await createNewArticle({
    title: document.getElementById('title').value,
    subtitle: document.getElementById('subtitle').value,
    author: document.getElementById('author').value,
    content: document.getElementById('content').value
  })
  
  form.reset()
  fetchArticles()
})

fetchArticles()