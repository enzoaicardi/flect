import{_ as s,o as a,c as n,V as l}from"./chunks/framework.7caa47d6.js";const u=JSON.parse('{"title":"What are HTML Orphans ?","description":"","frontmatter":{},"headers":[],"relativePath":"issues/orphans.md","filePath":"issues/orphans.md"}'),t={name:"issues/orphans.md"},e=l(`<h1 id="what-are-html-orphans" tabindex="-1">What are HTML Orphans ? <a class="header-anchor" href="#what-are-html-orphans" aria-label="Permalink to &quot;What are HTML Orphans ?&quot;">​</a></h1><p>Orphaned HTML elements are elements that are considered by the HTML parser to be invalid outside of their parent. This concerns in particular the <code>td, th, tr, thead, tbody, tfoot</code> elements which are invalid if they are outside a <code>table</code> tag, as well as the majority of common tags in the HTML5 specification are not valid inside a <code>table</code> tag.</p><p>This limitation is due to the use of the <code>DOMParser()</code> of javascript, and is therefore not related to the operation of <code>flect</code>. This can cause many problems when creating your components when you use table elements.</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p>The examples below are invalid:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-FqHCL" id="tab-hLzZss4" checked="checked"><label for="tab-hLzZss4">tbody-component</label><input type="radio" name="group-FqHCL" id="tab-OdbCtED"><label for="tab-OdbCtED">tbody-custom-tr-component</label><input type="radio" name="group-FqHCL" id="tab-BCBDf_o"><label for="tab-BCBDf_o">custom-tr-component</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">table</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">datas</span><span style="color:#89DDFF;">){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/*html*/</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;table&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;tbody x-for=&quot;products&quot; var=&quot;item&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;tr&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                    &lt;td x-text=&quot;item.name&quot;&gt;&lt;/td&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                    &lt;td x-text=&quot;item.price&quot;&gt;&lt;/td&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;/table&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* invalid - render :</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        &lt;table&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">            &lt;tbody&gt;&lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        &lt;/table&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">table</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">datas</span><span style="color:#89DDFF;">){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/*html*/</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;table&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;tbody x-for=&quot;products&quot; var=&quot;item&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">                &lt;x-custom-tr x-item=&quot;item&quot;&gt;&lt;/x-custom-tr&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;/table&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* invalid - render :</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        &lt;table&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">            &lt;tbody&gt;&lt;/tbody&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        &lt;/table&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">custom-tr</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">datas</span><span style="color:#89DDFF;">){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/*html*/</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;tr&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;td x-text=&quot;item.name&quot;&gt;&lt;/td&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">            &lt;td x-text=&quot;item.price&quot;&gt;&lt;/td&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/* invalid - render :</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        &quot;&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div></div></div><h2 id="solution" tabindex="-1">Solution <a class="header-anchor" href="#solution" aria-label="Permalink to &quot;Solution&quot;">​</a></h2><p>The fastest solution is still to opt for creating a table with <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank" rel="noreferrer">CSS Grid</a>.</p>`,8),o=[e];function p(c,r,i,y,d,D){return a(),n("div",null,o)}const F=s(t,[["render",p]]);export{u as __pageData,F as default};
