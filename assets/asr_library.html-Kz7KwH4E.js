import{_ as l,r as p,o as t,c as d,a as s,b as n,d as e,e as i}from"./app-FOR18dDf.js";const r={},c=s("h1",{id:"speech-recognition-library",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#speech-recognition-library"},[s("span",null,"Speech Recognition (Library)")])],-1),o=s("p",null,"This example shows you a practical ASR example using ESPnet as a command line interface and library.",-1),u=s("p",null,"See also",-1),v={href:"https://colab.research.google.com/github/espnet/notebook/blob/master/asr_library.ipynb",target:"_blank",rel:"noopener noreferrer"},m=s("li",null,"documetation https://espnet.github.io/espnet/",-1),b=s("li",null,"github https://github.com/espnet",-1),h={href:"https://github.com/ShigekiKarita",target:"_blank",rel:"noopener noreferrer"},g=i(`<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><p>ESPnet depends on Kaldi ASR toolkit and Warp-CTC. This cell will take a few minutes.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># TODO(karita): put these lines in ./espnet/tools/setup_colab.sh</span></span>
<span class="line"><span># OS setup</span></span>
<span class="line"><span>!sudo apt-get install bc tree</span></span>
<span class="line"><span>!cat /etc/os-release</span></span>
<span class="line"><span></span></span>
<span class="line"><span># espnet setup</span></span>
<span class="line"><span>!git clone https://github.com/espnet/espnet</span></span>
<span class="line"><span>!cd espnet; pip install -e .</span></span>
<span class="line"><span>!mkdir espnet/tools/venv/bin; touch espnet/tools/venv/bin/activate</span></span>
<span class="line"><span></span></span>
<span class="line"><span># warp ctc setup</span></span>
<span class="line"><span>!git clone https://github.com/espnet/warp-ctc -b pytorch-1.1</span></span>
<span class="line"><span>!cd warp-ctc &amp;&amp; mkdir build &amp;&amp; cd build &amp;&amp; cmake .. &amp;&amp; make -j4</span></span>
<span class="line"><span>!cd warp-ctc/pytorch_binding &amp;&amp; python setup.py install </span></span>
<span class="line"><span></span></span>
<span class="line"><span># kaldi setup</span></span>
<span class="line"><span>!cd ./espnet/tools; git clone https://github.com/kaldi-asr/kaldi</span></span>
<span class="line"><span>!echo &quot;&quot; &gt; ./espnet/tools/kaldi/tools/extras/check_dependencies.sh # ignore check</span></span>
<span class="line"><span>!chmod +x ./espnet/tools/kaldi/tools/extras/check_dependencies.sh</span></span>
<span class="line"><span>!cd ./espnet/tools/kaldi/tools; make sph2pipe sclite</span></span>
<span class="line"><span>!rm -rf espnet/tools/kaldi/tools/python</span></span>
<span class="line"><span>![ ! -e ubuntu16-featbin.tar.gz ] &amp;&amp; wget https://18-198329952-gh.circle-artifacts.com/0/home/circleci/repo/ubuntu16-featbin.tar.gz</span></span>
<span class="line"><span>!tar -xf ./ubuntu16-featbin.tar.gz</span></span>
<span class="line"><span>!cp featbin/* espnet/tools/kaldi/src/featbin/</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="espnet-data-preparation" tabindex="-1"><a class="header-anchor" href="#espnet-data-preparation"><span>ESPnet data preparation</span></a></h2><p>You can use the end-to-end script <code>run.sh</code> for reproducing systems reported in <code>espnet/egs/*/asr1/RESULTS.md</code>. Typically, we organize <code>run.sh</code> with several stages:</p><ol start="0"><li>Data download (if available)</li><li>Kaldi-style data preparation</li><li>Dump useful data for traning (e.g., JSON, HDF5, etc)</li><li>Lanuage model training</li><li>ASR model training</li><li>Decoding and evaluation</li></ol><p>For example, if you add <code>--stop-stage 2</code>, you can stop the script before neural network training.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!cd espnet/egs/an4/asr1; ./run.sh  --ngpu 1 --stop-stage 2</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kaldi-style-directories" tabindex="-1"><a class="header-anchor" href="#kaldi-style-directories"><span>Kaldi-style directories</span></a></h2><p>Always we organize each recipe placed in <code>egs/xxx/asr1</code> in Kaldi way. For example, the important directories are:</p>`,10),_=s("li",null,[s("code",null,"conf/"),n(": kaldi configurations, e.g., speech feature")],-1),f=s("code",null,"data/",-1),q={href:"https://kaldi-asr.org/doc/data_prep.html",target:"_blank",rel:"noopener noreferrer"},k=s("li",null,[s("code",null,"exp/"),n(": intermidiate files through experiments, e.g., log files, model parameters")],-1),x=s("code",null,"fbank/",-1),y={href:"https://kaldi-asr.org/doc/io.html",target:"_blank",rel:"noopener noreferrer"},E=s("li",null,[s("code",null,"dump/"),n(": ESPnet meta data for tranining, e.g., json, hdf5")],-1),w=s("li",null,[s("code",null,"local/"),n(": corpus specific data preparation scripts")],-1),D={href:"https://github.com/kaldi-asr/kaldi/tree/master/egs/wsj/s5/steps",target:"_blank",rel:"noopener noreferrer"},j={href:"https://github.com/kaldi-asr/kaldi/tree/master/egs/wsj/s5/utils",target:"_blank",rel:"noopener noreferrer"},S=i(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!tree -L 1</span></span>
<span class="line"><span>!ls data/train</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="espnet-as-a-library" tabindex="-1"><a class="header-anchor" href="#espnet-as-a-library"><span>ESPnet as a library</span></a></h2><p>Here we use ESPnet as a library to create a simple Python snippet for speech recognition. ESPnet &#39;s training script&#39;<code>asr_train.py</code> has three parts:</p><ol><li>Load train/dev dataset</li><li>Create minibatches</li><li>Build neural networks</li><li>Update neural networks by iterating datasets</li></ol><p>Let&#39;s implement these procedures from scratch!</p><h3 id="load-train-dev-dataset-1-4" tabindex="-1"><a class="header-anchor" href="#load-train-dev-dataset-1-4"><span>Load train/dev dataset (1/4)</span></a></h3><p>First, we will check how <code>run.sh</code> organized the JSON files and load the pair of the speech feature and its transcription.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import json</span></span>
<span class="line"><span>import matplotlib.pyplot as plt</span></span>
<span class="line"><span>import kaldiio</span></span>
<span class="line"><span></span></span>
<span class="line"><span>root = &quot;espnet/egs/an4/asr1&quot;</span></span>
<span class="line"><span>with open(root + &quot;/dump/train_nodev/deltafalse/data.json&quot;, &quot;r&quot;) as f:</span></span>
<span class="line"><span>  train_json = json.load(f)[&quot;utts&quot;]</span></span>
<span class="line"><span>with open(root + &quot;/dump/train_dev/deltafalse/data.json&quot;, &quot;r&quot;) as f:</span></span>
<span class="line"><span>  dev_json = json.load(f)[&quot;utts&quot;]</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span># the first training data for speech recognition</span></span>
<span class="line"><span>key, info = next(iter(train_json.items()))</span></span>
<span class="line"><span></span></span>
<span class="line"><span># plot the 80-dim fbank + 3-dim pitch speech feature</span></span>
<span class="line"><span>fbank = kaldiio.load_mat(info[&quot;input&quot;][0][&quot;feat&quot;])</span></span>
<span class="line"><span>plt.matshow(fbank.T[::-1])</span></span>
<span class="line"><span>plt.title(key + &quot;: &quot; + info[&quot;output&quot;][0][&quot;text&quot;])</span></span>
<span class="line"><span></span></span>
<span class="line"><span># print the key-value pair</span></span>
<span class="line"><span>key, info</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="create-minibatches-2-4" tabindex="-1"><a class="header-anchor" href="#create-minibatches-2-4"><span>Create minibatches (2/4)</span></a></h3><p>To parallelize neural network training, we create minibatches that containes several sequence pairs by splitting datasets.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>from espnet.utils.training.batchfy import make_batchset</span></span>
<span class="line"><span></span></span>
<span class="line"><span>batch_size = 32</span></span>
<span class="line"><span>trainset = make_batchset(train_json, batch_size)</span></span>
<span class="line"><span>devset = make_batchset(dev_json, batch_size)</span></span>
<span class="line"><span>assert len(devset[0]) == batch_size</span></span>
<span class="line"><span>devset[0][:3]</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="build-neural-networks-3-4" tabindex="-1"><a class="header-anchor" href="#build-neural-networks-3-4"><span>Build neural networks (3/4)</span></a></h3>`,12),T={href:"https://papers.nips.cc/paper/7181-attention-is-all-you-need.pdf",target:"_blank",rel:"noopener noreferrer"},z=i(`<p>NOTE: You can also use your custom model in command line tools as <code>asr_train.py --model-module your_module:YourModel</code></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import argparse</span></span>
<span class="line"><span>from espnet.bin.asr_train import get_parser</span></span>
<span class="line"><span>from espnet.nets.pytorch_backend.e2e_asr import E2E</span></span>
<span class="line"><span></span></span>
<span class="line"><span>parser = get_parser()</span></span>
<span class="line"><span>parser = E2E.add_arguments(parser)</span></span>
<span class="line"><span>config = parser.parse_args([</span></span>
<span class="line"><span>    &quot;--mtlalpha&quot;, &quot;0.0&quot;,  # weight for cross entropy and CTC loss</span></span>
<span class="line"><span>    &quot;--outdir&quot;, &quot;out&quot;, &quot;--dict&quot;, &quot;&quot;])  # TODO: allow no arg</span></span>
<span class="line"><span></span></span>
<span class="line"><span>idim = info[&quot;input&quot;][0][&quot;shape&quot;][1]</span></span>
<span class="line"><span>odim = info[&quot;output&quot;][0][&quot;shape&quot;][1]</span></span>
<span class="line"><span>setattr(config, &quot;char_list&quot;, [])</span></span>
<span class="line"><span>model = E2E(idim, odim, config)</span></span>
<span class="line"><span>model</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="update-neural-networks-by-iterating-datasets-4-4" tabindex="-1"><a class="header-anchor" href="#update-neural-networks-by-iterating-datasets-4-4"><span>Update neural networks by iterating datasets (4/4)</span></a></h3><p>Finaly, we got the training part.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import numpy</span></span>
<span class="line"><span>import torch</span></span>
<span class="line"><span>from torch.nn.utils.rnn import pad_sequence</span></span>
<span class="line"><span>from torch.nn.utils.clip_grad import clip_grad_norm_</span></span>
<span class="line"><span>from torch.utils.data import DataLoader</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def collate(minibatch):</span></span>
<span class="line"><span>  fbanks = []</span></span>
<span class="line"><span>  tokens = []</span></span>
<span class="line"><span>  for key, info in minibatch[0]:</span></span>
<span class="line"><span>    fbanks.append(torch.tensor(kaldiio.load_mat(info[&quot;input&quot;][0][&quot;feat&quot;])))</span></span>
<span class="line"><span>    tokens.append(torch.tensor([int(s) for s in info[&quot;output&quot;][0][&quot;tokenid&quot;].split()]))</span></span>
<span class="line"><span>  ilens = torch.tensor([x.shape[0] for x in fbanks])</span></span>
<span class="line"><span>  return pad_sequence(fbanks, batch_first=True), ilens, pad_sequence(tokens, batch_first=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>train_loader = DataLoader(trainset, collate_fn=collate, shuffle=True, pin_memory=True)</span></span>
<span class="line"><span>dev_loader = DataLoader(devset, collate_fn=collate, pin_memory=True)</span></span>
<span class="line"><span>model.cuda()</span></span>
<span class="line"><span>optim = torch.optim.Adam(model.parameters(), lr=0.001, betas=(0.9, 0.98))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>n_iter = len(trainset)</span></span>
<span class="line"><span>n_epoch = 10</span></span>
<span class="line"><span>total_iter = n_iter * n_epoch</span></span>
<span class="line"><span>train_acc = []</span></span>
<span class="line"><span>valid_acc = []</span></span>
<span class="line"><span>for epoch in range(n_epoch):</span></span>
<span class="line"><span>  # training</span></span>
<span class="line"><span>  acc = []</span></span>
<span class="line"><span>  model.train()</span></span>
<span class="line"><span>  for data in train_loader:</span></span>
<span class="line"><span>    loss = model(*[d.cuda() for d in data])</span></span>
<span class="line"><span>    optim.zero_grad()</span></span>
<span class="line"><span>    loss.backward()</span></span>
<span class="line"><span>    acc.append(model.acc)</span></span>
<span class="line"><span>    norm = clip_grad_norm_(model.parameters(), 10.0)</span></span>
<span class="line"><span>    optim.step()</span></span>
<span class="line"><span>  train_acc.append(numpy.mean(acc))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # validation</span></span>
<span class="line"><span>  acc = []</span></span>
<span class="line"><span>  model.eval()</span></span>
<span class="line"><span>  for data in dev_loader:</span></span>
<span class="line"><span>    model(*[d.cuda() for d in data])</span></span>
<span class="line"><span>    acc.append(model.acc)</span></span>
<span class="line"><span>  valid_acc.append(numpy.mean(acc))</span></span>
<span class="line"><span>  print(f&quot;epoch: {epoch}, train acc: {train_acc[-1]:.3f}, dev acc: {valid_acc[-1]:.3f}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import matplotlib.pyplot as plt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plt.plot(range(len(train_acc)), train_acc, label=&quot;train acc&quot;)</span></span>
<span class="line"><span>plt.plot(range(len(valid_acc)), valid_acc, label=&quot;dev acc&quot;)</span></span>
<span class="line"><span>plt.grid()</span></span>
<span class="line"><span>plt.legend()</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>torch.save(model.state_dict(), &quot;best.pt&quot;)</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="recognize-speech" tabindex="-1"><a class="header-anchor" href="#recognize-speech"><span>Recognize speech</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import json</span></span>
<span class="line"><span>import matplotlib.pyplot as plt</span></span>
<span class="line"><span>import kaldiio</span></span>
<span class="line"><span>from espnet.bin.asr_recog import get_parser</span></span>
<span class="line"><span></span></span>
<span class="line"><span># load data</span></span>
<span class="line"><span>root = &quot;espnet/egs/an4/asr1&quot;</span></span>
<span class="line"><span>with open(root + &quot;/dump/test/deltafalse/data.json&quot;, &quot;r&quot;) as f:</span></span>
<span class="line"><span>  test_json = json.load(f)[&quot;utts&quot;]</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>key, info = list(test_json.items())[10]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># plot the 80-dim fbank + 3-dim pitch speech feature</span></span>
<span class="line"><span>fbank = kaldiio.load_mat(info[&quot;input&quot;][0][&quot;feat&quot;])</span></span>
<span class="line"><span>plt.matshow(fbank.T[::-1])</span></span>
<span class="line"><span>plt.title(key + &quot;: &quot; + info[&quot;output&quot;][0][&quot;text&quot;])</span></span>
<span class="line"><span></span></span>
<span class="line"><span># load token dict</span></span>
<span class="line"><span>with open(root + &quot;/data/lang_1char/train_nodev_units.txt&quot;, &quot;r&quot;) as f:</span></span>
<span class="line"><span>  token_list = [entry.split()[0] for entry in f]</span></span>
<span class="line"><span>token_list.insert(0, &#39;&lt;blank&gt;&#39;)</span></span>
<span class="line"><span>token_list.append(&#39;&lt;eos&gt;&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># recognize speech</span></span>
<span class="line"><span>parser = get_parser()</span></span>
<span class="line"><span>args = parser.parse_args([</span></span>
<span class="line"><span>    &quot;--beam-size&quot;, &quot;1&quot;,</span></span>
<span class="line"><span>    &quot;--ctc-weight&quot;, &quot;0&quot;,</span></span>
<span class="line"><span>    &quot;--result-label&quot;, &quot;out.json&quot;,</span></span>
<span class="line"><span>    &quot;--model&quot;, &quot;&quot;</span></span>
<span class="line"><span>])</span></span>
<span class="line"><span>model.cpu()</span></span>
<span class="line"><span>model.eval()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def to_str(result):</span></span>
<span class="line"><span>  return &quot;&quot;.join(token_list[y] for y in result[0][&quot;yseq&quot;]) \\</span></span>
<span class="line"><span>    .replace(&quot;&lt;eos&gt;&quot;, &quot;&quot;).replace(&quot;&lt;space&gt;&quot;, &quot; &quot;).replace(&quot;&lt;blank&gt;&quot;, &quot;&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&quot;groundtruth:&quot;, info[&quot;output&quot;][0][&quot;text&quot;])</span></span>
<span class="line"><span>print(&quot;prediction: &quot;, to_str(model.recognize(fbank, args, token_list)))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,10);function L(K,O){const a=p("ExternalLinkIcon");return t(),d("div",null,[c,o,u,s("ul",null,[s("li",null,[n("run in "),s("a",v,[n("colab"),e(a)])]),m,b]),s("p",null,[n("Author: "),s("a",h,[n("Shigeki Karita"),e(a)])]),g,s("ul",null,[_,s("li",null,[f,n(": almost raw "),s("a",q,[n("data prepared by Kaldi"),e(a)])]),k,s("li",null,[x,n(": speech feature binary files, e.g., "),s("a",y,[n("ark, scp"),e(a)])]),E,w,s("li",null,[s("a",D,[n("steps/"),e(a)]),n(", "),s("a",j,[n("utils/"),e(a)]),n(": Kaldi's helper scripts")])]),S,s("p",null,[n("For simplicity, we use a predefined model: "),s("a",T,[n("Transformer"),e(a)]),n(".")]),z])}const C=l(r,[["render",L],["__file","asr_library.html.vue"]]);export{C as default};
