import{_ as i,r as l,o as p,c as t,a as s,d as a,b as e,e as o}from"./app-FOR18dDf.js";const c={},r={href:"https://colab.research.google.com/github/espnet/notebook/blob/master/espnet2_tts_realtime_demo.ipynb",target:"_blank",rel:"noopener noreferrer"},d=s("img",{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"},null,-1),u=s("h1",{id:"cmu-11492-11692-spring-2023-text-to-speech",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#cmu-11492-11692-spring-2023-text-to-speech"},[s("span",null,"CMU 11492/11692 Spring 2023: Text to Speech")])],-1),v=s("p",null,"In this demonstration, we will show you some demonstrations of text to speech systems in ESPnet.",-1),m=s("p",null,"Main references:",-1),b={href:"https://github.com/espnet/espnet",target:"_blank",rel:"noopener noreferrer"},h={href:"https://espnet.github.io/espnet/",target:"_blank",rel:"noopener noreferrer"},_=s("p",null,"Author:",-1),f=s("ul",null,[s("li",null,"Siddhant Arora (siddhana@andrew.cmu.edu)")],-1),g={href:"https://colab.research.google.com/github/espnet/notebook/blob/master/espnet2_tts_realtime_demo.ipynb",target:"_blank",rel:"noopener noreferrer"},k=o(`<h2 id="❗important-notes❗" tabindex="-1"><a class="header-anchor" href="#❗important-notes❗"><span>❗Important Notes❗</span></a></h2><ul><li>We are using Colab to show the demo. However, Colab has some constraints on the total GPU runtime. If you use too much GPU time, you may not be able to use GPU for some time.</li><li>There are multiple in-class checkpoints ✅ throughout this tutorial. <strong>Your participation points are based on these tasks.</strong> Please try your best to follow all the steps! If you encounter issues, please notify the TAs as soon as possible so that we can make an adjustment for you.</li><li>Please submit PDF files of your completed notebooks to Gradescope. You can print the notebook using <code>File -&gt; Print</code> in the menu bar.</li></ul><h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># NOTE: pip shows imcompatible errors due to preinstalled libraries but you do not need to care</span></span>
<span class="line"><span>!pip install typeguard==2.13.3</span></span>
<span class="line"><span>!git clone --depth 5 -b spoken_dialog_demo https://github.com/siddhu001/espnet.git</span></span>
<span class="line"><span>!cd espnet &amp;&amp; pip install .</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!pip install parallel_wavegan==0.5.4 </span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!pip install pyopenjtalk==0.2</span></span>
<span class="line"><span>!pip install pypinyin==0.44.0 </span></span>
<span class="line"><span>!pip install parallel_wavegan==0.5.4 </span></span>
<span class="line"><span>!pip install gdown==4.4.0</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!pip install espnet_model_zoo</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="single-speaker-tts-model-demo" tabindex="-1"><a class="header-anchor" href="#single-speaker-tts-model-demo"><span>Single speaker TTS model demo</span></a></h2><h3 id="tts-model" tabindex="-1"><a class="header-anchor" href="#tts-model"><span>TTS Model</span></a></h3><p>You can try end-to-end text2wav model &amp; combination of text2mel and vocoder.<br> If you use text2wav model, you do not need to use vocoder (automatically disabled).</p><p><strong>Text2wav models</strong>:</p><ul><li>VITS</li></ul><p><strong>Text2mel models</strong>:</p><ul><li>Tacotron2</li><li>Transformer-TTS</li><li>(Conformer) FastSpeech</li><li>(Conformer) FastSpeech2</li></ul><p><strong>Vocoders</strong>:</p><ul><li>Griffin Lim</li><li>Parallel WaveGAN</li><li>Multi-band MelGAN</li><li>HiFiGAN</li><li>Style MelGAN.</li></ul><p>In this demo, we will only experiment with the English TTS model, but ESPnet-TTS supports multiple languages like Japanese and Mandarin.</p><blockquote><p>The terms of use follow that of each corpus. ESPnet-TTS use the following corpora:</p></blockquote><ul><li><code>ljspeech_*</code>: LJSpeech dataset <ul><li>https://keithito.com/LJ-Speech-Dataset/</li></ul></li><li><code>jsut_*</code>: JSUT corpus <ul><li>https://sites.google.com/site/shinnosuketakamichi/publication/jsut</li></ul></li><li><code>jvs_*</code>: JVS corpus + JSUT corpus <ul><li>https://sites.google.com/site/shinnosuketakamichi/research-topics/jvs_corpus</li><li>https://sites.google.com/site/shinnosuketakamichi/publication/jsut</li></ul></li><li><code>tsukuyomi_*</code>: つくよみちゃんコーパス + JSUT corpus <ul><li>https://tyc.rei-yumesaki.net/material/corpus/</li><li>https://sites.google.com/site/shinnosuketakamichi/publication/jsut</li></ul></li><li><code>csmsc_*</code>: Chinese Standard Mandarin Speech Corpus <ul><li>https://www.data-baker.com/open_source.html</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>#@title Download English model { run: &quot;auto&quot; }</span></span>
<span class="line"><span>lang = &#39;English&#39;</span></span>
<span class="line"><span>tag = &quot;kan-bayashi/ljspeech_vits&quot; #@param [&quot;kan-bayashi/ljspeech_tacotron2&quot;, &quot;kan-bayashi/ljspeech_fastspeech&quot;, &quot;kan-bayashi/ljspeech_vits&quot;]</span></span>
<span class="line"><span>vocoder_tag = &quot;none&quot; #@param [&quot;none&quot;, &quot;parallel_wavegan/ljspeech_parallel_wavegan.v1&quot;]</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!gdown --id &quot;1PjT9FX13d7Mv6loCs-wv5R_v3QrmLixf&amp;confirm=t&quot; -O /content/tts_model.zip</span></span>
<span class="line"><span>!unzip /content/tts_model.zip -d /content/tts_model</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="model-setup" tabindex="-1"><a class="header-anchor" href="#model-setup"><span>Model Setup</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>from espnet2.bin.tts_inference import Text2Speech</span></span>
<span class="line"><span>from espnet2.utils.types import str_or_none</span></span>
<span class="line"><span></span></span>
<span class="line"><span>text2speech = Text2Speech.from_pretrained(</span></span>
<span class="line"><span>    train_config=&quot;/content/tts_model/exp/tts_train_vits_raw_phn_tacotron_g2p_en_no_space/config.yaml&quot;,</span></span>
<span class="line"><span>    model_file=&quot;/content/tts_model/exp/tts_train_vits_raw_phn_tacotron_g2p_en_no_space/train.total_count.ave_10best.pth&quot;,</span></span>
<span class="line"><span>    vocoder_tag=str_or_none(vocoder_tag),</span></span>
<span class="line"><span>    device=&quot;cuda&quot;,</span></span>
<span class="line"><span>    # Only for Tacotron 2 &amp; Transformer</span></span>
<span class="line"><span>    threshold=0.5,</span></span>
<span class="line"><span>    # Only for Tacotron 2</span></span>
<span class="line"><span>    minlenratio=0.0,</span></span>
<span class="line"><span>    maxlenratio=10.0,</span></span>
<span class="line"><span>    use_att_constraint=False,</span></span>
<span class="line"><span>    backward_window=1,</span></span>
<span class="line"><span>    forward_window=3,</span></span>
<span class="line"><span>    # Only for FastSpeech &amp; FastSpeech2 &amp; VITS</span></span>
<span class="line"><span>    speed_control_alpha=1.0,</span></span>
<span class="line"><span>    # Only for VITS</span></span>
<span class="line"><span>    noise_scale=0.333,</span></span>
<span class="line"><span>    noise_scale_dur=0.333,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="synthesis-✅-checkpoint-1-2-point" tabindex="-1"><a class="header-anchor" href="#synthesis-✅-checkpoint-1-2-point"><span>Synthesis (✅ Checkpoint 1 (2 point))</span></a></h3><p>Run inference of pretrained single-speaker TTS model. Please experiment with running TTS model on different utterances. Provide some examples of failure cases and plot spectrogram and waveform of the utterances for both successful and failure cases. (1 point)</p><p>Please also discuss possible explanation of these failure cases. (1 point)</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import time</span></span>
<span class="line"><span>import torch</span></span>
<span class="line"><span></span></span>
<span class="line"><span># decide the input sentence by yourself</span></span>
<span class="line"><span>print(f&quot;Input your favorite sentence in {lang}.&quot;)</span></span>
<span class="line"><span>x = input()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># synthesis</span></span>
<span class="line"><span>with torch.no_grad():</span></span>
<span class="line"><span>    start = time.time()</span></span>
<span class="line"><span>    wav = text2speech(x)[&quot;wav&quot;]</span></span>
<span class="line"><span>rtf = (time.time() - start) / (len(wav) / text2speech.fs)</span></span>
<span class="line"><span>print(f&quot;RTF = {rtf:5f}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># let us listen to generated samples</span></span>
<span class="line"><span>from IPython.display import display, Audio</span></span>
<span class="line"><span>display(Audio(wav.view(-1).cpu().numpy(), rate=text2speech.fs))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tts-model-selection" tabindex="-1"><a class="header-anchor" href="#tts-model-selection"><span>TTS Model selection</span></a></h3><h3 id="question2-✅-checkpoint-2-1-point" tabindex="-1"><a class="header-anchor" href="#question2-✅-checkpoint-2-1-point"><span>Question2 (✅ Checkpoint 2 (1 point))</span></a></h3><p>Please experiment with running different TTS models like Tacotron or FastSpeech. Please also experiment both with Griffin Lim and Parallel WaveGAN vocoder. Please discuss which is better and why.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>#@title Download English model { run: &quot;auto&quot; }</span></span>
<span class="line"><span>lang = &#39;English&#39;</span></span>
<span class="line"><span>tag = &quot;kan-bayashi/ljspeech_tacotron2&quot; #@param [&quot;kan-bayashi/ljspeech_tacotron2&quot;, &quot;kan-bayashi/ljspeech_fastspeech&quot;, &quot;kan-bayashi/ljspeech_vits&quot;]</span></span>
<span class="line"><span>vocoder_tag = &quot;none&quot; #@param [&quot;none&quot;, &quot;parallel_wavegan/ljspeech_parallel_wavegan.v1&quot;]</span></span>
<span class="line"><span># when vocoder_tag is none, Griffin Lim algorithm is used</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!gdown --id &quot;1PXsSaulipN31HnQ8YWwsi9Ndb3B2My-J&amp;confirm=t&quot; -O /content/tts_tacotron_model.zip</span></span>
<span class="line"><span>!unzip /content/tts_tacotron_model.zip -d /content/tts_tacotron_model</span></span>
<span class="line"><span>#For fastspeech model run the commented lines below</span></span>
<span class="line"><span>#!gdown --id &quot;13Jek_NbI8Qai42v4GKYxx3-jXOun5m2-&amp;confirm=t&quot; -O /content/tts_fastspeech_model.zip</span></span>
<span class="line"><span>#!unzip /content/tts_fastspeech_model.zip -d /content/tts_fastspeech_model</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>from espnet2.bin.tts_inference import Text2Speech</span></span>
<span class="line"><span>from espnet2.utils.types import str_or_none</span></span>
<span class="line"><span>!ln -sf /content/tts_tacotron_model/exp .</span></span>
<span class="line"><span>text2speech = Text2Speech.from_pretrained(</span></span>
<span class="line"><span>    # model_tag=str_or_none(tag),</span></span>
<span class="line"><span>    train_config=&quot;/content/tts_tacotron_model/exp/tts_train_tacotron2_raw_phn_tacotron_g2p_en_no_space/config.yaml&quot;,</span></span>
<span class="line"><span>    model_file=&quot;/content/tts_tacotron_model/exp/tts_train_tacotron2_raw_phn_tacotron_g2p_en_no_space/199epoch.pth&quot;,</span></span>
<span class="line"><span>    vocoder_tag=str_or_none(vocoder_tag),</span></span>
<span class="line"><span>    device=&quot;cuda&quot;,</span></span>
<span class="line"><span>    # Only for Tacotron 2 &amp; Transformer</span></span>
<span class="line"><span>    threshold=0.5,</span></span>
<span class="line"><span>    # Only for Tacotron 2</span></span>
<span class="line"><span>    minlenratio=0.0,</span></span>
<span class="line"><span>    maxlenratio=10.0,</span></span>
<span class="line"><span>    use_att_constraint=False,</span></span>
<span class="line"><span>    backward_window=1,</span></span>
<span class="line"><span>    forward_window=3,</span></span>
<span class="line"><span>    # Only for FastSpeech &amp; FastSpeech2 &amp; VITS</span></span>
<span class="line"><span>    speed_control_alpha=1.0,</span></span>
<span class="line"><span>    # Only for VITS</span></span>
<span class="line"><span>    noise_scale=0.333,</span></span>
<span class="line"><span>    noise_scale_dur=0.333,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span># For fastspeech model run the commented lines below</span></span>
<span class="line"><span># from espnet2.bin.tts_inference import Text2Speech</span></span>
<span class="line"><span># from espnet2.utils.types import str_or_none</span></span>
<span class="line"><span># !ln -sf /content/tts_fastspeech_model/exp .</span></span>
<span class="line"><span># text2speech = Text2Speech.from_pretrained(</span></span>
<span class="line"><span>#     # model_tag=str_or_none(tag),</span></span>
<span class="line"><span>#     train_config=&quot;/content/tts_fastspeech_model/exp/tts_train_fastspeech_raw_phn_tacotron_g2p_en_no_space/config.yaml&quot;,</span></span>
<span class="line"><span>#     model_file=&quot;/content/tts_fastspeech_model/exp/tts_train_fastspeech_raw_phn_tacotron_g2p_en_no_space/1000epoch.pth&quot;,</span></span>
<span class="line"><span>#     vocoder_tag=str_or_none(vocoder_tag),</span></span>
<span class="line"><span>#     device=&quot;cuda&quot;,</span></span>
<span class="line"><span>#     # Only for Tacotron 2 &amp; Transformer</span></span>
<span class="line"><span>#     threshold=0.5,</span></span>
<span class="line"><span>#     # Only for Tacotron 2</span></span>
<span class="line"><span>#     minlenratio=0.0,</span></span>
<span class="line"><span>#     maxlenratio=10.0,</span></span>
<span class="line"><span>#     use_att_constraint=False,</span></span>
<span class="line"><span>#     backward_window=1,</span></span>
<span class="line"><span>#     forward_window=3,</span></span>
<span class="line"><span>#     # Only for FastSpeech &amp; FastSpeech2 &amp; VITS</span></span>
<span class="line"><span>#     speed_control_alpha=1.0,</span></span>
<span class="line"><span>#     # Only for VITS</span></span>
<span class="line"><span>#     noise_scale=0.333,</span></span>
<span class="line"><span>#     noise_scale_dur=0.333,</span></span>
<span class="line"><span># )</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import time</span></span>
<span class="line"><span>import torch</span></span>
<span class="line"><span></span></span>
<span class="line"><span># decide the input sentence by yourself</span></span>
<span class="line"><span>print(f&quot;Input your favorite sentence in {lang}.&quot;)</span></span>
<span class="line"><span>x = input()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># synthesis</span></span>
<span class="line"><span>with torch.no_grad():</span></span>
<span class="line"><span>    start = time.time()</span></span>
<span class="line"><span>    wav = text2speech(x)[&quot;wav&quot;]</span></span>
<span class="line"><span>rtf = (time.time() - start) / (len(wav) / text2speech.fs)</span></span>
<span class="line"><span>print(f&quot;RTF = {rtf:5f}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># let us listen to generated samples</span></span>
<span class="line"><span>from IPython.display import display, Audio</span></span>
<span class="line"><span>display(Audio(wav.view(-1).cpu().numpy(), rate=text2speech.fs))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="multi-speaker-model-demo" tabindex="-1"><a class="header-anchor" href="#multi-speaker-model-demo"><span>Multi-speaker Model Demo</span></a></h2><h3 id="model-selection" tabindex="-1"><a class="header-anchor" href="#model-selection"><span>Model Selection</span></a></h3><p>Now we provide only English multi-speaker pretrained model.</p><blockquote><p>The terms of use follow that of each corpus. We use the following corpora:</p></blockquote><ul><li><code>libritts_*</code>: LibriTTS corpus <ul><li>http://www.openslr.org/60</li></ul></li><li><code>vctk_*</code>: English Multi-speaker Corpus for CSTR Voice Cloning Toolkit <ul><li>http://www.udialogue.org/download/cstr-vctk-corpus.html</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>#@title English multi-speaker pretrained model { run: &quot;auto&quot; }</span></span>
<span class="line"><span>lang = &#39;English&#39;</span></span>
<span class="line"><span>tag = &#39;kan-bayashi/vctk_full_band_multi_spk_vits&#39; #@param [&quot;kan-bayashi/vctk_gst_tacotron2&quot;, &quot;kan-bayashi/vctk_gst_transformer&quot;, &quot;kan-bayashi/vctk_xvector_tacotron2&quot;, &quot;kan-bayashi/vctk_xvector_transformer&quot;, &quot;kan-bayashi/vctk_xvector_conformer_fastspeech2&quot;, &quot;kan-bayashi/vctk_gst+xvector_tacotron2&quot;, &quot;kan-bayashi/vctk_gst+xvector_transformer&quot;, &quot;kan-bayashi/vctk_gst+xvector_conformer_fastspeech2&quot;, &quot;kan-bayashi/vctk_multi_spk_vits&quot;, &quot;kan-bayashi/vctk_full_band_multi_spk_vits&quot;, &quot;kan-bayashi/libritts_xvector_transformer&quot;, &quot;kan-bayashi/libritts_xvector_conformer_fastspeech2&quot;, &quot;kan-bayashi/libritts_gst+xvector_transformer&quot;, &quot;kan-bayashi/libritts_gst+xvector_conformer_fastspeech2&quot;, &quot;kan-bayashi/libritts_xvector_vits&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span>vocoder_tag = &quot;none&quot; #@param [&quot;none&quot;, &quot;parallel_wavegan/vctk_parallel_wavegan.v1.long&quot;, &quot;parallel_wavegan/vctk_multi_band_melgan.v2&quot;, &quot;parallel_wavegan/vctk_style_melgan.v1&quot;, &quot;parallel_wavegan/vctk_hifigan.v1&quot;, &quot;parallel_wavegan/libritts_parallel_wavegan.v1.long&quot;, &quot;parallel_wavegan/libritts_multi_band_melgan.v2&quot;, &quot;parallel_wavegan/libritts_hifigan.v1&quot;, &quot;parallel_wavegan/libritts_style_melgan.v1&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>!gdown --id &quot;1fzyyjLvrT_jldw4lfOD1P8FK2MGoIZO_&amp;confirm=t&quot; -O /content/tts_multi-speaker_model.zip</span></span>
<span class="line"><span>!unzip /content/tts_multi-speaker_model.zip -d /content/tts_multi-speaker_model</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="model-setup-1" tabindex="-1"><a class="header-anchor" href="#model-setup-1"><span>Model Setup</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>from espnet2.bin.tts_inference import Text2Speech</span></span>
<span class="line"><span>from espnet2.utils.types import str_or_none</span></span>
<span class="line"><span></span></span>
<span class="line"><span>text2speech = Text2Speech.from_pretrained(</span></span>
<span class="line"><span>    train_config=&quot;/content/tts_multi-speaker_model/exp/tts_train_full_band_multi_spk_vits_raw_phn_tacotron_g2p_en_no_space/config.yaml&quot;,</span></span>
<span class="line"><span>    model_file=&quot;/content/tts_multi-speaker_model/exp/tts_train_full_band_multi_spk_vits_raw_phn_tacotron_g2p_en_no_space/train.total_count.ave_10best.pth&quot;,</span></span>
<span class="line"><span>    vocoder_tag=str_or_none(vocoder_tag),</span></span>
<span class="line"><span>    device=&quot;cuda&quot;,</span></span>
<span class="line"><span>    # Only for Tacotron 2 &amp; Transformer</span></span>
<span class="line"><span>    threshold=0.5,</span></span>
<span class="line"><span>    # Only for Tacotron 2</span></span>
<span class="line"><span>    minlenratio=0.0,</span></span>
<span class="line"><span>    maxlenratio=10.0,</span></span>
<span class="line"><span>    use_att_constraint=False,</span></span>
<span class="line"><span>    backward_window=1,</span></span>
<span class="line"><span>    forward_window=3,</span></span>
<span class="line"><span>    # Only for FastSpeech &amp; FastSpeech2 &amp; VITS</span></span>
<span class="line"><span>    speed_control_alpha=1.0,</span></span>
<span class="line"><span>    # Only for VITS</span></span>
<span class="line"><span>    noise_scale=0.333,</span></span>
<span class="line"><span>    noise_scale_dur=0.333,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="speaker-selection" tabindex="-1"><a class="header-anchor" href="#speaker-selection"><span>Speaker selection</span></a></h3><p>For multi-speaker model, we need to provide X-vector and/or the reference speech to decide the speaker characteristics.<br> For X-vector, you can select the speaker from the dumped x-vectors.<br> For the reference speech, you can use any speech but please make sure the sampling rate is matched.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import glob</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import kaldiio</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Get model directory path</span></span>
<span class="line"><span>from espnet_model_zoo.downloader import ModelDownloader</span></span>
<span class="line"><span>d = ModelDownloader()</span></span>
<span class="line"><span># model_dir = os.path.dirname(d.download_and_unpack(tag)[&quot;train_config&quot;])</span></span>
<span class="line"><span></span></span>
<span class="line"><span># X-vector selection</span></span>
<span class="line"><span>spembs = None</span></span>
<span class="line"><span>if text2speech.use_spembs:</span></span>
<span class="line"><span>    xvector_ark = [p for p in glob.glob(f&quot;/content/tts_multi-speaker_model/dump/**/spk_xvector.ark&quot;, recursive=True) if &quot;tr&quot; in p][0]</span></span>
<span class="line"><span>    xvectors = {k: v for k, v in kaldiio.load_ark(xvector_ark)}</span></span>
<span class="line"><span>    spks = list(xvectors.keys())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # randomly select speaker</span></span>
<span class="line"><span>    random_spk_idx = np.random.randint(0, len(spks))</span></span>
<span class="line"><span>    spk = spks[random_spk_idx]</span></span>
<span class="line"><span>    spembs = xvectors[spk]</span></span>
<span class="line"><span>    print(f&quot;selected spk: {spk}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Speaker ID selection</span></span>
<span class="line"><span>sids = None</span></span>
<span class="line"><span>if text2speech.use_sids:</span></span>
<span class="line"><span>    spk2sid = glob.glob(f&quot;/content/tts_multi-speaker_model/dump/**/spk2sid&quot;, recursive=True)[0]</span></span>
<span class="line"><span>    with open(spk2sid) as f:</span></span>
<span class="line"><span>        lines = [line.strip() for line in f.readlines()]</span></span>
<span class="line"><span>    sid2spk = {int(line.split()[1]): line.split()[0] for line in lines}</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # randomly select speaker</span></span>
<span class="line"><span>    sids = np.array(np.random.randint(1, len(sid2spk)))</span></span>
<span class="line"><span>    spk = sid2spk[int(sids)]</span></span>
<span class="line"><span>    print(f&quot;selected spk: {spk}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Reference speech selection for GST</span></span>
<span class="line"><span>speech = None</span></span>
<span class="line"><span>if text2speech.use_speech:</span></span>
<span class="line"><span>    # you can change here to load your own reference speech</span></span>
<span class="line"><span>    # e.g.</span></span>
<span class="line"><span>    # import soundfile as sf</span></span>
<span class="line"><span>    # speech, fs = sf.read(&quot;/path/to/reference.wav&quot;)</span></span>
<span class="line"><span>    # speech = torch.from_numpy(speech).float()</span></span>
<span class="line"><span>    speech = torch.randn(50000,) * 0.01</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="synthesis-✅-checkpoint3-2-point" tabindex="-1"><a class="header-anchor" href="#synthesis-✅-checkpoint3-2-point"><span>Synthesis(✅ Checkpoint3 (2 point))</span></a></h3><p>Run inference of pretrained multi-speaker TTS model on more than one speaker id. Plot spectrogram and waveform of the synthesized speech for these speaker ids.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import time</span></span>
<span class="line"><span>import torch</span></span>
<span class="line"><span></span></span>
<span class="line"><span># decide the input sentence by yourself</span></span>
<span class="line"><span>print(f&quot;Input your favorite sentence in {lang}.&quot;)</span></span>
<span class="line"><span>x = input()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># synthesis</span></span>
<span class="line"><span>with torch.no_grad():</span></span>
<span class="line"><span>    start = time.time()</span></span>
<span class="line"><span>    wav = text2speech(x, speech=speech, spembs=spembs, sids=sids)[&quot;wav&quot;]</span></span>
<span class="line"><span>rtf = (time.time() - start) / (len(wav) / text2speech.fs)</span></span>
<span class="line"><span>print(f&quot;RTF = {rtf:5f}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># let us listen to generated samples</span></span>
<span class="line"><span>from IPython.display import display, Audio</span></span>
<span class="line"><span>display(Audio(wav.view(-1).cpu().numpy(), rate=text2speech.fs))</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,49);function x(q,y){const n=l("ExternalLinkIcon");return p(),t("div",null,[s("p",null,[s("a",r,[d,a(n)])]),u,v,m,s("ul",null,[s("li",null,[s("a",b,[e("ESPnet repository"),a(n)])]),s("li",null,[s("a",h,[e("ESPnet documentation"),a(n)])])]),_,f,s("p",null,[e("The notebook is adapted from this "),s("a",g,[e("Colab"),a(n)])]),k])}const T=i(c,[["render",x],["__file","TextToSpeech_CMU_11492_692_Spring2023(Assignment8).html.vue"]]);export{T as default};
