'use client';

import { useMemo, useState } from 'react';

type Skill = {
  name: string; author: string; repo: string;
  category: 'Video' | 'Web' | 'Visual' | '3D'; categoryLabel: string;
  description: string; preview: string; previewType: 'video' | 'image';
  format: string; accent: string;
};

const skills: Skill[] = [
  { name: 'Vox Director', author: 'Alisa0808', repo: 'https://github.com/Alisa0808/vox-director', category: 'Video', categoryLabel: '视频制作', description: '从一个主题出发，自动完成 Vox 风格纸张拼贴解说视频。', preview: 'https://raw.githubusercontent.com/Alisa0808/vox-director/main/assets/showcase-tang.mp4', previewType: 'video', format: 'MP4', accent: '#f15a3b' },
  { name: 'Video Shotcraft', author: 'Vincentwei1021', repo: 'https://github.com/Vincentwei1021/video-shotcraft', category: 'Video', categoryLabel: '视频制作', description: '用 Remotion 和 152 张镜头配方卡制作电影感产品视频。', preview: 'https://github.com/user-attachments/assets/cba2df8a-4b2e-4247-bace-d0b1dea9c2bd', previewType: 'video', format: 'MP4', accent: '#dc8c35' },
  { name: 'Claude Remotion Skill', author: 'haidrrrry', repo: 'https://github.com/haidrrrry/claude-remotion-skill', category: 'Video', categoryLabel: '视频制作', description: '用 Remotion 完成动效、B-roll、字幕、声音设计与逐帧质检。', preview: 'https://raw.githubusercontent.com/haidrrrry/claude-remotion-skill/main/demo.mp4', previewType: 'video', format: 'MP4', accent: '#00a98f' },
  { name: 'Super Video Maker', author: 'Bomx', repo: 'https://github.com/Bomx/super-video-maker-skill', category: 'Video', categoryLabel: '视频制作', description: '覆盖数字人、AI B-roll、录屏、字幕与质检的完整制作流水线。', preview: 'https://opengraph.githubassets.com/1/Bomx/super-video-maker-skill', previewType: 'image', format: 'REPO', accent: '#8c6be8' },
  { name: 'Scroll Craft', author: 'nateherkai', repo: 'https://github.com/nateherkai/scroll-craft', category: 'Web', categoryLabel: '网页交互', description: '把滚动变成时间轴，生成并逐帧验证沉浸式叙事网站。', preview: 'https://raw.githubusercontent.com/nateherkai/scroll-craft/main/media/orrery.webp', previewType: 'image', format: 'WEBP', accent: '#397ec9' },
  { name: 'ThreeUI', author: 'MengTo', repo: 'https://github.com/MengTo/threeui', category: '3D', categoryLabel: '3D UI', description: '可直接探索、预览和复用的开源 Three.js 交互组件目录。', preview: 'https://raw.githubusercontent.com/MengTo/threeui/main/assets/preview.webm', previewType: 'video', format: 'WEBM', accent: '#37a86c' },
  { name: 'Minimal Zine Poster', author: 'LiamGvchi', repo: 'https://github.com/LiamGvchi/gc-minimal-zine-poster', category: 'Visual', categoryLabel: '视觉设计', description: '生成克制、安静的极简杂志风编辑海报与提示词。', preview: 'https://raw.githubusercontent.com/LiamGvchi/gc-minimal-zine-poster/main/examples/moon-tide.jpeg', previewType: 'image', format: 'JPG', accent: '#e2b329' },
];

const filters = [
  { value: 'All', label: '全部' }, { value: 'Video', label: '视频制作' },
  { value: 'Web', label: '网页交互' }, { value: 'Visual', label: '视觉设计' },
  { value: '3D', label: '3D UI' },
];

function ArrowIcon() { return <span aria-hidden="true">↗</span>; }

function Preview({ skill }: { skill: Skill }) {
  return (
    <div className="preview" style={{ '--accent': skill.accent } as React.CSSProperties}>
      {skill.previewType === 'video' ? (
        <video src={skill.preview} muted loop autoPlay playsInline preload="metadata" aria-label={`${skill.name} preview video`} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={skill.preview} alt={`${skill.name} preview`} loading="lazy" />
      )}
      <span className="format">{skill.format}</span>
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');
  const visibleSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesFilter = activeFilter === 'All' || skill.category === activeFilter;
      const matchesQuery = !q || [skill.name, skill.author, skill.description, skill.categoryLabel].join(' ').toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Community Skill Index home"><span className="brand-mark">C/S</span><span>Community Skill Index</span></a>
        <div className="nav-actions"><span className="status"><i />持续更新</span><a className="github-link" href="https://github.com/ella-wang-opus" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a></div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span>VOL. 01</span><span>OPEN SOURCE / AGENT SKILLS</span></div>
        <h1>值得收藏的<br /><em>Community Skills.</em></h1>
        <div className="hero-bottom">
          <p>一个持续更新的开源 Skill 图鉴。<br />发现创作者，浏览真实作品，找到下一次创作的起点。</p>
          <div className="edition"><strong>{String(skills.length).padStart(2, '0')}</strong><span>SKILLS<br />& COUNTING</span></div>
        </div>
      </section>

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-head">
          <div><span className="section-number">01</span><h2 id="catalog-title">The collection</h2></div>
          <label className="search"><span>⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 Skill 或作者" aria-label="搜索 Skill 或作者" /></label>
        </div>
        <div className="filters" aria-label="按类别筛选">
          {filters.map((filter) => (
            <button key={filter.value} type="button" className={activeFilter === filter.value ? 'active' : ''} onClick={() => setActiveFilter(filter.value)} aria-pressed={activeFilter === filter.value}>
              {filter.label}<sup>{filter.value === 'All' ? skills.length : skills.filter((skill) => skill.category === filter.value).length}</sup>
            </button>
          ))}
        </div>
        <div className="table" role="table" aria-label="Community skills">
          <div className="table-header" role="row"><span>Preview</span><span>Skill / Description</span><span>Category</span><span>Author</span><span>Source</span></div>
          <div className="table-body">
            {visibleSkills.map((skill, index) => (
              <article className="skill-row" role="row" key={skill.name}>
                <div className="cell-preview" role="cell"><Preview skill={skill} /></div>
                <div className="cell-info" role="cell"><span className="row-number">{String(index + 1).padStart(2, '0')}</span><h3>{skill.name}</h3><p>{skill.description}</p></div>
                <div className="cell-category" role="cell"><span>{skill.categoryLabel}</span></div>
                <div className="cell-author" role="cell"><span className="avatar">{skill.author.charAt(0).toUpperCase()}</span><a href={`https://github.com/${skill.author}`} target="_blank" rel="noreferrer">@{skill.author}</a></div>
                <div className="cell-source" role="cell"><a href={skill.repo} target="_blank" rel="noreferrer" aria-label={`Open ${skill.name} on GitHub`}><ArrowIcon /></a></div>
              </article>
            ))}
          </div>
          {visibleSkills.length === 0 && <p className="empty">没有找到匹配的 Skill。换个关键词试试。</p>}
        </div>
      </section>

      <section className="contribute">
        <span className="section-number">02</span><div><p>KNOW A GREAT SKILL?</p><h2>让好作品被更多人看见。</h2></div>
        <a href="https://github.com/ella-wang-opus" target="_blank" rel="noreferrer">推荐一个 Skill <ArrowIcon /></a>
      </section>
      <footer><span>Curated by Ella Wang</span><span>Last reviewed · Aug 2026</span><span>Open source, always evolving.</span></footer>
    </main>
  );
}
