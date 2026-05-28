import { createClient } from '@supabase/supabase-js'
import './style.css'

// ⚠️ ZASTĄP SWOIMI DANYMI Z SUPABASE
const supabase = createClient(
  'https://kexsivbljgiclhkrampu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtleHNpdmJsamdpY2xoa3JhbXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODQ0OTksImV4cCI6MjA5NTU2MDQ5OX0.WKmtvtFFfXASWZyUaDDQ0vQCH9AzRk57O94R8LxxJzY'
)

const articlesDiv = document.getElementById('articles')
const form = document.getElementById('articleForm')

async function loadArticles() {
  const { data } = await supabase.from('article').select('*').order('created_at', { ascending: false })
  
  articlesDiv.innerHTML = data.map(a => `
    <div class="bg-white p-4 mb-4 rounded shadow">
      <h2 class="text-xl font-bold">${a.title}</h2>
      <h3 class="text-gray-600">${a.subtitle}</h3>
      <p class="text-sm text-gray-500">${a.author} • ${new Date(a.created_at).toLocaleDateString('pl-PL')}</p>
      <p class="mt-2">${a.content}</p>
    </div>
  `).join('')
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  await supabase.from('article').insert({
    title: document.getElementById('title').value,
    subtitle: document.getElementById('subtitle').value,
    author: document.getElementById('author').value,
    content: document.getElementById('content').value
  })
  
  form.reset()
  loadArticles()
})

loadArticles()