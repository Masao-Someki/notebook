import{_ as l,r as i,o as p,c as t,a as s,d as e,b as n,e as o}from"./app-FOR18dDf.js";const r={},c={href:"https://colab.research.google.com/github/espnet/notebook/blob/master/espnet2_tts_realtime_demo.ipynb",target:"_blank",rel:"noopener noreferrer"},d=s("img",{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"},null,-1),u=s("h1",{id:"espnet2-tts-realtime-demonstration",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#espnet2-tts-realtime-demonstration"},[s("span",null,"ESPnet2-TTS realtime demonstration")])],-1),v=s("p",null,"This notebook provides a demonstration of the realtime E2E-TTS using ESPnet2-TTS and ParallelWaveGAN repo.",-1),m=s("ul",null,[s("li",null,"ESPnet2-TTS: https://github.com/espnet/espnet/tree/master/egs2/TEMPLATE/tts1"),s("li",null,"ParallelWaveGAN: https://github.com/kan-bayashi/ParallelWaveGAN")],-1),b={href:"https://github.com/kan-bayashi",target:"_blank",rel:"noopener noreferrer"},h=o(`<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span># NOTE: pip shows imcompatible errors due to preinstalled libraries but you do not need to care</span></span>
<span class="line"><span>!pip install -q espnet==202308 pypinyin==0.44.0 parallel_wavegan==0.5.4 gdown==4.4.0 espnet_model_zoo</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="single-speaker-model-demo" tabindex="-1"><a class="header-anchor" href="#single-speaker-model-demo"><span>Single speaker model demo</span></a></h2><h3 id="model-selection" tabindex="-1"><a class="header-anchor" href="#model-selection"><span>Model Selection</span></a></h3><p>Please select model: English, Japanese, and Mandarin are supported.</p><p>You can try end-to-end text2wav model &amp; combination of text2mel and vocoder.<br> If you use text2wav model, you do not need to use vocoder (automatically disabled).</p><p><strong>Text2wav models</strong>:</p><ul><li>VITS</li></ul><p><strong>Text2mel models</strong>:</p><ul><li>Tacotron2</li><li>Transformer-TTS</li><li>(Conformer) FastSpeech</li><li>(Conformer) FastSpeech2</li></ul><p><strong>Vocoders</strong>:</p><ul><li>Parallel WaveGAN</li><li>Multi-band MelGAN</li><li>HiFiGAN</li><li>Style MelGAN.</li></ul><blockquote><p>The terms of use follow that of each corpus. We use the following corpora:</p></blockquote><ul><li><code>ljspeech_*</code>: LJSpeech dataset <ul><li>https://keithito.com/LJ-Speech-Dataset/</li></ul></li><li><code>jsut_*</code>: JSUT corpus <ul><li>https://sites.google.com/site/shinnosuketakamichi/publication/jsut</li></ul></li><li><code>jvs_*</code>: JVS corpus + JSUT corpus <ul><li>https://sites.google.com/site/shinnosuketakamichi/research-topics/jvs_corpus</li><li>https://sites.google.com/site/shinnosuketakamichi/publication/jsut</li></ul></li><li><code>tsukuyomi_*</code>: つくよみちゃんコーパス + JSUT corpus <ul><li>https://tyc.rei-yumesaki.net/material/corpus/</li><li>https://sites.google.com/site/shinnosuketakamichi/publication/jsut</li></ul></li><li><code>csmsc_*</code>: Chinese Standard Mandarin Speech Corpus <ul><li>https://www.data-baker.com/open_source.html</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>#@title Choose English model { run: &quot;auto&quot; }</span></span>
<span class="line"><span>lang = &#39;English&#39;</span></span>
<span class="line"><span>tag = &#39;kan-bayashi/ljspeech_vits&#39; #@param [&quot;kan-bayashi/ljspeech_tacotron2&quot;, &quot;kan-bayashi/ljspeech_fastspeech&quot;, &quot;kan-bayashi/ljspeech_fastspeech2&quot;, &quot;kan-bayashi/ljspeech_conformer_fastspeech2&quot;, &quot;kan-bayashi/ljspeech_joint_finetune_conformer_fastspeech2_hifigan&quot;, &quot;kan-bayashi/ljspeech_joint_train_conformer_fastspeech2_hifigan&quot;, &quot;kan-bayashi/ljspeech_vits&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span>vocoder_tag = &quot;none&quot; #@param [&quot;none&quot;, &quot;parallel_wavegan/ljspeech_parallel_wavegan.v1&quot;, &quot;parallel_wavegan/ljspeech_full_band_melgan.v2&quot;, &quot;parallel_wavegan/ljspeech_multi_band_melgan.v2&quot;, &quot;parallel_wavegan/ljspeech_hifigan.v1&quot;, &quot;parallel_wavegan/ljspeech_style_melgan.v1&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>#@title Choose Japanese model { run: &quot;auto&quot; }</span></span>
<span class="line"><span>lang = &#39;Japanese&#39;</span></span>
<span class="line"><span>tag = &#39;kan-bayashi/jsut_full_band_vits_prosody&#39; #@param [&quot;kan-bayashi/jsut_tacotron2&quot;, &quot;kan-bayashi/jsut_transformer&quot;, &quot;kan-bayashi/jsut_fastspeech&quot;, &quot;kan-bayashi/jsut_fastspeech2&quot;, &quot;kan-bayashi/jsut_conformer_fastspeech2&quot;, &quot;kan-bayashi/jsut_conformer_fastspeech2_accent&quot;, &quot;kan-bayashi/jsut_conformer_fastspeech2_accent_with_pause&quot;, &quot;kan-bayashi/jsut_vits_accent_with_pause&quot;, &quot;kan-bayashi/jsut_full_band_vits_accent_with_pause&quot;, &quot;kan-bayashi/jsut_tacotron2_prosody&quot;, &quot;kan-bayashi/jsut_transformer_prosody&quot;, &quot;kan-bayashi/jsut_conformer_fastspeech2_tacotron2_prosody&quot;, &quot;kan-bayashi/jsut_vits_prosody&quot;, &quot;kan-bayashi/jsut_full_band_vits_prosody&quot;, &quot;kan-bayashi/jvs_jvs010_vits_prosody&quot;, &quot;kan-bayashi/tsukuyomi_full_band_vits_prosody&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span>vocoder_tag = &#39;none&#39; #@param [&quot;none&quot;, &quot;parallel_wavegan/jsut_parallel_wavegan.v1&quot;, &quot;parallel_wavegan/jsut_multi_band_melgan.v2&quot;, &quot;parallel_wavegan/jsut_style_melgan.v1&quot;, &quot;parallel_wavegan/jsut_hifigan.v1&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>#@title Choose Mandarin model { run: &quot;auto&quot; }</span></span>
<span class="line"><span>lang = &#39;Mandarin&#39;</span></span>
<span class="line"><span>tag = &#39;kan-bayashi/csmsc_full_band_vits&#39; #@param [&quot;kan-bayashi/csmsc_tacotron2&quot;, &quot;kan-bayashi/csmsc_transformer&quot;, &quot;kan-bayashi/csmsc_fastspeech&quot;, &quot;kan-bayashi/csmsc_fastspeech2&quot;, &quot;kan-bayashi/csmsc_conformer_fastspeech2&quot;, &quot;kan-bayashi/csmsc_vits&quot;, &quot;kan-bayashi/csmsc_full_band_vits&quot;] {type: &quot;string&quot;}</span></span>
<span class="line"><span>vocoder_tag = &quot;none&quot; #@param [&quot;none&quot;, &quot;parallel_wavegan/csmsc_parallel_wavegan.v1&quot;, &quot;parallel_wavegan/csmsc_multi_band_melgan.v2&quot;, &quot;parallel_wavegan/csmsc_hifigan.v1&quot;, &quot;parallel_wavegan/csmsc_style_melgan.v1&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="model-setup" tabindex="-1"><a class="header-anchor" href="#model-setup"><span>Model Setup</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>from espnet2.bin.tts_inference import Text2Speech</span></span>
<span class="line"><span>from espnet2.utils.types import str_or_none</span></span>
<span class="line"><span></span></span>
<span class="line"><span>text2speech = Text2Speech.from_pretrained(</span></span>
<span class="line"><span>    model_tag=str_or_none(tag),</span></span>
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
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="synthesis" tabindex="-1"><a class="header-anchor" href="#synthesis"><span>Synthesis</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import time</span></span>
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
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="multi-speaker-model-demo" tabindex="-1"><a class="header-anchor" href="#multi-speaker-model-demo"><span>Multi-speaker Model Demo</span></a></h2><h3 id="model-selection-1" tabindex="-1"><a class="header-anchor" href="#model-selection-1"><span>Model Selection</span></a></h3><p>Now we provide only English multi-speaker pretrained model.</p><blockquote><p>The terms of use follow that of each corpus. We use the following corpora:</p></blockquote><ul><li><code>libritts_*</code>: LibriTTS corpus <ul><li>http://www.openslr.org/60</li></ul></li><li><code>vctk_*</code>: English Multi-speaker Corpus for CSTR Voice Cloning Toolkit <ul><li>http://www.udialogue.org/download/cstr-vctk-corpus.html</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>#@title English multi-speaker pretrained model { run: &quot;auto&quot; }</span></span>
<span class="line"><span>lang = &#39;English&#39;</span></span>
<span class="line"><span>tag = &#39;kan-bayashi/vctk_full_band_multi_spk_vits&#39; #@param [&quot;kan-bayashi/vctk_gst_tacotron2&quot;, &quot;kan-bayashi/vctk_gst_transformer&quot;, &quot;kan-bayashi/vctk_xvector_tacotron2&quot;, &quot;kan-bayashi/vctk_xvector_transformer&quot;, &quot;kan-bayashi/vctk_xvector_conformer_fastspeech2&quot;, &quot;kan-bayashi/vctk_gst+xvector_tacotron2&quot;, &quot;kan-bayashi/vctk_gst+xvector_transformer&quot;, &quot;kan-bayashi/vctk_gst+xvector_conformer_fastspeech2&quot;, &quot;kan-bayashi/vctk_multi_spk_vits&quot;, &quot;kan-bayashi/vctk_full_band_multi_spk_vits&quot;, &quot;kan-bayashi/libritts_xvector_transformer&quot;, &quot;kan-bayashi/libritts_xvector_conformer_fastspeech2&quot;, &quot;kan-bayashi/libritts_gst+xvector_transformer&quot;, &quot;kan-bayashi/libritts_gst+xvector_conformer_fastspeech2&quot;, &quot;kan-bayashi/libritts_xvector_vits&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span>vocoder_tag = &quot;none&quot; #@param [&quot;none&quot;, &quot;parallel_wavegan/vctk_parallel_wavegan.v1.long&quot;, &quot;parallel_wavegan/vctk_multi_band_melgan.v2&quot;, &quot;parallel_wavegan/vctk_style_melgan.v1&quot;, &quot;parallel_wavegan/vctk_hifigan.v1&quot;, &quot;parallel_wavegan/libritts_parallel_wavegan.v1.long&quot;, &quot;parallel_wavegan/libritts_multi_band_melgan.v2&quot;, &quot;parallel_wavegan/libritts_hifigan.v1&quot;, &quot;parallel_wavegan/libritts_style_melgan.v1&quot;] {type:&quot;string&quot;}</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="model-setup-1" tabindex="-1"><a class="header-anchor" href="#model-setup-1"><span>Model Setup</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>from espnet2.bin.tts_inference import Text2Speech</span></span>
<span class="line"><span>from espnet2.utils.types import str_or_none</span></span>
<span class="line"><span></span></span>
<span class="line"><span>text2speech = Text2Speech.from_pretrained(</span></span>
<span class="line"><span>    model_tag=str_or_none(tag),</span></span>
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
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="speaker-selection" tabindex="-1"><a class="header-anchor" href="#speaker-selection"><span>Speaker selection</span></a></h3><p>For multi-speaker model, we need to provide X-vector and/or the reference speech to decide the speaker characteristics.<br> For X-vector, you can select the speaker from the dumped x-vectors.<br> For the reference speech, you can use any speech but please make sure the sampling rate is matched.</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import glob</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import kaldiio</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Get model directory path</span></span>
<span class="line"><span>from espnet_model_zoo.downloader import ModelDownloader</span></span>
<span class="line"><span>d = ModelDownloader()</span></span>
<span class="line"><span>model_dir = os.path.dirname(d.download_and_unpack(tag)[&quot;train_config&quot;])</span></span>
<span class="line"><span></span></span>
<span class="line"><span># X-vector selection</span></span>
<span class="line"><span>spembs = None</span></span>
<span class="line"><span>if text2speech.use_spembs:</span></span>
<span class="line"><span>    xvector_ark = [p for p in glob.glob(f&quot;{model_dir}/../../dump/**/spk_xvector.ark&quot;, recursive=True) if &quot;tr&quot; in p][0]</span></span>
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
<span class="line"><span>    spk2sid = glob.glob(f&quot;{model_dir}/../../dump/**/spk2sid&quot;, recursive=True)[0]</span></span>
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
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="synthesis-1" tabindex="-1"><a class="header-anchor" href="#synthesis-1"><span>Synthesis</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="shiki dark-plus" style="background-color:#1E1E1E;color:#D4D4D4;" tabindex="0"><code><span class="line"><span>import time</span></span>
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
<span class="line"><span></span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34);function _(q,k){const a=i("ExternalLinkIcon");return p(),t("div",null,[s("p",null,[s("a",c,[d,e(a)])]),u,v,m,s("p",null,[n("Author: Tomoki Hayashi ("),s("a",b,[n("@kan-bayashi"),e(a)]),n(")")]),h])}const f=l(r,[["render",_],["__file","espnet2_tts_realtime_demo.html.vue"]]);export{f as default};
