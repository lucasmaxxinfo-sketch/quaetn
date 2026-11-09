import { useEffect, useMemo, useState } from 'react'
import { Activity, Aperture, ArrowUpRight, Boxes, BrainCircuit, Check, ChevronDown, CircleHelp, Command, Compass, GitBranch, Layers3, MessageSquare, Plus, Send, Settings2, Sparkles, Workflow, X } from 'lucide-react'

type NodeKind = 'Vision' | 'Project' | 'Workflow' | 'Feature' | 'Question' | 'Decision'
type ModelNode = { id: string; title: string; kind: NodeKind; detail: string; status: string }
type Message = { id: string; role: 'creator' | 'quaetn'; text: string; time: string }
const seedNodes: ModelNode[] = [
  { id: 'vision', title: 'Creator intelligence', kind: 'Vision', detail: 'Learn and reproduce the creator’s individual process of turning ideas into finished software.', status: 'Core principle' },
  { id: 'discovery', title: 'Intelligent discovery', kind: 'Workflow', detail: 'Interpret natural communication, identify uncertainty, and ask the most useful next question.', status: 'In progress' },
  { id: 'sphere', title: 'Spatial headquarters', kind: 'Project', detail: 'A navigable Sphere backed by real objects and relationships.', status: 'Foundation' },
  { id: 'custom', title: 'Scoped customisation', kind: 'Feature', detail: 'Allow workflow, feature, UI, theme, and behaviour changes at the correct scope.', status: 'Planned' },
  { id: 'question', title: 'What are we creating?', kind: 'Question', detail: 'Start with the problem, opportunity, or outcome. The specification can emerge through conversation.', status: 'Open' },
]
const initialMessages: Message[] = [{ id: 'welcome', role: 'quaetn', text: 'I’m ready to understand what you want to create. Describe the problem, idea, example, or experience in your own way. I’ll interpret it, show you what I understand, and ask only what is useful next.', time: 'Now' }]
const kindIcon = (kind: NodeKind) => ({ Vision: Sparkles, Project: Boxes, Workflow, Feature: Layers3, Question: CircleHelp, Decision: Check })[kind]

function makeReply(input: string) {
  const lower = input.toLowerCase()
  if (/(change|custom|theme|colour|color|ui|interface|workflow|feature|different)/.test(lower)) {
    return 'I’m reading this as a change request. I’ll keep the request attached to the current project unless you tell me it should become a general creator preference. I’ve captured the intent; the next step is to identify the exact part of the experience and check what else it affects.'
  }
  if (/(build|create|make|want|idea|app|application|software)/.test(lower)) {
    return 'I’ve captured an initial creation intent. I won’t force it into a technical specification yet. First I’ll separate the outcome, the people involved, the important objects, and how you expect it to work. What should someone be able to accomplish when this is working?'
  }
  return 'I’ve captured that as part of the current context. I’m looking for the operating principle underneath it, including what it connects to and what it changes. What should happen immediately before or after this?'
}

