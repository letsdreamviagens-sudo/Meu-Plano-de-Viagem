type Props = {
  label: string
  checked: boolean
  onToggle: () => void
}

export default function ChecklistItem({ label, checked, onToggle }: Props) {
  return (
    <div className={`row ${checked ? 'checked' : ''}`} onClick={onToggle} role="button">
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div
          style={{
            width: 18, height: 18, borderRadius: 6,
            border: '1px solid rgba(31,41,55,.10)',
            background: checked ? 'rgba(221,90,7,.18)' : 'rgba(131,172,222,.18)'
          }}
        />
        <div>
          <div style={{ fontWeight: 800, textDecoration: checked ? 'line-through' : 'none' }}>{label}</div>
          <div className="small">{checked ? 'feito ✅' : 'toque para marcar'}</div>
        </div>
      </div>
      <span className="badge">{checked ? 'OK' : 'Pendente'}</span>
    </div>
  )
}
