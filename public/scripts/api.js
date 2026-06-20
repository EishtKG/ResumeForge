const API_BASE = '';

export async function tailorResume(resume, jobDescription) {
  const res = await fetch(`${API_BASE}/api/tailor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume, jobDescription }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(data.error || `Server error: ${res.status}`);
  }
  return res.json();
}
