import{_ as s,o as a,c as n,V as t}from"./chunks/framework.7caa47d6.js";const u=JSON.parse('{"title":"Bind attributes to your component","description":"","frontmatter":{},"headers":[],"relativePath":"starter/bind-attributes.md","filePath":"starter/bind-attributes.md"}'),o={name:"starter/bind-attributes.md"},e=t(`<h1 id="bind-attributes-to-your-component" tabindex="-1">Bind attributes to your component <a class="header-anchor" href="#bind-attributes-to-your-component" aria-label="Permalink to &quot;Bind attributes to your component&quot;">​</a></h1><p>As we have seen previously we know how to create a component and display it on our page, but this one is not yet dynamic, and this is precisely what you are going to work on with the binding of attributes.</p><h2 id="what-is-attribute-binding" tabindex="-1">What is attribute-binding ? <a class="header-anchor" href="#what-is-attribute-binding" aria-label="Permalink to &quot;What is attribute-binding ?&quot;">​</a></h2><p>Imagine your <code>input</code> component:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">datas</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">render</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">style</span><span style="color:#89DDFF;">){</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">datas</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">datas</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">placeholder</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Enter your name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/*html*/</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;input type=&quot;&quot; placeholder=&quot;&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>What if we want to make our <code>type</code> attribute dynamic? We would ideally want our <code>type</code> attribute to always equal our <code>datas[&#39;type&#39;]</code>.</p><p>To do this, we just have to specify on our <code>input</code> an <code>x-type</code> attribute whose value is equal to the name of the <code>datas</code> that we want to link to it, for example:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">datas</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">render</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">style</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">datas</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">render</span><span style="color:#F07178;">(</span><span style="color:#676E95;font-style:italic;">/*html*/</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">        &lt;input x-type=&quot;type&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>Now if we look in the DOM inspector we will observe the following thing:</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>The advantage here is that our attribute value is tied to the state of our component, so if we decide to change the value of <code>datas[&#39;type&#39;]</code> it will automatically affect the HTML element in the DOM. Combined with the data link this becomes much more powerful.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Adding the <code>x-</code> prefix in front of any attribute will bind its value to a piece of data, however there are special attributes that allow performing other actions like changing text, html content, displaying conditionally, doing a loop. You can <a href="./../resources/attributes.html">find them here</a>.</p></div>`,12),l=[e];function p(c,r,i,y,D,F){return a(),n("div",null,l)}const h=s(o,[["render",p]]);export{u as __pageData,h as default};
