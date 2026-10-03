import { API_URL } from "./config";

export const getResumeId = () => sessionStorage.getItem("resumeId");

export async function fetchResume() {
  const id = getResumeId();
  if (!id) return null;
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Creates the resume if there is no id yet, otherwise updates it
export async function saveSection(fields) {
  let id = getResumeId();

  const send = (useId) =>
    fetch(useId ? `${API_URL}/${useId}` : API_URL, {
      method: useId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

  let res = await send(id);

  // stale id (resume no longer exists): start a fresh one
  if (res.status === 404 && id) {
    sessionStorage.removeItem("resumeId");
    res = await send(null);
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Save failed");

  sessionStorage.setItem("resumeId", data._id);
  return data;
}