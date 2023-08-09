

define('features', function(datas, render){

    datas['cases'] = [
        {
            title: '1 function',
            props: [
                [
                    'define',
                    'Define a web-component with a name, optionnaly a render function, and eventually a scoped style.',
                    '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #B392F0">define</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;counter&#39;</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">function</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">datas</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">render</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"><span style="color: #E1E4E8">    {</span></span>\n<span class="line"><span style="color: #E1E4E8">        datas[</span><span style="color: #9ECBFF">&#39;count&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">0</span></span>\n<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #B392F0">setInterval</span><span style="color: #E1E4E8">(()</span><span style="color: #F97583">=&gt;</span><span style="color: #E1E4E8">{</span></span>\n<span class="line"><span style="color: #E1E4E8">            datas[</span><span style="color: #9ECBFF">&#39;count&#39;</span><span style="color: #E1E4E8">]</span><span style="color: #F97583">++</span><span style="color: #E1E4E8">;</span></span>\n<span class="line"><span style="color: #E1E4E8">        })</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/* html */</span><span style="color: #E1E4E8">, </span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">            &lt;div x-text=&quot;count&quot;&gt;&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">        `</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"><span style="color: #E1E4E8">    }</span></span>\n<span class="line"><span style="color: #E1E4E8">)</span></span></code></pre>'
                ],
                ['datas', 'Access to your component related datas. Datas are one level deep only. Learn more in documentation.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #B392F0">define</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;counter&#39;</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">function</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">datas</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"><span style="color: #E1E4E8">    {</span></span>\n<span class="line"><span style="color: #E1E4E8">        datas[</span><span style="color: #9ECBFF">&#39;count&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">0</span><span style="color: #E1E4E8">; </span><span style="color: #6A737D">// custom data</span></span>\n<span class="line"><span style="color: #E1E4E8">        datas[</span><span style="color: #9ECBFF">&#39;body&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #6A737D">// this.childNodes</span></span>\n<span class="line"><span class="line"><span style="color: #E1E4E8">    }</span></span>\n<span class="line"><span style="color: #E1E4E8">)</span></span>\n<span class="line"></span>\n<span class="line"></span></code></pre>'],
                ['render', 'Render your HTML directly into your javascript. Enable the vscode es6-string-html extension to get syntax color.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #B392F0">define</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;counter&#39;</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">function</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">datas</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">render</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"><span style="color: #E1E4E8">    {</span></span>\n<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">            &lt;div x-text=&quot;content&quot;&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">                This is my element</span></span>\n<span class="line"><span style="color: #9ECBFF">            &lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">        `</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"><span style="color: #E1E4E8">    }</span></span>\n<span class="line"><span style="color: #E1E4E8">)</span></span></code></pre>'],
                ['style', 'Define scoped style (or not) for your components.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #B392F0">define</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;counter&#39;</span><span style="color: #E1E4E8">, </span><span style="color: #F97583">function</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">datas</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">render</span>, </span><span style="color: #FFAB70">style</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"><span style="color: #E1E4E8">    {</span></span>\n<span class="line"><span style="color: #E1E4E8">        </span><span style="color: #B392F0">style</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">$</span><span style="color: #F97583">=&gt;</span><span style="color: #6A737D">/*css*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">            ${</span><span style="color: #E1E4E8">$</span><span style="color: #9ECBFF">} {</span></span>\n<span class="line"><span style="color: #9ECBFF">                background-color: red;</span></span>\n<span class="line"><span style="color: #9ECBFF">            }</span></span>\n<span class="line"><span style="color: #9ECBFF">        `</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"><span style="color: #E1E4E8">    }</span></span>\n<span class="line"><span style="color: #E1E4E8">)</span></span></code></pre>']
            ]
        },
        {
            title: '7 attributes',
            props: [
                ['ref', 'Add element to component reference list.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div ref=&quot;div&quot;&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">        This is my element</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">ref</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;div&#39;</span><span style="color: #E1E4E8">).textContent </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">&#39;Im a reference !&#39;</span></span>\n<span class="line"></span></code></pre>'],
                ['x-text', 'Display textContent.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">datas[</span><span style="color: #9ECBFF">&#39;text&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">&#39;My content&#39;</span><span style="color: #E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div x-text=&quot;text&quot;&gt;&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">);</span></span></code></pre>'],
                ['x-html', 'Display innerHTML.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">datas[</span><span style="color: #9ECBFF">&#39;html&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">&#39;&lt;h1&gt;My content&lt;/h1&gt;&#39;</span><span style="color: #E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div x-html=&quot;html&quot;&gt;&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">);</span></span></code></pre>'],
                ['x-append', 'Append child elements.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">datas[</span><span style="color: #9ECBFF">&#39;el&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> document.</span><span style="color: #B392F0">createElement</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;div&#39;</span><span style="color: #E1E4E8">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div x-append=&quot;el&quot;&gt;&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">);</span></span></code></pre>'],
                ['x-prepend', 'Prepend child elements.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">datas[</span><span style="color: #9ECBFF">&#39;el&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> document.</span><span style="color: #B392F0">createElement</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;div&#39;</span><span style="color: #E1E4E8">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div x-prepend=&quot;el&quot;&gt;&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">);</span></span></code></pre>'],
                ['x-show', 'Add display none if your value is false.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">datas[</span><span style="color: #9ECBFF">&#39;bool&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">true</span><span style="color: #E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div x-show=&quot;bool&quot;&gt;Visible if bool is true&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">);</span></span></code></pre>'],
                ['datas', 'Pass a JSON object as data.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">&lt;</span><span style="color: #85E89D">x-component</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">datas-product</span><span style="color: #E1E4E8">=</span><span style="color: #9ECBFF">&#39;{&quot;name&quot;: &quot;Bag&quot;, &quot;price&quot;: 45}&#39;</span><span style="color: #E1E4E8">&gt;&lt;/</span><span style="color: #85E89D">x-component</span><span style="color: #E1E4E8">&gt;</span></span></code></pre>'],
            ]
        },
        {
            title: '7 methods',
            props: [
                ['this.ref', 'Return the first matching element with attribute ref=name.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div ref=&quot;div&quot;&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">        This is my element</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">ref</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;div&#39;</span><span style="color: #E1E4E8">).textContent </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #9ECBFF">&#39;Im a reference !&#39;</span></span>\n<span class="line"></span></code></pre>'],
                ['this.refs', 'Return an array of all matching elements with attribute ref=name.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div ref=&quot;div&quot;&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">        This is my element</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div ref=&quot;div&quot;&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">        This is my element</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">refs</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;div&#39;</span><span style="color: #E1E4E8">).</span><span style="color: #B392F0">forEach</span><span style="color: #E1E4E8">(</span><span style="color: #FFAB70">ref</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=&gt;</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">...</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"></span></code></pre>'],
                ['this.effect', 'Run a function when a filter is called.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #E1E4E8">datas[</span><span style="color: #9ECBFF">&#39;counter&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">0</span><span style="color: #E1E4E8">;</span></span>\n<span class="line"><span style="color: #B392F0">setInterval</span><span style="color: #E1E4E8">(()</span><span style="color: #F97583">=&gt;</span><span style="color: #E1E4E8"> datas[</span><span style="color: #9ECBFF">&#39;counter&#39;</span><span style="color: #E1E4E8">]</span><span style="color: #F97583">++</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">500</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">effect</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;counter&#39;</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">value</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=&gt;</span><span style="color: #E1E4E8"> console.</span><span style="color: #B392F0">log</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;counter is now :&#39;</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">+</span><span style="color: #E1E4E8"> value))</span></span>\n<span class="line"></span></code></pre>'],
                ['this.filter', 'Run a function when detecting a change on a dynamic data.', '<pre class="shiki" style="background-color: #24292e"><code><span class="line"><span style="color: #E1E4E8">datas[</span><span style="color: #9ECBFF">&#39;index&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #79B8FF">0</span><span style="color: #E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">filter</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;increment&#39;</span><span style="color: #E1E4E8">, </span><span style="color: #FFAB70">value</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=&gt;</span><span style="color: #E1E4E8"> value</span><span style="color: #F97583">++</span><span style="color: #E1E4E8">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div x-id="index|increment"&gt;&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">);</span></span></code></pre>'],
                ['this.iterable', 'Makes a number, string or array iterable by adding details to it as it is explored.', '<pre class="shiki" style="background-color: #24292e"><code><span class="line"><span style="color: #E1E4E8">datas[</span><span style="color: #9ECBFF">&#39;array&#39;</span><span style="color: #E1E4E8">] </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> [</span><span style="color: #79B8FF">9</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">8</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">7</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">6</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">5</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">4</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">3</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">2</span><span style="color: #E1E4E8">, </span><span style="color: #79B8FF">1</span><span style="color: #E1E4E8">]</span></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">iterable</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;array&#39;</span><span style="color: #E1E4E8">, </span><span style="color: #9ECBFF">&#39;iterable&#39;</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;x-for var="iterable" key="item"&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">        &lt;p&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">            Key : &lt;span x-text="item.key"&gt;&lt;/span&gt; |</span></span>\n<span class="line"><span style="color: #9ECBFF">            Value : &lt;span x-text="item.value"&gt;&lt;/span&gt; |</span></span>\n<span class="line"><span style="color: #9ECBFF">            Parent : &lt;span x-text="item.parent"&gt;&lt;/span&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">        &lt;/p&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;/x-for&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">)</span></span></code></pre>'],
                ['this.custom', 'Just an object where you can store custom properties and functions.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.custom.</span><span style="color: #B392F0">log</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=</span><span style="color: #E1E4E8"> </span><span style="color: #FFAB70">txt</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">=&gt;</span><span style="color: #E1E4E8">{</span></span>\n<span class="line"><span style="color: #E1E4E8">    console.</span><span style="color: #B392F0">log</span><span style="color: #E1E4E8">(</span><span style="color: #9ECBFF">&#39;log :&#39;</span><span style="color: #E1E4E8"> </span><span style="color: #F97583">+</span><span style="color: #E1E4E8"> txt)</span></span>\n<span class="line"><span style="color: #E1E4E8">};</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #79B8FF">this</span><span style="color: #E1E4E8">.</span><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div onclick=&quot;this.component.custom.log(&#39;hello&#39;)&quot;&gt;&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">);</span></span></code></pre>'],
                ['el.component', 'Access to the component from every child element.', '<pre class="shiki github-dark" style="background-color: #24292e" tabindex="0"><code><span class="line"><span style="color: #B392F0">render</span><span style="color: #E1E4E8">(</span><span style="color: #6A737D">/*html*/</span><span style="color: #9ECBFF">`</span></span>\n<span class="line"><span style="color: #9ECBFF">    &lt;div onclick=&quot;console.log(this.component)&quot;&gt;&lt;/div&gt;</span></span>\n<span class="line"><span style="color: #9ECBFF">`</span><span style="color: #E1E4E8">)</span></span>\n<span class="line"></span></span></code></pre>']
            ]
        },
        {
            title: '2 actions',
            props: [
                ['<x-if>', 'Display content if var is true. Work only inside of a component.', '<pre class="shiki" style="background-color: #24292e"><code><span class="line"><span style="color: #E1E4E8">&lt;</span><span style="color: #79B8FF">x-component</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"><span style="color: #E1E4E8">    &lt;</span><span style="color: #79B8FF">x-if</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">var</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"title"</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"><span style="color: #E1E4E8">        &lt;</span><span style="color: #85E89D">h1</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">x-text</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"title"</span><span style="color: #E1E4E8">&gt;My title&lt;/</span><span style="color: #85E89D">h1</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"><span style="color: #E1E4E8">    &lt;/</span><span style="color: #79B8FF">x-if</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"><span style="color: #E1E4E8">&lt;/</span><span style="color: #79B8FF">x-component</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"></span></code></pre>'],
                ['<x-for>', 'Loop over an array and clone content for every item. Get the item through a variable.', '<div id="shiki-output" class="active"><pre class="shiki" style="background-color: #24292e"><code><span class="line"><span style="color: #E1E4E8">&lt;</span><span style="color: #79B8FF">x-component</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"><span style="color: #E1E4E8">    &lt;</span><span style="color: #79B8FF">x-for</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">var</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"products"</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">key</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"item"</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"><span style="color: #E1E4E8">        &lt;</span><span style="color: #85E89D">h1</span><span style="color: #E1E4E8"> </span><span style="color: #B392F0">x-text</span><span style="color: #F97583">=</span><span style="color: #9ECBFF">"item.title"</span><span style="color: #E1E4E8">&gt;My title&lt;/</span><span style="color: #85E89D">h1</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"><span style="color: #E1E4E8">    &lt;/</span><span style="color: #79B8FF">x-for</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"><span style="color: #E1E4E8">&lt;/</span><span style="color: #79B8FF">x-component</span><span style="color: #E1E4E8">&gt;</span></span>\n<span class="line"></span></code></pre></div>']
            ]
        }
    ]

    this.iterable('cases', 'iterable');
    datas['props'] = 0;

    render(/*html*/`
        <div class="features">

            <div class="switch">
                <x-for var="iterable" key="case">
                    <button onclick="this.component.custom.switch(this)" ref="button" x-data-index="case.key" x-text="case.value.title">button</button>
                </x-for>
            </div>

            <div>
                <x-for var="props" key="prop">
                    <article class="case">
                        <div class="sidebar">
                            <h3 x-text="prop.0"></h3>
                            <p x-text="prop.1"></p>
                        </div>

                        <div class="code" x-html="prop.2"></div>
                    </article>
                </x-for>
            </div>

        </div>
    `)

    this.custom.switch = (el)=>{

        let item = datas['cases'][Number(el.dataset.index)];
        datas['props'] = item.props;

        this.refs('button').forEach(button => button.classList.remove('selected'));
        el.classList.add('selected');

    }

    this.custom.switch(this.ref('button'));

})