export default function App() {
  const [nodes, setNodes] = useState<ModelNode[]>(() => {
    try { const saved = localStorage.getItem('quaetn.model.nodes'); return saved ? JSON.parse(saved) as ModelNode[] : seedNodes } catch { return seedNodes }
  })
  const [messages, setMessages] = useState<Message[]>(() => {
    try { const saved = localStorage.getItem('quaetn.conversation'); return saved ? JSON.parse(saved) as Message[] : initialMessages } catch { return initialMessages }
  })
  const [draft, setDraft] = useState('')
  const [selected, setSelected] = useState('vision')
  const [activeView, setActiveView] = useState('HQ')
  const [showModel, setShowModel] = useState(true)
  const [notice, setNotice] = useState('Your workspace is saved on this device')
  useEffect(() => { localStorage.setItem('quaetn.model.nodes', JSON.stringify(nodes)) }, [nodes])
  useEffect(() => { localStorage.setItem('quaetn.conversation', JSON.stringify(messages)) }, [messages])
  const current = useMemo(() => nodes.find(n => n.id === selected) ?? nodes[0], [nodes, selected])

  function sendMessage() {
    const text = draft.trim()
    if (!text) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const creator: Message = { id: crypto.randomUUID(), role: 'creator', text, time: now }
    const response: Message = { id: crypto.randomUUID(), role: 'quaetn', text: makeReply(text), time: now }
    setMessages(old => [...old, creator, response])
    setDraft('')
    setNotice('Intent captured in this workspace')
  }
  function addIdea() {
    const title = window.prompt('What should this idea or system object be called?')
    if (!title?.trim()) return
    const node: ModelNode = { id: crypto.randomUUID(), title: title.trim(), kind: 'Feature', detail: 'New creator-defined concept. Add context through the conversation to develop this model.', status: 'New' }
    setNodes(old => [...old, node]); setSelected(node.id); setNotice('New model object added')
  }

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Aperture size={21}/></div><div><strong>QUAETN</strong><span>TERILLIOM SYSTEMS</span></div></div>
      <div className="workspace-switch"><div className="workspace-icon">T</div><div><b>Terilliom HQ</b><small>Creator workspace</small></div><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div>
      {[[Compass,'HQ'],[BrainCircuit,'Creator model'],[Workflow,'Projects'],[Boxes,'Applications'],[GitBranch,'System map']].map(([Icon,label]) => { const I = Icon as typeof Compass; const name = label as string; return <button key={name} className={'nav-item '+(activeView===name?'active':'')} onClick={()=>setActiveView(name)}><I size={17}/><span>{name}</span>{name==='HQ'&&<i/>}</button> })}
      <div className="sidebar-bottom"><div className="status-line"><span className="status-dot"/> Core workspace active</div><button className="nav-item" onClick={()=>setNotice('Settings will be expanded as the platform foundation develops')}><Settings2 size={17}/>Settings</button><div className="profile"><div className="avatar">C</div><div><b>Creator</b><small>Founder access</small></div><MoreIcon/></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="crumb"><span>Terilliom</span><b>/</b><strong>{activeView}</strong></div><div className="top-actions"><span className="saved"><span className="status-dot"/> {notice}</span><button className="icon-button" aria-label="Command menu"><Command size={17}/></button><button className="avatar small">C</button></div></header>
      <section className="content">
        <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> CREATOR OPERATING SYSTEM</div><h1>Your ideas, <em>understood.</em></h1><p>Turn natural thoughts into connected systems and working software.</p></div><button className="new-button" onClick={addIdea}><Plus size={16}/> Add to model</button></div>
        <div className="stats"><div><span>MODEL OBJECTS</span><b>{nodes.length.toString().padStart(2,'0')}</b><small>Connected concepts</small></div><div><span>CONVERSATION</span><b>{messages.length}</b><small>Captured messages</small></div><div><span>CREATION MODE</span><b className="live-mode">Discovery</b><small>Learning the intent</small></div></div>
        <div className="work-grid">
          <section className="sphere-panel panel">
            <div className="panel-heading"><div><span className="section-kicker">SPATIAL SYSTEM MODEL</span><h2>The Sphere</h2></div><button className="subtle-button" onClick={()=>setShowModel(!showModel)}>{showModel?'Focus view':'Show details'} <ArrowUpRight size={14}/></button></div>
            <div className="sphere-stage">
              <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
              <div className="sphere-glow"/><div className="sphere-core"><Aperture size={43} strokeWidth={1.1}/><span>QUAETN</span></div>
              {nodes.map((node,i)=>{const angle=(i/nodes.length)*Math.PI*2-Math.PI/2;const radius= i===0?0:Math.min(190,105+(i%2)*52);const x=50+(i===0?0:Math.cos(angle)*radius/4.1);const y=50+(i===0?0:Math.sin(angle)*radius/2.45);const Icon=kindIcon(node.kind);return <button key={node.id} className={'sphere-node '+(selected===node.id?'selected':'')} style={{left:x+'%',top:y+'%'}} onClick={()=>setSelected(node.id)} title={node.title}><span className="node-icon"><Icon size={15}/></span><span className="node-label">{node.title}</span></button>})}
              <div className="sphere-caption"><span/> LIVE MODEL <span className="caption-divider"/> {nodes.length} OBJECTS</div>
            </div>
            {showModel&&current&&<div className="selected-object"><div className="object-icon"><Sparkles size={16}/></div><div className="object-copy"><span>{current.kind.toUpperCase()} · {current.status.toUpperCase()}</span><b>{current.title}</b><p>{current.detail}</p></div><button className="icon-button" aria-label="Close details" onClick={()=>setSelected('vision')}><ArrowUpRight size={16}/></button></div>}
            <div className="panel-footer"><span><i className="legend-dot cyan"/> Creator intent</span><span><i className="legend-dot violet"/> System relationship</span><span className="footer-note">Select a node to inspect it</span></div>
          </section>
          <section className="conversation-panel panel">
            <div className="panel-heading"><div><span className="section-kicker">INTELLIGENT DISCOVERY</span><h2>Work with Quaetn</h2></div><div className="ai-status"><span/> READY</div></div>
            <div className="conversation-context"><BrainCircuit size={16}/><span>Understanding your individual creation process</span></div>
            <div className="messages">{messages.map(m=><div key={m.id} className={'message '+m.role}><div className="message-avatar">{m.role==='quaetn'?<Aperture size={15}/>:<span>C</span>}</div><div className="message-body"><div className="message-meta"><b>{m.role==='quaetn'?'Quaetn':'You'}</b><time>{m.time}</time></div><p>{m.text}</p></div></div>)}</div>
            <div className="composer"><textarea value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}}} placeholder="Describe an idea, problem, example, or change..." rows={3}/><div className="composer-bottom"><span>Write naturally. Quaetn will interpret the intent.</span><button onClick={sendMessage} disabled={!draft.trim()}><Send size={15}/> Send</button></div></div>
          </section>
        </div>
        <div className="lower-grid"><section className="panel model-panel"><div className="panel-heading"><div><span className="section-kicker">CURRENT UNDERSTANDING</span><h2>What Quaetn knows</h2></div><span className="count-pill">{nodes.length} objects</span></div><div className="object-list">{nodes.slice(0,4).map(n=>{const I=kindIcon(n.kind);return <button key={n.id} className="object-row" onClick={()=>setSelected(n.id)}><span className="row-icon"><I size={16}/></span><span className="row-copy"><b>{n.title}</b><small>{n.kind} · {n.status}</small></span><ArrowUpRight size={15}/></button>})}</div></section>
          <section className="panel principle-panel"><div className="principle-icon"><Sparkles size={18}/></div><span className="section-kicker">FOUNDATIONAL PRINCIPLE</span><h2>Build according to the creator.</h2><p>Quaetn learns how you turn an imperfect thought into a finished system, then applies that process individually to each new application.</p><div className="principle-flow"><span>Listen</span><i>→</i><span>Decode</span><i>→</i><span>Build</span><i>→</i><span>Refine</span></div></section></div>
        <footer className="footer"><span>QUAETN · CREATOR HQ</span><span>EARLY FOUNDATION BUILD <b>0.1.0</b></span></footer>
      </section>
    </main>
  </div>
}
function MoreIcon(){return <Activity size={16} className="muted-icon"/>}
