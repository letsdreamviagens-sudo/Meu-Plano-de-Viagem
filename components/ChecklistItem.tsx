'use client'
import { useState } from 'react'

export default function ChecklistItem({ label }: { label: string }) {
  const [checked, setChecked] = useState(false)

  return (
    <div
      onClick={() => setChecked(!checked)}
      style={{
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        background: checked ? "#d1fae5" : "#fff",
        cursor: "pointer",
        border: "1px solid #ddd"
      }}
    >
      {checked ? "✅ " : "⬜ "} {label}
    </div>
  )
}
