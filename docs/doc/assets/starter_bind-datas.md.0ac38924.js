import{_ as s,o as a,c as n,V as l}from"./chunks/framework.7caa47d6.js";const h=JSON.parse('{"title":"Bind datas to your component","description":"","frontmatter":{},"headers":[],"relativePath":"starter/bind-datas.md","filePath":"starter/bind-datas.md"}'),o={name:"starter/bind-datas.md"},t=l(`<h1 id="bind-datas-to-your-component" tabindex="-1">Bind datas to your component <a class="header-anchor" href="#bind-datas-to-your-component" aria-label="Permalink to &quot;Bind datas to your component&quot;">​</a></h1><p>Linking data to a component can be done via attributes, just like for classic HTML elements the <code>x-</code> prefix refers to dynamic data. Thus it is possible to pass data dynamically through the components.</p><p>The data entered in the attributes without the <code>x-</code> prefix are raw data, they can be retrieved directly from the component and manipulated as desired:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-3hX5O" id="tab-13JR5T2" checked="checked"><label for="tab-13JR5T2">index.html</label><input type="radio" name="group-3hX5O" id="tab-Kw7iUWM"><label for="tab-Kw7iUWM">components.js</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">x-component</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">John Doe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">x-component</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">component</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">datas</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">render</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/*html*/</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;p x-text=&quot;name&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div></div></div><p>The data entered in the attributes with the <code>x-</code> prefix are dynamic data that is passed to another component, so they can be used for communication between the components.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-1v9WG" id="tab-UqR8R6d" checked="checked"><label for="tab-UqR8R6d">index.html</label><input type="radio" name="group-1v9WG" id="tab-bImm0Kn"><label for="tab-bImm0Kn">parent.js</label><input type="radio" name="group-1v9WG" id="tab-WyxsHGo"><label for="tab-WyxsHGo">child.js</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">x-parent</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">John Doe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">x-parent</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">parent</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">datas</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">render</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/*html*/</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;x-child x-name=&quot;name&quot;&gt;&lt;/x-child&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">child</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">datas</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">render</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/*html*/</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;p x-text=&quot;name&quot;&gt;&lt;/p&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div></div></div>`,6),e=[t];function p(c,r,i,y,d,D){return a(),n("div",null,e)}const m=s(o,[["render",p]]);export{h as __pageData,m as default};
