const e=JSON.parse(`{"key":"v-07281c1a","path":"/tutorial/github/ssh-key.html","title":"Git SSH 密钥配置","lang":"zh-CN","frontmatter":{"title":"Git SSH 密钥配置","icon":"safe","date":"2024-01-11T00:00:00.000Z","category":["Git"],"tag":["ssh_key"],"description":"在 GitLab 中配置 SSH 密钥 生成 SSH 密钥对 如果您还没有 SSH 密钥对，请首先生成一对密钥。在终端中执行以下命令： ssh-keygen -t rsa -C \\"your.email@example.com\\" -b 4096","head":[["meta",{"property":"og:url","content":"https://oragekk.me/tutorial/github/ssh-key.html"}],["meta",{"property":"og:site_name","content":"Oragekk's Blog"}],["meta",{"property":"og:title","content":"Git SSH 密钥配置"}],["meta",{"property":"og:description","content":"在 GitLab 中配置 SSH 密钥 生成 SSH 密钥对 如果您还没有 SSH 密钥对，请首先生成一对密钥。在终端中执行以下命令： ssh-keygen -t rsa -C \\"your.email@example.com\\" -b 4096"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-12T03:45:54.000Z"}],["meta",{"property":"article:author","content":"Oragekk"}],["meta",{"property":"article:tag","content":"ssh_key"}],["meta",{"property":"article:published_time","content":"2024-01-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-12T03:45:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Git SSH 密钥配置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-11T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-12T03:45:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Oragekk\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[{"level":2,"title":"在 GitLab 中配置 SSH 密钥","slug":"在-gitlab-中配置-ssh-密钥","link":"#在-gitlab-中配置-ssh-密钥","children":[{"level":3,"title":"生成 SSH 密钥对","slug":"生成-ssh-密钥对","link":"#生成-ssh-密钥对","children":[]},{"level":3,"title":"复制公钥内容","slug":"复制公钥内容","link":"#复制公钥内容","children":[]},{"level":3,"title":"将您的SSH密钥添加到GitLab。","slug":"将您的ssh密钥添加到gitlab。","link":"#将您的ssh密钥添加到gitlab。","children":[]},{"level":3,"title":"验证 SSH 密钥","slug":"验证-ssh-密钥","link":"#验证-ssh-密钥","children":[]},{"level":3,"title":"测试 SSH 连接","slug":"测试-ssh-连接","link":"#测试-ssh-连接","children":[]}]}],"git":{"createdTime":1704972312000,"updatedTime":1705031154000,"contributors":[{"name":"oragekk","email":"oragekk@163.com","commits":2}]},"readingTime":{"minutes":1.99,"words":598},"filePathRelative":"tutorial/github/ssh-key.md","localizedDate":"2024年1月11日","excerpt":"<h2> 在 GitLab 中配置 SSH 密钥</h2>\\n<h3> 生成 SSH 密钥对</h3>\\n<p>如果您还没有 SSH 密钥对，请首先生成一对密钥。在终端中执行以下命令：</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"shiki one-dark-pro\\" style=\\"background-color: #282c34\\" tabindex=\\"0\\"><code><span class=\\"line\\"><span style=\\"color: #61AFEF\\">ssh-keygen</span><span style=\\"color: #ABB2BF\\"> </span><span style=\\"color: #D19A66\\">-t</span><span style=\\"color: #ABB2BF\\"> </span><span style=\\"color: #98C379\\">rsa</span><span style=\\"color: #ABB2BF\\"> </span><span style=\\"color: #D19A66\\">-C</span><span style=\\"color: #ABB2BF\\"> </span><span style=\\"color: #98C379\\">\\"your.email@example.com\\"</span><span style=\\"color: #ABB2BF\\"> </span><span style=\\"color: #D19A66\\">-b</span><span style=\\"color: #ABB2BF\\"> </span><span style=\\"color: #D19A66\\">4096</span></span>\\n<span class=\\"line\\"></span></code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","copyright":{"author":"Oragekk","license":"CC BY-NC-SA 4.0"},"autoDesc":true}`);export{e as data};